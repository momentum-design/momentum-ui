import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Icon } from '@collab-ui/react';

class Avatar extends React.Component {
  static displayName = 'Avatar';

  state = {
    isImageLoaded: false,
    isImageErrored: false
  };

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
      className,
      color,
      failureBadge,
      hideDefaultTooltip,
      isOverview,
      size,
      src,
      title,
      type,
      icon,
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
            key='image'
            alt={alt}
            className={
              `cui-avatar__img` +
              `${(!isImageLoaded && ` cui-avatar__img--hidden`) || ''}`
            }
            draggable={false}
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

    return (
      <div
        className={
          'cui-avatar' +
          `${(type && ` cui-avatar--${type}`) || ''}` +
          `${(size && ` cui-avatar--${size}`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        title={!hideDefaultTooltip ? title : ''}
      >
        {getChildren()}
        {type === 'typing' && <Loading/>}
        {failureBadge && <span className='cui-avatar__failure-badge' />}
      </div>
    );
  }
}

Avatar.propTypes = {
  alt: PropTypes.string,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  failureBadge: PropTypes.bool,
  hideDefaultTooltip: PropTypes.bool,
  icon: PropTypes.element,
  isOverview: PropTypes.bool,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 18, 24, 28, 36, 40, 44, 52, 72, 80, 84]),
  src: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(['', 'active', 'inactive', 'dnd', 'ooo', 'group', 'typing', 'bot', 'self']),
};

Avatar.defaultProps = {
  alt: '',
  backgroundColor: '',
  className: null,
  color: '',
  failureBadge: false,
  hideDefaultTooltip: false,
  icon: null,
  isOverview: false,
  size: 'medium',
  src: null,
  title: null,
  type: '',
};

export default Avatar;

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
        <div className="example-spacing">
          <p><span className="h3">size=(18)</span></p>
          <div><Avatar size={18} title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">size=(24)</span></p>
          <div><Avatar size={24} title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">size=(28)</span></p>
          <div><Avatar size={28} title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">size=(36)</span></p>
          <div><Avatar size={36} title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">size=(40)</span></p>
          <div><Avatar size={40} title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">size=(44)</span></p>
          <div><Avatar size={44} title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">size=(52)</span></p>
          <div><Avatar size={52} title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">size=(72)</span></p>
          <div><Avatar size={72} title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">size=(80)</span></p>
          <div><Avatar size={80} title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">size=(84)</span></p>
          <div><Avatar size={84} title="Tom Smith"/></div>
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

 export default class AvatarTypes extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <div className="example-spacing">
          <p><span className="h3">default</span></p>
          <div><Avatar title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">active</span></p>
          <div><Avatar title="Tom Smith" type="active"/></div>
          <br></br>

          <p><span className="h3">Do not disturb</span></p>
          <div><Avatar title="Tom Smith" type="dnd"/></div>
          <br></br>

          <p><span className="h3">Out of office</span></p>
          <div><Avatar title="Tom Smith" type="ooo"/></div>
          <br></br>

          <p><span className="h3">Group</span></p>
          <div><Avatar title="Tom Smith" type="group"/></div>
          <br></br>

          <p><span className="h3">Bot</span></p>
          <div><Avatar title="Tom Smith" type="bot"/></div>
          <br></br>

          <p><span className="h3">FailureBadge</span></p>
          <div><Avatar title="Tom Smith" failureBadge={true}/></div>
          <br></br>

          <p><span className="h3">Self</span></p>
          <div><Avatar title="Tom Smith" type="self"/></div>
          <br></br>

          <p><span className="h3">Typing</span></p>
          <div><Avatar title="Tom Smith" type="typing"/></div>
          <br></br>

          <p><span className="h3">Inactive</span></p>
          <div><Avatar title="Tom Smith" type="inactive"/></div>
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
        <div className="example-spacing">
          <p><span className="h3">With image</span></p>
          <div><Avatar title="React" src={libraryIcon}/></div>
          <br></br>

          <p><span className="h3">With icon</span></p>
          <div><Avatar title="Feedback" icon={<Icon name="feedback_16"/>}/></div>
          <br></br>

          <p><span className="h3">With title</span></p>
          <div><Avatar title="Tom Smith"/></div>
          <br></br>
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
        <div className="example-spacing">
        
          <p><span className="h3">size=(28)</span></p>
          <div>
          <CompositeAvatar size={28}>
          <Avatar title="Tom Smith"/>
          <Avatar title="John William"/>
          </CompositeAvatar>
          </div>
          <br></br>

          <p><span className="h3">size=(40)</span></p>
          <div>
          <CompositeAvatar size={40}>
            <Avatar title="Tom Smith"/>
            <Avatar title="John William"/>
          </CompositeAvatar>
          </div>
          <br></br>

          <p><span className="h3">size=(84)</span></p>
          <div>
            <CompositeAvatar size={84}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
          <br></br>

          <p><span className="h3">size=(135)</span></p>
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


