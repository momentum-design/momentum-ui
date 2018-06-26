import React from 'react';
import PropTypes from 'prop-types';

/**
 * MenuContent is container component to display content in MenuOverlay
 * @component MenuContent
 * @variations collab-ui-react
 */

export default class MenuContent extends React.PureComponent {
  static displayName = 'MenuContent';

  render() {
    const { children, className } = this.props;


    return (
      <div
        className={
          'cui-menu-content' +
          `${(className && ` ${className}`) || ''}`
        }
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
