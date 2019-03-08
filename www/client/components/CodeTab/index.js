import React from 'react';
import PropTypes from 'prop-types';
import CodeSection from '../CodeSection';
import PageLinks from '../../collab-ui/PageLinks';
import Media from 'react-media';

class CodeTab extends React.PureComponent {
  static displayName = 'CodeTab';

  render() {
    const { sections } = this.props;

    const codeSections = sections.sections;

    const findCodeExample = section => {
      return (
        section.variations.react.example
        && { type: 'jsx', example: section.variations.react.example}
        ||
        section.variations.core.example
        && { type: 'html', example: section.variations.core.example}
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
            sections.props
            && sections.props.react
            && sections.props.react.length >= 0
            && (
              <div className="docs-section docs-grid">
                <h4 className="cui-h4--bold cui-font-color--alternate docs-grid__title" id={sections.name + 'Props'}>
                  Prop Types
                </h4>
                <div className='docs-grid__row'>
                  <div className='docs-grid__cell'>Prop</div>
                  <div className='docs-grid__cell'>PropType</div>
                  <div className='docs-grid__cell'>Required</div>
                  <div className='docs-grid__cell'>Default</div>
                  <div className='docs-grid__cell'>Description</div>
                </div>
                {
                  sections.props.react.map((prop, idx) => {
                    return (
                      <div className="docs-grid__row" key={`${prop.name}-${idx}`}>
                        <div className='docs-grid__cell'>{prop.name}</div>
                        <div className='docs-grid__cell'>{prop.type}</div>
                        <div className='docs-grid__cell'>{prop.required}</div>
                        <div className='docs-grid__cell'>{prop.default}</div>
                        <div className='docs-grid__cell'>{prop.description}</div>
                      </div>
                    );
                  })
                }
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
