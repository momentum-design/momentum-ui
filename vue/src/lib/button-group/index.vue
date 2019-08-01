<script>
import cloneElement from '../utils/cloneElement';

export default {
  name: 'md-button-group',

  data() {
    return {
      activeIndex: this.initialActiveIndex,
      focusIndex: 0
    };
  },

  render: function (h) {
    const {
      ariaLabel,
      className,
      highlightSelected,
      justified,
      pillWidth,
      theme,
      type,
     } = this.$props;

    const setButtons = () =>
      this.$slots.default.map((child, idx) => (
        child.componentOptions
          ? cloneElement(child, h, {
            active: type === 'pill' ? false : highlightSelected && this.activeIndex === idx,
            index: idx,
            isButtonGroup: true,
            style: {
              ...pillWidth && {width: pillWidth},
            }
          })
          : child
    ));

    return (
      <div
        class={
          'md-button-group' +
          `${(theme && ` md-button-group--${theme}`) || ''}` +
          `${(justified && ` md-button-group--justified`) || ''}` +
          `${(type && ` md-button-group--${type}` || '')}` +
          `${(className && ` ${className}`) || ''}`
        }
        role="group"
        aria-label={ariaLabel}
      >
        {setButtons()}
      </div>
    )
  },

  provide () {
    return {
      group: this,
      click: this.handleClick,
      keydown: this.handleKeyDown,
    }
  },

  props: {
    /** @prop Sets initial active Button by index | null */
    initialActiveIndex: Number,
    /** @prop Text to display for blindness accessibility features | '' */
    ariaLabel: {
      type: String,
      default: ''
    },
    /** @prop Optional css class string | '' */
    className: {
      type: String,
      default: ''
    },
    /** @prop Set focus to ButtonGroup when page is loaded | false */
    focusOnLoad: Boolean,
    /** @prop Highlights the selected button within group | true */
    highlightSelected: {
      type: Boolean,
      default: true
    },
    /** @prop Optional text-justified css styling | true */
    justified: {
      type: Boolean,
      default: true
    },
    /** @prop Sets width of a pill Button | '60px' */
    pillWidth: {
      type: String,
      default: '60px'
    },
    /** @prop Optional Button color theme for ButtonGroup | '' */
    theme: {
      type: String,
      default: '',
      validator: function (value) {
        return ['', 'dark'].indexOf(value) !== -1
      }
    },
    /** @prop Optional Button type for ButtonGroup | '' */
    type: {
      type: String,
      default: '',
      validator: function (value) {
        return ['', 'pill'].indexOf(value) !== -1
      }
    },
  },

  mounted() {
    const initialFocus = this.getNewIndex(this.focusIndex - 1 , 1);
    this.setFocusIndex(initialFocus);
    (this.activeIndex >= 0) && this.determineInitialActive();
  },

  methods: {
    determineInitialActive() {
      /* eslint-disable no-console */
      if(this.activeIndex < 0 && this.activeIndex > this.$slots.default.length - 1) {
        console.warn('[@momentum-ui/vue] ButtonGroup: activeIndex is out of bound');
        return;
      }
      const initialActive = this.getNewIndex(this.activeIndex - 1 , 1);
      this.setActiveIndex(initialActive);
      /* eslint-enable no-console */
    },

    setFocusIndex(index) {
      if (this.focusIndex !== index) {
        this.focusIndex = index;
      }
    },

    setActiveIndex(index) {
      if (this.activeIndex !== index) {
        this.activeIndex = index;
      }
    },

    handleClick(event, index) {
      const { onSelect } = this.$props;
      this.setFocusIndex(index);
      this.setActiveIndex(index);
      onSelect && onSelect(event, index);
    },

    getNewIndex(currentIndex, change) {
      const length = this.$slots.default.length - 1;

      const getPossibleIndex = () => {
        if (currentIndex + change < 0) {
          return length;
        } else if (currentIndex + change > length) {
          return 0;
        }

        return currentIndex + change;
      };

      const possibleIndex = getPossibleIndex();
      const potentialTarget = this.$slots.default[possibleIndex];

      return possibleIndex !== currentIndex
        && (!potentialTarget.componentOptions || potentialTarget.componentOptions.propsData.disabled)
        ? this.getNewIndex(possibleIndex, change)
        : possibleIndex;
    },

    getIncludesFirstCharacter(str, char) {
      return str
        .charAt(0)
        .toLowerCase()
        .includes(char);
    },

    setFocusByFirstCharacter(char, currentIdx) {
      const length = this.$slots.default.length - 1;

      const newIndex = this.$slots.default
        .reduce((agg, child, idx, arr) => {

          const index = currentIdx + idx + 1 > length
            ? Math.abs(currentIdx + idx - length)
            : currentIdx + idx + 1;

          const label = arr[index].componentOptions
            && arr[index].componentOptions.children.length > 0
            ? arr[index].componentOptions.children[0].elm.textContent
            : '';

          return (
            !agg.length
            && arr[index].componentOptions
            && arr[index].componentOptions.children.length > 0
            && !arr[index].componentOptions.propsData.disabled
            && !arr[index].componentOptions.propsData.isReadOnly
            && this.getIncludesFirstCharacter(label, char)
          )
            ? agg.concat(index)
            : agg;
        },
        []
      );
      !isNaN(newIndex[0]) && this.setFocusIndex(newIndex[0]);
    },

    handleKeyDown(e, idx) {
      let newIndex;
      let flag = false;
      const char = e.key;

      const isPrintableCharacter = str => {
        return str.length === 1 && str.match(/\S/);
      };

      switch (e.keyCode) {
        case 38:
        case 37:
          newIndex = this.getNewIndex(idx, -1);
          this.setFocusIndex(newIndex);
          flag = true;
          break;

        case 39:
        case 40:
          newIndex = this.getNewIndex(idx, 1);
          this.setFocusIndex(newIndex);
          flag = true;
          break;
        default:
          if (isPrintableCharacter(char)) {
            this.setFocusByFirstCharacter(char, idx);
            flag = true;
          }
          break;
      }

      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    },

  }
};
</script>
