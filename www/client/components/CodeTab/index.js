import PropTypes from 'prop-types';
import React from 'react';
import Media from 'react-media';
import PageLinks from '../../momentum-ui/PageLinks';
import CodeSection from '../CodeSection';

class CodeTab extends React.PureComponent {
  static displayName = 'CodeTab';

  render() {
    const { sections, codePreference } = this.props;

    const codeSections = sections.sections;

    const findCodeExample = section => {
      return (
        section.variations.core.example
        && { type: 'html', example: section.variations.core.example}
        ||
        section.variations.react.example
        && { type: 'jsx', example: section.variations.react.example}
        ||
        section.variations.angular.example
        && { type: 'ts', example: section.variations.angular.example}
      );
    };

    return (
      <React.Fragment>
        <div className="docs-content__column row">
          {
            codeSections
            &&
            codeSections.map((section, idx) => {
              const codeExample = findCodeExample(section);

              return (
                codeExample
                && section.name !== 'kitchen-sink'
                && (
                  <CodeSection
                    name={section.name}
                    component={sections.name}
                    example={codeExample.example}
                    description={section.description}
                    key={`${section.name}-${idx}`}
                    variations={section.variations}
                  />
                )
              );
            })
          }
          {
            codePreference === "react"
            && sections.props
            && sections.props.react
            && sections.props.react.length >= 0
            && (
              <div className="docs-section">
                <h4 className="md-h4--bold md-font-color--alternate docs-grid__title" id={sections.name + 'Props'}>
                  Prop Types
                </h4>
                <div className="docs-section__table md-table">
                  <div className='md-table-row'>
                    <div className='md-table-head'>Prop</div>
                    <div className='md-table-head'>PropType</div>
                    <div className='md-table-head'>Required</div>
                    <div className='md-table-head'>Default</div>
                    <div className='md-table-head'>Description</div>
                  </div>
                  {
                    sections.props.react.map((prop, idx) => {
                      return (
                        <div className="md-table-row" key={`${prop.name}-${idx}`}>
                          <div className='md-table-cell'>{prop.name}</div>
                          <div className='md-table-cell'>{prop.type}</div>
                          <div className='md-table-cell'>{prop.required}</div>
                          <div className='md-table-cell'>{prop.default}</div>
                          <div className='md-table-cell'>{prop.description}</div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            )
          }
        </div>
        <Media
          query="(min-width: 1025px)"
          render={() => (
            <div className="docs-content__nav">
              <PageLinks links={codeSections} />
            </div>
          )}
        />
      </React.Fragment>
    );
  }
}

CodeTab.propTypes = {
  sections: PropTypes.shape({}),
  codePreference: PropTypes.string.isRequired
};

export default CodeTab;
