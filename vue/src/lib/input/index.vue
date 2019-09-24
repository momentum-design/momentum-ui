<script>
import omit from 'lodash/omit';
import toLower from 'lodash/toLower';

const determineMessageType = array => {
  return array.reduce((agg, e) => {
    return agg === 'error' ? agg : e.type || '';
  }, '');
};

const filterMessagesByType = (array, value) => {
  return array.reduce(
    (agg, e) => (e.type === value ? agg.concat(e.message) : agg),
    []
  );
};

export default {
  name: 'md-input',

  data() {
    return {
      isEditing: false,
      currentValue: this.value || this.defaultValue
    };
  },

  render(h) {
    const {
      ariaDescribedBy,
      ariaLabel,
      clear,
      clearAriaLabel,
      containerSize,
      disabled,
      messageArr,
      htmlId,
      id,
      inputClassName,
      helpText,
      inputSize,
      isFilled,
      label,
      multiline,
      nestedLevel,
      placeholder,
      readonly,
      inputRef,
      secondaryLabel,
      shape,
      type,
      ...props
    } = this.$props;

    const otherProps = omit({ ...props }, [
      'defaultValue',
      'ref',
      'value'
    ]);

    const messageType =
      (messageArr.length > 0 && determineMessageType(messageArr)) || '';
    const messages = (messageType && filterMessagesByType(messageArr, messageType)) || null;

    const clearButton = (clear && !disabled && this.currentValue) && (
      <md-input-section position='after'>
        <md-icon
          name='clear-active_16'
          onClick={this.handleClear}
          ariaLabel={clearAriaLabel || 'clear input'}
          buttonClassName='md-input__icon-clear'
        />
      </md-input-section>
    );

    const inputSection = position => (
      this.$slots[`input${position}`]
      && (
        <md-input-section position={toLower(position)}>
          {this.$slots[`input${position}`]}
        </md-input-section>
      )
    );

    const inputLeft = inputSection('Before');
    const inputRight = clearButton || inputSection('After');

    const input = h(
      multiline ? 'textarea' : 'input',
      {
        class:
          'md-input' +
          `${multiline ? ' md-input--multiline' : ''}` +
          `${shape ? ` md-input--${shape}` : ''}` +
          `${inputLeft ? ` md-input--before` : ''}` +
          `${inputRight ? ` md-input--after` : ''}` +
          `${this.isEditing ? ` md-active` : ''}` +
          `${inputClassName ? ` ${inputClassName}` : ''}` +
          `${readonly ? ' md-read-only' : ''}` +
          `${disabled ? ' md-disabled' : ''}` +
          `${this.currentValue ? ` md-dirty` : ''}`,
        on: {
          blur: this.handleBlur,
          change: this.handleChange,
          focus: this.handleFocus,
          input: this.handleInput,
          keydown: this.handleKeyDown,
          mousedown: this.handleMouseDown,
        },
        attrs: {
          'aria-describedby': ariaDescribedBy,
          'aria-label': ariaLabel,
          disabled: disabled,
          id: htmlId,
          placeholder: placeholder,
          readonly: readonly,
          tabindex: 0,
          type: type,
          value: this.currentValue,
          ...otherProps,
          ...this.$attrs
        },
        ref: inputRef
      }
    );

    const inputElement = (
      <div class={
        'md-input__wrapper' +
        `${inputSize ? ` columns ${inputSize}` : ''}`
      }>
        {inputLeft}
        {input}
        {inputRight}
      </div>
    );

    return (
      <div
        class={
          `md-input-container` +
          `${isFilled ? ' md-input--filled' : ''}` +
          `${containerSize ? ` columns ${containerSize}` : ''}` +
          `${readonly ? ' md-read-only' : ''}` +
          `${disabled ? ' md-disabled' : ''}` +
          `${messageType ? ` md-${messageType}` : ''}` +
          `${nestedLevel && ` md-input--nested-${nestedLevel}` || ''}`
        }
      >
        {
          label &&
          <md-label
            class='md-input__label'
            htmlFor={htmlId || id}
            label={label}
          />
        }
        {inputElement}
        {
          secondaryLabel &&
          <md-label
            class='md-input__secondary-label'
            htmlFor={htmlId}
            label={secondaryLabel}
          />
        }
        {helpText && <md-input-helper message={helpText} />}
        {messages &&
          <div class='md-input__messages'>
            {messages.map((m, i) => (
              <md-input-message message={m} key={`input-message-${i}`} />
            ))}
          </div>
        }
        {this.$slots.default}
      </div>
    );
  },

  props: {
    /** @prop ID to reference for blindness accessibility feature | null */
    ariaDescribedBy: String,
    /** @prop Text to display for blindness accessibility features | null */
    ariaLabel: String,
    /** @prop Clears Input values | false */
    clear: Boolean,
    /** @prop Optional aria label on the clear button | null */
    clearAriaLabel: String,
    /** @prop Overall input container size | '' */
    containerSize: {
      type: String,
      default: ''
    },
    /** @prop Default Value same as value but used when onChange isn't invoked | '' */
    defaultValue: {
      type: [String, Number],
      default: ''
    },
    /*** @prop Sets the disabled attribute of the Input | false */
    disabled: Boolean,
    /** @prop Array of Objects with message and type [{error: '', type: 'error, success, warning'}] to display error message and assign class | [] */
    messageArr: {
      type: Array,
      default: _ => []
    },
    /** @prop Unique HTML ID used for tying label to HTML input for automated testing | null */
    htmlId: String,
    /** Unique HTML ID used for tying label to HTML input | null */
    id: String,
    /** @prop Input css class name string | '' */
    inputClassName: {
      type: String,
      default: ''
    },
    /** @prop Help Text to show form validation rules | '' */
    helpText: {
      type: String,
      default: ''
    },
    /*** @prop Optional Input ref prop type | 'input' */
    inputRef: {
      type: String,
      default: 'input'
    },
    /** @prop Overall input wrapper size | '' */
    inputSize: {
      type: String,
      default: ''
    },
    /*** @prop Applies the filled attribute of the Input | false */
    isFilled: Boolean,
    /** @prop Input label text | '' */
    label: {
      type: String,
      default: ''
    },
    /** @prop Input is multiline(textarea) | false */
    multiline: Boolean,
    /*** @prop Optional Input name prop type | null */
    name: String,
    /** @prop Set the level of nested Input components | 0 */
    nestedLevel: {
      type: Number,
      default: 0
    },
    /** @prop Placeholder text to display when Input is empty | '' */
    placeholder: {
      type: String,
      default: ''
    },
    /*** @prop Determines if Input can be edited | false */
    readonly: Boolean,
    /** @prop Secondary Input label | '' */
    secondaryLabel: {
      type: String,
      default: ''
    },
    /** @prop Input shape property | '' */
    shape: {
      type: String,
      default: ''
    },
    /** @prop Input type | 'text' */
    type: {
      type: String,
      default: 'text',
      validator: value => ['text', 'number', 'password', 'email'].indexOf(value) !== -1
    },
    /** @prop Input value | '' */
    value: [String, Number],
  },

  computed: {
    input() {
      return this.$refs[this.inputRef];
    }
  },

  watch: {
    value(val) {
      this.setValue(val);
    }
  },

  methods: {
    setValue(value) {
      this.currentValue = value;
    },

    handleKeyDown(e) {
      this.$emit('keydown', e);
    },

    handleFocus(e) {
      if (this.disabled) {
        e.stopPropagation();
        return;
      }

      this.$emit('focus', e);
      this.isEditing = true;
    },

    handleInput(e) {
      if (e.target.value === this.currentValue) return;
      this.setValue(e.target.value);
      this.$emit('input', e);
      this.setNativeInputValue();
    },

    handleMouseDown(e) {
      if (this.disabled) {
        e.stopPropagation();
        return;
      }

      this.$emit('mousedown', e);
      this.isEditing = true;
    },

    handleChange(e) {
      this.$emit('change', e);
    },

    handleBlur(e) {
      const value = e.target.value;
      this.$emit('doneediting', e, value);
      this.isEditing = false;
      e.stopPropagation();
    },

    handleClear(e) {
      const value = '';
      this.input.focus();
      this.setValue(value);
      this.handleChange(e);
      this.$nextTick(this.setNativeInputValue);
    },

    setNativeInputValue() {
      if (!this.input) return;
      if (this.input.value === this.currentValue) return;
      this.input.value = this.currentValue;
    },
  },

};
</script>
