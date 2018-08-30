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
    isProtected,
    loading,
    style,
    subtitle,
    title,
    ...otherProps
  } = props;

  const kebabify = (aspect) => {
    const kebab = snakeCase(aspect);
    return `cui-content-file--${kebab}`;
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
        className= {`${(!aspect && 'cui-content-file') || ''}`}
        style = {{backgroundImage:content && `url(${content})`}}
      >
        <div className = {`${(content && 'cui-content--opacity') || ''}`}>
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
            `${(className && ` ${className}`) || ''}`
          }
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
      </div>
    }
    <div className='cui-content-file__info-container'>
      <span className='cui-content-file__title'>{loading ? 'Loading' : title}</span>
      <span className="cui-content-file__subtitle"> {subtitle} </span>
    </div>
  </div>
  );
};

FileContentItem.defaultProps = {
  actionNode: null,
  aspect: null,
  className: '',
  content: '',
  icon: '',
  isProtected: null,
  loading: false,
  style: null,
  subtitle: '',
  title: '',
};

FileContentItem.propTypes = {
  actionNode: PropTypes.node,
  aspect: PropTypes.oneOf(['oneOne', 'twoThree', 'fourThree', 'threeFour', 'sixteenNine', 'nineSixteen']),
  className: PropTypes.string,
  content: PropTypes.string,
  icon: PropTypes.string,
  isProtected: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

FileContentItem.displayName = 'FileContentItem';

export default FileContentItem;
