import React from 'react';
import { Button } from '@momentum-ui/react';
import SectionHeader from '../../components2020/SectionHeader';
import Example from '../../components2020/Example';

class Personality extends React.PureComponent {

  render() {
    const personalityMattersLead = (
      <div>
        <p className="personality-header-lead">{personalityLocale.subtitle.personalityMatters.body}</p>
        <div className="personality-attributes-bullet-list">
          {personalityLocale.attributes.map((attribute, idx) => (
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
        <div className="site-con site-bg-black">
          <div className="site-con site-banner-con-personality">
            <div className='site-warp fix-margin site-banner-normal'>
              <p className='site-banner-normal-title'>Personality</p>
            </div>
          </div>
          <div className="page-body">
            <SectionHeader
              darkTheme
              title={personalityLocale.subtitle.personalityMatters.title}
              leadElm={personalityMattersLead}
            />

            {sectionDivider}
            
            <SectionHeader
              className="personality-header-copy"
              darkTheme
              title={personalityLocale.subtitle.copy.title}
              leadElm={(
                <p className="systems-header-lead">{personalityLocale.subtitle.copy.body}</p>
              )}
            />
            <div className="flex-con-row personality-description-container">
              {personalityLocale.copyStructures.map((copyStructure, idx) => (
                <div className={"flex-item" + (idx > 0 ? " flex-margin" : "")}>
                  <h5>{copyStructure.title}</h5>
                  <p>{copyStructure.body}</p>
                </div>
              ))}
            </div>
            <div className="flex-con-row">
                <div className="flex-item">
                  <Example
                    subtitle="Example: Webex Teams - Onboarding (Attributes applified: Uplifting, Confident, Inclusive)"
                  >
                    <div className="personality-example-row-item">
                      <img className="site-example-image" src="/assets/2020/personality-webex-error-example.png" />
                    </div>
                  </Example>
                </div>
                <div className="flex-item flex-margin">
                  <Example
                    subtitle="Example: Webex Meetings - Error message (Attributes applified: Focused, Familiar, Inclusive)"
                  >
                    <div className="personality-example-row-item">
                      <img className="site-example-image" src="/assets/2020/personality-webex-error-example.png" />
                    </div>
                  </Example>
                </div>
            </div>
            <Example
              subtitle="Example: Webex.com"
            >
              <div className="personality-webex-example">
                <img className="site-example-image" src="/assets/2020/personality-webex-example.png" />
              </div>
            </Example>
            <div className="personality-writing-tips-container">
              <h3>Writing tips</h3>
              <div className="personality-writing-tips-grid">
                {personalityLocale.writingTips.map((writingTip, idx) => (
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
                <Button
                  ariaLabel='Writing Tips'
                  className='md-button--dark-gray personality-button-share_figma'
                  size={52}
                >UX Writing guidelines</Button>
                <Button
                  ariaLabel='IGithub'
                  className='md-button--dark-gray personality-button-share_figma'
                  size={52}
                >Voice and tone</Button>
                <Button
                  ariaLabel='IGithub'
                  className='md-button--dark-gray personality-button-share_figma'
                  size={52}
                >Tips and tricks</Button>
              </div>
            </div>

            {sectionDivider}

            <SectionHeader
              className="personality-header-illustration"
              darkTheme
              title={personalityLocale.subtitle.illustration.title}
              leadElm={(
                <p className="systems-header-lead">{personalityLocale.subtitle.illustration.body}</p>
              )}
            />
            <div className="flex-con-row personality-description-container">
              {personalityLocale.illustrationStyles.map((illustrationStyle, idx) => (
                <div className={"flex-item" + (idx > 0 ? " flex-margin" : "")}>
                  <h5>{illustrationStyle.title}</h5>
                  <p>{illustrationStyle.body}</p>
                </div>
              ))}
            </div>
            <div className="flex-con-row">
              <div className="flex-item">
                <Example
                  subtitle="Example: Webex Teams - Onboarding"
                >
                  <div className="personality-story-illustation-example">
                    <img src="/assets/2020/personality-webex-teams-onboarding-example.png" />
                  </div>
                </Example>
              </div>
              <div className="flex-item flex-margin">
                <Example
                  subtitle="Example: Webex.com"
                >
                  <div className="personality-technical-illustration-example">
                    <img className="site-example-image" src="/assets/2020/personality-webex-technical-illustration-example.png" />
                  </div>
                </Example>
              </div>
            </div>
            <div className="personality-illustration-tips-container">
              <h3>Illustration tips</h3>
              {personalityLocale.illustrationTips.map(illustrationTip => (
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
                <Button
                  ariaLabel='Writing Tips'
                  className='md-button--dark-gray personality-button-share_figma'
                  size={52}
                >Illustration guidelines</Button>
                <Button
                  ariaLabel='IGithub'
                  className='md-button--dark-gray personality-button-share_figma'
                  size={52}
                >Tips and tricks</Button>
              </div>
            </div>
            
            {sectionDivider}

            <SectionHeader
              className="personality-header-motion"
              darkTheme
              title={personalityLocale.subtitle.motion.title}
              leadElm={(
                <p className="systems-header-lead">{personalityLocale.subtitle.motion.body}</p>
              )}
            />
          </div>
        </div>
      </div>
    );
  }

}

const personalityLocale = {
  header: {
    title: "Momentum Design System",
    body: "Our design system gives everyone the tools they'll need to create coherent products and experiences that connect people across the evolving digital and physical workplace.",
  },
  subtitle: {
    personalityMatters: {
      title: "Why it matters",
      body: "Beyond telling the world who we are and what we stand for, personality has an enormous impact on user experience and perception. Personality helps create stronger bonds between the user and our brand (and thus our products) by giving them a character they can visualize. Our design attributes are the characteristics that make up our personality.",
    },
    copy: {
      title: "Copy",
      body: <>The language and words within our interfaces are crucial to creating smooth user experiences. When writing, the goal is for the copy to feel so natural it's barely noticeable — or better yet invisible — fitting perfectly with the rest of the experience. We use two powerful guiding structures to express personality through words: <b>voice and tone</b>.</>,
    },
    illustration: {
      title: 'Illustration',
      body: <>Our illustrations build off the understanding that the work landscape is changing—teams are extremely diverse and distributed—with people working from homes, cafes, offices, and even space stations. That’s why our illustrations go beyond the mundane to stimulate our user’s imagination, contribute to an atmosphere of possibility, and maybe even make them smile. We use two distinct styles in illustration: <b>story and technical</b>.</>,
    },
    motion: {
      title: 'Motion',
      body: "Coming soon...",
    },
  },
  attributes: [
    {
      color: "#FFE5B2",
      title: "Confident",
    },
    {
      color: "#31E88C",
      title: "Inclusive",
    },
    {
      color: "#FF9580",
      title: "Familiar",
    },
    {
      color: "#EBD460",
      title: "Focused",
    },
    {
      color: "#FF9D52",
      title: "Uplifting",
    },
  ],
  writingTips: [
    {
      title: "Be helpful",
      body: "Include only the information the user needs when they need it.",
    },
    {
      title: "Keep it natural",
      body: "Use words and terminology everyone can understand.",
    },
    {
      title: "Be empathetic",
      body: "Make sure every message is positive, supportive, and kind.",
    },
    {
      title: "Speak actively",
      body: "More “Sally threw the ball”, less “The ball was thrown by Sally”.",
    },
    {
      title: "Follow native guidelines",
      body: "Match the standards from different platforms to create an environment of comfort and familiarity.",
    },
    {
      title: "",
      body: <i>💡 If you’re finding it difficult to write natural copy, record yourself explaining the feature or issue to someone else, then transcribe and edit that.</i>,
    },
  ],
  copyStructures: [
    {
      title: "Voice",
      body: "Our voice refers to the way we project our personality with the words we choose, the information we present, and the character we convey. Like a good host or teacher, we welcome everyone, engage our guests, and teach people how to do their best work with us. Our products should be effortless, so our words are like mini conversations: natural, concise, and helpful.",
    },
    {
      title: "Tone",
      body: "While our voice stays the same, our tone varies depending on the situation, audience, and user’s emotional state. To make sure each moment sounds genuine, we amplify specific attributes according to the circumstances. Think about how you talk to someone when they're upset (a user in need of support) versus when they're excited (a user signing in for the first time). Tone helps us guide the conversation, emotions, and behavior of the user.",
    },
  ],
  illustrationTips: [
    {
      title: "Always have a clear focal point or subject in illustration",
      exampleImageSrc: "/assets/2020/personality-illustrations-focal-point-example.png",
    },
    {
      title: "Use universal references to appeal to different cultures",
      exampleImageSrc: "/assets/2020/personality-illustrations-universal-reference-example.png",
    },
    {
      title: "Use transparency to create texture and focus, so your illustration works for dark and light mode",
      exampleImageSrc: "/assets/2020/personality-illustrations-transparency-example.png",
    },
  ],
  illustrationStyles: [
    {
      title: "Story",
      body: "Our story illustrations tell self-contained stories that entertain, educate, and delight users. We apply metaphor and symbolism to convey complex concepts in simple, unexpected ways. This style is perfect for simplifying sophisticated features, removing users' frustrations, and displaying our unique personality.",
    },
    {
      title: "Technical",
      body: "Our technical illustrations are straightforward, quick to read, and icon-like imagery that directly reflects the UI experience. We use our existing iconography and universal symbols to give users clear directions. This style is perfect for guiding, clarifying, and providing additional information when users must take a specific action.",
    },
  ],
}

export default Personality;
