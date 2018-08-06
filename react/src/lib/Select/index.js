/**
 * @category controls
 * @component time-picker
 * @variations collab-ui-react
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  Button,
  EventOverlay,
  Icon,
  List,
 } from '@collab-ui/react';
import {
  isEqual,
  filter,
  find,
  uniqueId,
} from 'lodash';

class Select extends React.Component {
  static displayName = 'Select';

  state = {
    isOpen: false,
    selected: [],
    selectedIndex: [],
    anchorNode: null,
    anchorWidth: null,
    id: this.props.id || uniqueId('cui-select-')
  };

  componentDidUpdate(prevProps, prevState) {
    prevState.selected !== this.state.selected
      && this.props.onSelect
      && this.props.onSelect(this.state.selected);
  }

  hidePopover = () => {
    this.setState({
      isOpen: false
    });
  };

  handleSelect = (e, value, index, label) => {
    e.preventDefault();
    const { selected, selectedIndex } = this.state;
    const { isMulti } = this.props;
    const isActive = find(selected, {value, label});

    !isMulti && this.setState({ isOpen: false });

    if (isActive && !isMulti) return;

    if (isActive && isMulti) {
      return this.setState({
        selected: filter(selected, item =>
          !isEqual(item, {value, label})
        ),
        selectedIndex: selectedIndex.filter(i => i !== index)
      });
    } else if (!isActive && !isMulti) {
      return this.setState({
        selected: [{value, label}],
        selectedIndex: [index]
      });
    } else {
      return this.setState({
        selected: [...selected, {value, label}],
        selectedIndex: [...selectedIndex, index]
      });
    }
  }

  choosePosition = () => {
    const { isOpen, anchorNode } = this.state;

    isOpen && this.setAnchorWidth(anchorNode);
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      anchorNode: ReactDOM.findDOMNode(this.clickTextField).parentNode
    }, () => this.choosePosition());
  };

  setAnchorWidth = elementAnchor => {
    const anchor = elementAnchor && elementAnchor.getBoundingClientRect();

    this.setState({ anchorWidth: anchor.width });
  };

  render() {
    const {
      children,
      className,
      isDynamic,
      isMulti,
      defaultValue,
      ...props
    } = this.props;

    const {
      selected,
      selectedIndex,
      isOpen,
      anchorNode,
      anchorWidth,
      id
    } = this.state;

    const currentValue = () => {
      if(!isMulti && selected.length) return selected[0].label;

      if(selected.length === 1) {
        return `${selected.length} Item Selected`;
      } else if(selected.length) {
        return `${selected.length} Items Selected`;
      }
    };

    const label = (
      <div className='cui-select__label' id={`${id}__label`}>
        {currentValue() || defaultValue}
        <Icon name={`arrow-down_16`} />
      </div>
    );

    const text = (
      <Button
        name={id}
        id={id}
        onClick={this.handleToggle}
        ref={ref => this.clickTextField = ref}
        className={
          'cui-button--input' +
          `${className && ` ${className}` || ''}`
        }
        aria-haspopup='listbox'
        ariaLabelledBy={`${id}__label`}
        active={isOpen}
        {...props}
      >
        {label}
      </Button>
    );

    const dropdownElement = (
      <EventOverlay
        allowClickAway
        anchorNode={anchorNode}
        close={this.hidePopover}
        isOpen={isOpen}
        isDynamic={isDynamic}
      >
        <List
          onSelect={this.handleSelect}
          style={{ width: anchorWidth }}
          ref={ref => this.list = ref}
          role='listbox'
          itemRole='option'
          active={selectedIndex}
          isMulti={isMulti}
          aria-labelledby={`${id}__label`}
          aria-multiselectable={isMulti}
        >
          {children}
        </List>
      </EventOverlay>
    );

    return (
      <div className='cui-input-group cui-select'>
        {text}
        {dropdownElement}
      </div>
    );
  }
}

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  id: PropTypes.string,
  isDynamic: PropTypes.bool,
  isMulti: PropTypes.bool,
  onSelect: PropTypes.func
};

Select.defaultProps = {
  className: '',
  children: null,
  defaultValue: '',
  id: null,
  isDynamic: true,
  isMulti: false,
  onSelect: null
};

export default Select;

/**
* @name Default Select
* @description Selects can be used for single or multi-select
*
* @category controls
* @component select
* @section default
*
* @js
import { SelectOption } from '@collab-ui/react';

export default class DefaultSelect extends React.PureComponent {
  render() {
    return (
      <div className="medium-6 columns">
        <Select defaultValue='Select Item Here' >
          <SelectOption value='test1' label='test1' />
          <SelectOption value='test2' label='test2' />
          <SelectOption value='test3' label='test3' />
          <SelectOption value='test4' label='test4' />
        </Select>
      </div>
    );
  }
}

**/

/**
* @name Multi-Select
* @description Selects can be used for multi-select
*
* @category controls
* @component select
* @section multi-select
*
* @js
import { SelectOption } from '@collab-ui/react';

export default class DefaultSelect extends React.PureComponent {
  render() {
    return (
      <div className="medium-6 columns">
        <Select isMulti defaultValue='Select Item Here' >
          <SelectOption value='test1' label='test1' />
          <SelectOption value='test2' label='test2' />
          <SelectOption value='test3' label='test3' />
          <SelectOption value='test4' label='test4' />
        </Select>
      </div>
    );
  }
}

**/

/**
* @name Disabled
* @description Selects can be disabled
*
* @category controls
* @component select
* @section disabled
*
* @js
import { SelectOption } from '@collab-ui/react';

export default class DisabledSelect extends React.PureComponent {
  render() {
    return (
      <div className="medium-6 columns">
        <Select defaultValue='Select Item Here' disabled>
          <SelectOption value='test1' label='test1' />
          <SelectOption value='test2' label='test2' />
          <SelectOption value='test3' label='test3' />
          <SelectOption value='test4' label='test4' />
        </Select>
      </div>
    );
  }
}

**/
