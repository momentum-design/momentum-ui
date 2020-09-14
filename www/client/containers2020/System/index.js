import React from 'react';
import SectionHeader from '../../components2020/SectionHeader';

class System extends React.PureComponent {

  render() {
    const subTitle = (
      <div className='flex-con-row site-subtitle site-subtitle-system' style={{marginBottom: '89px'}}>
        <div className='flex-item'>
          <h1 className="site-subtitle-system-title">{systemLocale.subtitle.values.title}</h1>
        </div>
        <div className='flex-item flex-margin'>
          <p className="site-subtitle-system-paragraph">{systemLocale.subtitle.values.body}</p>
        </div>
      </div>
    );

    const subTitleAttributes = (
      <div className='flex-con-row site-subtitle site-subtitle-system' style={{marginTop: '108px'}}>
        <div className='flex-item'>
          <h1 className="site-subtitle-system-title">{systemLocale.subtitle.attributes.title}</h1>
        </div>
        <div className='flex-item flex-margin'>
          <p className="site-subtitle-system-paragraph">{systemLocale.subtitle.attributes.body}</p>
        </div>
      </div>
    );

    return (
      <div className="site-con">
        <div className="site-con site-bg-black">
          <div className='site-warp fix-margin site-banner-system'>
            <h1 className='site-banner-system-title'>Momentum<br/>Design System</h1>
            <p>{systemLocale.header.body}</p>
          </div>
          <div className="page-body">
            <SectionHeader
              darkTheme
              title={systemLocale.subtitle.values.title}
              leadElm={(
                <p className="systems-header-lead">{systemLocale.subtitle.values.body}</p>
              )}
            />
            <div className="system-values-grid">
              {systemLocale.values.map((value, idx) => (
                <div key={'value-container' + idx} className="system-values-grid__container">
                  <div className="system-values-grid__container-inner">
                    <h5>{value.title}</h5>
                    <p>{value.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <SectionHeader
              darkTheme
              title={systemLocale.subtitle.attributes.title}
              leadElm={(
                <p className="systems-header-lead">{systemLocale.subtitle.attributes.body}</p>
              )}
            />
            <div className="system-attributes-grid">
              {systemLocale.attributes.map((attribute, idx) => (
                <div key={'attribute-container' + idx} className="system-attributes-grid__container">
                  <h5 style={{color: attribute.colors.title}}>{attribute.title}</h5>
                  <div className="system-attributes-grid__container-slider-section">
                    <p className="system-attributes-grid__container-slider-left">{attribute.slider.left}</p>
                    <div className="system-attributes-grid__container-slider">
                      <div className="system-attributes-grid__container-slider-bar"></div>
                      <div
                        className="system-attributes-grid__container-slider-ball"
                        style={{
                          background: attribute.colors.accent,
                          left: attribute.slider.value + "%"
                        }}
                      ></div>
                    </div>
                    <p className="system-attributes-grid__container-slider-right">{attribute.slider.right}</p>
                  </div>
                  <p style={{color: attribute.colors.body}}>{attribute.body}</p>
                </div>
              ))}
            </div>
            <div>
              <img src="/assets/2020/system-animation.png" />
            </div>
            <SectionHeader
              darkTheme
              title={systemLocale.subtitle.buildingBlocks.title}
              leadElm={(
                <p className="systems-header-lead">{systemLocale.subtitle.buildingBlocks.body}</p>
              )}
            />
            <div className="flex-con-row">
              <div className="flex-item"></div>
              <div className="flex-item flex-margin">
                <p className="system-token-link"><a style={{color: '#E5F8FF'}} href="/2020/tokens/color">Color</a></p>
                <p className="system-token-link"><a style={{color: '#F5EAA2'}} href="/2020/tokens/typography">Typography</a></p>
                <p className="system-token-link"><a style={{color: '#DDF2AE'}} href="/2020/tokens/elevation">Elevation</a></p>
                <p className="system-token-link"><a style={{color: '#FCF4E1'}} href="/2020/tokens/space">Space</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const systemLocale = {
  header: {
    title: "Momentum Design System",
    body: "Our design system gives everyone the tools they'll need to create coherent products and experiences that connect people across the evolving digital and physical workplace.",
  },
  subtitle: {
    values: {
      title: "Values",
      body: "These values are at the core of how we approach and create experiences that transform collaboration work. The best part is, as shared values, they invite discussion and allow us to better visualize, review, and enhance our experience—together.",
    },
    attributes: {
      title: "Attributes",
      body: "These attributes are the common thread that lives within every token, component, and pattern. We use them as a starting point, a source of truth, and a guide for whenever we're designing.",
    },
    buildingBlocks: {
      title: 'Building Blocks',
      body: "Learn more about the individual elements that make up our design system.",
    },
  },
  values: [
    {
      title: "Delight users at every turn",
      body: "With remote work now ubiquitous, Webex is the new workplace. It’s where we transform busywork into meaningful work with ease, efficiency, and uplifting experiences that promote personal expression.",
    }, {
      title: "Create coherent systems",
      body: "Our experience ecosystem has shared DNA, not absolute consistency. We adapt to every context naturally, so the technology fades, and the experience just makes sense.",
    }, {
      title: "Let instinct and data drive quality",
      body: "We don’t shoot from the hip. We start with strong instincts, then relentlessly test, learn, and improve to ensure we deliver the best-in-class experiences the world deserves.",
    }, {
      title: "Enable smooth transitions",
      body: "We flatten the barrier to entry, so minimal time is spent “figuring it out.” That means guidance is readily available, answers are easy to find, and getting to work is seamless for experts and novices alike.",
    },
  ],
  attributes: [
    {
      colors: {
        accent: "#FFD98C",
        body: "#FFECC2",
        title: "#FFE5B2",
      },
      title: "Confident",
      slider: {
        left: "Humble, understated",
        right: "Bold, opinionated",
        value: "50",
      },
      body: "Our unique heritage and expertise speaks for itself. We don’t shout or talk down. We simply build helpful features, trustworthy products, and inviting experiences."
    },
    {
      colors: {
        accent: "#31E88C",
        body: "#31E88C",
        title: "#31E88C",
      },
      title: "Inclusive",
      slider: {
        left: "Inclusive, accessible",
        right: "Exclusive, premium",
        value: "0",
      },
      body: "People of all backgrounds should see themselves in our products and have the tools they need to collaborate in their way. We’re people designing for people."
    },
    {
      colors: {
        accent: "#FF9580",
        body: "#FF9580",
        title: "#FF9580",
      },
      title: "Familiar",
      slider: {
        left: "Natural, calm",
        right: "Vibrant, energetic",
        value: "70",
      },
      body: "Work is becoming more hectic and overwhelming. The stakes are high. We remove friction and stress to create calming, natural environments for getting stuff done."
    },
    {
      colors: {
        accent: "#EBD460",
        body: "#EBD460",
        title: "#EBD460",
      },
      title: "Focused",
      slider: {
        left: "Minimalist",
        right: "Rich, layered",
        value: "80",
      },
      body: "Details matter in collaboration. We design with intention, consistency, and clarity—elevating what matters to guide people through complex experiences."
    },
    {
      colors: {
        accent: "#FF9D52",
        body: "#FF9D52",
        title: "#FF9D52",
      },
      title: "Uplifting",
      slider: {
        left: "Serious, all business",
        right: "Quirky, playful",
        value: "80",
      },
      body: "We design meaningful tools that invite expression for better, more genuine collaboration. Every color, illustration, and button helps make work delightful and inspiring."
    },
  ]
}

export default System;
