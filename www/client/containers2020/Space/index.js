import React from 'react';
import { Button } from '@momentum-ui/react';
import { Badge } from '@momentum-ui/react';
import TokenDisplayTable from '../../components2020/TokenDisplayTable';
import Example from '../../components2020/Example';
import TokenNavigation from '../../components2020/TokenNavigation';
import SectionHeader from '../../components2020/SectionHeader';
import SectionTitle from '../../components2020/SectionTitle';
import locale from './locale';
const spaceTokens = require('@momentum-ui/tokens/src/core/space.js');

class Space extends React.PureComponent {

  render() {
    // Takes a string like xxSmall and returns xx-small
    const xDashSize = (inputStr) => {
      const startWithX = new RegExp('x+');
      const xMatch = inputStr.match(startWithX)
      return inputStr.replace(startWithX, xMatch + "-").toLowerCase();
    }

    // Accepts a type string ("space", "inline", "inset", ...)
    const spaceTokenTableRows = (type, descriptionText) => {
      let tableRows = [];

      const tokenProperty = "space_" + type;

      Object.entries(spaceTokens[type]).forEach((space, index) => {
        const spaceSizeType = xDashSize(space[0]);
        const spaceSizeValue = space[1];
        const spaceSizeTokenName = (
          <Badge className="token-table-badge" color="pastel">
            {tokenProperty + "_" + spaceSizeType}
          </Badge>
        );

        const descriptionTextContainer = index === 0
          ? <h5 className="space-token-description-text">{ descriptionText }</h5>
          : null;

        tableRows.push([
          descriptionTextContainer,
          spaceSizeTokenName,
          spaceSizeValue,
        ]);
      })

      return tableRows;
    }

    return (
      <div className="site-con">
        <div className="site-con site-banner-con-space">
          <div className='site-warp fix-margin site-banner-normal'>
            <p className='site-banner-normal-title'>Space<span>Tokens</span></p>
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
            title={locale.sectionHeaders.space.title}
            leadStr={locale.sectionHeaders.space.body}
          />
          <div className="flex-con-row space-token-row">
            <div className="flex-item">
              <TokenDisplayTable
                key="space-stack"
                sectionTitleLabel="Stack"
                tableHeaders={["Description", "Token", "Value"]}
                tableRows={spaceTokenTableRows("stack", locale.tokenTables.stack.description)}
              />
            </div>
            <div className="flex-item">
              <Example className="custom-side-example">
                <div className="spacing-example">
                  <img src="/assets/2020/space-stack-example.png" />
                </div>
              </Example>
            </div>
          </div>
          <div className="flex-con-row space-token-row">
            <div className="flex-item">
              <TokenDisplayTable
                key="space-inline"
                sectionTitleLabel="Inline"
                tableHeaders={["Description", "Token", "Value"]}
                tableRows={spaceTokenTableRows("inline", locale.tokenTables.inline.description)}
              />
            </div>
            <div className="flex-item">
              <Example className="custom-side-example">
                <div className="spacing-example">
                  <img src="/assets/2020/space-inline-example.png" />
                </div>
              </Example>
            </div>
          </div>
          <div className="flex-con-row space-token-row">
            <div className="flex-item">
              <TokenDisplayTable
                key="space-inset"
                sectionTitleLabel="Inset"
                tableHeaders={["Description", "Token", "Value"]}
                tableRows={spaceTokenTableRows("inset", locale.tokenTables.inset.description)}
              />
            </div>
            <div className="flex-item">
              <Example className="custom-side-example">
                <div className="spacing-inset-example">
                  <img className="site-example-image" src="/assets/2020/space-inset-example.png" />
                </div>
              </Example>
            </div>
          </div>
          <div className="flex-con-row space-token-row">
            <div className="flex-item">
              <SectionTitle
                label="Exceptions"
              />
              <h5 className="space-token-description-text space-exception-text">{locale.tokenTables.exception.description}</h5>
            </div>
            <div className="flex-item">
              <Example className="custom-side-example">
                <div className="spacing-exception-example">
                  <img src="/assets/2020/space-exception-example.png" />
                </div>
              </Example>
            </div>
          </div>
          <Example
            subtitle="Example: Control Hub"
          >
            <div className="spacing-control-hub-example">
              <img className="site-example-image" src="/assets/2020/space-webex-teams-example.png" />
            </div>
          </Example>
          <TokenNavigation 
            rightNav={{label: "Colors", url: '/2020/tokens/color'}}
            leftNav={{label: "Elevation", url: "/2020/tokens/elevation"}}
          />
        </div>
      </div>
    );
  }

}

export default Space;
