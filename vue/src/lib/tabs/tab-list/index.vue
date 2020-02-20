<script>
import cloneElement from '../../utils/cloneElement';

export default {
  name: 'md-tab-list',

  inject: [
    'getActiveIndex',
    'getFocusIndex',
    'onActivate',
    'onFocus',
  ],

  render(h) {
    const setTabs = () =>
      this.$slots.default.map((child, idx) => {
        let arrLength = this.$slots.default.length - 1;
        if (child.componentOptions) {
          const disabled = child.componentOptions.propsData.disabled;
          const tab = cloneElement(child, h, {
            props: {
              active: !disabled && this.getActiveIndex() === idx,
              focus: !disabled && this.getFocusIndex() === idx,
            },
          });
          tab.componentOptions.listeners = {
            click: e => this.handleClick(e, idx, disabled),
            keydown: e => this.handleListKeyPress(e, idx, arrLength, disabled),
          };
          return tab;
        }
      });

    return (
      <ul
        class='md-tab__list'
        role={this.role}
        >
        {setTabs()}
      </ul>
    );
  },

  props: {
    /**
     * @prop ARIA role for the Nav, in the context of a TabContainer, the default will
     * be set to "tablist", but can be overridden by the Nav when set explicitly.
     *
     * When the role is set to "tablist" NavItem focus is managed according to
     * the ARIA authoring practices for tabs:
     * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel | 'TabList'
     */
    role: {
      type: String,
      default: 'tablist'
    }
  },

  mounted() {
    this.determineInitialFocus();
  },

  methods: {
    determineInitialFocus() {
      const focus = this.getFocusIndex();
      const childrenList = this.$slots.default;

      if (focus > childrenList.length - 1 || focus < 0) {
        throw new Error(`focusIndex ${focus} is out of bound.`);
      }

      const focusIndex = childrenList[focus].componentOptions
        && !childrenList[focus].componentOptions.propsData.disabled ? focus : null;

      this.setFocus(focusIndex);
      this.onActivate(focusIndex);
    },

    setFocus(index) {
      // Update state with selected index
      this.onFocus(index);
    },

    handleClick(event, index, disabled) {
      if(disabled) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.setFocus(index);
      this.onActivate(index);
    },

    getIncludesFirstCharacter(str, char) {
      return str
        .charAt(0)
        .toLowerCase()
        .includes(char);
    },

    setFocusByFirstCharacter(char, currentIdx, length) {
      const newIndex = this.$slots.default.reduce(
        (agg, child, idx, arr) => {
          const index =
            currentIdx + idx + 1 > length
              ? Math.abs(currentIdx + idx - length)
              : currentIdx + idx + 1;
          const label =
            arr[index].componentOptions.propsData.role === 'menuItem'
              ? arr[index].componentOptions.propsData.label
              : arr[index].componentOptions.propsData.heading;

          return !agg.length && !arr[index].componentOptions.propsData.disabled && this.getIncludesFirstCharacter(label, char)
            ? agg.concat(index)
            : agg;
        },
        []
      );

      this.setFocus(newIndex[0]);
    },

    handleListKeyPress(e, idx, length, disabled) {
      if(disabled) {
        e.preventDefault();
        e.stopPropagation();
      }

      let newIndex, clickEvent;
      const tgt = e.currentTarget;
      const char = e.key;
      let flag = false;

      const getNewIndex = (currentIndex, change) => {
        const getPossibleIndex = () => {
          if (currentIndex + change < 0) {
            return length;
          } else if (currentIndex + change > length) {
            return 0;
          }

          return currentIndex + change;
        };
        const possibleIndex = getPossibleIndex();
        console.log(this.$slots.default[possibleIndex]);
        return this.$slots.default[possibleIndex].componentOptions.propsData.disabled
          ? getNewIndex(possibleIndex, change)
          : possibleIndex;
      };

      const isPrintableCharacter = str => {
        return str.length === 1 && str.match(/\S/);
      };
      switch (e.which) {
        case 32:
        case 13:
          try {
            clickEvent = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true,
            });
          } catch (err) {
            if (document.createEvent) {
              // DOM Level 3 for IE 9+
              clickEvent = document.createEvent('MouseEvents');
              clickEvent.initEvent('click', true, true);
            }
          }
          tgt.dispatchEvent(clickEvent);

          flag = true;
          break;

        case 38:
        case 37:
          newIndex = getNewIndex(idx, -1);
          this.setFocus(newIndex);
          flag = true;
          break;

        case 39:
        case 40:
          newIndex = getNewIndex(idx, 1);
          this.setFocus(newIndex);
          flag = true;
          break;

        case 33:
        case 36:
          this.setFocus(0);
          flag = true;
          break;

        case 34:
        case 35:
          this.setFocus(length);
          flag = true;
          break;
        default:
          if (isPrintableCharacter(char)) {
            this.setFocusByFirstCharacter(char, idx, length);
            flag = true;
          }
          break;
      }

      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
  },
};
</script>
