import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from '@collab-ui/react/utils/snakeCase';
import { Spinner } from '@collab-ui/react';
import clsx from 'clsx';

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
        <div className={clsx({'cui-content--opacity': content})}>
          <Spinner />
        </div>
      </div>
      :
      <div
        className={
          clsx('cui-content-file__block', {
            'content-file--no-border': aspect === 'oneOne' || aspect === 'fourThree',
          })
        }
      >
        <div
          className={
            clsx({
              [kebabify(aspect)]: aspect,
              'cui-content-file--full': !aspect,
              'cui-content-file--clickable': onClick
            }, className)
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
            <i className={
              clsx(`${gifIcon} cui-content__gif`, {
                'cui-content__gif--oneOne': aspect === 'oneOne',
                'cui-content__gif--fourThree': aspect === 'fourThree'
              })}
            />
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
