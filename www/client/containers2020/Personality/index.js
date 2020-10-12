import React from 'react';
import { Button } from '@momentum-ui/react';
import SectionHeader from '../../components2020/SectionHeader';
import Example from '../../components2020/Example';
import locale from './locale';
import PageHero from '../../components2020/PageHero';

// Import page images
import personalityBanner from '../../assets/2020/banner-system.svg';
import webexErrorExample from '../../assets/2020/personality-webex-error-example.png';
import webexExample from '../../assets/2020/personality-webex-example.png';
import webexOnboardingExample from '../../assets/2020/personality-webex-teams-onboarding-example.png';
import webexTechnicalExample from '../../assets/2020/personality-webex-technical-illustration-example.png';

class Personality extends React.PureComponent {

  render() {
    const personalityMattersLead = (
      <div>
        <p className="personality-header-lead">{locale.sectionHeaders.personalityMatters.body}</p>
        <div className="personality-attributes-bullet-list">
          {locale.attributes.map((attribute, idx) => (
            <div key={'attribute-item' + idx} className="personality-attributes-bullet">
              <div style={{backgroundColor: attribute.color}}></div>
              <p style={{color: attribute.color}}>{attribute.title}</p>
            </div>
          ))}
        </div>
        <p className="personality-header-lead">Here’s how we bring that personality to life...</p>
      </div>
    );

    const sectionDivider = (
      <hr className="personality-section-divider" />
    );

    return (
      <div className="site-con">
        <div className="site-con site-bg-black page-body-buffer">
          <PageHero
            backgroundImage={personalityBanner}
            backgroundSize='600px'
            className='personality-page-hero'
            heroTitle='Personality'
          />
          <div className="page-body">
            <SectionHeader
              darkTheme
              title={locale.sectionHeaders.personalityMatters.title}
              leadElm={personalityMattersLead}
            />

            {sectionDivider}
            
            <SectionHeader
              className="personality-header-copy"
              darkTheme
              title={locale.sectionHeaders.copy.title}
              leadElm={(
                <p className="systems-header-lead">{locale.sectionHeaders.copy.body}</p>
              )}
            />
            <div className="site-responsive-row personality-description-container">
              {locale.copyStructures.map((copyStructure, idx) => (
                <div>
                  <h5>{copyStructure.title}</h5>
                  <p>{copyStructure.body}</p>
                </div>
              ))}
            </div>
            <div className="site-responsive-row personality-example-row">
              <Example
                subtitle="Example: Webex Teams - Onboarding (Attributes applified: Uplifting, Confident, Inclusive)"
              >
                <div className="personality-example-row-item">
                  <img className="site-example-image" src={webexErrorExample} />
                </div>
              </Example>
              <Example
                subtitle="Example: Webex Meetings - Error message (Attributes applified: Focused, Familiar, Inclusive)"
              >
                <div className="personality-example-row-item">
                  <img className="site-example-image" src={webexErrorExample} />
                </div>
              </Example>
            </div>
            <Example
              subtitle="Example: Webex.com"
            >
              <div className="personality-webex-example">
                <img className="site-example-image" src={webexExample} />
              </div>
            </Example>
            <div className="personality-writing-tips-container">
              <h3>Writing tips</h3>
              <div className="site-responsive-row personality-writing-tips-grid">
                {locale.writingTips.map((writingTip, idx) => (
                  <div key={'tip-container' + idx} className="personality-writing-tips-grid__container">
                    <div className="personality-writing-tips-grid__container-inner">
                      {writingTip.title && <h4>{writingTip.title}</h4> }
                      <p>{writingTip.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p>Learn all about writing for Webex</p>
              <div className="personality-writing-tips-container__buttons">
                <a href="https://www.figma.com/file/RGYvKGEgxKqisb4X2CIIHz/Guidelines-Writing?node-id=594%3A481">
                  <Button
                    ariaLabel='Writing Tips'
                    className='md-button--dark-gray icon-button-share'
                    size={52}
                  >UX Writing guidelines</Button>
                </a>
                <a href="https://www.figma.com/file/RGYvKGEgxKqisb4X2CIIHz/Guidelines-Writing?node-id=225%3A437">
                  <Button
                    ariaLabel='IGithub'
                    className='md-button--dark-gray icon-button-share'
                    size={52}
                  >Voice and tone</Button>
                </a>
                <a href="https://www.figma.com/file/RGYvKGEgxKqisb4X2CIIHz/Guidelines-Writing?node-id=669%3A0">
                  <Button
                    ariaLabel='IGithub'
                    className='md-button--dark-gray icon-button-share'
                    size={52}
                  >Tips and tricks</Button>
                </a>
              </div>
            </div>

            {sectionDivider}

            <SectionHeader
              className="personality-header-illustration"
              darkTheme
              title={locale.sectionHeaders.illustration.title}
              leadElm={(
                <p className="systems-header-lead">{locale.sectionHeaders.illustration.body}</p>
              )}
            />
            <div className="site-responsive-row personality-description-container">
              {locale.illustrationStyles.map((illustrationStyle, idx) => (
                <div>
                  <h5>{illustrationStyle.title}</h5>
                  <p>{illustrationStyle.body}</p>
                </div>
              ))}
            </div>
            <div className="site-responsive-row personality-example-row">
              <Example
                subtitle="Example: Webex Teams - Onboarding"
              >
                <div className="personality-story-illustation-example">
                  <img src={webexOnboardingExample} />
                </div>
              </Example>
              <Example
                subtitle="Example: Webex.com"
              >
                <div className="personality-technical-illustration-example">
                  <img className="site-example-image" src={webexTechnicalExample} />
                </div>
              </Example>
            </div>
            <div className="personality-illustration-tips-container">
              <h3>Illustration tips</h3>
              {locale.illustrationTips.map(illustrationTip => (
                <div className="personality-illustration-tips-container__example">
                  <p>{illustrationTip.title}</p>
                  <Example className="personality-illustration-tips-example" smallBlockSize>
                    <div className="personality-illustration-tips-example-item">
                      <img src={illustrationTip.exampleImageSrc} />
                    </div>
                  </Example>

                </div>
              ))}
              <p>Learn all about illustration</p>
              <div className="personality-illustration-tips-container__buttons">
                <a href="https://www.figma.com/file/MIIVDcYhRJ7qCVTsZFRnYb/Guidelines-Illustration?node-id=1206%3A744">
                  <Button
                    ariaLabel='Writing Tips'
                    className='md-button--dark-gray icon-button-share'
                    size={52}
                  >Illustration guidelines</Button>
                </a>
                <a href="https://www.figma.com/file/MIIVDcYhRJ7qCVTsZFRnYb/Guidelines-Illustration?node-id=224%3A356">
                  <Button
                    ariaLabel='IGithub'
                    className='md-button--dark-gray icon-button-share'
                    size={52}
                  >Tips and tricks</Button>
                </a>
              </div>
            </div>
            
            {sectionDivider}

            <SectionHeader
              className="personality-header-motion"
              darkTheme
              title={locale.sectionHeaders.motion.title}
              leadElm={(
                <p className="systems-header-lead">{locale.sectionHeaders.motion.body}</p>
              )}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default Personality;
