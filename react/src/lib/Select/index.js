/**
 * @category controls
 * @component time-picker
 * @variations collab-ui-react
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import List from '@collab-ui/react/List';
import Icon from '@collab-ui/react/Icon';
import Button from '@collab-ui/react/Button';
import EventOverlay from '@collab-ui/react/EventOverlay';
import _ from 'lodash';

export default class Select extends React.Component {
  static displayName = 'Select';

  state = {
    isOpen: false,
    selected: [],
    selectedIndex: [],
    anchorNode: null,
    anchorWidth: null,
    id: this.props.id || _.uniqueId('cui-select-'),
    visibleProp: 'bottom-center'
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

  handleSelect = (e, value, index) => {
    e.preventDefault();
    const { selected, selectedIndex } = this.state;
    const { isMulti } = this.props;
    const isActive = selected.includes(value);
    !isMulti && this.setState({ isOpen: false });
    if (isActive && !isMulti) return;

    if (isActive && isMulti) {
      return this.setState({
        selected: selected.filter(v => v !== value),
        selectedIndex: selectedIndex.filter(i => i !== index)
      });
    } else if (!isActive && !isMulti) {
      return this.setState({
        selected: [value],
        selectedIndex: [index]
      });
    } else {
      return this.setState({
        selected: [...selected, value],
        selectedIndex: [...selectedIndex, index]
      });
    }
  }

  choosePosition = () => {
    this.state.isOpen
      && this.isVisible(ReactDOM.findDOMNode(this.list), this.state.anchorNode);
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      anchorNode: ReactDOM.findDOMNode(this.clickTextField).parentNode
    }, () => this.choosePosition());
  };

  isVisible = (element, elementAnchor) => {
    let tempParentArr = [];
    const anchor = elementAnchor && elementAnchor.getBoundingClientRect();
    const elementBoundingRect = element.getBoundingClientRect();
    const elementParent = element.parentElement;
    const windowBottom = window.pageXOffset + window.innerHeight;
    const elementHeight = elementBoundingRect.height;
    const anchorWidth = anchor.width;
    const anchorBottom = anchor.bottom;
    const totalHeight = anchorBottom + elementHeight;

    const findParents = elem => {
      return !elem.parentElement
        ? tempParentArr
        : findParents(elem.parentElement, tempParentArr.push(elem));
    };

    const elementParents = findParents(elementParent);

    const findOverflow = node => {
      const searchProps = ['overflow', 'overflow-y'];

      return searchProps.reduce((agg, prop) => {
        let overflowElement = ReactDOM.findDOMNode(node).style[prop];

        return !overflowElement || agg.includes(overflowElement)
          ? agg
          : (agg += overflowElement);
      }, '');
    };

    const findScrollParent = () => {
      let overflowElement = null;
      let idx = 0;

      while (!overflowElement && elementParents[idx]) {
        if (/(auto|scroll)/.test(findOverflow(elementParents[idx]))) {
          return (overflowElement = elementParents[idx]);
        }
        idx++;
      }

      return overflowElement ? overflowElement : window;
    };

    const scrollParent = findScrollParent(element);
    const parentBottom =
      (!!scrollParent.getBoundingClientRect &&
        scrollParent.getBoundingClientRect().bottom) ||
      windowBottom;

    return (
      (totalHeight < parentBottom && totalHeight < windowBottom)
        ? this.setState({ visibleProp: 'bottom-center', anchorWidth })
        : this.setState({ visibleProp: 'top-center', anchorWidth })
    );
  };

  render() {
    const { children, className, isMulti, defaultValue, ...props } = this.props;
    const { selected, selectedIndex, isOpen, visibleProp, anchorNode, anchorWidth, id } = this.state;

    const currentValue = () => {
      if(!isMulti) return selected[0];

      if(selected.length === 1) {
        return `${selected.length} Item Selected`;
      } else if(selected.length) {
        return `${selected.length} Items Selected`;
      }
    };

    const label = (
      <div className='cui-select__label' id={`${id}__label`}>
        {currentValue() || defaultValue}
        <Icon name={`arrow-down_16`} isAria={false} />
      </div>
    );

    const text = (
      <Button
        name={id}
        id={id}
        label={label}
        onClick={this.handleToggle}
        ref={ref => this.clickTextField = ref}
        className={
          'cui-button--input' +
          `${className && ` ${className}` || ''}`
        }
        aria-haspopup='listbox'
        aria-labelledby={`${id}__label`}
        active={isOpen}
        {...props}
      />
    );

    const dropdownElement = (
      <EventOverlay
        allowClickAway
        anchorNode={anchorNode}
        close={this.hidePopover}
        isOpen={isOpen}
        direction={visibleProp}
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
  isMulti: PropTypes.bool,
  onSelect: PropTypes.func
};

Select.defaultProps = {
  className: '',
  children: null,
  defaultValue: '',
  id: null,
  isMulti: false,
  onSelect: null
};

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
