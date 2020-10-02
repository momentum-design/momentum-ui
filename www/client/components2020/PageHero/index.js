import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@momentum-ui/react';

class PageHero extends React.PureComponent {
  render () {
    const {
      backgroundColor,
      backgroundImage,
      backgroundSize,
      className,
      figmaURL,
      githubURL,
      heroTitle,
    } = this.props;

    return (
      <div className={"site-con site-banner-con" + (className ? ` ${className}` : '')} style={{background: backgroundColor}}>
        <div className='fix-margin site-banner-normal' style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: backgroundSize}}>
          <div></div>
          <div className='site-banner-normal-title-container'>
            <p className='site-banner-normal-title'>{heroTitle}</p>
          </div>
          <div className='site-banner-share'>
            {figmaURL && <a href={figmaURL}>
              <Button
                ariaLabel='Figma'
                className='md-button--dark-gray site-banner-share_figma'
                size={52}
              >Figma</Button>
            </a>}
            {githubURL && <a href={githubURL}>
              <Button
                ariaLabel='IGithub'
                className='md-button--dark-gray site-banner-share_github'
                size={52}
              >Github</Button>
            </a>}
          </div>
        </div>
      </div>
    );
  }
}

PageHero.defaultProps = {
  backgroundColor: '',
  backgroundImage: '',
  backgroundSize: '500px',
  className: '',
  figmaURL: '',
  githubURL: '',
  heroTitle: '',
};

PageHero.propTypes = {
  /** @prop Backgorund color (hex or rgb) of the hero banner | '' */
  backgroundColor: PropTypes.string,
  /** @prop Background image url for the hero banner | '' */
  backgroundImage: PropTypes.string,
  /** @prop Background image size | '' */
  backgroundSize: PropTypes.string,
  /** @prop Optional class name | '' */
  className: PropTypes.string,
  /** @prop Url to relevant Figma file | '' */
  figmaURL: PropTypes.string,
  /** @prop Url to relevant Github file | '' */
  githubURL: PropTypes.string,
  /** @prop Title to show in banner | '' */
  heroTitle: PropTypes.string,
};

PageHero.displayName = 'PageHero';

export default PageHero;