<script>
import omit from 'lodash/omit';

export default {
  name: 'md-input',

  data() {
    return {
      input: null,
      inputValue: this.$props.value || this.$props.defaultValue,
    };
  },

  render: function (h) {
    const {
      ariaDescribedBy,
      ariaLabel,
      className,
      clear,
      clearAriaLabel,
      disabled,
      errorArr,
      htmlId,
      clearIconName,
      id,
      inputClassName,
      inputHelpText,
      inputRef,
      inputSize,
      label,
      multiline,
      nestedLevel,
      placeholder,
      readonly,
      secondaryLabel,
      theme,
      type,
      ...props
    } = this.$props;

    const otherProps = omit({ ...props }, [
      'defaultValue',
      'ref',
      'value',
    ]);

    const errorType =
      (errorArr.length > 0 && this.determineErrorType(errorArr)) || '';
    const errors = (errorType && this.filterErrorsByType(errorArr, errorType)) || [];

    const secondaryLabelWrapper = () => {
      return (
        <div class="md-label__secondary-label-container">
          {inputElement}
          <md-label
            class="md-label__secondary-label"
            htmlFor={htmlId}
            label={secondaryLabel}
            theme={theme}
          />
        </div>
      );
    };

    const clearButton = (clearIconName || clear && !disabled && this.inputValue) && (
      <md-icon
        name={clearIconName || "clear-active_16"}
        onClick={this.handleClear}
        ariaLabel={clearAriaLabel || 'clear input'}
        class='md-input__icon-clear'
      />
    );

    const iconContainer = () => {
      return (
        <div class='md-input__icon-container'>
          {inputElement}
          {this.$slots.default}
          {clearButton}
        </div>
      );
    };

    const InputTag = multiline ? 'textarea' : 'input';

    const inputElement = (
      <InputTag
        class={
          'md-input' +
          `${multiline ? ' md-input--multiline' : ''}` +
          `${inputClassName ? ` ${inputClassName}` : ''}` +
          `${readonly ? ' read-only' : ''}` +
          `${disabled ? ' disabled' : ''}` +
          `${this.inputValue ? ` dirty` : ''}`
        }
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onInput={this.handleInput}
        onKeydown={this.handleKeydown}
        onMousedown={this.handleMousedown}
        ref={inputRef}
        tabindex={0}
        type={type}
        value={this.inputValue}
        disabled={disabled}
        id={htmlId}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        placeholder={placeholder}
        readonly={readonly}
        {...otherProps}
        />
      );

    const getInputWrapper = () => {
      if (clearIconName || clear || this.$slots.default) return iconContainer();
      if (secondaryLabel) return secondaryLabelWrapper();
      return inputElement;
    };

    return (
      <div
        class={
          `md-input-group` +
          `${inputSize ? ` ${inputSize}` : ''}` +
          `${inputSize ? ' columns' : ''}` +
          `${readonly ? ' read-only' : ''}` +
          `${disabled ? ' disabled' : ''}` +
          `${(theme && ` md-input-group--${theme}`) || ''}` +
          `${errorType ? ` ${errorType}` : ''}` +
          `${(nestedLevel && ` md-input--nested-${nestedLevel}`) || ''}` +
          `${className ? ` ${className}` : ''}`
        }
      >
        {
          label &&
          <md-label
            class="md-label"
            htmlFor={htmlId || id}
            label={label}
            theme={theme}
          />
        }
        {getInputWrapper()}
        {inputHelpText && <md-input-helper message={inputHelpText} />}
        {errors &&
          errors.map((e, i) => (
            <md-input-error error={e} key={`input-error-${i}`} />
          ))}
      </div>
    );
  },

  props: {
    /** @prop ID to reference for blindness accessibility feature | null */
    ariaDescribedBy: String,
    /** @prop Text to display for blindness accessibility features | null */
    ariaLabel: String,
    /** @prop Optional css class name | '' */
    className: {
      type: String,
      default: ''
    },
    /** @prop Clears Input values | false */
    clear: Boolean,
    /** @prop Optional aria label on the clear button | null */
    clearAriaLabel: String,
    /** @prop Default Value same as value but used when onChange isn't invoked | '' */
    defaultValue: {
      type: [String, Number],
      default: ''
    },
    /*** @prop Sets the disabled attribute of the Input | false */
    disabled: Boolean,
    /** @prop Array of Objects with error and type [{error: '', type: ''}] to display error message and assign class | [] */
    errorArr: {
      type: Array,
      default: () => []
    },
    /** @prop Unique HTML ID used for tying label to HTML input for automated testing | null */
    htmlId: String,
    /** Optional Icon node that overrides the default clear icon | null */
    clearIconName: String,
    /** Unique HTML ID used for tying label to HTML input | null */
    id: String,
    /** @prop Input css class name string | '' */
    inputClassName: {
      type: String,
      default: ''
    },
    /** @prop Help Text to show form validation rules | '' */
    inputHelpText: {
      type: String,
      default: ''
    },
    /*** @prop Optional Input ref prop type | 'input' */
    inputRef: {
      type: String,
      default: 'input'
    },
    /** @prop Overall input group size | '' */
    inputSize: {
      type: String,
      default: ''
    },
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
    /** @prop Input color theme | '' */
    theme: {
      type: String,
      default: ''
    },
    /** @prop Input type | 'text' */
    type: {
      type: String,
      default: 'text',
      validator: function (value) {
        return ['text', 'number', 'password', 'email'].indexOf(value) !== -1
      }
    },
    /** @prop Input value | '' */
    value: {
      type: [String, Number],
      default: ''
    },
  },

  watch: {
    value(val) {
      this.setValue(val);
    },
  },

  methods: {
    determineErrorType(array) {
      return array.reduce((agg, e) => {
        return agg === 'error' ? agg : e.type || '';
      }, '');
    },

    filterErrorsByType(array, value) {
      return array.reduce(
        (agg, e) => (e.type === value ? agg.concat(e.error) : agg),
        []
      );
    },

    getInput() {
      return this.$refs[this.inputRef];
    },

    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.inputValue) return;
      input.value = this.inputValue;
    },

    setValue(value) {
      this.inputValue = value;
    },

    handleKeydown(e) {
      this.$emit('keydown', e);
    },

    handleFocus(e) {
      if (this.disabled) {
        e.stopPropagation();
        return;
      }

      this.$emit('focus', e);
    },

    handleInput(e) {
      if (e.target.value === this.inputValue) return;
      this.setValue(e.target.value);
      this.$emit('input', e.target.value);
      this.setNativeInputValue();
    },

    handleMousedown(e) {
      if (this.disabled) {
        e.stopPropagation();
        return;
      }

      this.$emit('mousedown', e);
    },

    handleChange(e) {
      this.$emit('change', e);
    },

    handleBlur(e) {
      const value = e.target.value;
      e.stopPropagation();

      if (e.keyCode === 27 || e.keyCode === 13 || e.type === 'blur') {
        this.$emit('doneediting', e, value);
      }
    },

    handleClear(e) {
      const value = '';
      e.target.value = value;
      this.getInput().focus();
      this.setValue(value);
      this.handleChange(e);
      this.$nextTick(this.setNativeInputValue);
    },

  }
};
</script>
