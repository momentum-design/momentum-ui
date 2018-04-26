import React from 'react';
import PropTypes from 'prop-types';
import Label from '@collab-ui/react/Label';

/**
 * @category controls
 * @component radio
 * @variations collab-ui-react
 */

const Radio = props => {
  const {
    disabled,
    required,
    checked,
    name,
    label,
    value,
    inputRef,
    htmlId,
    onChange,
    children,
    className,
    nestedLevel,
  } = props;

  return (
    <div
      className={
        'cui-input-group cui-radio' +
        `${(nestedLevel && ` cui-input--nested-${nestedLevel}`) || ''}` +
        ` ${className}`
      }
    >
      <input
        className={'cui-input cui-radio__input'}
        type="radio"
        ref={inputRef}
        disabled={disabled}
        checked={checked}
        required={required}
        name={name}
        value={value}
        id={htmlId}
        onChange={onChange}
        tabIndex={0}
      />
      <Label className='cui-radio__label' label={label} htmlFor={htmlId} />
      {children}
    </div>
  );
};

Radio.propTypes = {
  /**
   * optional nextLevel prop type
   */
  nestedLevel: PropTypes.number,
  /**
   * optional className prop type
   */
  className: PropTypes.string,
  /**
   * optional disabled prop type
   */
  disabled: PropTypes.bool,
  /**
   * optional required prop type
   */
  required: PropTypes.bool,
  /**
   * optional checked prop type
   */
  checked: PropTypes.bool,
  /**
   * optional name prop type
   */
  name: PropTypes.string,
  /**
   * optional label prop type
   */
  label: PropTypes.string,
  /**
   * optional value prop type
   */
  value: PropTypes.string,
  /**
   * optional ref prop type
   */
  inputRef: PropTypes.func,
  /**
   * Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing.
   */
  htmlId: PropTypes.string.isRequired,
  /**
   * optional onChange prop type
   */
  onChange: PropTypes.func,
  /**
   * Child component to display next to the input
   */
  children: PropTypes.node,
};

Radio.defaultProps = {
  nestedLevel: 0,
  className: '',
  disabled: false,
  required: false,
  checked: false,
  name: '',
  value: '',
  label: '',
  inputRef: null,
  onChange: null,
};

Radio.displayName = 'Radio';

export default Radio;

/**
* @name Radio Button Group
* @description Groups of Radio Buttons
*
* @category controls
* @component radio
* @section default
*
* @js

import { RadioGroup, InputHelper } from '@collab-ui/react';

export default class DefaultRadio extends React.Component {
  render() {
    return (
      <div className='row'>
        <h3>Radio Button Group</h3>
        <br />
        <RadioGroup>
          <Radio
            value='me'
            label='me'
            htmlId='testCheckbox1'
            onChange={()=>{}}
            inputRef={ref=>this.input=ref}
          />
          <Radio
            value='you'
            label='you'
            htmlId='testCheckbox2'
            onChange={()=>{}}
          />
          <Radio
            value='us'
            label='us'
            htmlId='testCheckbox3'
            onChange={()=>{}}
          >
            <InputHelper message={'I\'m here to help'} />
          </Radio>
        </RadioGroup>
      </div>
    )
  }
}

**/

/**
* @name Disabled Radio
* @description Radios can be disabled by passing in the disabled prop.
*
* @category controls
* @component radio
* @section disabled
*
* @js

export default function DisabledRadio() {
  return (
    <Radio
      value='disabledRadio'
      label='Disabled Radio'
      htmlId='disabledRadio'
      disabled
      onChange={()=>{}}
    />
  );
}
**/

/**
* @name Checked Radio
* @description Radios can be checked by passing in the checked prop.
*
* @category controls
* @component radio
* @section checked
*
* @js

export default function CheckedRadio() {
  return (
    <Radio
      value='checkedRadio'
      label='Checked Radio'
      htmlId='checkedRadio'
      checked
      onChange={()=>{}}
    />
  );
}
**/

/**
* @name Nested Radio
* @description The level of nesting radios is controlled by the nestedLevel prop.  You can have up to 3 nested levels.  Ex. nestedLevel={1} nestedLevel={2} nestedLevel=[3} etc.
*
* @category controls
* @component radio
* @section nested
*
* @js

export default class RadioNested extends React.PureComponent {
  state = {
    value: 'parent'
  }

  render() {
    return (
      <span>
        <Radio
          value='parent'
          label='Parent Radio Example'
          htmlId='parentRadio'
          name='nestedRadios'
          checked={this.state.value === 'parent'}
          onChange={() => this.setState({ value: 'parent' })}
          key='child-0'
        />
        <Radio
          value='child1'
          label='Child Radio Nested 1 Level'
          htmlId='childRadio1'
          name='nestedRadios'
          nestedLevel={1}
          checked={this.state.value === 'child1'}
          onChange={() => this.setState({ value: 'child1' })}
          key='child-1'
        />
        <Radio
          value='child2'
          label='Child Radio Nested 2 Level'
          htmlId='childRadio2'
          name='nestedRadios'
          nestedLevel={2}
          checked={this.state.value === 'child2'}
          onChange={() => this.setState({ value: 'child2' })}
          key='child-2'
        />
        <Radio
          value='child3'
          label='Child Radio Nested 3 Level'
          htmlId='childRadio3'
          name='nestedRadios'
          nestedLevel={3}
          checked={this.state.value === 'child3'}
          onChange={() => this.setState({ value: 'child3' })}
          key='child-3'
        />
      </span>
    );
  }
}
**/
