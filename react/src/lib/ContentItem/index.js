/** @component content-item */

import React from 'react';
import PropTypes from 'prop-types';
import ChatContentItem from '@collab-ui/react/ContentItem/ChatContent';
import FileContentItem from '@collab-ui/react/ContentItem/FileContent';
import IconContent from '@collab-ui/react/ContentItem/IconContent';
import omit from 'lodash/omit';

class ContentItem extends React.PureComponent {

  render() {
    const {
      actionNode,
      aspect,
      className,
      content,
      failedText,
      fileSize,
      height,
      icon,
      isProtected,
      loading,
      loadingText,
      style,
      subtitle,
      title,
      type,
      width,
      ...props
    } = this.props;

    const otherProps = omit({...props}, ['gifIcon']);

    const findAspect = (width, height) => {

      if(width && height){

        const aspectRatioObj = {
          1 : 'oneOne',
          .75 : 'threeFour',
          .66 : 'twoThree',
          .4 : 'tall',
          4.35 : 'wide',
          1.33 : 'fourThree',
          1.5 : 'threeTwo',
          1.78 : 'sixteenNine'
        };

        const providedAspectRatio = width/height;

        const closestAspectRatio = Object.keys(aspectRatioObj).reduce((prev, curr) =>
          Math.abs(curr - providedAspectRatio) < Math.abs(prev - providedAspectRatio)
          ? curr
          : prev
        );

        return aspectRatioObj[closestAspectRatio];
      }
      return type === 'chat' ? 'sixteenNine' : 'threeTwo';
    };

    const chosenItem = () => {

      if(failedText && type==='chat') {
        return (
          <div className={
            'cui-content cui-content--failed' +
            `${(className && ` ${className}`) || ''}`
          }>
            <div className='cui-content--failed-container'>
              <i className='icon icon-warning_28 cui-content--failed-warning'/>
              <p className='cui-content--failed-message'>{failedText}</p>
            </div>
          </div>
        );
      } else if (type==='chat'){
        return (
          <ChatContentItem
            actionNode={actionNode}
            aspect={aspect ? aspect : findAspect(width,height)}
            className={className}
            content={content}
            fileSize={fileSize}
            height={height}
            isProtected={isProtected}
            loading={loading}
            style={style}
            title={title}
            type={type}
            width={width}
            {...props} />
        );
      } else if (type==='file' && !icon){
        return (
          <FileContentItem
            actionNode={actionNode}
            aspect={aspect ? aspect : findAspect(width,height)}
            className={className}
            content={content}
            height={height}
            icon={icon}
            isProtected={isProtected}
            loading={loading}
            loadingText={loadingText}
            subtitle={subtitle}
            title={title}
            type={type}
            width={width}
            {...props} />
        );
      } else if (icon){
        return (
          <IconContent
            actionNode={actionNode}
            className={className}
            icon={icon}
            isProtected={isProtected}
            loading={loading}
            subtitle={subtitle}
            title={title}
            {...otherProps} />
        );
      }
    };

    return (
      <div>
        {chosenItem()}
      </div>
    );
  }
}


ContentItem.displayName = 'ContentItem';

ContentItem.defaultProps = {
  actionNode: null,
  aspect: null,
  className: '',
  content: null,
  failedText: '',
  fileSize: '',
  icon: '',
  isProtected: false,
  loading: false,
  loadingText: 'Loading',
  style: null,
  subtitle: '',
  title: '',
  type: 'chat',
};

ContentItem.propTypes = {
  /** @prop Node to render buttons inside Content Item | null */
  actionNode: PropTypes.node,
  /** @prop Set the Content Item's aspect size | null */
  aspect: PropTypes.oneOf(['fourThree', 'nineSixteen', 'oneOne', 'sixteenNine', 'tall', 'threeFour', 'threeTwo', 'twoThree', 'wide']),
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Set the image/gif of the Content Item | '' */
  content: PropTypes.string,
  /** @prop Set the failed text to show when content fails to load | '' */
  failedText: PropTypes.string,
  /** @prop Show the size of the file | '' */
  fileSize: PropTypes.string,
  /** @prop Show icon at top right corner of Content Item */
  gifIcon: PropTypes.string,
  /** @prop Height of the image in px */
  height: PropTypes.number,
  /** @prop Set the type of icon to show | '' */
  icon: PropTypes.string,
  /** @prop Show visibility of action node buttons | false */
  isProtected: PropTypes.bool,
  /** @prop Show loading spinner | false */
  loading: PropTypes.bool,
  /** @prop Change loading text */
  loadingText: PropTypes.string,
  /** @prop Additional css styling applied to the button | null  */
  style: PropTypes.object,
  /** @prop Set the subtitle of the Content Item | '' */
  subtitle: PropTypes.string,
  /** @prop Set the title of the Content Item | '' */
  title: PropTypes.string,
  /** @prop Set the type of Content Item to display */
  type: PropTypes.oneOf(['chat', 'file']),
  /** @prop Width of the image in px */
  width: PropTypes.number
};

export default ContentItem;
