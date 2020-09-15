import React from 'react';
import { Button } from '@momentum-ui/react';
import { Badge } from '@momentum-ui/react';
import TokenDisplayTable from '../../components2020/TokenDisplayTable';
import Example from '../../components2020/Example';
import TokenNavigation from '../../components2020/TokenNavigation';
import SectionHeader from '../../components2020/SectionHeader';
import locale from './locale';
const buttonTokens = require('@momentum-ui/tokens/src/core/buttonTokens.js');

class Color extends React.PureComponent {

  render() {
    const ColorBlock = ({hexColorString}) => (
      <div className="sample-color-block" style={{background: hexColorString}}></div>
    );

    const buttonTokenTableRows = (darkTheme) => {
      let tableRows = [];
      Object.entries(buttonTokens).forEach(token => {
        const tokenValues = darkTheme ? token[1].dark : token[1].light;
        const baseTokenName = token[1].baseTokenName;

        Object.entries(tokenValues).forEach(tokenValue => {
          const buttonTokenType = tokenValue[0] === "normal" ? "" : `-${tokenValue[0]}`;
          const buttonCoreToken = tokenValue[1].name.split("$md-")[1];
          const tokenLabelString = baseTokenName + buttonTokenType + (darkTheme ? "-darkUi" : "-lightUi");
          const tokenLabel = (
            <Badge
              key={tokenLabelString}
              className={darkTheme ? "dark-theme-badge" : ""}
              color={darkTheme ? "" : "pastel"}
            >
              <div>{tokenLabelString}</div>
            </Badge>
          );
          const colorSample = <ColorBlock hexColorString={tokenValue[1].hex} />;
          const coreToken = (
            <Badge
              key={tokenLabelString + buttonCoreToken}
              className={darkTheme ? "dark-theme-badge" : ""}
              color={darkTheme ? "" : "pastel"}
            >
              <div>{buttonCoreToken}</div>
            </Badge>
          );
          const tokenHex = <div>{tokenValue[1].hex.split("#")[1]}</div>;
  
          tableRows.push([
            colorSample,
            tokenLabel,
            coreToken,
            tokenHex
          ]);
        })
      });

      return tableRows;
    }

    return (
      <div className="site-con">
        <div className="site-con site-banner-con-color">
          <div className='site-warp fix-margin site-banner-normal'>
            <p className='site-banner-normal-title'>Color<span>Tokens</span></p>
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
            title={locale.sectionHeaders.semanticColor.title}
            leadStr={locale.sectionHeaders.semanticColor.body}
          />
          <div className="flex-con-row">
            <div className="flex-item display-table-card-container">
              <TokenDisplayTable
                key="button-colors-light"
                sectionTitleLabel="Buttons"
                sectionTitleTrailing={
                  <Badge color="green-pastel" rounded>
                    <div className="section-title__trailing-badge">Stable</div>
                  </Badge>
                }
                tableHeaders={["Sample", "Token", "coreToken", "HEX"]}
                tableRows={buttonTokenTableRows()}
              />
            </div>
            <div className="flex-item display-table-card-container-dark">
              <TokenDisplayTable
                key="button-colors-dark"
                darkTheme
                sectionTitleLabel="Buttons"
                sectionTitleTrailing={
                  <Badge color="green-pastel" rounded>
                    <div className="section-title__trailing-badge">Stable</div>
                  </Badge>
                }
                tableHeaders={["Sample", "Token", "coreToken", "HEX"]}
                tableRows={buttonTokenTableRows(true)}
              />
            </div>
          </div>
          <Example
            subtitle="Example: Control Hub"
          >
            <div className="color-example">
              <img className="site-example-image" src="/assets/2020/color-control-hub-example.png" />
            </div>
          </Example>
          <TokenNavigation
            leftNav={{label: "Space", url: '/2020/tokens/space'}}
            rightNav={{label: "Typography", url: "/2020/tokens/typography"}}
          />
        </div>
      </div>
    );
  }

}

export default Color;
