<script>
export default {
  name: 'md-slider',

  data() {
    return {
      sliderLow: this.value.low || this.min,
      sliderHigh: this.value.high || this.value,
      scale: this.getScale(),
      selectionWidth: null,
    }
  },

  render(h) {
    const { value, disabled, max, min, translateFn } = this.$props;
    const { sliderHigh, sliderLow, scale, selectionWidth } = this.$data;

    const renderTicks = () => {
      const ticks = scale.map((tickValue, idx) => {
        const tickLabel = translateFn ? translateFn(tickValue) : tickValue;
        return (
            <span key={`tick-${idx}`} class='md-slider__hashlabel'>
              {tickLabel}
            </span>
        );
      });
      return (
        <div ref='ticksContainer'>
          {ticks}
        </div>
      );
    };

    return (
      <div
        class={
          `md-slider` +
          `${(disabled && ` md-slider--disabled`) || ''}`
        }
        role='slider'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={
          typeof this.value !== 'object'
          ?
          sliderHigh : undefined
        }
        aria-valuetext={
          typeof this.value === 'object'
          ?
          `Low is ${Math.min(sliderLow, sliderHigh)}, high is ${Math.max(sliderLow, sliderHigh)}` : undefined
        }
      >
        <span class='md-slider__bar' ref='sliderBar' />
        <span class='md-slider__selection' style={selectionWidth} />
        {
          Number.isInteger(value.low)
          &&
          <md-slider-pointer
            position={((sliderLow - min) / (max - min)) * 100}
            onMove={(b) => this.onSliderMove('sliderLow', b)}
          />
        }
        <md-slider-pointer
          position={((sliderHigh - min) / (max - min)) * 100}
          onMove={(b) => this.onSliderMove('sliderHigh', b)}
        />
        {renderTicks()}
      </div>
    );
  },

  props: {
    /** @prop Determines if minimum pointer can cross over maximum pointer | false */
    canCross: Boolean,
    /** @prop Set the attribute disabled to Slider | false */
    disabled: Boolean,
    /** @prop Set the initial maximum value */
    max: {
      type: Number,
      required: true
    },
    /** @prop Set the initial minimum value | 0 */
    min: {
      type: Number,
      default: 0
    },
    /** @prop Set visual step measurement | 1 */
    step: {
      type: Number,
      default: 1
    },
    /** @prop Set increment of x-axis labels | 0 */
    tick: {
      type: Number,
      default: 0
    },
    /** @prop Function to compute layout of Slider | null */
    translateFn: Function,
    /** @prop Set either maximum pointer value or a combination of high and low pointer values | 0 */
    value: {
      type: [Object, Number],
      default: 0
    }
  },

  mounted() {
    const { min, max } = this.$props;
    const { scale } = this.$data;

    this.getSelectionWidth();
    this.setScalePos(scale, min, max);
  },

  methods: {
    setScalePos(scale, min, max) {
      this.$refs.ticksContainer && this.$refs.ticksContainer.childNodes.forEach((child, idx) => {
        const leftValue = `${(scale[idx] - min) / max * 100}%`;
        child.style.left = `calc(${leftValue} - ${(child.offsetWidth/2)}px)`;
      });
    },

    getScale() {
      const { min, max, tick } = this.$props;
      if (tick) {
        let value = max;
        let ticksArray = [max];

        while (value > 0 && (value - tick) >= min) {
          value -= tick;

          ticksArray.unshift(Math.abs(Math.round(value / tick) * tick));
        }

        return ticksArray;
      } else {
        return [min, max];
      }
    },

    getSliderWidth() {
      return this.$refs.sliderBar.getBoundingClientRect().width;
    },

    getStepWidth() {
      const maxValue = this.max - this.min;
      const maxWidth = this.getSliderWidth();

      return (this.step / maxValue) * maxWidth;
    },

    getSteps(position) {
      if (position.isKeyBoard) return 1;
      const diff = position.direction === 1 ? position.to - position.from : position.from - position.to;
      if (diff < 0) return 0;
      const steps = diff / this.getStepWidth();
      return steps - Math.floor(steps) >= 0.5 ? Math.ceil(steps) : Math.floor(steps);
    },


    getLimit(pointerKey, direction) {
      if (pointerKey === 'sliderLow') {
        return this.canCross
        ? direction === 1 ? this.max : this.min
        : direction === 1 ? this.sliderHigh : this.min;
      } else if (pointerKey === 'sliderHigh') {
        return this.canCross
        ? direction === 1 ? this.max : this.min
        : direction === 1 ? this.max : this.sliderLow;
      }
    },

    returnCurrentValues() {
      this.getSelectionWidth();

      const val = typeof this.value === 'object'
        ?
        {
          low: Math.min(this.sliderHigh, this.sliderLow),
          high: Math.max(this.sliderHigh, this.sliderLow)
        }
        : this.sliderHigh;

      this.$emit('change', val);
    },

    moveForward(key, pixelMove, limit) {
      const newPosition = this.$data[key] + pixelMove <= limit
        ? this.$data[key] + pixelMove
        : limit;

      this.$data[key] = newPosition;
      this.returnCurrentValues();
    },

    moveBack(key, pixelMove, limit) {
      const newPosition = this.$data[key] - pixelMove >= limit
        ? this.$data[key] - pixelMove
        : limit;

      this.$data[key] = newPosition;
      this.returnCurrentValues();
    },


    onSliderMove(key, position) {
      if (this.disabled) return;
      const limit = this.getLimit(key, position.direction);
      const pixelMove = this.getSteps(position) * this.step;

      position.direction === 1 ? this.moveForward(key, pixelMove, limit) : this.moveBack(key, pixelMove, limit);
    },

    getSelectionWidth() {
      const baseValue = Number.isInteger(this.sliderLow) ? this.sliderLow : this.min;

      this.selectionWidth = {
          width: `${(Math.abs(this.sliderHigh - baseValue) / this.max) * 100}%`,
          left: `${((Math.min(baseValue, this.sliderHigh) - this.min) / this.max) * 100}%`
        };
    },
  },

};
</script>
