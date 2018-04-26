import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import IsVisible from '@collab-ui/react/IsVisible';

/**
 * Dropdown is component for rendering dropdown menu
 * @param props
 * @returns {XML}
 * @constructor
 */

export default class Dropdown extends React.Component {
  static displayName = 'Dropdown';

  state = {
    selected: [],
    isOpen: false
  };

  getChildContext = () => {
    return {
      isOpen: this.state.isOpen,
      selected: this.state.selected
    };
  };

  componentWillUpdate(nextProps, nextState) {
    if (this.state.isOpen === nextState.isOpen) {
      return;
    }

    if (nextState.isOpen) {
      window.addEventListener('click', this.handleClick);
    } else {
      window.removeEventListener('click', this.handleClick);
    }
  }

  toggleOpen = () => {
    const nextOpenState = !this.state.isOpen;

    this.setState({ isOpen: nextOpenState });
  };

  handleClick = (e, value) => {
    const node = ReactDOM.findDOMNode(this);
    const target = e.target;

    if (e.button === 2) {
      return e.stopPropagation();
    }

    const { selected } = this.state;
    const isActive = selected.includes(value);

    if (!node.contains(target) || target.nodeName === 'A') {
      this.setState({ isOpen: false });
    }

    if (isActive) return;

    if (isActive) {
      this.setState({ selected: selected.filter(v => v !== value) });
    } else if (!isActive) {
      this.setState({ selected: [value] });
    } else {
      this.setState({ selected: [...selected, value] });
    }
  };

  render() {
    const { children } = this.props;

    const { isOpen } = this.state;

    const renderChildren = () => {
      return React.Children.map(children, child => {

        if (child.props.type === 'button') {
          return React.cloneElement(child, {
            onClick: () => this.toggleOpen(),
            className: `top-bar__user cui-dropdown-toggle dropdown-toggle`
          });
        } else if (child.type.displayName === 'List') {
          return (
            <IsVisible isOpen={isOpen}>
              {
                React.cloneElement(child, {
                  className: `dropdown-menu`
                })
              }
            </IsVisible>
          );
        }

        return child;
      });
    };

    return (
      <div
        cui-dropdown="cui-dropdown"
        className={'cui-dropdown' + `${(isOpen && ' open') || ''}`}
      >
        {renderChildren()}
      </div>
    );
  }
}

Dropdown.childContextTypes = {
  /** Whether menu isOpen or not. */
  isOpen: PropTypes.bool,
  /** OnClick function for button. */
  onClick: PropTypes.func,
  /** Array/Object of Selected items. */
  selected: PropTypes.any
};

Dropdown.defaultProps = {
  onClick: null,
  selected: null,
  isOpen: false,
  children: null
};

Dropdown.propTypes = {
  /** Child component to display next to the input */
  children: PropTypes.node
};
