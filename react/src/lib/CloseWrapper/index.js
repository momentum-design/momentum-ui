/** @component close-wrapper */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@momentum-ui/react';

class CloseWrapper extends React.PureComponent {
  render() {
    const {
      ariaLabel,
      children,
      className,
      actionNode,
      iconProps,
      onClick,
      ...otherProps
    } = this.props;

    const cloneChildren = () => (
      React.Children.map(children, child =>
        React.cloneElement(child, { ...otherProps})
      )
    );

    const getInteractionNode = () => (
      actionNode
      ? actionNode
      : (
          <Icon
            ariaLabel={ariaLabel}
            buttonClassName='md-close-wrapper__action'
            name='clear-active_20'
            onClick={onClick}
            {...iconProps}
          />
        )
    );

    return (
      <span
        className={
          `md-close-wrapper` +
          `${(className && ` ${className}`) || ''}`
          }
      >
        {cloneChildren()}
        {getInteractionNode()}
      </span>
    );
  }
}

CloseWrapper.defaultProps = {
  ariaLabel: 'Close',
  children: null,
  className: '',
  actionNode: null,
  onClick: null,
  iconProps: null,
};

CloseWrapper.propTypes = {
  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: PropTypes.string,
  /** @prop Children Nodes to Render inside CloseWrapper | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Node to replace default close icon | null */
  actionNode: PropTypes.node,
  /** @prop Handler when the user clicks the close icon button | () => {} */
  onClick: PropTypes.func,
  /** @prop Optional props to pass to Icon | null */
  iconProps: PropTypes.object,
};

CloseWrapper.displayName = 'CloseWrapper';

export default CloseWrapper;
