/** @component select */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';
import find from 'lodash/find';
import uniqueId from 'lodash/uniqueId';
import {
  Button,
  EventOverlay,
  Icon,
  List,
 } from '@collab-ui/react';
import SelectContext from '../SelectContext';

class Select extends React.Component {

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

  handleSelect = (e, opts) => {
    e.preventDefault();
    const { selected, selectedIndex } = this.state;
    const { isMulti } = this.props;
    const { value, label, eventKey } = opts;
    const isActive = find(selected, {value, label});

    !isMulti && this.setState({ isOpen: false });

    if (isActive && !isMulti) return;

    if (isActive && isMulti) {
      return this.setState({
        selected: filter(selected, item =>
          !isEqual(item, {value, label})
        ),
        selectedIndex: selectedIndex.filter(i => i !== eventKey)
      });
    } else if (!isActive && !isMulti) {
      return this.setState({
        selected: [{value, label}],
        selectedIndex: [eventKey]
      });
    } else {
      return this.setState({
        selected: [...selected, {value, label}],
        selectedIndex: [...selectedIndex, eventKey]
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
      overlayProps,
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
        {...overlayProps}
      >
        <List
          onSelect={this.handleSelect}
          style={{ width: anchorWidth }}
          ref={ref => this.list = ref}
          role='listbox'
          itemRole='option'
          active={selectedIndex}
          aria-labelledby={`${id}__label`}
          aria-multiselectable={isMulti}
        >
          {children}
        </List>
      </EventOverlay>
    );

    return (
      <SelectContext.Provider value={isMulti}>
        <div className='cui-input-group cui-select'>
          {text}
          {dropdownElement}
        </div>
      </SelectContext.Provider>
    );
  }
}

Select.propTypes = {
  /** @prop Children nodes to render inside Select component | null */
  children: PropTypes.node,
  /** @prop Optional CSS class name | '' */
  className: PropTypes.string,
  /** @prop Set the default selected option | '' */
  defaultValue: PropTypes.string,
  /** @prop Set ID for Select Component | null */
  id: PropTypes.string,
  /** @prop Sets the Select EventOverlay to be dynamic | true */
  isDynamic: PropTypes.bool,
  /** @prop Optional prop to know if multiple Select children can be active | false */
  isMulti: PropTypes.bool,
  /** @prop Callback function invoked when user selects an item | null */
  onSelect: PropTypes.func,
  /** @prop Sets the EventOverlay props | null */
  overlayProps: PropTypes.shape({}),
};

Select.defaultProps = {
  children: null,
  className: '',
  defaultValue: '',
  id: null,
  isDynamic: true,
  isMulti: false,
  onSelect: null,
  overlayProps: null,
};

Select.displayName = 'Select';

export default Select;

/**
* @component select
* @section default
* @react
import { Select, SelectOption } from '@collab-ui/react';

export default class SelectDefault extends React.PureComponent {
  render() {
    return (
      <Select defaultValue='Select Item Here' >
        <SelectOption value='test1' label='test1' />
        <SelectOption value='test2' label='test2' />
        <SelectOption value='test3' label='test3' />
        <SelectOption value='test4' label='test4' />
      </Select>
    );
  }
}

**/

/**
* @component select
* @section multi-select
* @react
import { Select, SelectOption } from '@collab-ui/react';

export default class SelectMultiSelect extends React.PureComponent {
  render() {
    return (
      <Select isMulti defaultValue='Select Item Here' >
        <SelectOption value='test1' label='test1' />
        <SelectOption value='test2' label='test2' />
        <SelectOption value='test3' label='test3' />
        <SelectOption value='test4' label='test4' />
      </Select>
    );
  }
}

**/
