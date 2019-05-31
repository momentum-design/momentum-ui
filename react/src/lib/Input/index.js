/** @component input */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import {
  Icon,
  InputError,
  InputHelper,
  Label,
 } from '@momentum-ui/react';

const determineErrorType = array => {
  return array.reduce((agg, e) => {
    return agg === 'error' ? agg : e.type || '';
  }, '');
};

const filterErrorsByType = (array, value) => {
  return array.reduce(
    (agg, e) => (e.type === value ? agg.concat(e.error) : agg),
    []
  );
};

/** Text input with integrated label to enforce consistency in layout, error display, label placement, and required field marker. */
class Input extends React.Component {

  state = {
    isEditing: false,
    value: this.props.value || this.props.defaultValue,
  };

  componentDidUpdate (prevProps) {
    const { value } = this.props;

    value !== prevProps.value
    && this.setValue(value);
  }

  setValue = value => {
    this.setState({
      value
    });
  };

  handleKeyDown = e => {
    const { onKeyDown } = this.props;

    onKeyDown && onKeyDown(e);
  };

  handleFocus = e => {
    const { onFocus, disabled } = this.props;

    if (disabled) {
      e.stopPropagation();
      return;
    }

    if (onFocus) {
      onFocus(e);
    }
    this.setState({
      isEditing: true,
    });
  };

  handleMouseDown = e => {
    const { onMouseDown, disabled } = this.props;

    if (disabled) {
      e.stopPropagation();
      return;
    }

    if (onMouseDown) {
      onMouseDown(e);
    }
    this.setState({
      isEditing: true,
    });
  };

  handleChange = e => {
    const { onChange } = this.props;
    const value = e.target.value;
    e.persist();
    this.setState(() => {
      onChange && onChange(e);
      return { value };
    });
  };

  handleBlur = e => {
    const { onDoneEditing } = this.props;
    const value = e.target.value;
    e.stopPropagation();

    if (e.keyCode === 27 || e.keyCode === 13 || e.type === 'blur') {
      this.setState(
        { isEditing: false }
        , () => onDoneEditing && onDoneEditing(e, value)
      );
    }
  };

  handleClear = e => {
    const value = '';
    e.target.value = value;
    e.persist();
    this.input.focus();
    this.handleChange(e);
  };

  setInputRef = input => {
    const { clear, inputRef } = this.props;
    if (clear)  this.input = input;
    if (inputRef) return inputRef(input);
  }

  render() {
    const {
      ariaDescribedBy,
      ariaLabel,
      children,
      className,
      clear,
      clearAriaLabel,
      disabled,
      errorArr,
      htmlId,
      iconNode,
      id,
      inputClassName,
      inputHelpText,
      inputSize,
      label,
      multiline,
      nestedLevel,
      placeholder,
      readOnly,
      secondaryLabel,
      theme,
      type,
      ...props
    } = this.props;
    const { value } = this.state;

    const otherProps = omit({ ...props }, [
      'defaultValue',
      'inputRef',
      'onChange',
      'onDoneEditing',
      'onFocus',
      'onKeyDown',
      'onMouseDown',
      'ref',
      'value',
    ]);

    const errorType =
      (errorArr.length > 0 && determineErrorType(errorArr)) || '';
    const errors = (errorType && filterErrorsByType(errorArr, errorType)) || [];

    const secondaryLabelWrapper = () => {
      return (
        <div className="md-label__secondary-label-container">
          {inputElement}
          <Label
            className="md-label__secondary-label"
            htmlFor={htmlId}
            label={secondaryLabel}
            theme={theme}
          />
        </div>
      );
    };

    const clearButton = (clear && !disabled && value) && (
      <Icon
        name="clear-active_16"
        onClick={this.handleClear}
        ariaLabel={clearAriaLabel || 'clear input'}
        className='md-input__icon-clear'
      />
    );

    const iconContainer = () => {
      return (
        <div className='md-input__icon-container'>
          {inputElement}
          {children}
          {iconNode || clearButton}
        </div>
      );
    };

    const InputTag = multiline ? 'textarea' : 'input';

    const inputElement = (
      <InputTag
        className={
          'md-input' +
          `${multiline ? ' md-input--multiline' : ''}` +
          `${inputClassName ? ` ${inputClassName}` : ''}` +
          `${readOnly ? ' read-only' : ''}` +
          `${disabled ? ' disabled' : ''}` +
          `${value ? ` dirty` : ''}`
        }
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        ref={this.setInputRef}
        tabIndex={0}
        type={type}
        value={value}
        {...disabled && { disabled }}
        {...htmlId && { id: htmlId }}
        {...ariaLabel && { 'aria-label': ariaLabel }}
        {...ariaDescribedBy && { 'aria-describedby': ariaDescribedBy }}
        {...otherProps}
        {...placeholder && { placeholder }}
        {...readOnly && { readOnly }}
        />
      );

    const getInputWrapper = () => {
      if (iconNode || clear || children) return iconContainer();
      if (secondaryLabel) return secondaryLabelWrapper();
      return inputElement;
    };

    return (
      <div
        className={
          `md-input-group` +
          ` ${inputSize}` +
          `${inputSize ? ' columns' : ''}` +
          `${readOnly ? ' read-only' : ''}` +
          `${disabled ? ' disabled' : ''}` +
          `${(theme && ` md-input-group--${theme}`) || ''}` +
          `${errorType ? ` ${errorType}` : ''}` +
          `${(nestedLevel && ` md-input--nested-${nestedLevel}`) || ''}` +
          `${className ? ` ${className}` : ''}`
        }
      >
        {
          label &&
          <Label
            className="md-label"
            htmlFor={htmlId || id}
            label={label}
            theme={theme}
          />
        }
        {getInputWrapper()}
        {inputHelpText && <InputHelper message={inputHelpText} />}
        {errors &&
          errors.map((e, i) => (
            <InputError error={e} key={`input-error-${i}`} />
          ))}
      </div>
    );
  }
}

