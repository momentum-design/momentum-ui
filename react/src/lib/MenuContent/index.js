import React from 'react';
import PropTypes from 'prop-types';

/**
 * MenuContent is container component to display content in MenuOverlay
 * @component MenuContent
 * @variations collab-ui-react
 */

class MenuContent extends React.PureComponent {
  static displayName = 'MenuContent';

  render() {
    const { children, className, ...props } = this.props;


    return (
      <div
        className={
          'cui-menu-content' +
          `${(className && ` ${className}`) || ''}`
        }
        {...props}
      >
        {children}
      </div>
    );
  }
}

MenuContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

MenuContent.defaultProps = {
  children: null,
  className: '',
};

export default MenuContent;
