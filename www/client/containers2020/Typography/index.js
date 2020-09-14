import React from 'react';
import { Button } from '@momentum-ui/react';
import { Badge } from '@momentum-ui/react';
import TokenDisplayTable from '../../components2020/TokenDisplayTable';
import Example from '../../components2020/Example';
import TokenNavigation from '../../components2020/TokenNavigation';
import SectionHeader from '../../components2020/SectionHeader';
const textTokens = require('@momentum-ui/tokens/src/core/font.js');
const lineHeightTokens = require('@momentum-ui/tokens/src/core/lineHeight.js');

class Typography extends React.PureComponent {

  render() {
    const SampleTextBlock = ({fontSize}) => (
      <div className="sample-text-block" style={{fontSize: fontSize}}>
        A long time ago in a galaxy far, far away....
      </div>
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
          <Badge color="pastel">
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
          <Badge color="pastel">
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
          <Badge color="pastel">
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
          <Badge color="pastel">
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

    const subTitle = (
      <div className='flex-con-row site-subtitle site-subtitle-color'>
        <div className='flex-item'>
          <h1>Typography</h1>
        </div>
        <div className='flex-item flex-margin'>
          <p>Our typography is the physical representation of our brand's voice. We use type to establish visual hierarchy through style, weight, and color to support deliberate communications.</p>
        </div>
      </div>
    );

    return (
      <div className="site-con">
        <div className="site-con site-banner-con-typography">
          <div className='site-warp fix-margin site-banner-normal'>
            <p className='site-banner-normal-title'>Typography<span>Tokens</span></p>
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
            title="Typography"
            leadStr="Our typography is the physical representation of our brand's voice. We use type to establish visual hierarchy through style, weight, and color to support deliberate communications."
          />
          <TokenDisplayTable
            key="font-sizes"
            sectionTitleLabel="Font Size (web)"
            sectionTitleTrailing={
              <div>
                <h4>Design Token for Web and End-point</h4>
              </div>
            }
            tableHeaders={["Sample", "Token", "Property", "Value (pt)", "Typeface"]}
            tableRows={fontSizeTokenTableRows()}
          />
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
            innerPadding="57px 0 0 0"
            subtitle="Example: Control Hub"
          >
            <img className="example-img" src="/assets/2020/typography-control-hub-example.png" />
          </Example>
          <Example
            subtitle="Example: Webex.com"
          >
            <img className="example-img" src="/assets/2020/typography-webex-example.png" />
          </Example>
          <TokenNavigation
            leftNav={{label: "Colors", url: '/2020/tokens/color'}}
            rightNav={{label: "Elevation", url: "/2020/tokens/elevation"}}
          />
        </div>
      </div>
    );
  }

}

export default Typography;
