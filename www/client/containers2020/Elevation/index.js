import React from 'react';
import { Button } from '@momentum-ui/react';
import { Badge } from '@momentum-ui/react';
import TokenDisplayTable from '../../components2020/TokenDisplayTable';
import Example from '../../components2020/Example';
import TokenNavigation from '../../components2020/TokenNavigation';
import SectionTitle from '../../components2020/SectionTitle';
import SectionHeader from '../../components2020/SectionHeader';
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
          // const dropShadowValues = elevationValue.boxShadow.split(', ');
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
            title="Elevation"
            leadStr="Elevation enables us to create areas of emphasis, priority, and focus throughout our experiences. We use two elevation types: Lower to build a sense of foundation and higher to draw attention to important moments."
          />
          <TokenDisplayTable
            className="elevation-token-display-table"
            key="elevation"
            sectionTitleLabel=""
            tableHeaders={["Samples", "Token", "Property", "Value"]}
            tableRows={elevationTokenTableRows()}
          />
          <div className="flex-con-row elevation-purpose-row">
            <div className="elevation-purpose-row__card">
              <h4>Higher elevations</h4>
              <div className="elevation-purpose-row__card-purpose">Create a focal point that draw focus on particular moments in our experiences like dialogs or pop-overs</div>
              <div className="elevation-sample-box elevation-sample-box__lg" style={{filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.2)) drop-shadow(0px 1px rgba(0,0,0,0.12))"}}></div>
              <div className="elevation-purpose-row__card-caption">elevation-4</div>
            </div>
            <div className="elevation-purpose-row__card">
              <h4>Lower elevations</h4>
              <div className="elevation-purpose-row__card-purpose">Used to ground and create a sense of foundation and connected-ness such as tiles and cards.</div>
              <div className="elevation-sample-box elevation-sample-box__lg" style={{filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.16)) drop-shadow(0px 1px rgba(0,0,0,0.18))"}}></div>
              <div className="elevation-purpose-row__card-caption">elevation-1</div>
            </div>
          </div>
          <Example
            subtitle="Example: Webex for Developers"
          >
            <img className="example-img" src="/assets/2020/elevation-webex-developers-example.png" />
          </Example>

          <div className="brightness-mode-container">
            <SectionTitle label="Day time (light modes)" />
            <div className="brightness-mode-container__description">Shadows are more perceivable in light modes. This is naturally tied to our physical day time environments</div>
            <div className="flex-con-row brightness-mode-container__example-container">
              <div className="flex-item brightness-mode-container__example-container-card" style={{backgroundColor: '#F7F7F7'}}>
                <div>tile-color: white</div>
                <div className="elevation-multi-card-container">
                  {Object.entries(elevationTokens).map((elevationToken, idx) => (
                    <SampleDropShadowBox
                      key={'white' + idx}
                      size="md"
                      dropShadow={elevationToken[1].boxShadow ? dropShadowStr(elevationToken[1].boxShadow) : null}
                    />
                  ))}
                </div>
                <div>background-color:  gray-05</div>
              </div>
              <div className="flex-item brightness-mode-container__example-container-card" style={{backgroundColor: '#EDEDED'}}>
                <div>tile-color: gray-05</div>
                <div className="elevation-multi-card-container">
                  {Object.entries(elevationTokens).map((elevationToken, idx) => (
                    <SampleDropShadowBox
                      key={'gray-05' + idx}
                      size="md"
                      style={{backgroundColor: '#F7F7F7'}}
                      dropShadow={elevationToken[1].boxShadow ? dropShadowStr(elevationToken[1].boxShadow) : null}
                    />
                  ))}
                </div>
                <div>background-color:  gray-10</div>
              </div>
            </div>
          </div>

          <div className="brightness-mode-container brightness-mode-container">
            <SectionTitle label="Evening (dark modes)" />
            <div className="brightness-mode-container__description">Shadows are less perceivable in dark modes. this is naturally tied to our physical night time environments.</div>
            <div className="flex-con-row brightness-mode-container__example-container">
              <div className="flex-item brightness-mode-container__example-container-card brightness-mode-container__example-container-card-dark" style={{backgroundColor: '#1C1C1C'}}>
                <div>tile-color: gray-90</div>
                <div className="elevation-multi-card-container">
                  {Object.entries(elevationTokens).map((elevationToken, idx) => (
                    <SampleDropShadowBox
                      key={'gray-90' + idx}
                      size="md"
                      style={{backgroundColor: '#292929', border: 'none'}}
                      dropShadow={elevationToken[1].boxShadow ? dropShadowStr(elevationToken[1].boxShadow) : null}
                    />
                  ))}
                </div>
                <div>background-color:  gray-95</div>
              </div>
              <div className="flex-item brightness-mode-container__example-container-card brightness-mode-container__example-container-card-dark" style={{backgroundColor: '#121212'}}>
                <div>tile-color: gray-95</div>
                <div className="elevation-multi-card-container">
                  {Object.entries(elevationTokens).map((elevationToken, idx) => (
                    <SampleDropShadowBox
                      key={'gray-95' + idx}
                      size="md"
                      style={{backgroundColor: '#1C1C1C', border: 'none'}}
                      dropShadow={elevationToken[1].boxShadow ? dropShadowStr(elevationToken[1].boxShadow) : null}
                    />
                  ))}
                </div>
                <div>background-color:  gray-100</div>
              </div>
            </div>
          </div>

          <Example
            innerPadding="57px 0 0 0"
            subtitle="Example: Control Hub"
          >
            <img className="example-img" src="/assets/2020/elevation-control-hub-example.png" />
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
