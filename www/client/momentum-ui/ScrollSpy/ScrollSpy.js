import PropTypes from 'prop-types';
import React from 'react';
import throttle from 'lodash/throttle';

class ScrollSpy extends React.Component {

  state = {
    inViewState: [],
    targetItems: [],
  }

  componentDidMount () {
    this.initFromProps();
    window.addEventListener('scroll', this.handleSpy);
  }

  componentWillReceiveProps () {
    this.initFromProps();
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleSpy);
  }

  initSpyTarget = (items) => {
    const targetItems = items.map((item) => {
      return document.getElementById(item);
    });

    return targetItems;
  }

  fillArray = (array, val) => {
    let newArray = [];

    for (let i = 0, max = array.length; i < max; i++) {
      newArray[i] = val;
    }

    return newArray;
  }

  isScrolled = () => {
    return this.getScrollDimension().scrollTop > 0;
  }

  getScrollDimension = () => {
    const doc = document;

    const scrollTop = doc.documentElement.scrollTop;
    const scrollHeight = doc.documentElement.scrollHeight;

    return {
      scrollTop,
      scrollHeight,
    };
  }

  getElemsViewState = (targets) => {
    let elemsInView = [];
    let elemsOutView = [];
    let viewStatusList = [];

    const targetItems = targets ? targets : this.state.targetItems;

    let hasInViewAlready = false;

    for (let i = 0, max = targetItems.length; i < max; i++) {
      let currentContent = targetItems[i];
      let isInView = hasInViewAlready ? false : this.isInView(currentContent);

      if (isInView) {
        hasInViewAlready = true;
        elemsInView.push(currentContent);
      } else {
        elemsOutView.push(currentContent);
      }

      const isLastItem = i === max - 1;
      const isScrolled = this.isScrolled();

      const isLastShortItemAtBottom = this.isAtBottom() && this.isInView(currentContent) && !isInView && isLastItem && isScrolled;

      if (isLastShortItemAtBottom) {
        elemsOutView.pop();
        elemsOutView.push(...elemsInView);
        elemsInView = [currentContent];
        viewStatusList = this.fillArray(viewStatusList, false);
        isInView = true;
      }
      viewStatusList.push(isInView);
    }

    return {
      inView: elemsInView,
      outView: elemsOutView,
      viewStatusList,
    };
  }

  isInView = (el) => {
    if (!el) {
      return false;
    }

    const { offset } = this.props;

    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight;
    const { scrollTop } = this.getScrollDimension();
    const scrollBottom = scrollTop + winH;
    const elTop = rect.top + scrollTop + offset;
    const elBottom = elTop + el.offsetHeight;

    return (elTop < scrollBottom) && (elBottom > scrollTop);
  }

  isAtBottom = () => {
    const { scrollTop, scrollHeight } = this.getScrollDimension();
    const winH = window.innerHeight;
    const scrolledToBottom = (scrollTop + winH) >= scrollHeight;

    return scrolledToBottom;
  }

  spy = (targets) => {
    const elemensViewState = this.getElemsViewState(targets);

    this.setState({
      inViewState: elemensViewState.viewStatusList,
    });
  }

  handleSpy = () => {
    let throttledFunc = throttle(this.spy, 100);
    throttledFunc();
  }

  initFromProps = () => {
    const targetItems = this.initSpyTarget(this.props.items);

    this.setState({
      targetItems,
    });

    this.spy(targetItems);
  }

  render () {
    const Tag = this.props.componentTag;
    const {
      activeClassName,
      children,
      className,
      defaultClassName,
      style
    } = this.props;
    const { inViewState } = this.state;
    let counter = 0;

    const items = React.Children.map(children, (child, idx) => {
      if (!child) {
        return null;
      }

      const ChildTag = child.type;

      return (
        <ChildTag
          {...child.props}
          className={
            `${child.props.className && `${child.props.className}` || ''}` +
            `${inViewState[idx] && ` ${activeClassName}` || ''}` +
            `${defaultClassName && ` ${defaultClassName}` || ''}`
          }
          key={counter++}
        >
          {child.props.children}
        </ChildTag>
      );
    });

    return (
      <Tag
        className={`${className && `${className}` || ''}`}
        style={style}
      >
        {items}
      </Tag>
    );
  }
}

ScrollSpy.propTypes = {
  /** @prop css class to show which link is active | '' */
  activeClassName: PropTypes.string.isRequired,
  /** @prop Optional html container tag for items instead of default ul | 'ul' */
  componentTag: PropTypes.string,
  /** @prop css class to apply to links that are not active | '' */
  defaultClassName: PropTypes.string.isRequired,
  /** @prop array of href links | []*/
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** @prop offset value to adjust viewport | 0 */
  offset: PropTypes.number,
  /** @prop style object passed to link container | {} */
  style: PropTypes.object,
};

ScrollSpy.defaultProps = {
  activeClassName: '',
  componentTag: 'ul',
  defaultClassName: '',
  items: [],
  offset: 0,
  style: {},
};

ScrollSpy.displayName = 'ScrollSpy';

export default ScrollSpy;
