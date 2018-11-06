import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from '@collab-ui/react/utils/snakeCase';
import { Spinner } from '@collab-ui/react';

const ChatContentItem = props => {
  const {
    actionNode,
    aspect,
    className,
    content,
    fileSize,
    gifIcon,
    isProtected,
    loading,
    onClick,
    style,
    title,
    ...otherProps
  } = props;

  const kebabify = (holder, aspect) => {

    const cases = ['fourThree', 'sixteenNine', 'threeTwo'];
    const kebab = snakeCase(aspect);

      if(holder==='container'){
        if(cases.includes(aspect)){
          return ` cui-content__chat-${kebab}`;
        }
      }
      else if(holder ==='inner'){
        if(cases.includes(aspect)){
          return ' cui-content-file--full';
        }
        else{
          return ` cui-content-file--chat-${kebab}`;
        }
      }
  };

  const handleKeyDown = e => {
    if (
      e.which === 32
      || e.which === 13
      || e.charCode === 32
      || e.charCode === 13
    ) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return (
    <div
      className={
        'cui-content__chat-inner-container' +
        `${(aspect === 'wide' && ' cui-content__chat-wide-container') || ''}` +
        `${(aspect && kebabify('container', aspect)) || ''}`
      }
      {...otherProps}
    >
      <div
        className={
          `${(aspect && kebabify('inner', aspect)) || ''}` +
          `${(!aspect && ' cui-content-file--full') || ''}` +
          `${(onClick && ' cui-content-file--clickable') || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role='presentation'
        style={{
          backgroundImage: content && `url(${content})`,
          ...style
        }}
      >
        {
          loading
          &&
          <div className={`${(content ? ' cui-content--opacity' : ' cui-content--centered')}`}>
            <Spinner />
          </div>
        }
        {
          gifIcon
          &&
          <i className={`${gifIcon} cui-content__gif`} />
        }
      </div>
      {
        !loading
        &&
        <div
          className={
            'cui-content__hover' +
            `${(aspect === 'wide' && ' cui-content__hover--wide') || ''}`
          }
        >
          <div className='cui-content__hover-files'>
            <span className='cui-content__hover-files--file-name'>{title}</span>
            <span className='cui-content__hover-files--file-size'>{fileSize}</span>
          </div>
          {
            actionNode && !isProtected &&
            <div className='cui-content__hover-icons'>
              {actionNode}
            </div>
          }
        </div>
      }
    </div>
    );
  };

ChatContentItem.defaultProps = {
  actionNode: null,
  aspect: null,
  className: '',
  content: '',
  fileSize: '',
  gifIcon:'',
  isProtected: null,
  loading: false,
  onClick: null,
  style: null,
  title: '',
  type: '',
};

ChatContentItem.propTypes = {
  actionNode: PropTypes.node,
  aspect: PropTypes.oneOf([
    'oneOne',
    'tall',
    'threeFour',
    'wide',
    'fourThree',
    'nineSixteen',
    'sixteenNine',
    'twoThree',
    'threeTwo'
  ]),
  className: PropTypes.string,
  content: PropTypes.string,
  fileSize: PropTypes.string,
  gifIcon: PropTypes.string,
  isProtected: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
};

ChatContentItem.displayName = 'ChatContentItem';

export default ChatContentItem;