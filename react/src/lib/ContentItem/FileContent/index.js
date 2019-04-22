import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from '@momentum-ui/react/utils/snakeCase';
import { Spinner } from '@momentum-ui/react';

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
    if(aspect === 'tall'){
      aspect = 'nineSixteen';
    }
    const kebab = snakeCase(aspect);
    return `md-content-file--${kebab}`;
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
      className='md-content__container'
      {...otherProps}
    >
    {
      loading
      ?
      <div
        className='md-content-file'
        style={{backgroundImage:content && `url(${content})`}}
      >
        <div className={`${(content && ' md-content--opacity') || ''}`}>
          <Spinner />
        </div>
      </div>
      :
      <div
        className={
          'md-content-file__block' +
          `${(aspect === 'oneOne' && ' content-file--no-border' || aspect === 'fourThree' && ' content-file--no-border') || ''}`
        }
      >
        <div
          className={
            `${(aspect && kebabify(aspect)) || ''}` +
            `${(!aspect && ' md-content-file--full') || ''}` +
            `${(onClick && ' md-content-file--clickable') || ''}` +
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
            <div className='md-content-file__aspect'>
              {actionNode}
            </div>
          }
          {
            gifIcon &&
            <i className={
              `${gifIcon} md-content__gif` +
              `${(aspect === 'oneOne' && ' md-content__gif--oneOne' || aspect === 'fourThree' && ' md-content__gif--fourThree') || ''}`
              }
            />
          }
      </div>
    }
    <div className='md-content-file__info-container'>
      {
        title &&
        <span title={title} key='title' className='md-content-file__title'>
          {loading ? loadingText : title}
        </span>
      }
      {
        subtitle &&
        <span key='subtitle' className='md-content-file__subtitle'>{subtitle}</span>
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
  aspect: PropTypes.oneOf(['fourThree', 'nineSixteen', 'oneOne', 'sixteenNine', 'tall', 'threeFour', 'threeTwo', 'twoThree', 'wide']),
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
