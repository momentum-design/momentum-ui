/** @component menu-item */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import mapContextToProps from 'react-context-toolbox/mapContextToProps';
import { UIDConsumer } from 'react-uid';
import { ListItem } from '@collab-ui/react';
import ListContext from '../ListContext';
import SelectableContext from '../SelectableContext';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectContext: {
        parentKeyDown: !props.isHeader ? this.handleKeyDown : null,
        parentOnSelect: !props.isHeader ? this.handleClick : null
      }
    };
  }

  handleClick = (e, opts) => {
    const { onClick, parentOnSelect } = this.props;
    const { eventKey, label, value } = opts;

    onClick && onClick(e, {value, label});
    parentOnSelect && parentOnSelect(e, { eventKey, element: this });
  }

  handleKeyDown = (e, opts) => {
    const { 
      onClick,
      parentKeyDown,
      parentOnSelect
    } = this.props;
    const { eventKey } = opts;

    if (
      e.which === 32
      || e.which === 13
      || e.charCode === 32
      || e.charCode === 13
    ) {
      onClick && onClick(e);
      parentOnSelect && parentOnSelect(e, { eventKey, element: this });
      e.preventDefault();
    } else {
      parentKeyDown && parentKeyDown(e, { eventKey, element: this });
    }
  }

  render () {
    const {
      children,
      className,
      isHeader,
      isOpen,
      ...props
    } = this.props;
    const { selectContext } = this.state;

    const otherProps = omit({...props}, [
      'keepMenuOpen',
      'onClick',
      'parentKeyDown',
      'parentOnSelect',
    ]);

    return (
      <UIDConsumer name={id => `cui-menu-item-${id}`}>
        {id => (
          <SelectableContext.Provider value={selectContext}>
            <ListContext.Consumer>
              {listContext => {
                const cxtActive = isOpen 
                  || listContext
                  && listContext.active 
                  && ReactDOM.findDOMNode(this.anchorRef)
                  && ReactDOM.findDOMNode(this.anchorRef).attributes['data-md-event-key']
                  && ReactDOM.findDOMNode(this.anchorRef).attributes['data-md-event-key'].value
                  && listContext.active.includes(
                    ReactDOM.findDOMNode(this.anchorRef)
                    .attributes['data-md-event-key']
                    .value
                  );

                return(
                  <div
                    className={
                      'cui-menu-item' +
                      `${(className && ` ${className}`) || ''}`
                    }
                    aria-expanded={cxtActive}
                    aria-haspopup={!!children}
                  >
                    <ListItem
                      active={cxtActive}
                      className={`${(isHeader && `cui-menu-item__header`) || ''}`}
                      focusOnLoad
                      isReadOnly={isHeader}
                      id={id}
                      ref={ref => this.anchorRef = ref}
                      role="menuitem"
                      {...otherProps}
                    >
                      {
                        children
                      }
                    </ListItem>
                  </div>
                );
              }}
            </ListContext.Consumer>
          </SelectableContext.Provider>
        )}
      </UIDConsumer>
    );
  }
}

MenuItem.propTypes = {
  /** @prop Children nodes to render inside MenuItem | null */
  children: PropTypes.node,
  /** @prop Optional css class name | '' */
  className: PropTypes.string,
  /** @prop Determines if MenuItem is the header | false */
  isHeader: PropTypes.bool,
  /** @prop Determines if MenuItem is open | false */
  isOpen: PropTypes.bool,
  /** @prop Set to keep the MenuItem open | false */
  keepMenuOpen: PropTypes.bool,
  /** @prop Callback function invoked when user taps on MenutItem | null */
  onClick: PropTypes.func,
  // Internal Context Use Only
  parentKeyDown: PropTypes.func,
  // Internal Context Use Only
  parentOnSelect: PropTypes.func,
};

MenuItem.defaultProps = {
  children: null,
  className: '',
  isHeader: false,
  isOpen: false,
  keepMenuOpen: false,
  onClick: null,
  parentKeyDown: null,
  parentOnSelect: null,
};

MenuItem.displayName = 'MenuItem';

export default mapContextToProps(
  SelectableContext,
  context => context,
  MenuItem
);