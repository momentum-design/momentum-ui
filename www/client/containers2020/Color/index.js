import React from 'react';
import { Badge } from '@momentum-ui/react';
import TokenDisplayTable from '../../components2020/TokenDisplayTable';
import Example from '../../components2020/Example';
import TokenNavigation from '../../components2020/TokenNavigation';
import SectionHeader from '../../components2020/SectionHeader';
import locale from './locale';
import PageHero from '../../components2020/PageHero';

// Import page images
import colorBanner from '../../assets/2020/banner-color.svg';
import controlHubExample from '../../assets/2020/color-control-hub-example.png';
import webexExample from '../../assets/2020/color-webex-example.png';

const semanticColor = require('@momentum-ui/tokens/src/core/semanticColor.js');
const colors = require("@momentum-ui/tokens/src/core/colors.js");

class Color extends React.PureComponent {

  render() {
    const ColorBlock = ({hexColorString}) => (
      <div className="sample-color-block" style={{background: hexColorString}}></div>
    );

    const tokenNameUpdate = (base, suffix) => {
      const toIgnore = ["bg-color", "color"];

      if (toIgnore.includes(suffix)) {
        return base;
      } else if (suffix === "text-color") {
        return base + "-" + "text";
      }

      return base + "-" + suffix;
    }

    const createAndPushTableRows = (darkTheme, value, tokenName, lightTableRows, darkTableRows) => {
      let coreTokenSplit = value;
      let coreTokenLabelString = value;
      let colorObject;
      let hexValue;
      let colorSample;
      if (value !== 'none') {
        coreTokenSplit = value.split("-");
        colorObject = colors[coreTokenSplit[1]];
        hexValue = coreTokenSplit[2] ? colorObject[coreTokenSplit[2]].hex : colorObject.default.hex;
        colorSample = <ColorBlock hexColorString={hexValue} />;
        coreTokenLabelString = coreTokenSplit[1] + (coreTokenSplit[2] ? "-" + coreTokenSplit[2] : '');
      }
      const tokenLabelString = tokenName + "Ui";
      const tokenLabel = (
        <Badge
          key={tokenLabelString}
          className={"token-table-badge" + (darkTheme ? " dark-theme-badge" : "")}
          color={darkTheme ? "" : "pastel"}
        >
          <div>{tokenLabelString}</div>
        </Badge>
      );
      const coreTokenLabel = (
        <Badge
          key={tokenLabelString + coreTokenLabelString}
          className={"token-table-badge" + (darkTheme ? " dark-theme-badge" : "")}
          color={darkTheme ? "" : "pastel"}
        >
          <div>{coreTokenLabelString}</div>
        </Badge>
      );
      const tokenHex = <div>{hexValue ? hexValue.split("#")[1] : '-'}</div>
      const newRow = [colorSample, tokenLabel, coreTokenLabel, tokenHex];
      if (darkTheme) {
        darkTableRows.push(newRow);
      } else {
        lightTableRows.push(newRow);
      }
    }

    const recursiveTableRowsHelper = (componentObj, baseTokenName) => {
      let lightTableRows = [];
      let darkTableRows = [];
      Object.entries(componentObj).forEach(comp => {
        let tokenName = tokenNameUpdate(baseTokenName, comp[0]);
        let value = comp[1];

        if (typeof value === "string") {
          const darkTheme = comp[0] === 'dark';
          createAndPushTableRows(darkTheme, value, tokenName, lightTableRows, darkTableRows);
        } else {
          const [newLightTableRows, newDarkTableRows] = recursiveTableRowsHelper(value, tokenName)
          lightTableRows = lightTableRows.concat(newLightTableRows);
          darkTableRows = darkTableRows.concat(newDarkTableRows);
        }
      });

      return [lightTableRows, darkTableRows];
    }

    const semanticColorTokenTableRows = (component) => {
      let lightTableRows = [];
      let darkTableRows = [];
      const baseTokenName = semanticColor[component].component;
      Object.entries(semanticColor[component]).forEach((token, index) => {
        if (index >= 2) {
          const tokenValues = token[1];
          const baseComponentName = baseTokenName + '-' + token[0];
          const [newLightTableRows, newDarkTableRows] = recursiveTableRowsHelper(tokenValues, baseComponentName);
          lightTableRows = lightTableRows.concat(newLightTableRows);
          darkTableRows = darkTableRows.concat(newDarkTableRows);
        }
      });

      return [lightTableRows, darkTableRows];
    }

    return (
      <div className="site-con page-body-buffer">
        <PageHero
          backgroundColor='#E5F8FF'
          backgroundImage={colorBanner}
          figmaURL='https://www.figma.com/file/zktddifdcJ47X9m12xVVfy/Core-Styles?node-id=3519%3A749'
          githubURL='https://github.com/momentum-design/momentum-ui/blob/main/tokens/data/semanticColor.json'
          heroTitle='Color'
        />
        <div className='site-warp scrollable-body-wrapper'>
          <SectionHeader
            title={locale.sectionHeaders.semanticColor.title}
            leadStr={locale.sectionHeaders.semanticColor.body}
          />
          <div className="site-responsive-row">
            {semanticColorTokenTableRows('buttons').map((tableRows, idx) => (
              <div
                className={"display-table-card-container" + (idx > 0 ? '-dark' : '')}
                key={"button-colors-" + idx}
              >
                <TokenDisplayTable
                  darkTheme={idx > 0}
                  sectionTitleLabel="Buttons"
                  tableHeaders={["Sample", "Token", "coreToken", "HEX"]}
                  tableRows={tableRows}
                />
              </div>
            ))}
          </div>
          <Example
            subtitle="Example: Control Hub"
          >
            <div className="color-example">
              <img className="site-example-image" src={controlHubExample} />
            </div>
          </Example>
          <div className="site-responsive-row">
            {semanticColorTokenTableRows('inputs').map((tableRows, idx) => (
              <div
                className={"display-table-card-container" + (idx > 0 ? '-dark' : '')}
                key={"input-colors-" + idx}
              >
                <TokenDisplayTable
                  darkTheme={idx > 0}
                  sectionTitleLabel="Inputs"
                  tableHeaders={["Sample", "Token", "coreToken", "HEX"]}
                  tableRows={tableRows}
                />
              </div>
            ))}
            {semanticColorTokenTableRows('textColor').map((tableRows, idx) => (
              <div
                className={"display-table-card-container" + (idx > 0 ? '-dark' : '')}
                key={"text-color-colors-" + idx}
              >
                <TokenDisplayTable
                  darkTheme={idx > 0}
                  sectionTitleLabel="Text-color"
                  tableHeaders={["Sample", "Token", "coreToken", "HEX"]}
                  tableRows={tableRows}
                />
              </div>
            ))}
            {semanticColorTokenTableRows('backgrounds').map((tableRows, idx) => (
              <div
                className={"display-table-card-container" + (idx > 0 ? '-dark' : '')}
                key={"backgrounds-colors-" + idx}
              >
                <TokenDisplayTable
                  darkTheme={idx > 0}
                  sectionTitleLabel="Backgrounds"
                  tableHeaders={["Sample", "Token", "coreToken", "HEX"]}
                  tableRows={tableRows}
                />
              </div>
            ))}
            {semanticColorTokenTableRows('presence').map((tableRows, idx) => (
              <div
                className={"display-table-card-container" + (idx > 0 ? '-dark' : '')}
                key={"presence-colors-" + idx}
              >
                <TokenDisplayTable
                  darkTheme={idx > 0}
                  sectionTitleLabel="Presence"
                  tableHeaders={["Sample", "Token", "coreToken", "HEX"]}
                  tableRows={tableRows}
                />
              </div>
            ))}
            {semanticColorTokenTableRows('alerts').map((tableRows, idx) => (
              <div
                className={"display-table-card-container" + (idx > 0 ? '-dark' : '')}
                key={"alerts-colors-" + idx}
              >
                <TokenDisplayTable
                  darkTheme={idx > 0}
                  sectionTitleLabel="Alerts"
                  tableHeaders={["Sample", "Token", "coreToken", "HEX"]}
                  tableRows={tableRows}
                />
              </div>
            ))}
            {semanticColorTokenTableRows('avatars').map((tableRows, idx) => (
              <div
                className={"display-table-card-container" + (idx > 0 ? '-dark' : '')}
                key={"avatars-colors-" + idx}
              >
                <TokenDisplayTable
                  darkTheme={idx > 0}
                  sectionTitleLabel="Avatars"
                  tableHeaders={["Sample", "Token", "coreToken", "HEX"]}
                  tableRows={tableRows}
                />
              </div>
            ))}
          </div>
          <Example
            subtitle="Example: Webex.com"
          >
            <div className="color-example">
              <img className="site-example-image" src={webexExample} />
            </div>
          </Example>
          <div className="site-responsive-row">
            {semanticColorTokenTableRows('separator').map((tableRows, idx) => (
              <div
                className={"display-table-card-container" + (idx > 0 ? '-dark' : '')}
                key={"separator-colors-" + idx}
              >
                <TokenDisplayTable
                  darkTheme={idx > 0}
                  sectionTitleLabel="Seperator"
                  tableHeaders={["Sample", "Token", "coreToken", "HEX"]}
                  tableRows={tableRows}
                />
              </div>
            ))}
          </div>
          <TokenNavigation
            leftNav={{label: "Space", url: '/tokens/space'}}
            rightNav={{label: "Typography", url: "/tokens/typography"}}
          />
        </div>
      </div>
    );
  }

}

export default Color;
