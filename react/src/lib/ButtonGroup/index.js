import React from 'react';
import PropTypes from 'prop-types';

class ButtonGroup extends React.Component {
  static displayName = 'ButtonGroup';

  static childContextTypes = {
    handleClick: PropTypes.func,
    handleKeyDown: PropTypes.func,
    focusIndex: PropTypes.number,
    focusOnLoad: PropTypes.bool,
  };

  state = {
    activeIndex: this.props.activeIndex,
    focusIndex: 0,
  };

  getChildContext = () => {
    return {
      handleClick: (event, index) => this.handleClick(event, index),
      handleKeyDown: (event, index) => this.handleKeyDown(event, index),
      focusIndex: this.state.focusIndex,
      focusOnLoad: this.props.focusOnLoad,
    };
  };

  componentWillMount () {
    if(!this.verifyChildren()) {
      throw new Error('ButtonGroup should only contain Buttons as children.');
    }
  }

  componentDidMount() {
    const { focusIndex, activeIndex } = this.state;
    const initialFocus = this.getNewIndex(focusIndex - 1 , 1);
    this.setFocusIndex(initialFocus);
    (activeIndex !== null) && this.determineInitialActive();
  }

  verifyChildren = () => {
    const { children } = this.props;
    const status = React.Children.toArray(children).reduce((status, child) => {
      return status && child.type.displayName === 'Button';
    }, true);
    return status;
  };

  determineInitialActive = () => {
    /* eslint-disable no-console */
    const { activeIndex, children } = this.state;
    if(activeIndex < 0 && activeIndex > children.length - 1) {
      console.warn('[@collab-ui/react] ButtonGroup: activeIndex is out of bound');
      return;
    }
    const initialActive = this.getNewIndex(activeIndex - 1 , 1);
    this.setActiveIndex(initialActive);
    /* eslint-enable no-console */
  };

  setFocusIndex = index => {
    const { focusIndex } = this.state;
    return (
      focusIndex !== index
      && this.setState({ focusIndex: index })
    );
  };

  setActiveIndex = index => {
    const { activeIndex } = this.state;
    return (
      activeIndex !== index
      && this.setState({ activeIndex: index })
    );
  };

  handleClick = (event, index) => {
    const { onSelect } = this.props;
    this.setFocusIndex(index);
    this.setActiveIndex(index);
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

  getIncludesFirstCharacter = (str, char) =>
    str
      .charAt(0)
      .toLowerCase()
      .includes(char);

  setFocusByFirstCharacter = (char, currentIdx) => {
    const { children } = this.props;
    const length = children.length - 1;

    const newIndex = React.Children
      .toArray(children)
      .reduce((agg, child, idx, arr) => {

        const index = currentIdx + idx + 1 > length
          ? Math.abs(currentIdx + idx - length)
          : currentIdx + idx + 1;

        const label = typeof arr[index].props.children === 'string'
          ? arr[index].props.children
          : '';

        return (
          !agg.length
          && !arr[index].props.disabled
          && !arr[index].props.isReadOnly
          && this.getIncludesFirstCharacter(label, char)
        )
          ? agg.concat(index)
          : agg;
      },
      []
    );

    !isNaN(newIndex[0]) && this.setFocusIndex(newIndex[0]);
  };

  handleKeyDown = (e, idx) => {

    let newIndex;
    let flag = false;
    const char = e.key;

    const isPrintableCharacter = str => {
      return str.length === 1 && str.match(/\S/);
    };

    switch (e.which) {
      case 38:
      case 37:
        newIndex = this.getNewIndex(idx, -1);
        this.setFocusIndex(newIndex);
        flag = true;
        break;

      case 39:
      case 40:
        newIndex = this.getNewIndex(idx, 1);
        this.setFocusIndex(newIndex);
        flag = true;
        break;
      default:
        if (isPrintableCharacter(char)) {
          this.setFocusByFirstCharacter(char, idx);
          flag = true;
        }
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  render() {
    const { children, ariaLabel, className, theme, highlightSelected, justified } = this.props;
    const { activeIndex } = this.state;

    const setButtons = () =>
      React.Children.map(children, (child, idx) => {
        return React.cloneElement(child, {
          active: highlightSelected && activeIndex === idx,
          index: idx,
          className: child.props.children.type && child.props.children.type.displayName === 'Icon'
            ? 'cui-button--icon-group'
            : '',
        });
      });

    return (
      <div
        className={
          'cui-button-group' +
          `${(theme && ` cui-button-group--${theme}`) || ''}` +
          `${(justified && ` cui-button-group--justified`) || ''}` +
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
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['', 'dark']), // change to theme, add type
  highlightSelected: PropTypes.bool,
  justified: PropTypes.bool,
  activeIndex: PropTypes.number,
  focusOnLoad: PropTypes.bool,
};

ButtonGroup.defaultProps = {
  children: null,
  onSelect: null,
  ariaLabel: '',
  className: '',
  theme: '',
  highlightSelected: true,
  justified: true,
  activeIndex: null,
  focusOnLoad: false,
};

export default ButtonGroup;

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
    <div className='columns large'>
      <ButtonGroup>
        <Button ariaLabel='1'>one</Button>
        <Button ariaLabel='2' disabled>two</Button>
        <Button ariaLabel='3'>three</Button>
      </ButtonGroup>
    </div>
    );
  }
}
**/

/**
* @name Button Groups used in SpaceList
*
* @category containers
* @component button-group
* @section dark
*
* @js
*
 import { Button } from '@collab-ui/react';

 export default class SpaceListButtonGroup extends React.PureComponent {

  render() {
    return(
    <div className='columns large' style={{background: 'black', padding: '20px'}}>
      <ButtonGroup theme="dark">
        <Button ariaLabel='Spaces'>Spaces</Button>
        <Button ariaLabel='Messages'>Messages</Button>
      </ButtonGroup>
    </div>
    );
  }
}
**/

/**
* @name Button Groups with highlightSelected=false
*
* @category containers
* @component button-group
* @section highlightSelected
*
* @js
*
 import { Button, Icon } from '@collab-ui/react';

 export default class CalendarButtonGroup extends React.PureComponent {

  render() {
    return(
    <div className='columns small-3'>
      <ButtonGroup justified={false} highlightSelected={false}>
        <Button ariaLabel='Left'><Icon name='icon-arrow-left_12' /></Button>
        <Button ariaLabel='Today'>Today</Button>
        <Button ariaLabel='Right'><Icon name='icon-arrow-right_12' /></Button>
      </ButtonGroup>
    </div>
    );
  }
}
**/

/**
* @name Icons within Button Group
*
* @category containers
* @component button-group
* @section icons
*
* @js
*
 import { Button, Icon } from '@collab-ui/react';

 export default class IconButtonGroup extends React.PureComponent {

  render() {
    return(
    <div className='columns small-3'>
      <ButtonGroup>
        <Button ariaLabel='left'><Icon name='icon-arrow-left_12' /></Button>
        <Button ariaLabel='right'><Icon name='icon-arrow-right_12' /></Button>
      </ButtonGroup>
    </div>
    );
  }
}
**/

/**
* @name Button Groups with justified false
*
* @category containers
* @component button-group
* @section justified
*
* @js
*
 import { Button } from '@collab-ui/react';

 export default class NonJustifiedButtonGroup extends React.PureComponent {

  render() {
    return(
    <div className='columns large'>
      <ButtonGroup justified={false}>
        <Button ariaLabel='1'>one</Button>
        <Button ariaLabel='2' disabled>two</Button>
        <Button ariaLabel='3'>three</Button>
      </ButtonGroup>
    </div>
    );
  }
}
**/
