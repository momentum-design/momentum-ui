import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from '@collab-ui/react/utils/snakeCase';
import { Spinner } from '@collab-ui/react';

const FileContentItem = props => {
  const {
    actionNode,
    aspect,
    className,
    content,
    gifIcon,
    isProtected,
    loading,
    loadingText,
    onClick,
    style,
    subtitle,
    title,
    ...otherProps
  } = props;

  const kebabify = (aspect) => {
    if(aspect === 'wide'){
      aspect = 'sixteenNine';
    }
    const kebab = snakeCase(aspect);
    return `cui-content-file--${kebab}`;
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
      className='cui-content__container'
      {...otherProps}
    >
    {
      loading
      ?
      <div
        className='cui-content-file'
        style={{backgroundImage:content && `url(${content})`}}
      >
        <div className={`${(content && ' cui-content--opacity') || ''}`}>
          <Spinner />
        </div>
      </div>
      :
      <div
        className={
          'cui-content-file__block' +
          `${(aspect === 'oneOne' && ' cui-no-border' || aspect === 'fourThree' && ' cui-no-border') || ''}`
        }
      >
        <div
          className={
            `${(aspect && kebabify(aspect)) || ''}` +
            `${(!aspect && ' cui-content-file--full') || ''}` +
            `${(onClick && ' cui-content-file--clickable') || ''}` +
            `${(className && ` ${className}`) || ''}`
          }
          onKeyDown={handleKeyDown}
          onClick={onClick}
          role='presentation'
          style={{
            backgroundImage: content && `url(${content})`,
            ...style
          }}
        />
          {
            !isProtected && actionNode &&
            <div className='cui-content-file__aspect'>
              {actionNode}
            </div>
          }
          {
            gifIcon &&
            <i className={`${gifIcon} cui-content__gif`} />
          }
      </div>
    }
    <div className='cui-content-file__info-container'>
      {
        title &&
        <span title={title} key='title' className='cui-content-file__title'>
          {loading ? loadingText : title}
        </span>
      }
      {
        subtitle &&
        <span key='subtitle' className='cui-content-file__subtitle'>{subtitle}</span>
      }
    </div>
  </div>
  );
};

FileContentItem.defaultProps = {
  actionNode: null,
  aspect: null,
  className: '',
  content: '',
  gifIcon: '',
  icon: '',
  isProtected: null,
  loading: false,
  loadingText: 'Loading',
  onClick: null,
  style: null,
  subtitle: '',
  title: '',
};

FileContentItem.propTypes = {
  actionNode: PropTypes.node,
  aspect: PropTypes.oneOf(['oneOne', 'twoThree', 'threeTwo', 'fourThree', 'threeFour', 'sixteenNine', 'nineSixteen']),
  className: PropTypes.string,
  content: PropTypes.string,
  gifIcon: PropTypes.string,
  icon: PropTypes.string,
  isProtected: PropTypes.bool,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

FileContentItem.displayName = 'FileContentItem';

export default FileContentItem;