Input.propTypes = {
  /** @prop ID to reference for blindness accessibility feature | null */
  ariaDescribedBy: PropTypes.string,
  /** @prop Text to display for blindness accessibility features | null */
  ariaLabel: PropTypes.string,
  /** @prop Child component to display next to the input | '' */
  children: PropTypes.node,
  /** @prop Optional css class name | '' */
  className: PropTypes.string,
  /** @prop Clears Input values | false */
  clear: PropTypes.bool,
  /** @prop Optional aria label on the clear button | null */
  clearAriaLabel: PropTypes.string,
  /** @prop Default Value same as value but used when onChange isn't invoked | '' */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /*** @prop Sets the disabled attribute of the Input | false */
  disabled: PropTypes.bool,
  /** @prop Array of Objects with error and type [{error: '', type: ''}] to display error message and assign class | [] */
  errorArr: PropTypes.array,
  /** @prop Unique HTML ID used for tying label to HTML input for automated testing | null */
  htmlId: PropTypes.string,
  /** Optional Icon node that overrides the default clear icon | null */
  iconNode: PropTypes.node,
  /** Unique HTML ID used for tying label to HTML input | null */
  id: PropTypes.string,
  /** @prop Input css class name string | '' */
  inputClassName: PropTypes.string,
  /** @prop Help Text to show form validation rules | '' */
  inputHelpText: PropTypes.string,
  /*** @prop Optional Input ref prop type | null */
  inputRef: PropTypes.func,
  /** @prop Overall input group size | '' */
  inputSize: PropTypes.string,
  /** @prop Input label text | '' */
  label: PropTypes.string,
  /** @prop Input is multiline(textarea) | false */
  multiline: PropTypes.bool,
  /*** @prop Optional Input name prop type | null */
  name: PropTypes.string,
  /** @prop Set the level of nested Input components | 0 */
  nestedLevel: PropTypes.number,
  /** @prop Callback function invoked when user types into the Input field | null */
  onChange: PropTypes.func,
  /*** @prop Callback function invoked when user is done editing Input field | null */
  onDoneEditing: PropTypes.func,
  /*** @prop Callback function invoked when user focuses on the Input field | null */
  onFocus: PropTypes.func,
  /*** @prop Callback function invoked when user presses any key | null */
  onKeyDown: PropTypes.func,
  /*** @prop Callback function invoked when user clicks on the mouse/trackpad | null */
  onMouseDown: PropTypes.func,
  /** @prop Placeholder text to display when Input is empty | '' */
  placeholder: PropTypes.string,
  /*** @prop Determines if Input can be edited | false */
  readOnly: PropTypes.bool,
  /** @prop Secondary Input label | '' */
  secondaryLabel: PropTypes.string,
  /** @prop Input color theme | '' */
  theme: PropTypes.string,
  /** @prop Input type | 'text' */
  type: PropTypes.oneOf(['text', 'number', 'password', 'email']),
  /** @prop Input value | '' */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
  ariaDescribedBy: null,
  ariaLabel: null,
  children: '',
  className: '',
  clear: false,
  clearAriaLabel: null,
  defaultValue: '',
  disabled: false,
  errorArr: [],
  htmlId: null,
  iconNode: null,
  id: null,
  inputClassName: '',
  inputHelpText: '',
  inputRef: null,
  inputSize: '',
  label: '',
  multiline: false,
  name: null,
  nestedLevel: 0,
  onChange: null,
  onDoneEditing: null,
  onFocus: null,
  onKeyDown: null,
  onMouseDown: null,
  placeholder: '',
  readOnly: false,
  secondaryLabel: '',
  theme: '',
  type: 'text',
  value: '',
};

Input.displayName = 'Input';

export default Input;
