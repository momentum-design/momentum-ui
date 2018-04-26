import React from 'react';
import PropTypes from 'prop-types';

export default class Avatar extends React.Component {
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
      color,
      hideDefaultTooltip,
      src,
      title,
      type,
      size,
      className,
      icon,
    } = this.props;
    const {
      isImageLoaded,
      isImageErrored
    } = this.state;


    const getInitials = () => {
      let letters = [];
      const words =  title.split(/ +/);
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
            className='cui-avatar__icon'
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
          className='cui-avatar__letter'
          style={{ backgroundColor, color }}
        >
          {getInitials()}
        </span>
      );
    };

    const getChildren = () => {
      // image src is present and image has not yet errored
      if (src && !isImageErrored) {
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
          ` cui-avatar--${size}` +
          `${(className && ` ${className}`) || ''}`
        }
        title={!hideDefaultTooltip ? title : ''}
      >
        {getChildren()}
      </div>
    );
  }
}

Avatar.propTypes = {
  alt: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  hideDefaultTooltip: PropTypes.bool,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  src: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(['', 'active', 'inactive', 'dnd', 'ooo', 'group']),
  icon: PropTypes.element,
};

Avatar.defaultProps = {
  alt: '',
  backgroundColor: '',
  className: null,
  color: '',
  hideDefaultTooltip: false,
  size: 'medium',
  src: null,
  title: null,
  type: '',
  icon: null,
};

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
          <p><span className="h3">medium(default)</span></p>
          <div><Avatar size="medium" title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">small</span></p>
          <div><Avatar size="small" title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">xsmall</span></p>
          <div><Avatar size="xsmall" title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">large</span></p>
          <div><Avatar size="large" title="Tom Smith"/></div>
          <br></br>

          <p><span className="h3">xlarge</span></p>
          <div><Avatar size="xlarge" title="Tom Smith"/></div>
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
          <p><span className="h3">medium(Default Size)</span></p>
          <div>
          <CompositeAvatar>
            <Avatar title="Tom Smith"/>
            <Avatar title="John William"/>
          </CompositeAvatar>
          </div>
          <br></br>

          <p><span className="h3">small</span></p>
          <div>
            <CompositeAvatar size="small">
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
          <br></br>

          <p><span className="h3">large</span></p>
          <div>
            <CompositeAvatar size="large">
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
          <br></br>
        </div>
      </div>
    );
  }
}
**/


