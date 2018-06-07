import React from 'react';
import PropTypes from 'prop-types';

export default class ButtonGroup extends React.Component {
  static displayName = 'ButtonGroup';

  state = {
    activeIndex: 0,
    focusIndex: this.props.focus,
  };

  static childContextTypes = {
    handleClick: PropTypes.func,
    handleKeyDown: PropTypes.func,
    focusIndex: PropTypes.number,
  };

  getChildContext = () => {
    return {
      handleClick: (event, index) => this.handleClick(event, index),
      handleKeyDown: (event, index) => this.handleKeyDown(event, index),
      focusIndex: this.state.focusIndex,
    };
  };

  componentWillMount () {

    const verify = () => {
      const { children } = this.props;
      const status = React.Children.toArray(children).reduce((status, child) => {
        return status && child.type.displayName === 'Button';
      }, true);

      return status;
    };

    if(!verify()) {
      throw new Error('ButtonGroup should only contain Buttons as children.');
    }
  }

  componentDidMount() {
    const { focusIndex } = this.state;
    const initialFocus = this.getNewIndex(focusIndex - 1, 1);
    this.setFocus(initialFocus);
  }

  setFocus = index => {
    return this.setState({ focusIndex: index });
  };

  handleClick = (event, index) => {
    const { onSelect } = this.props;
    this.setFocus(index);
    this.setState({ activeIndex: index });
    onSelect && onSelect(event, index);
  };

  getNewIndex = (currentIndex, change) => {
    const { children } = this.props;
    const length = children.length - 1;

    const getPossibleIndex = () => {
      if (currentIndex + change < 0) {
        return length;
      } else if (currentIndex + change > length) {
        return 0;
      }

      return currentIndex + change;
    };

    const possibleIndex = getPossibleIndex();
    const potentialTarget = React.Children.toArray(children)[possibleIndex];

    return potentialTarget.props.disabled
      ? this.getNewIndex(possibleIndex, change)
      : possibleIndex;
  };

  handleKeyDown = (e, idx) => {

    let newIndex, clickEvent;
    const tgt = e.currentTarget;
    let flag = false;

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
        newIndex = this.getNewIndex(idx, -1);
        this.setFocus(newIndex);
        flag = true;
        break;

      case 39:
      case 40:
        newIndex = this.getNewIndex(idx, 1);
        this.setFocus(newIndex);
        flag = true;
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  render() {
    const { children, ariaLabel, className } = this.props;
    const { activeIndex } = this.state;

    const setButtons = () =>
      React.Children.map(children, (child, idx) => {
        return React.cloneElement(child, {
          active: activeIndex === idx,
          index: idx,
        });
      });

    return (
      <div
        className={
          'cui-button-group' +
          `${(className && ` ${className}`) || ''}`
        }
        role="group"
        aria-label={ariaLabel}
      >
        {setButtons()}
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
  onSelect: PropTypes.func,
  focus: PropTypes.number,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};

ButtonGroup.defaultProps = {
  children: null,
  onSelect: null,
  focus: 0,
  ariaLabel: '',
  className: '',
};

/**
* @name Default Button Group
*
* @category containers
* @component button-group
* @section default
*
* @js
*
 import { Button } from '@collab-ui/react';

 export default class DefaultButtonGroup extends React.PureComponent {

  render() {
    return(
      <ButtonGroup>
        <Button>one</Button>
        <Button disabled>two</Button>
        <Button>three</Button>
      </ButtonGroup>
    );
  }
}
**/
