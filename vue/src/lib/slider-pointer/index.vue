<template>
  <div
    class='md-slider__pointer'
    @mousedown="this.onMouseDown"
    @touchstart="this.onMouseDown($event, true)"
    @touchmove="this.onMouseDown($event, true)"
    @keydown="this.onKeyDown"
    role="button"
    tabindex="0"
    :style="{left: `calc(${position}%`}"
    ref="sliderRef"
  />
</template>

<script>
export default {
  name: 'md-slider-pointer',

  data() {
    return {
      previousPosition: null
    }
  },

  props: {
    /** Set Slider Pointer's position | 0 */
    position: {
      type: Number,
      default: 0
    },
  },

  methods: {
    getDirections(currentPos) {
      const { previousPosition } = this.$data;
      if (currentPos > previousPosition) {
        return 1;
      }
      return -1;
    },

    getPosition(event, isTouch) {
      return isTouch ? event.touches[0].clientX : event.clientX;
    },

    onMouseDown(event, isTouch = false) {
      if (!isTouch) {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
      }

      this.previousPosition = this.getPosition(event, isTouch);
    },

    onMouseUp() {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    },

    onMouseMove(event, isTouch = false) {
      const xPos = this.getPosition(event, isTouch);
      const direction = this.getDirections(xPos);

      this.$emit('move', {
        from: this.$refs.sliderRef.getBoundingClientRect().x,
        to: xPos,
        direction,
        isKeyBoard: false
      });
    },

    onKeyDown(event) {
      const KEYS = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      };

      switch (event.which || event.keyCode || event.charCode) {
        case KEYS.UP:
        case KEYS.RIGHT:
          this.$emit('move', {
            isKeyBoard: true,
            direction: 1
          });
          event.preventDefault();
          break;

        case KEYS.DOWN:
        case KEYS.LEFT:
          this.$emit('move', {
            isKeyBoard: true,
            direction: -1
          });
          event.preventDefault();
          break;
      }
    }
  },
};
</script>
