import React from 'react';
import { Badge } from '@momentum-ui/react';
import TokenDisplayTable from '../../components2020/TokenDisplayTable';
import Example from '../../components2020/Example';
import TokenNavigation from '../../components2020/TokenNavigation';
import SectionHeader from '../../components2020/SectionHeader';
import SectionTitle from '../../components2020/SectionTitle';
import locale from './locale';
import PageHero from '../../components2020/PageHero';

// Import page images
import spaceBanner from '../../assets/2020/banner-space.svg';
import stackExample from '../../assets/2020/space-stack-example.png';
import inlineExample from '../../assets/2020/space-inline-example.png';
import insetExample from '../../assets/2020/space-inset-example.png';
import exceptionExample from '../../assets/2020/space-exception-example.png';
import webexTeamsExample from '../../assets/2020/space-webex-teams-example.png';

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
      <div className="site-con page-body-buffer">
        <PageHero
          backgroundColor='#FFE0E7'
          backgroundImage={spaceBanner}
          backgroundSize='450px'
          figmaURL='https://www.figma.com/file/zktddifdcJ47X9m12xVVfy/Core-Styles?node-id=2647%3A661'
          githubURL='https://github.com/momentum-design/momentum-ui/blob/main/tokens/data/space.json'
          heroTitle='Space'
        />
        <div className='site-warp scrollable-body-wrapper'>
          <SectionHeader
            title={locale.sectionHeaders.space.title}
            leadStr={locale.sectionHeaders.space.body}
          />
          <div className="site-responsive-row space-token-row">
            <TokenDisplayTable
              key="space-stack"
              sectionTitleLabel="Stack"
              tableHeaders={["Description", "Token", "Value"]}
              tableRows={spaceTokenTableRows("stack", locale.tokenTables.stack.description)}
            />
            <Example className="custom-side-example">
              <div className="spacing-example">
                <img src={stackExample} />
              </div>
            </Example>
          </div>
          <div className="site-responsive-row space-token-row">
            <TokenDisplayTable
              key="space-inline"
              sectionTitleLabel="Inline"
              tableHeaders={["Description", "Token", "Value"]}
              tableRows={spaceTokenTableRows("inline", locale.tokenTables.inline.description)}
            />
            <Example className="custom-side-example">
              <div className="spacing-example">
                <img src={inlineExample} />
              </div>
            </Example>
          </div>
          <div className="site-responsive-row space-token-row">
            <TokenDisplayTable
              key="space-inset"
              sectionTitleLabel="Inset"
              tableHeaders={["Description", "Token", "Value"]}
              tableRows={spaceTokenTableRows("inset", locale.tokenTables.inset.description)}
            />
            <Example className="custom-side-example">
              <div className="spacing-inset-example">
                <img className="site-example-image" src={insetExample} />
              </div>
            </Example>
          </div>
          <div className="site-responsive-row space-token-row">
            <div>
              <SectionTitle
                label="Exceptions"
              />
              <h5 className="space-token-description-text space-exception-text">{locale.tokenTables.exception.description}</h5>
            </div>
            <Example className="custom-side-example">
              <div className="spacing-exception-example">
                <img src={exceptionExample} />
              </div>
            </Example>
          </div>
          <Example
            subtitle="Example: Control Hub"
          >
            <div className="spacing-control-hub-example">
              <img className="site-example-image" src={webexTeamsExample} />
            </div>
          </Example>
          <TokenNavigation 
            rightNav={{label: "Colors", url: '/tokens/color'}}
            leftNav={{label: "Elevation", url: "/tokens/elevation"}}
          />
        </div>
      </div>
    );
  }

}

export default Space;
