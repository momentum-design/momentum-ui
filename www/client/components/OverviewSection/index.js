import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
class OverviewSection extends React.PureComponent {

  render() {
    const {
      description,
      image,
      imageDescription,
      isHeader,
      link,
      title,
      ...props
    } = this.props;

    return (
      <div
        className={
          'docs-section docs-section__overview' +
          `${isHeader && ' docs-section__overview--header' || ''}`
        }
        {...props}
      >
        <div className='overview'>
          {!isHeader && title && <h5 className='overview__title md-h5--bold'>{title}</h5>}
          {description && <h5 className='overview__description md-font-color--secondary'>{description}</h5>}
          {!isHeader
            && <NavLink
              className='overview__link md-h5--bold md-link--blue'
              to={link}
            >
              Learn More
            </NavLink>
          }
        </div>
        {
          image
          ?
          <img
            className='overview__image'
            src={image}
            alt={imageDescription && imageDescription || ''}
          />
          :
          !isHeader && <div className='overview__image'/>
        }
      </div>
    );
  }
}

OverviewSection.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  imageDescription: PropTypes.string,
  isHeader: PropTypes.bool,
  link: PropTypes.string,
  title: PropTypes.string,
};

OverviewSection.defaultProps = {
  description: null,
  image: null,
  imageDescription: null,
  isHeader: false,
  link: '',
  title: null,
};

OverviewSection.displayName = 'OverviewSection';

export default OverviewSection;
