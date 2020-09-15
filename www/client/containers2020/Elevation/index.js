import React from 'react';
import { Button } from '@momentum-ui/react';
import { Badge } from '@momentum-ui/react';
import TokenDisplayTable from '../../components2020/TokenDisplayTable';
import Example from '../../components2020/Example';
import TokenNavigation from '../../components2020/TokenNavigation';
import SectionTitle from '../../components2020/SectionTitle';
import SectionHeader from '../../components2020/SectionHeader';
import locale from './locale';
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
          <Badge color="pastel">
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
      <div className="site-con">
        <div className="site-con site-banner-con-elevation">
          <div className='site-warp fix-margin site-banner-normal'>
            <p className='site-banner-normal-title'>Elevation<span>Tokens</span></p>
            <div className='site-banner-share'>
              <Button
                ariaLabel='Figma'
                className='md-button--dark-gray site-banner-share_figma'
                size={52}
              >Figma</Button>
              <Button
                ariaLabel='IGithub'
                className='md-button--dark-gray site-banner-share_github'
                size={52}
              >Github</Button>
            </div>
          </div>
        </div>
        <div className='site-warp'>
          <SectionHeader
            title={locale.sectionHeaders.elevation.title}
            leadStr={locale.sectionHeaders.elevation.body}
          />
          <TokenDisplayTable
            className="elevation-token-display-table"
            key="elevation"
            sectionTitleLabel=""
            tableHeaders={["Samples", "Token", "Property", "Value"]}
            tableRows={elevationTokenTableRows()}
          />
          <div className="flex-con-row elevation-purpose-row">
            {[locale.elevationPurpose.higherElevation, locale.elevationPurpose.lowerElevation].map(elevation => (
              <div className="elevation-purpose-row__card">
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
              <img className="site-example-image" src="/assets/2020/elevation-webex-developers-example.png" />
            </div>
          </Example>

          <div className="brightness-mode-container">
            <SectionTitle label={locale.brightnessMode.dayTime.title} />
            <div className="brightness-mode-container__description">{locale.brightnessMode.dayTime.body}</div>
            <div className="flex-con-row brightness-mode-container__example-container">
              {[locale.brightnessMode.dayTime.mode1, locale.brightnessMode.dayTime.mode2].map(mode => (
                <div
                  className="flex-item brightness-mode-container__example-container-card"
                  style={{backgroundColor: mode.backgroundColorValue}}
                >
                  <div>{mode.tileColorLabel}</div>
                  <div className="elevation-multi-card-container">
                    {Object.entries(elevationTokens).map((elevationToken, idx) => (
                      <SampleDropShadowBox
                        key={'white' + idx}
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
            <div className="flex-con-row brightness-mode-container__example-container">
            {[locale.brightnessMode.evening.mode1, locale.brightnessMode.evening.mode2].map(mode => (
              <div
                className="flex-item brightness-mode-container__example-container-card brightness-mode-container__example-container-card-dark"
                style={{backgroundColor: mode.backgroundColorValue}}
              >
                <div>{mode.tileColorLabel}</div>
                <div className="elevation-multi-card-container">
                  {Object.entries(elevationTokens).map((elevationToken, idx) => (
                    <SampleDropShadowBox
                      key={'gray-90' + idx}
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
              <img className="site-example-image" src="/assets/2020/elevation-control-hub-example.png" />
            </div>
          </Example>
          <TokenNavigation
            leftNav={{label: "Typography", url: "/2020/tokens/typography"}}
            rightNav={{label: "Space", url: '/2020/tokens/space'}}
          />
        </div>
      </div>
    );
  }

}

export default Elevation;
