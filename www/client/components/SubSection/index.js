import React from 'react';
import PropTypes from 'prop-types';
import { Tab, TabContent, TabList, TabPane, Tabs } from '@momentum-ui/react';

class SubSection extends React.PureComponent {
  render() {
    const {
      subSectionId,
      subSectionTitleText,
      subSectionBodyContent,
      subSectionImage,
      subSectionImageDescription,
      subSectionImagePosition,
      subSectionImageSize,
      subSectionImageTabs,
      subSectionTableArray,
    } = this.props.subSection;

    return (
      <div className="docs-sub-section">
        <h5
          className="md-h4--bold md-font-color--alternate docs-sub-section__title"
          id={subSectionId}
        >
          {subSectionTitleText}
        </h5>
        {/* eslint-disable react/no-danger */}
        <div
          className="docs-sub-section__body copy-spacing"
          dangerouslySetInnerHTML={{ __html: subSectionBodyContent }}
        />
        {/* eslint-enable react/no-danger */}
        {(subSectionImage || subSectionImageDescription) && (
          <div
            className={
              'flex-row' +
              `${(subSectionImagePosition &&
                ` flex-row--${subSectionImageDescription ? subSectionImagePosition : 'center'}`) ||
                ''}`
            }
          >
            {subSectionImage && (
              <div
                className={`docs-sub-section__image-section medium-${subSectionImageSize} columns`}
              >
                <img src={subSectionImage} alt={subSectionImageDescription} />
              </div>
            )}
            {subSectionImageDescription && (
              <div
                className={`medium-${12 - subSectionImageSize} columns`}
                /* eslint-disable react/no-danger */
                dangerouslySetInnerHTML={{ __html: subSectionImageDescription }}
                /* eslint-enable react/no-danger */
              />
            )}
          </div>
        )}
        {subSectionImageTabs && (
          <div>
            <Tabs>
              <TabList>
                {subSectionImageTabs.map((tab, idx) => (
                  <Tab
                    key={`${tab.sectionImageTabLabel}-${idx}`}
                    heading={tab.sectionImageTabLabel}
                  />
                ))}
              </TabList>
              <TabContent>
                {subSectionImageTabs.map((tab, idx) => (
                  <TabPane key={`${tab.id}-${idx}`}>
                    <img
                    src={tab.subSectionImageTabArray.url} alt={tab.sectionImageTabLabel}
                    />
                  </TabPane>
                ))}
              </TabContent>
            </Tabs>
          </div>
        )}
        {subSectionTableArray && (
          <div className="docs-section__table md-table">
            <div className="md-table-row">
              <div className="md-table-head">Element</div>
              <div className="md-table-head">Attribute</div>
              <div className="md-table-head">Value</div>
            </div>
            {subSectionTableArray.map((row, idx) => (
              <div className="md-table-row" key={`row-${idx}`}>
                <div className="md-table-cell">{row.element}</div>
                <div className="md-table-cell">{row.attribute}</div>
                <div className="md-table-cell">{row.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

SubSection.propTypes = {
  subSection: PropTypes.object.isRequired,
};

SubSection.defaultProps = {};

SubSection.displayName = 'SubSection';

export default SubSection;
