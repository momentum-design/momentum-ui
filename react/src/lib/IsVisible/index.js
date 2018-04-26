import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * IsVisible is component for determining if single child is visible on screen
 * @param props
 * @returns {XML}
 * @constructor
 */

export default class IsVisible extends React.Component {
  static displayName = 'IsVisible';

  state = { visibleClass: '' };

  getChildContext = () => {
    return {
      visibleClass: this.state.visibleClass
    };
  };

  componentDidUpdate(prevProps) {
    prevProps !== this.props
    && 
    this.chooseClass(this.props.isOpen);
  }

  isVisible = element => {
    let tempParentArr = [];
    const elementBoundingRect = element.getBoundingClientRect();
    const elementParent = element.parentElement;
    const windowBottom = window.pageXOffset + window.innerHeight;
    const elementTop =
      elementBoundingRect.top - 36 - elementBoundingRect.height;
    const elementBottom = elementBoundingRect.bottom;

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
    const parentTop =
      (!!scrollParent.getBoundingClientRect &&
        scrollParent.getBoundingClientRect().top) ||
      0;

    return (
      (elementBottom < windowBottom && elementBottom < parentBottom) ||
      (elementTop < 0 && elementTop < parentTop)
    );
  };

  chooseClass = (isOpen) => {
    return isOpen &&
      this.isVisible(ReactDOM.findDOMNode(this.dropdown))
      ? this.setState({
          visibleClass: 'bottom'
        })
      : this.setState({ visibleClass: 'top' });
  };

  render() {
    const { children } = this.props;

    return React.cloneElement(children, {
      ref: ref => (this.dropdown = ref)
    });
  }
}

IsVisible.childContextTypes = {
  /** Class to be applied to child element. */
  visibleClass: PropTypes.string
};

IsVisible.propTypes = {
    /** Open prop as to whether component is open */
  isOpen: PropTypes.bool.isRequired,
  /** Child component to display next to the input */
  children: PropTypes.element.isRequired
};
