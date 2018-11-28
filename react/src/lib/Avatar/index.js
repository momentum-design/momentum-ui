import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Loading,
  Icon,
} from '@collab-ui/react';

class Avatar extends React.Component {
  static displayName = 'Avatar';

  state = {
    isImageLoaded: false,
    isImageErrored: false
  };

  componentDidMount() {
    const img = this.image;
    if (img && img.complete) {
      this.handleImgLoaded();
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.src !== this.props.src){
      this.handleImgChange();
    }
  }

  handleImgChange = () => {
    this.setState({
      isImageLoaded: false,
      isImageErrored: false
    });
  }

  handleImgError = () => {
    this.setState({
      isImageErrored: true
    });
  }

  handleImgLoaded = () => {
    this.setState({
      isImageLoaded: true
    });
  }

  render() {
    const {
      alt,
      backgroundColor,
      buttonClassName,
      className,
      color,
      failureBadge,
      hasNotification,
      hideDefaultTooltip,
      icon,
      isDecrypting,
      isOverview,
      onClick,
      size,
      src,
      theme,
      title,
      type,
      ...otherProps
    } = this.props;
    const {
      isImageLoaded,
      isImageErrored
    } = this.state;

    const getInitials = () => {
      if (!title.replace(/\s/g, '').length) return '';
      let letters = [];
      const words = title.trim().split(/ +/);
      const repeatTimes = Math.min(type === 'group' && 1 || 2, words.length);
      for (let i = 0; i < repeatTimes; i++) {
        letters.push(String.fromCodePoint(words[i].codePointAt(0)));
      }
      return letters.join('');
    };

    const getIcon = () => {
      if (icon.type.displayName === 'Icon') {
        return (
          <span
            className={
              'cui-avatar__icon' +
              `${isOverview ? ' cui-avatar__icon--overview' : ''}`
            }
            style={{ backgroundColor, color }}
          >
            {icon}
          </span>
        );
      }
      throw new Error('Icon prop should be a component of type Icon');
    };

    const getLetter = () => {
      return (
        <span
          key='letter'
          className={
            'cui-avatar__letter' +
            `${(isDecrypting && ` cui-decrypting`) || ''}` +
            `${(isImageLoaded && ` cui-avatar__img--hidden`) || ''}`
            }
          style={{ backgroundColor, color }}
        >
          {getInitials()}
        </span>
      );
    };

    const getChildren = () => {
      if(type === 'self') {
        return (
          <span
            key='self'
            className='cui-avatar__self'
            style={{ backgroundColor, color }}
          >
            <Icon name={size === 40 || size === 'medium' ? 'chat-active_18' : 'chat-active_16'} />
          </span>
        );
      } else if (src && !isImageErrored) {
      // image src is present and image has not yet errored
        const imgChildren = [];
         // image is not loaded and title is provided
        if (title && !isImageLoaded) {
          imgChildren.push(getLetter());
        }
        imgChildren.push(
          <img
            alt={alt}
            className={
              `cui-avatar__img` +
              `${(!isImageLoaded && ` cui-avatar__img--hidden`) || ''}`
            }
            draggable={false}
            key={`image-${imgChildren.length}`}
            onError={this.handleImgError}
            onLoad={this.handleImgLoaded}
            src={src}
            ref={ref => this.image = ref}
          />
        );
        return imgChildren;
      } else if (icon) {
        return getIcon();
      } else if (title) {
        return getLetter();
      }
    };

    const getAvatar = () => (
      <div
        className={
          'cui-avatar' +
          `${(onClick && ` cui-avatar--clickable`) || ''}` +
          `${(type && ` cui-avatar--${type}`) || ''}` +
          `${(size && ` cui-avatar--${size}`) || ''}` +
          `${(theme && ` cui-avatar--${theme}`) || ''}` +
          `${(isDecrypting && ` cui-decrypting`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        title={!hideDefaultTooltip ? title : ''}
        {...!onClick && {...otherProps}}
      >
        {getChildren()}
        {type === 'typing' && <Loading/>}
        {failureBadge && <span className='cui-avatar__failure-badge' />}
        {hasNotification && <span className='cui-avatar__notification-badge' />}
      </div>
    );

    return (
      onClick
      ?
      <Button
        className={buttonClassName}
        circle
        onClick={onClick}
        removeStyle
        {...otherProps}
      >
        {getAvatar()}
      </Button>
      : getAvatar()
    );
  }
}

Avatar.propTypes = {
  /** @prop Image alt tag | '' */
  alt: PropTypes.string,
  /** @prop Set Avatar background color | '' */
  backgroundColor: PropTypes.string,
  /** @prop Optional css class string for button | '' */
  buttonClassName: PropTypes.string,
  /** @prop Optional css class string for Avatar component | null */
  className: PropTypes.string,
  /** @prop Set Avatar text color | '' */
  color: PropTypes.string,
  /** @prop Set existance of a failureBadge on the Avatar | false */
  failureBadge: PropTypes.bool,
  /** @prop Set existance of a notification on the Avatar | false */
  hasNotification: PropTypes.bool,
  /** @prop Set the visibility of Avatar's default tooltip | false */
  hideDefaultTooltip: PropTypes.bool,
  /** @prop Optional icon component for the Avatar | null */
  icon: PropTypes.element,
  /** @prop Set if Avatar's content is decrypting | false */
  isDecrypting: PropTypes.bool,
  /** @prop Set existance of Avatar's Overview | false */
  isOverview: PropTypes.bool,
  /** @prop Handler to be called when the user taps the Avatar | null */
  onClick: PropTypes.func,
  /** @prop Set the size of the Avatar from one of the preconfigured options | 'medium' */
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 18, 24, 28, 36, 40, 44, 52, 56, 72, 80, 84]),
  /** @prop Optional image source for the Avatar | null */
  src: PropTypes.string,
  /** @prop Optional Avatar color theme | null */
  theme: PropTypes.string,
  /** @prop set Avatar title / user's name | null */
  title: PropTypes.string,
  /** @prop optional Avatar type | '' */
  type: PropTypes.oneOf(['', 'active', 'inactive', 'dnd', 'ooo', 'group', 'typing', 'bot', 'self']),
};

Avatar.defaultProps = {
  alt: '',
  backgroundColor: '',
  buttonClassName: '',
  className: null,
  color: '',
  failureBadge: false,
  hasNotification: false,
  hideDefaultTooltip: false,
  icon: null,
  isDecrypting: false,
  isOverview: false,
  onClick: null,
  size: 'medium',
  src: null,
  theme: null,
  title: null,
  type: '',
};

export default Avatar;

/**
* @component avatar
* @section default
* @react

import { Avatar } from '@collab-ui/react';

 export default class AvatarDefault extends React.PureComponent {
  render() {
    return (
      <Avatar title="Tom Smith"/>
    );
  }
}
**/

/**
* @component avatar
* @section active
* @react

import { Avatar } from '@collab-ui/react';

 export default class AvatarActive extends React.PureComponent {
  render() {
    return (
      <Avatar title="Tom Smith" type="active"/>
    );
  }
}
**/

/**
* @component avatar
* @section inactive
* @react

import { Avatar } from '@collab-ui/react';

 export default class AvatarInactive extends React.PureComponent {
  render() {
    return (
      <Avatar title="Tom Smith" type="inactive" />
    );
  }
}
**/

/**
* @component avatar
* @section self
* @react

import { Avatar } from '@collab-ui/react';

 export default class AvatarSelf extends React.PureComponent {
  render() {
    return (
      <Avatar title="Tom Smith" type="self"/>
    );
  }
}
**/

/**
* @component avatar
* @section status
* @react

import { Avatar } from '@collab-ui/react';

 export default class AvatarStatus extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <Avatar title="Tom Smith" size={36} type="dnd" />
        </div>

        <div className="docs-example docs-example--spacing">
          <Avatar title="Tom Smith" size={36} type="ooo" />
        </div>
      </div>
    );
  }
}
**/

/**
* @component avatar
* @section group
* @react

import { Avatar } from '@collab-ui/react';

 export default class AvatarGroup extends React.PureComponent {
  render() {
    return (
      <Avatar title="Tom Smith" type="group"/>
    );
  }
}
**/

/**
* @component avatar
* @section bot
* @react

import { Avatar } from '@collab-ui/react';

 export default class AvatarBot extends React.PureComponent {
  render() {
    return (
      <Avatar title="Tom Smith" type="bot" />
    );
  }
}
**/

/**
* @component avatar
* @section notification
* @react

import { Avatar } from '@collab-ui/react';

 export default class AvatarNotification extends React.PureComponent {
  render() {
    return (
      <Avatar title="Tom Smith" hasNotification />
    );
  }
}
**/

/**
* @component avatar
* @section failure
* @react

import { Avatar } from '@collab-ui/react';

 export default class AvatarFailure extends React.PureComponent {
  render() {
    return (
      <Avatar title="Tom Smith" failureBadge />
    );
  }
}
**/

/**
* @component avatar
* @section typing
* @react

import { Avatar } from '@collab-ui/react';

 export default class AvatarTyping extends React.PureComponent {
  render() {
    return (
      <Avatar title="Tom Smith" type="typing"/>
    );
  }
}
**/

/**
* @component avatar
* @section composite
*
* @react
*
import { Avatar } from '@collab-ui/react';

 export default class AvatarComposite extends React.PureComponent {
  render() {
    return (
      <CompositeAvatar size={40}>
        <Avatar title="Tom Smith"/>
        <Avatar title="John William"/>
      </CompositeAvatar>
    );
  }
}
**/