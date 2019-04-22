import React from 'react';
import { Link } from 'react-router-dom';

import Hero from '../../momentum-ui/Hero';
import config from '../../config';

class HomePage extends React.PureComponent {

  state = {
      mainImage: '',
      description: '',
      displayName: '',
      homeSections: [],
  }

  componentDidMount = () => {
    return fetch(`${config.PAGES_URL}/name/homepage`)
    .then(res => res.json())
    .then(homepage => {
      const { mainImage, description, displayName, homeSections, } = homepage;
      this.setState({
        mainImage, description, displayName, homeSections,
      });
    });
  }

  render () {
    const {
      description,
      displayName,
      homeSections,
      mainImage,
    } = this.state;

    return (
      <div className="docs-home-page">
        <Hero
          description={description}
          image={mainImage}
          title={displayName}
        />

        <div className="docs-home-sections">
          {homeSections && homeSections.map((section, idx) => {
            return (
              <section
                className={
                  'md-landing-section' +
                  (section.image
                    ? section.imagePosition === 'right'
                      ? ' md-landing-section--image-right'
                        : ' md-landing-section--image-left'
                          : '') +
                  (section.callToAction ? ' md-landing-section--cta' : '') +
                  (section.backgroundColor && ` md-background-color--${section.backgroundColor}`)
                }
                key={`homeSection-${idx}`}
                style={{ backgroundImage: `url(${section.backgroundImage})` }}
              >
                <div className="md-landing-section__container">
                  {section.image && (
                    <div className="md-landing-section__image">
                      <img src={section.image} alt={section.header}/>
                    </div>
                  )}
                  <div className="md-landing-section__content">
                    <h2 className="md-landing-section__header md-h2--bold">{section.header}</h2>
                    {/* eslint-disable react/no-danger */}
                    {/* <div dangerouslySetInnerHTML={{ __html: section.content }} /> */}
                    {/* eslint-enable react/no-danger */}
                    <div className="md-landing-section__sub-header">
                      <h4 className="md-font-color--secondary">{section.content}</h4>
                      {section.callToAction && (
                        <Link className="md-landing-section__cta md-h4" to={section.callToAction[0].ctaLink}>{section.callToAction[0].ctaText}</Link>
                      )}
                    </div>
                    <div className="md-landing-section__icon-links">
                    {section.iconLinks && section.iconLinks.map((iconLink, idx) => {
                      return (
                        <Link
                          className={
                            "md-landing-section__icon-link" +
                            `${section.iconLinks.length > 2 ? ' md-landing-section__icon-link--center' : ''}`
                          }
                          key={`linkSection${idx}`}
                          to={iconLink.link}
                        >
                          <div className="icon-link__image-container">
                            <img src={iconLink.linkImage} alt="" />
                          </div>
                          <h4>{iconLink.linkText}</h4>
                        </Link>
                      );
                    })

                    }

                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    );
  }

}

export default HomePage;
