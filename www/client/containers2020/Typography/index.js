import React from 'react';
import { Badge } from '@momentum-ui/react';
import TokenDisplayTable from '../../components2020/TokenDisplayTable';
import Example from '../../components2020/Example';
import TokenNavigation from '../../components2020/TokenNavigation';
import SectionHeader from '../../components2020/SectionHeader';
import locale from './locale';
import PageHero from '../../components2020/PageHero';

// Import page images
import typographyBanner from '../../assets/2020/banner-typography.svg';
import controlHubExample from '../../assets/2020/typography-control-hub-example.png';
import webexExample from '../../assets/2020/typography-webex-example.png';

const textTokens = require('@momentum-ui/tokens/src/core/font.js');
const lineHeightTokens = require('@momentum-ui/tokens/src/core/lineHeight.js');

class Typography extends React.PureComponent {

  render() {
    const SampleTextBlock = ({fontSize}) => (
      <p className="sample-text-block" style={{fontSize: fontSize}}>
        A long time ago in a galaxy far, far away....
      </p>
    );

    // Takes a string like xxSmall and returns xx-small
    const xDashSize = (inputStr) => {
      const startWithX = new RegExp('x+');
      const xMatch = inputStr.match(startWithX)
      return inputStr.replace(startWithX, xMatch + "-").toLowerCase();
    }

    const fontSizeTokenTableRows = () => {
      let tableRows = [];

      const typeFace = "Cisco Sans";
      const tokenProperty = "font-size";

      Object.entries(textTokens.fontSize).forEach(fontSize => {
        const fontSizeType = xDashSize(fontSize[0]);
        const fontSizeValue = fontSize[1];
        const fontSizeSampleText = <SampleTextBlock fontSize={fontSizeValue} />;
        const fontSizeTokenName = (
          <Badge className="token-table-badge" color="pastel">
            {tokenProperty + "_" + fontSizeType}
          </Badge>
        );
        const fontSizeDisplayValue = fontSizeValue.split("px")[0];

        tableRows.push([
          fontSizeSampleText,
          fontSizeTokenName,
          tokenProperty,
          fontSizeDisplayValue,
          typeFace
        ]);
      })

      return tableRows;
    }

    const fontWeightTokenTable = () => {
      let tableRows = [];

      const tokenProperty = "font-weight";
      Object.entries(textTokens.fontWeight).forEach(fontWeight => {
        const fontWeightType = fontWeight[0];
        const fontWeightValue = fontWeight[1];
        const fontWeightTokenName = (
          <Badge className="token-table-badge" color="pastel">
            {tokenProperty + "_" + fontWeightType}
          </Badge>
        );

        tableRows.push([
          fontWeightTokenName,
          tokenProperty,
          fontWeightValue
        ])
      });

      return tableRows;
    }

    const lineHeightTokenTableRows = () => {
      let tableRows = [];

      const tokenProperty = "line-height";
      Object.entries(lineHeightTokens).forEach(lineHeight => {
        const lineHeightType = lineHeight[0];
        const lineHeightValue = (lineHeight[1] * 100) + "%";
        const lineHeightTokenName = (
          <Badge className="token-table-badge" color="pastel">
            {tokenProperty + "_" + lineHeightType}
          </Badge>
        );

        tableRows.push([
          lineHeightTokenName,
          tokenProperty,
          lineHeightValue
        ]);
      });

      return tableRows;
    }

    const fontScaleTokenTableRows = () => {
      let tableRows = [];

      const tokenProperty = "font-scale";
      Object.entries(textTokens.fontScale).forEach(fontScale => {
        const fontScaleType = fontScale[0];
        const fontScaleValue = "--";
        const fontScaleProperty = fontScale[1]
        const fontScaleTokenName = (
          <Badge className="token-table-badge" color="pastel">
            {tokenProperty + "_" + fontScaleType}
          </Badge>
        );

        tableRows.push([
          fontScaleTokenName,
          fontScaleProperty,
          fontScaleValue
        ]);
      });

      return tableRows;
    } 

    return (
      <div className="site-con page-body-buffer">
        <PageHero
          backgroundColor='#F5EAA2'
          backgroundImage={typographyBanner}
          backgroundSize='600px'
          figmaURL="https://www.figma.com/file/zktddifdcJ47X9m12xVVfy/Core-Styles?node-id=494%3A344"
          githubURL="https://github.com/momentum-design/momentum-ui/blob/main/tokens/data/font.json"
          heroTitle='Typography'
        />
        <div className='site-warp scrollable-body-wrapper'>
          <SectionHeader
            title={locale.sectionHeaders.typography.title}
            leadStr={locale.sectionHeaders.typography.body}
          />
          <div className="typography-font-size-table">
            <TokenDisplayTable
              key="font-sizes"
              sectionTitleLabel="Font Size (web)"
              sectionTitleTrailing={
                <div>
                  <h4 className="font-size-section-title-trailing">Design Token for Web</h4>
                </div>
              }
              tableHeaders={["Sample", "Token", "Property", "Value (pt)", "Typeface"]}
              tableRows={fontSizeTokenTableRows()}
            />
          </div>
          <div className="flex-con-row token-display-table-row">
            <div className="flex-item">
              <TokenDisplayTable
                key="font-weights"
                sectionTitleLabel="Font Weight"
                tableHeaders={["Token", "Property", "Value"]}
                tableRows={fontWeightTokenTable()}
              />
            </div>
            <div className="flex-item">
              <TokenDisplayTable
                key="line-heights"
                sectionTitleLabel="Line Height"
                tableHeaders={["Token", "Property", "Value"]}
                tableRows={lineHeightTokenTableRows()}
              />
            </div>
            <div className="flex-item">
              <TokenDisplayTable
                key="font-scales"
                sectionTitleLabel="Font Scale"
                tableHeaders={["Token", "Property", "Value"]}
                tableRows={fontScaleTokenTableRows()}
              />
            </div>
          </div>
          <Example
            subtitle="Example: Control Hub"
          >
            <div className="typography-control-hub-example">
              <img className="site-example-image" src={controlHubExample} />
            </div>
          </Example>
          <Example
            subtitle="Example: Webex.com"
          >
            <div className="typography-webex-example">
              <img className="site-example-image" src={webexExample} />
            </div>
          </Example>
          <TokenNavigation
            leftNav={{label: "Colors", url: '/tokens/color'}}
            rightNav={{label: "Elevation", url: "/tokens/elevation"}}
          />
        </div>
      </div>
    );
  }

}

export default Typography;
