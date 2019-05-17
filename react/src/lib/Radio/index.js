/** @component radio */

import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@momentum-ui/react';

const Radio = props => {
  const {
    checked,
    children,
    className,
    disabled,
    htmlId,
    inputRef,
    label,
    name,
    nestedLevel,
    onChange,
    required,
    tabIndex,
    value,
  } = props;

  return (
    <div
      className={
        'md-input-group md-radio' +
        `${(nestedLevel && ` md-input--nested-${nestedLevel}`) || ''}` +
        ` ${className}`
      }
    >
      <input
        className={'md-input md-radio__input'}
        type="radio"
        ref={inputRef}
        disabled={disabled}
        checked={checked}
        required={required}
        name={name}
        value={value}
        id={htmlId}
        onChange={onChange}
        tabIndex={tabIndex}
      />
      <Label className='md-radio__label' label={label} htmlFor={htmlId} />
      {children}
    </div>
  );
};

Radio.propTypes = {
  /** @prop Boolean for whether the Radio button is checked | false */
  checked: PropTypes.bool,
  /** @prop Children nodes to render insdie Radio component | null */
  children: PropTypes.node,
  /** @prop Optional CSS class name | '' */
  className: PropTypes.string,
  /** @prop Sets the attribute disabled to the Radio | false */
  disabled: PropTypes.bool,
  /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
  htmlId: PropTypes.string.isRequired,
  /** @prop Optional ref attribute for Radio input element | null */
  inputRef: PropTypes.func,
  /** @prop Radio label text | '' */
  label: PropTypes.string,
  /** @prop Radio name string | '' */
  name: PropTypes.string,
  /** @prop Set the level of nested Radios | 0 */
  nestedLevel: PropTypes.number,
  /** @prop Callback function invoked when user makes a change with the Radio button | null */
  onChange: PropTypes.func,
  /** @prop Requires the user to populate the Radio input | false */
  required: PropTypes.bool,
  /** @prop Set the tabIndex of radio | 0 */
  tabIndex: PropTypes.number,
  /** @prop String value that corresponds with Radio button | '' */
  value: PropTypes.string,
};

Radio.defaultProps = {
  checked: false,
  children: null,
  className: '',
  disabled: false,
  inputRef: null,
  label: '',
  name: '',
  nestedLevel: 0,
  onChange: () => {},
  required: false,
  tabIndex: 0,
  value: '',
};

Radio.displayName = 'Radio';

export default Radio;
