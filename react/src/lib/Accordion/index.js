/**@component accordion */

import React from 'react';
import PropTypes from 'prop-types';

class Accordion extends React.Component {
  static displayName = 'Accordion';

  state = {
    activeIndices: this.props.initialActive || [],
    focusIndicies: this.props.initialActiveFocus,
    focus: false,
  };

  componentDidMount() {
    if (!this.verifyChildren()) {
      throw new Error('Accordion should contain one or more AccordionGroup as children.');
    }

    this.determineInitialFocus();
  }

  verifyChildren = () => {
    const { children } = this.props;
    const childrenArr = React.Children.toArray(children);

    const status = childrenArr.reduce((status, child) => {
      return status && child.type.displayName === 'AccordionGroup';
    }, true);

    return children && childrenArr.length && status;
  };

  determineInitialFocus = () => {
    const nonDisabledIndex = React.Children.toArray(this.props.children).reduceRight(
      (agg, child, idx) => {
        return !child.props.disabled ? idx : agg;
      },
      null
    );

    this.setFocus(nonDisabledIndex);
  };

  handleClick = index => {
    return this.props.multipleVisible ? this.setMultiple(index) : this.setSelected(index);
  };

  setMultiple = index => {
    let newValues;
    const { onSelect } = this.props;
    const { activeIndices, focusIndicies } = this.state;
    const isActive = activeIndices.includes(index);

    if (isActive) {
      newValues = activeIndices.filter(v => v !== index);
    } else {
      newValues = activeIndices.concat(index);
    }

    if (focusIndicies) {
      this.setFocus(index);
    }

    this.setState(() => {
      onSelect && onSelect(newValues);
      return { activeIndices: newValues };
    });
  };

  setSelected = index => {
    const { activeIndices } = this.state;
    const { children, onSelect } = this.props;
    // Don't do anything if index is the same or outside of the bounds
    if (activeIndices.includes(index) || index < 0 || index >= children.length) return;

    // Keep reference to last index for event handler
    const last = activeIndices[0];

    // Update state with selected index
    this.setState(() => ({ activeIndices: [index] }));
    this.setFocus(index);

    onSelect && onSelect(index, last);
  };

  handleKeyPress = (e, idx, length, disabled) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    let newIndex, clickEvent;
    const tgt = e.currentTarget;
    let flag = false;

    const getNewIndex = (currentIndex, change) => {
      const getPossibleIndex = () => {
        if (currentIndex + change < 0) {
          return length;
        } else if (currentIndex + change > length) {
          return 0;
        }

        return currentIndex + change;
      };
      const possibleIndex = getPossibleIndex();
      return React.Children.toArray(this.props.children)[possibleIndex].props.disabled
        ? getNewIndex(possibleIndex, change)
        : possibleIndex;
    };

    switch (e.which) {
      case 32:
      case 13:
        try {
          clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
          });
        } catch (err) {
          if (document.createEvent) {
            // DOM Level 3 for IE 9+
            clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('click', true, true);
          }
        }
        tgt.dispatchEvent(clickEvent);

        flag = true;
        break;

      case 38:
      case 37:
        newIndex = getNewIndex(idx, -1);
        this.setFocus(newIndex);
        flag = true;
        break;

      case 39:
      case 40:
        newIndex = getNewIndex(idx, 1);
        this.setFocus(newIndex);
        flag = true;
        break;

      case 33:
      case 36:
        this.setFocus(0);
        flag = true;
        break;

      case 34:
      case 35:
        this.setFocus(length);
        flag = true;
        break;
      default:
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  setFocus = index => {
    this.setState({ focus: index });
  };

  render() {
    const { children, className, showSeparator } = this.props;

    const { activeIndices } = this.state;

    const setAccordionGroups = React.Children.map(children, (child, idx) => {
      return React.cloneElement(child, {
        isExpanded: !child.props.disabled && activeIndices.includes(idx),
        onClick: () => this.handleClick(idx),
        onKeyDown: e => this.handleKeyPress(e, idx, children.length - 1, child.props.disabled),
        focus: this.state.focus === idx,
        showSeparator,
      });
    });

    return (
      <div className={'md-accordion' + `${(className && ` ${className}`) || ''}`}>
        {setAccordionGroups}
      </div>
    );
  }
}

Accordion.propTypes = {
  /** @prop Children nodes to render inside Accordion | null */
  children: PropTypes.node,
  /** @prop Set to allow expansion of multiple AccordionGroups | false */
  multipleVisible: PropTypes.bool,
  /** @prop Handler to be called when the user selects Accordion | null */
  onSelect: PropTypes.func,
  /** @prop An array of indexes that are preselected | [] */
  initialActive: PropTypes.array,
  /** @prop Optional css class string | '' */
  initialActiveFocus: PropTypes.bool,
  /** @prop Set to disallow focus upon opening Accordion on load | true */
  className: PropTypes.string,
  /** @prop Optional underline under Accordion menu item | false  */
  showSeparator: PropTypes.bool,
};

Accordion.defaultProps = {
  children: null,
  multipleVisible: false,
  onSelect: null,
  initialActive: [],
  initialActiveFocus: true,
  className: '',
  showSeparator: false,
};

export default Accordion;
