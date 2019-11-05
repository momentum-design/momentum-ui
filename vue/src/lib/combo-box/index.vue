<script>
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import cloneElement from '../utils/cloneElement';

export default {
  name: 'md-combo-box',

  data() {
    return {
      filteredOptions: [],
      focus: -1,
      uid: this.id || uniqueId('md-combo-box-'),
      isOpen: false,
      value: '',
    }
  },

  render(h) {
    const {
      clear,
      disabled,
      hasSearchIcon,
      inputProps,
      placeholder,
      ...props
    } = this.$props;

    const otherProps = omit({...props}, [
      'id',
      'options',
      'searchProp',
    ]);

    const {
      filteredOptions,
      focus,
      uid,
      isOpen,
      value,
    } = this.$data;

    const activeDescendant = this.$refs.activeChild && this.$refs.activeChild.id;
    const InputComp = hasSearchIcon ? 'md-input-search' : 'md-input';

    const input = (
      <InputComp
        aria-autocomplete='list'
        clear={clear}
        disabled={disabled}
        ref='anchorNode'
        onInput={this.handleInput}
        nativeOnClick={this.handleToggle}
        onKeydown={this.handleKeyDown}
        placeholder={placeholder}
        value={value}
        {...activeDescendant && { 'aria-activedescendant': activeDescendant }}
        {...{props: inputProps}}
      />
    );

    const renderFilteredOption =
      this.$slots.default ?
      filteredOptions && filteredOptions.map((option, i) =>
        cloneElement(option, h, {
          props: {
            active: i === focus,
            key: i,
            refName: 'option',
            role: 'option',
            ...focus === i && { ref: 'activeChild' },
          },
          listeners: {
            click: e => this.handleClick(e, option),
          },
        })
      )
      :
      filteredOptions && filteredOptions.map((option, i) =>
        h('md-list-item', {
          props: {
            active: i === focus,
            key: i,
            label: option,
            refName: 'option',
            role: 'option',
            ...focus === i && { ref: 'activeChild' },
          },
          on: {
            click: e => this.handleClick(e, option),
          },
        })
      );

    const dropdownElement = (
      this.$refs.anchorNode
      && isOpen 
      && (
        <md-event-overlay
          allowClickAway
          anchorNode={this.$refs.anchorNode.$el}
          onClose={this.hidePopover}
          isOpen={isOpen}
          {...{props: otherProps}}
        >
          <div
            class='md-combo-box__options'
            id={uid}
            role='listbox'
            {...this.$refs.anchorNode &&
              {
                style: `width: ${this.$refs.anchorNode.$el.getBoundingClientRect().width}px`
              }
            }
          >
            {renderFilteredOption}
          </div>
        </md-event-overlay>
      )
    );  

    return (
      <div
        aria-controls={uid}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        class='md-combo-box'
        role='combobox'
      >
        {input}
        {dropdownElement}
      </div>
    );

  },

  props: {
    /** @prop Sets the initial input element as empty | false */
    clear: Boolean,
    /** @prop Sets the attribute disabled to the ComboBox | false */
    disabled: Boolean,
    /** @prop Sets the ComboBox to have a search icon | true */
    hasSearchIcon: {
      type: Boolean,
      default: true
    },
    /** @prop Sets the ID of the ComboBox */
    id: String,
    /** @prop Collection of props unique for Input element | null */
    inputProps: Object,
    /** @prop Array of options for the ComboBox dropdown | [] */
    options: Array,
    /** @prop Text that initially populates the input field for guidence | ''  */
    placeholder: {
      type: String,
      default: ''
    },
    /** @prop Sets the search prop | 'label' */
    searchProp: {
      type: String,
      default: 'label'
    },
    /** @prop Sets the target offset | { horizontal: 0, vertical: 4 } */
    targetOffset: {
      type: Object,
      default: () => { return {
        horizontal: 0,
        vertical: 4
      }}
    },
  },

  mounted() {
    this.setFilteredOptions();
  },

  watch: {
    options(val, oldVal) {
      this.setFilteredOptions(this.value);
    }
  },

  methods: {
    setFilteredOptions(filter) {
      this.filteredOptions = !this.$listeners.change
        ? this.applyFilter(filter)
        : this.$slots.default || this.options;

      this.isOpen = !!this.filteredOptions.length;
    },

    hidePopover() {
      this.isOpen = false;
    },

    handleToggle(e) {
      const { filteredOptions } = this.$data;
      if (filteredOptions.length) {
        this.isOpen = true;
      }
    },

    applyFilter(value) {
      const { searchProp } = this.$props;
      const isSubString = string => value && string.toLowerCase().includes(value.toLowerCase());

      if (this.$slots.default) {
        return this.$slots.default.filter(option =>
          (option.componentOptions.propsData[searchProp] && isSubString(option.componentOptions.propsData[searchProp]))
            || ['md-list-item-header'].includes(option.componentOptions.tag)
        );
      } else {
        return this.options.filter(option =>
          isSubString(option)
        );
      }
    },

    handleInput(e) {
      const { focus } = this.$data;

      this.setFilteredOptions(e.target.value);
      this.value = e.target.value;
      this.focus = !this.$listeners.change ? -1 : focus;

      this.$emit('change', e, e.target.value);
    },

    handleClick(e, selectedOption) {
      const { searchProp } = this.$props;

      const val = selectedOption.componentOptions ? selectedOption.componentOptions.propsData[searchProp] : selectedOption
      this.setFilteredOptions(val);
      this.value = val;
      this.isOpen = false;
      this.focus = -1;

      this.$emit('select', e, selectedOption);
    },

    setFocus(index) {
      this.focus = index;
    },

    handleKeyDown(e) {
      let flag = false;
      let newIndex;
      const { filteredOptions, focus, isOpen } = this.$data;
      const length = filteredOptions && filteredOptions.length - 1;

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
        const potentialTarget = filteredOptions[possibleIndex];

        if (this.$slots.default) {
          return (!potentialTarget.componentOptions
            || potentialTarget.componentOptions.propsData.disabled
            || potentialTarget.componentOptions.propsData.isReadOnly)
            ? getNewIndex(possibleIndex, change)
            : possibleIndex;
        } else {
          return possibleIndex;
        }
      };

      if (e.which === 13 || e.keyCode === 13) {
        isOpen
        && (focus !== -1)
        && this.handleClick(e, filteredOptions[focus]);
        flag = true;
      } else if (e.which === 38 || e.keyCode === 38) {
        if(isOpen) {
          newIndex = getNewIndex(focus, -1);
          this.setFocus(newIndex);
        }
        flag = true;
      } else if (e.which === 40 || e.keyCode === 40) {
        if(isOpen) {
          newIndex = getNewIndex(focus, 1);
          this.setFocus(newIndex);
        }
        flag = true;
      }

      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    },

  },

};
</script>
