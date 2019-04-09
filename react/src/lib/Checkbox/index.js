/** @component checkbox */

import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@collab-ui/react';

const Checkbox = props => {
  const {
    checked,
    children,
    className,
    disabled,
    htmlId,
    indeterminate,
    inputRef,
    label,
    name,
    nestedLevel,
    onChange,
    required,
    value,
    ...otherProps
  } = props;

  return (
    <div
      className={
        'cui-input-group cui-checkbox' +
        `${(nestedLevel && ` cui-input--nested-${nestedLevel}`) || ''}` +
        ` ${className}`
      }
    >
      <input
        aria-checked={checked}
        className={
          `cui-input cui-checkbox__input` +
          `${(indeterminate && ' indeterminate') || ''}`
        }
        type="checkbox"
        ref={inputRef}
        disabled={disabled}
        checked={checked}
        required={required}
        name={name}
        value={value}
        onChange={onChange}
        tabIndex={0}
        id={htmlId}
        {...otherProps}
      />
      <Label
        className="cui-checkbox__label"
        label={label}
        htmlFor={htmlId}
      />
      {children}
    </div>
  );
};

Checkbox.propTypes = {
  /** @prop Sets Checkbox status as checked | false */
  checked: PropTypes.bool,
  /** @prop Child component to display next to the input | null */
  children: PropTypes.node,
  /** @prop Optional css class string | ''  */
  className: PropTypes.string,
  /** @prop Sets the attribute disabled to the Checkbox | false */
  disabled: PropTypes.bool,
  /** @prop Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing */
  htmlId: PropTypes.string.isRequired,
  /** @prop Optional indeterminate capabilities of checkbox | false */
  indeterminate: PropTypes.bool,
  /** @prop optional ref attribute for Checkbox input element | null */
  inputRef: PropTypes.func,
  /** @prop Required label string for Checkbox */
  label: PropTypes.string.isRequired,
  /** @prop Sets the attribute name to the Checkbox input element | '' */
  name: PropTypes.string,
  /** @prop Set the level of nested checkboxes | 0 */
  nestedLevel: PropTypes.number,
  /** @prop Optional onChange handler invoked when user makes a change within the Checkbox input element | null */
  onChange: PropTypes.func,
  /** @prop Optional required setting for Checkbox input | false */
  required: PropTypes.bool,
  /** @prop sets value of the Checkbox input element | '' */
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  autoFocus: false,
  checked: false,
  className: '',
  disabled: false,
  indeterminate: false,
  inputRef: null,
  label: '',
  name: '',
  nestedLevel: 0,
  onChange: () => {},
  required: false,
  value: '',
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
