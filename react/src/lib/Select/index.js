/** @component select */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';
import find from 'lodash/find';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import {
  Button,
  EventOverlay,
  Icon,
  List,
 } from '@momentum-ui/react';
import SelectContext from '../SelectContext';

class Select extends React.Component {
  state = {
    isOpen: false,
    selected: [],
    selectedIndex: [],
    anchorNode: null,
    anchorWidth: null,
    id: this.props.id || uniqueId('md-select-')
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
      buttonProps,
      children,
      className,
      defaultValue,
      isDynamic,
      isMulti,
      listProps,
      overlayProps,
      ...props
    } = this.props;

    const {
      anchorNode,
      anchorWidth,
      id,
      isOpen,
      selected,
      selectedIndex,
    } = this.state;

    const otherProps = omit({...props}, [
      'id',
      'onSelect'
    ]);

    const currentValue = () => {
      if(!isMulti && selected.length) return selected[0].label;

      if(selected.length === 1) {
        return `${selected.length} Item Selected`;
      } else if(selected.length) {
        return `${selected.length} Items Selected`;
      }
    };

    const label = (
      <div className='md-select__label' id={`${id}__label`}>
        {currentValue() || defaultValue}
        <Icon name={`arrow-down_16`} />
      </div>
    );

    const text = (
      <Button
        active={isOpen}
        ariaLabelledBy={`${id}__label`}
        aria-haspopup='listbox'
        id={id}
        name={id}
        onClick={this.handleToggle}
        ref={ref => this.clickTextField = ref}
        {...buttonProps}
      >
        {label}
      </Button>
    );

    const dropdownElement = (
      isOpen &&
      <EventOverlay
        allowClickAway
        anchorNode={anchorNode}
        close={this.hidePopover}
        isDynamic={isDynamic}
        isOpen={isOpen}
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
          {...listProps}
        >
          {children}
        </List>
      </EventOverlay>
    );

    return (
      <SelectContext.Provider value={isMulti}>
        <div 
          className={
            'md-input-group md-select' +
            `${className && ` ${className}` || ''}`
          }
          {...otherProps}
        >
          {text}
          {dropdownElement}
        </div>
      </SelectContext.Provider>
    );
  }
}

Select.propTypes = {
  /** @prop Sets the Button props | null */
  buttonProps: PropTypes.shape({}),
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
  /** @prop Sets the List props | null */
  listProps: PropTypes.shape({}),
  /** @prop Callback function invoked when user selects an item | null */
  onSelect: PropTypes.func,
  /** @prop Sets the EventOverlay props | null */
  overlayProps: PropTypes.shape({}),
};

Select.defaultProps = {
  buttonProps: null,
  children: null,
  className: '',
  defaultValue: '',
  id: null,
  isDynamic: true,
  isMulti: false,
  listProps: null,
  onSelect: null,
  overlayProps: null,
};

Select.displayName = 'Select';

export default Select;
