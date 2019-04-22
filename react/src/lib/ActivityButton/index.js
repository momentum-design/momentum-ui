/** @component activity-button */

import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, Icon } from '@momentum-ui/react';

const ActivityButton = props => {
  const {
    ariaLabel,
    className,
    disabled,
    onClick,
    size,
    type,
    ...otherHTMLProps
  } = props;

  let icon = type.icon;
  if (!icon) {
    const buttonToIconSizeMapping = {
      56: '24',
      68: '28',
      84: '36'
    };
    icon = <Icon name={`${type}_${buttonToIconSizeMapping[size]}`} />;
  }

  return (
    <Button
      ariaLabel={ariaLabel || (!type.icon && type) || ''}
      circle
      className={
        'md-activity' +
        `${!type.icon && ` md-activity__${type}` || ''}` +
        `${(className && ` ${className}`) || ''}`
      }
      color={get(type, 'color')}
      containerLarge={size >= 84}
      disabled={disabled}
      onClick={onClick}
      size={size}
      {...otherHTMLProps}
    >
      {icon}
    </Button>
  );
};

ActivityButton.displayName = 'ActivityButton';

ActivityButton.propTypes = {
  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: PropTypes.string,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets the attribute disabled to the button | false */
  disabled: PropTypes.bool,
  /** @prop Handler to be called when the user taps the button | null */
  onClick: PropTypes.func,
  /** @prop Sets the button's size | '' */
  size: PropTypes.oneOf([56, 68, 84]),
  /** @prop Sets the button's activity type */
  type: PropTypes.oneOfType([
    PropTypes.oneOf(['chat', 'camera', 'contact-card', 'meetings', 'whiteboard', 'files', 'share-screen', 'tasks']),
    PropTypes.shape({
      color: PropTypes.string,
      icon: PropTypes.element.isRequired,
    })
  ]).isRequired,
};

ActivityButton.defaultProps = {
  ariaLabel: '',
  className: '',
  disabled: false,
  size: 68,
  onClick: null,
  type: '',
};

export default ActivityButton;
