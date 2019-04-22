import React from 'react';
import PropTypes from 'prop-types';
import SubSection from '../../components/SubSection';

class DesignSection extends React.PureComponent {
  render() {
    const { section } = this.props;
    return (
      <div className="docs-section">
        <h4
          className={
            'md-h4--bold' +
            ' md-font-color--alternate' +
            ' docs-section__title'
          }
          id={section.sectionId}
        >
          {section.sectionTitleText}
        </h4>
        {/* eslint-disable react/no-danger */}
        <div
          className="docs-section__body copy-spacing"
          dangerouslySetInnerHTML={{ __html: section.sectionBodyContent }}
        />
        {/* eslint-enable react/no-danger */}
        {
          (section.sectionImage || section.sectionImageDescription)
          && (
            <div
              className={
                'flex-row' +
                `${
                  section.sectionImagePosition
                  &&
                  ` flex-row--${
                      section.sectionImageDescription
                      ?
                      section.sectionImagePosition
                      :
                      'center'
                  }` || ''
                }`
              }
            >
              {
                section.sectionImage
                &&
                <div className={`medium-${section.sectionImageSize} columns`} >
                  <img src={section.sectionImage} alt={section.sectionImageDescription} />
                </div>
              }
              {
                section.sectionImageDescription
                &&
                <div
                  className={`medium-${12 - section.sectionImageSize} columns`}
                  /* eslint-disable react/no-danger */
                  dangerouslySetInnerHTML={{ __html: section.sectionImageDescription }}
                  /* eslint-enable react/no-danger */
                />
              }
            </div>
          )
        }
        {section.subSections &&
          section.subSections.map((subSection, idx) => {
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
