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
  alt: PropTypes.string,
  backgroundColor: PropTypes.string,
  buttonClassName: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  failureBadge: PropTypes.bool,
  hasNotification: PropTypes.bool,
  hideDefaultTooltip: PropTypes.bool,
  icon: PropTypes.element,
  isDecrypting: PropTypes.bool,
  isOverview: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 18, 24, 28, 36, 40, 44, 52, 56, 72, 80, 84]),
  src: PropTypes.string,
  theme: PropTypes.string,
  title: PropTypes.string,
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
* @name Prop: onClick
*
* @category communication
* @component avatar
* @section click
*
* @js
*

 export default class AvatarClick extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <h3>
            <p><code className="small">{'onClick=()=>(console.log(Avatar clicked))'}</code></p>
            <p><code className="small">ariaLabel=(Click Avatar)</code></p>
          </h3>
          <Avatar
            onClick={()=>(console.log('Avatar clicked'))}
            ariaLabel='Click Avatar'
            title="Tom Smith"
          />

        </div>
      </div>
    );
  }
}
**/

/**
* @name Different sizes of avatar
*
* @category communication
* @component avatar
* @section default
*
* @js
*

 export default class AvatarDefault extends React.PureComponent {
  render() {
    return (
      <div className='row'>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(18)</code></p>
          </h3>
          <Avatar size={18} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(24)</code></p>
          </h3>
          <Avatar size={24} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(28)</code></p>
          </h3>
          <Avatar size={28} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(36)</code></p>
          </h3>
          <Avatar size={36} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(40)</code></p>
          </h3>
          <Avatar size={40} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(44)</code></p>
          </h3>
          <Avatar size={44} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(52)</code></p>
          </h3>
          <Avatar size={52} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(56)</code></p>
          </h3>
          <Avatar size={56} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(72)</code></p>
          </h3>
          <Avatar size={72} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(80)</code></p>
          </h3>
          <Avatar size={80} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(84)</code></p>
          </h3>
          <Avatar size={84} title="Tom Smith"/>
        </div>
      </div>
    );
  }
}
**/

/**
* @name Types of Avatar
*
* @category communication
* @component avatar
* @section types
*
* @js
*

 import AvatarImg from 'images/avatar-images/barbara.png';

 export default class AvatarTypes extends React.PureComponent {
  render() {
    return (
      <div className='row'>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(default)</code></p>
          </h3>
          <div><Avatar title="Tom Smith"/></div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(active)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="active"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(active)</code></p>
            <p><code className="small">src={AvatarImg}</code></p>
          </h3>
          <Avatar src={AvatarImg} title="Tom Smith" type="active"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(active)</code></p>
            <p><code className="small">theme=(dark)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="active" theme='dark'/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(dnd)</code></p>
          </h3>
          <div className="docs-example--baseline-flex">
            <Avatar title="Tom Smith" size={18} type="dnd"/>
            <Avatar title="Tom Smith" size={24} type="dnd"/>
            <Avatar title="Tom Smith" size={28} type="dnd"/>
            <Avatar title="Tom Smith" size={36} type="dnd"/>
            <Avatar title="Tom Smith" size={40} type="dnd"/>
            <Avatar title="Tom Smith" size={44} type="dnd"/>
            <Avatar title="Tom Smith" size={52} type="dnd"/>
            <Avatar title="Tom Smith" size={56} type="dnd"/>
            <Avatar title="Tom Smith" size={72} type="dnd"/>
            <Avatar title="Tom Smith" size={80} type="dnd"/>
            <Avatar title="Tom Smith" size={84} type="dnd"/>
          </div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(ooo)</code></p>
          </h3>
          <div className="docs-example--baseline-flex">
            <Avatar title="Tom Smith" size={18} type="ooo"/>
            <Avatar title="Tom Smith" size={24} type="ooo"/>
            <Avatar title="Tom Smith" size={28} type="ooo"/>
            <Avatar title="Tom Smith" size={36} type="ooo"/>
            <Avatar title="Tom Smith" size={40} type="ooo"/>
            <Avatar title="Tom Smith" size={44} type="ooo"/>
            <Avatar title="Tom Smith" size={52} type="ooo"/>
            <Avatar title="Tom Smith" size={56} type="ooo"/>
            <Avatar title="Tom Smith" size={72} type="ooo"/>
            <Avatar title="Tom Smith" size={80} type="ooo"/>
            <Avatar title="Tom Smith" size={84} type="ooo"/>
          </div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(group)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="group"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(bot)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="bot"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">hasNotification=(true)</code></p>
          </h3>
          <Avatar title="Tom Smith" hasNotification />
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">failureBadge=(true)</code></p>
          </h3>
          <Avatar title="Tom Smith" failureBadge />
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(self)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="self"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(typing)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="typing"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(inactive)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="inactive"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <div style={{ display: 'flex', flexFlow: 'row-nowrap' }}>
            <Avatar title="Tom Smith"/>
            <Avatar title="Tom Smith" type="active"/>
            <Avatar title="Tom Smith"/>
            <Avatar src={AvatarImg} title="Tom Smith" type="active"/>
            <Avatar title="Tom Smith" type="active"/>
          </div>
        </div>

      </div>
    );
  }
}
**/

/**
* @name Avatar with different contents
*
* @category communication
* @component avatar
* @section contents
*
* @js
*
 import { Icon } from '@collab-ui/react';
 import libraryIcon from '@collab-ui/core/docs/assets/react.png';

 export default class AvatarContents extends React.PureComponent {
  render() {
    return (
      <div className='row'>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">src=(libraryIcon)</code></p>
          </h3>
          <div><Avatar title="React" src={libraryIcon}/></div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">{'icon=(<Icon name="feedback_16"/>)'}</code></p>
          </h3>
          <div><Avatar title="Feedback" icon={<Icon name="feedback_16"/>}/></div>
        </div>

      </div>
    );
  }
}
**/

/**
* @name Composite avatars
*
* @category communication
* @component avatar
* @section composite
*
* @js
*
 import { CompositeAvatar } from '@collab-ui/react';

 export default class CompositeAvatarExample extends React.PureComponent {
  render() {
    return (
      <div className='row'>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(28)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={28}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(40)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={40}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(84)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={84}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(135)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={135}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>

      </div>
    );
  }
}
**/


