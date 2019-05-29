import React from 'react';
import PropTypes from 'prop-types';
import { Tab, TabContent, TabList, TabPane, Tabs } from '@momentum-ui/react';
import SubSection from '../../components/SubSection';

class DesignSection extends React.PureComponent {
  render() {
    const {
      sectionId,
      sectionTitleText,
      sectionBodyContent,
      sectionImage,
      sectionImageDescription,
      sectionImagePosition,
      sectionImageSize,
      sectionImageTabs,
      sectionTableArray,
      subSections,
    } = this.props.section;

    return (
      <div className="docs-section">
        <h4
          className={'md-h4--bold md-font-color--alternate docs-section__title'}
          id={sectionId}
        >
          {sectionTitleText}
        </h4>
        {/* eslint-disable react/no-danger */}
        <div
          className="docs-section__body copy-spacing"
          dangerouslySetInnerHTML={{ __html: sectionBodyContent }}
        />
        {/* eslint-enable react/no-danger */}
        {(sectionImage || sectionImageDescription) && (
          <div
            className={
              'docs-section__image flex-row' +
              `${(sectionImagePosition &&
                ` flex-row--${sectionImageDescription ? sectionImagePosition : 'center'}`) ||
                ''}`
            }
          >
            {sectionImage && (
              <div className={`medium-${sectionImageSize} columns`}>
                <img src={sectionImage} alt={sectionImageDescription} />
              </div>
            )}
            {sectionImageDescription && (
              <div
                className={`medium-${12 - sectionImageSize} columns`}
                /* eslint-disable react/no-danger */
                dangerouslySetInnerHTML={{ __html: sectionImageDescription }}
                /* eslint-enable react/no-danger */
              />
            )}
          </div>
        )}
        {sectionImageTabs && (
          <div className="docs-section__image-tabs">
            <Tabs>
              <TabList>
                {sectionImageTabs.map((tab, idx) => (
                  <Tab
                    key={`${tab.sectionImageTabLabel}-${idx}`}
                    heading={tab.sectionImageTabLabel}
                  />
                ))}
              </TabList>
              <TabContent>
                {sectionImageTabs.map((tab, idx) => (
                  <TabPane key={`${tab.id}-${idx}`}>
                    <img src={tab.subSectionImageTabArray.url} alt={tab.sectionImageTabLabel} />
                  </TabPane>
                ))}
              </TabContent>
            </Tabs>
          </div>
        )}
        {sectionTableArray && (
          <div className="docs-section__table md-table">
            <div className="md-table-row">
              <div className="md-table-head">Element</div>
              <div className="md-table-head">Attribute</div>
              <div className="md-table-head">Value</div>
            </div>
            {sectionTableArray.map((row, idx) => (
              <div className="md-table-row" key={`row-${idx}`}>
                <div className="md-table-cell">{row.element}</div>
                <div className="md-table-cell">{row.attribute}</div>
                <div className="md-table-cell">{row.value}</div>
              </div>
            ))}
          </div>
        )}

        {subSections &&
          subSections.map((subSection, idx) => {
            return <SubSection subSection={subSection} key={idx} />;
          })}
      </div>
    );
  }
}

DesignSection.propTypes = {
  section: PropTypes.object,
};

DesignSection.defaultProps = {};

DesignSection.displayName = 'Section';

export default DesignSection;
