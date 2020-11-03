import React from 'react';
import SectionHeader from '../../components2020/SectionHeader';
import locale from './locale';

// Import page images
import blockGif from '../../assets/2020/system-block-animation.gif';

class System extends React.PureComponent {

  render() {

    return (
      <div className="site-con">
        <div className="site-con site-bg-black page-body-buffer">
          <div className='site-warp fix-margin site-banner-system'>
            <h1 className='site-banner-system-title'>Momentum<br/>Design System</h1>
            <p>{locale.header.body}</p>
          </div>
          <div className="page-body">
            <SectionHeader
              className="system-values-section-header"
              darkTheme
              title={locale.sectionHeaders.values.title}
              leadElm={(
                <p className="systems-header-lead">{locale.sectionHeaders.values.body}</p>
              )}
            />
            <div className="system-values-grid site-responsive-row">
              {locale.values.map((value, idx) => (
                <div key={'value-container' + idx} className="system-values-grid__container">
                  <div className="system-values-grid__container-inner">
                    <h5>{value.title}</h5>
                    <p>{value.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="system-section-divider" />
            <SectionHeader
              className="system-attributes-section-header"
              darkTheme
              title={locale.sectionHeaders.attributes.title}
              leadElm={(
                <p className="systems-header-lead">{locale.sectionHeaders.attributes.body}</p>
              )}
            />
            <div className="system-attributes-grid site-responsive-row">
              {locale.attributes.map((attribute, idx) => (
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
            <div className="system-animation-banner">
              <img src={blockGif} />
            </div>
            <SectionHeader
              className="system-blocks-section-header"
              darkTheme
              title={locale.sectionHeaders.buildingBlocks.title}
              leadElm={(
                <p className="systems-header-lead">{locale.sectionHeaders.buildingBlocks.body}</p>
              )}
            />
            <div className="site-responsive-row system-token-links">
              <div></div>
              <div>
                <p className="system-token-link system-token-link-color"><a href="/2020/tokens/color">Color</a></p>
                <p className="system-token-link system-token-link-typography"><a href="/2020/tokens/typography">Typography</a></p>
                <p className="system-token-link system-token-link-elevation"><a href="/2020/tokens/elevation">Elevation</a></p>
                <p className="system-token-link system-token-link-space"><a href="/2020/tokens/space">Space</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default System;
