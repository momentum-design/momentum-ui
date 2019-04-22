import React from 'react';
import PropTypes from 'prop-types';

class SubSection extends React.PureComponent {
  render() {
    const { subSection } = this.props;

    return (
      <div className='docs-sub-section'>
        <h5
          className={
            'md-h4--bold' +
            ' md-font-color--alternate' +
            ' docs-sub-section__title'
          }
          id={subSection.subSectionId}
        >
          {subSection.subSectionTitleText}
        </h5>
        {/* eslint-disable react/no-danger */}
        <div
          className='docs-sub-section__body copy-spacing'
          dangerouslySetInnerHTML={{ __html: subSection.subSectionBodyContent }}
        />
        {/* eslint-enable react/no-danger */}
        {
          (subSection.subSectionImage || subSection.subSectionImageDescription)
          &&
          <div
            className={
              'flex-row' +
              `${
                subSection.subSectionImagePosition
                &&
                ` flex-row--${
                    subSection.subSectionImageDescription
                    ?
                    subSection.subSectionImagePosition
                    : 'center'
                }` || ''
              }`
            }
          >
            {
              subSection.subSectionImage
              &&
              <div className={`docs-sub-section__image-section medium-${subSection.subSectionImageSize} columns`}>
                <img src={subSection.subSectionImage} alt={subSection.subSectionImageDescription} />
              </div>
            }
            {
              subSection.subSectionImageDescription
              &&
              <div
                className={`medium-${12 - subSection.subSectionImageSize} columns`}
                /* eslint-disable react/no-danger */
                dangerouslySetInnerHTML={{ __html: subSection.subSectionImageDescription }}
                /* eslint-enable react/no-danger */
              />
            }
          </div>
        }
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
