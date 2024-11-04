import React from 'react';
import { Badge } from '@momentum-ui/react';
import TokenDisplayTable from '../../components2020/TokenDisplayTable';
import Example from '../../components2020/Example';
import TokenNavigation from '../../components2020/TokenNavigation';
import SectionTitle from '../../components2020/SectionTitle';
import SectionHeader from '../../components2020/SectionHeader';
import locale from './locale';
import PageHero from '../../components2020/PageHero';

// Import page images
import elevationBanner from '../../assets/2020/banner-elevation.svg';
import webexDevelopersExample from '../../assets/2020/elevation-webex-developers-example.png';
import controlHubExample from '../../assets/2020/elevation-control-hub-example.png';

const elevationTokens = require('@momentum-ui/tokens/src/core/elevation.js');

class Elevation extends React.PureComponent {

  render() {
    const SampleDropShadowBox = ({dropShadow, size, style}) => (
      <div className={"elevation-sample-box elevation-sample-box__" + (size ? size : 'sq')} style={{filter: dropShadow, ...style}}></div>
    );

    const dropShadowStr = (boxShadow) => {
      const dropShadowValues = boxShadow.split(', ');
      return dropShadowValues.reduce((a, b) => a + `drop-shadow(${b})`, "");
    }

    const elevationTokenTableRows = () => {
      let tableRows = [];

      const tokenBaseName = "elevation";
      const tokenProperty = "drop-shadow";

      Object.entries(elevationTokens).forEach((elevation, index) => {
        const elevationType = elevation[0];
        const elevationValue = elevation[1];
        const elevationTokenName = (
          <Badge className="token-table-badge" color="pastel">
            {tokenBaseName + "-" + elevationType}
          </Badge>
        );

        let directionalRow;
        let ambientRow;
        let boxShadowRow;
        let elevationSample;

        if (elevationValue.boxShadow) {
          elevationSample = <SampleDropShadowBox dropShadow={dropShadowStr(elevationValue.boxShadow)} />;

          boxShadowRow = (
            <tr>
              <td><div className="box-shadow-value-container">{'box-shadow: ' + elevationValue.boxShadow}</div></td>
            </tr>
          )
        } else {
          elevationSample = <SampleDropShadowBox />;
        }

        if (elevationValue.directional) {
          const directionalVal = elevationValue.directional;
          directionalRow = (
            <tr>
              <td className="elevation-value-table_row-type">Directional</td>
              <td>{directionalVal.shadowColor}</td>
              <td className="elevation-value-table_row-title">shadow color</td>
              <td>{directionalVal.blur}</td>
              <td className="elevation-value-table_row-title">blur</td>
              <td className="elevation-value-table_row-coords">X: {directionalVal.x}, Y: {directionalVal.y}</td>
              <td>{directionalVal.opacity}</td>
              <td className="elevation-value-table_row-title">alpha/opacity</td>
            </tr>
          );
        }

        if (elevationValue.ambient) {
          const ambientVal = elevationValue.directional;
          ambientRow = (
            <tr>
              <td className="elevation-value-table_row-type">Ambient</td>
              <td>{ambientVal.shadowColor}</td>
              <td className="elevation-value-table_row-title">shadow color</td>
              <td>{ambientVal.blur}</td>
              <td className="elevation-value-table_row-title">blur</td>
              <td className="elevation-value-table_row-coords">X: {ambientVal.x}, Y: {ambientVal.y}</td>
              <td>{ambientVal.opacity}</td>
              <td className="elevation-value-table_row-title">alpha/opacity</td>
            </tr>
          )
        }

        let elevationValueTable = (
          <table className="elevation-value-table">
            <tbody>
              {directionalRow && directionalRow}
              {ambientRow && ambientRow}
              {boxShadowRow && boxShadowRow}
              {!ambientRow && !boxShadowRow && !directionalRow && (
                <tr><td>none</td></tr>
              )}
            </tbody>
          </table>
        )

        tableRows.push([
          elevationSample,
          elevationTokenName,
          tokenProperty,
          elevationValueTable
        ]);
      })

      return tableRows;
    }

    return (
      <div className="site-con page-body-buffer">
        <PageHero
          backgroundColor='#DDF2AE'
          backgroundImage={elevationBanner}
          backgroundSize='600px'
          figmaURL='https://www.figma.com/file/zktddifdcJ47X9m12xVVfy/Core-Styles?node-id=494%3A789'
          githubURL='https://github.com/momentum-design/momentum-ui/blob/main/tokens/data/elevation.json'
          heroTitle='Elevation'
        />
        <div className='site-warp scrollable-body-wrapper'>
          <SectionHeader
            title={locale.sectionHeaders.elevation.title}
            leadStr={locale.sectionHeaders.elevation.body}
          />
          <div className="elevation-token-display-table-container">
            <TokenDisplayTable
              className="elevation-token-display-table"
              key="elevation"
              sectionTitleLabel=""
              tableHeaders={["Samples", "Token", "Property", "Value"]}
              tableRows={elevationTokenTableRows()}
            />
          </div>
          <div className="site-responsive-row elevation-purpose-row">
            {[locale.elevationPurpose.higherElevation, locale.elevationPurpose.lowerElevation].map((elevation, idx) => (
              <div className="elevation-purpose-row__card" key={"elevation-purpose" + idx}>
                <h4>{elevation.title}</h4>
                <div className="elevation-purpose-row__card-purpose">{elevation.body}</div>
                <div className="elevation-sample-box elevation-sample-box__lg" style={{filter: elevation.elevationValue}}></div>
                <div className="elevation-purpose-row__card-caption">{elevation.elevation}</div>
              </div>
            ))}
          </div>
          <Example
            subtitle="Example: Webex for Developers"
          >
            <div className="elevation-webex-example">
              <img className="site-example-image" src={webexDevelopersExample} />
            </div>
          </Example>

          <div className="brightness-mode-container">
            <SectionTitle label={locale.brightnessMode.dayTime.title} />
            <div className="brightness-mode-container__description">{locale.brightnessMode.dayTime.body}</div>
            <div className="site-responsive-row brightness-mode-container__example-container">
              {[locale.brightnessMode.dayTime.mode1, locale.brightnessMode.dayTime.mode2].map((mode, idx) => (
                <div
                  className="brightness-mode-container__example-container-card"
                  key={"brightness-mode" + idx}
                  style={{backgroundColor: mode.backgroundColorValue}}
                >
                  <div>{mode.tileColorLabel}</div>
                  <div className="elevation-multi-card-container">
                    {Object.entries(elevationTokens).map((elevationToken, idx) => (
                      <SampleDropShadowBox
                        key={mode.tileColorLabel + idx}
                        size="md"
                        style={{backgroundColor: mode.tileColorValue}}
                        dropShadow={elevationToken[1].boxShadow ? dropShadowStr(elevationToken[1].boxShadow) : null}
                      />
                    ))}
                  </div>
                  <div>{mode.backgroundColorLabel}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="brightness-mode-container brightness-mode-container">
            <SectionTitle label={locale.brightnessMode.evening.title} />
            <div className="brightness-mode-container__description">{locale.brightnessMode.evening.body}</div>
            <div className="site-responsive-row brightness-mode-container__example-container">
            {[locale.brightnessMode.evening.mode1, locale.brightnessMode.evening.mode2].map((mode, idx) => (
              <div
                className="brightness-mode-container__example-container-card brightness-mode-container__example-container-card-dark"
                key={"brightness-mode-2" + idx}
                style={{backgroundColor: mode.backgroundColorValue}}
              >
                <div>{mode.tileColorLabel}</div>
                <div className="elevation-multi-card-container">
                  {Object.entries(elevationTokens).map((elevationToken, idx) => (
                    <SampleDropShadowBox
                      key={mode.tileColorLabel + idx}
                      size="md"
                      style={{backgroundColor: mode.tileColorValue, border: 'none'}}
                      dropShadow={elevationToken[1].boxShadow ? dropShadowStr(elevationToken[1].boxShadow) : null}
                    />
                  ))}
                </div>
                <div>{mode.backgroundColorLabel}</div>
              </div>
            ))}
            </div>
          </div>

          <Example
            subtitle="Example: Control Hub"
          >
            <div className="elevation-control-hub-example">
              <img className="site-example-image" src={controlHubExample} />
            </div>
          </Example>
          <TokenNavigation
            leftNav={{label: "Typography", url: "/tokens/typography"}}
            rightNav={{label: "Space", url: '/tokens/space'}}
          />
        </div>
      </div>
    );
  }

}

export default Elevation;
