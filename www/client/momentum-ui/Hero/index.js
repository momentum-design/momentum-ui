import React from 'react';
import PropTypes from 'prop-types';

class Hero extends React.PureComponent {

  render() {
    const {
      className,
      color,
      description,
      image,
      style,
      textAlign,
      textColor,
      title,
      ...props
    } = this.props;

    const leadElement = () => (
      description
        && (
          <h4 className='md-hero__lead md-font-color--secondary'>
            {description}
          </h4>
        )
    );

    return (
      <div
        className={
          'md-hero' +
          `${textAlign === 'left' ? ' md-hero--left' : ''}` +
          `${textColor === 'light' ? ' md-hero--dark' : ''}` +
          `${className ? ` ${className}` : '' }`
        }
        style={{
          backgroundColor: color,
          backgroundImage: `url(${image})`,
          ...style
        }}
        {...props}
      >
        <div className='md-hero__container'>
          <h1 className='md-hero__title md-font-color--alternate md-h1--bold'>
            {title}
          </h1>
          {leadElement()}
        </div>
      </div>
    );
  }
}

Hero.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  style: PropTypes.object,
  textAlign: PropTypes.string,
  textColor: PropTypes.string,
  title: PropTypes.node.isRequired,
};

Hero.defaultProps = {
  className: '',
  color: '',
  description: '',
  image: '',
  style: {},
  textAlign: '',
  textColor: '',
};

Hero.displayName = 'Hero';

export default Hero;


