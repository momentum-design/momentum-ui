import React from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../utils';
import NoComponentMatch from '../NoComponentMatch';
import CodeExample from '../CodeExample';

export default class ExampleComponents extends React.Component {
  renderMe(section, component, category) {
    try {
      return require(`../../components/${category}/${component}/${section}.js`)
        .default;
    } catch (e) {
      return null;
    }
  }

  render() {
    const { match, category, docData, showCode } = this.props;
    const componentURL = match.params.subHeading;
    const componentData = docData.sections;

    const componentTitleCase = utils.rmWhiteSpace(
      utils.mkTitleCase(componentURL)
    );

    const categoryTitleCase = utils.rmWhiteSpace(utils.mkTitleCase(category));

    const getChildren = componentData.map((sectionComponent, idx) => {
      const Component = this.renderMe(
        utils.rmDash(sectionComponent.section),
        componentTitleCase,
        categoryTitleCase
      );

      const codeBlock = sectionComponent.examples && (sectionComponent.examples.js || sectionComponent.examples.html);

      return (
        <section
          id={sectionComponent.section}
          key={`${componentTitleCase}-${idx}`}
          className="docs-section"
        >
          {sectionComponent.name && <h3 className="docs-section__title">{sectionComponent.name}</h3>}
          {sectionComponent.description && (
            <p className="docs-section__body">{sectionComponent.description}</p>
          )}
          {Component ? (
            <Component />
          ) : (
            NoComponentMatch(category, docData['component'], sectionComponent)
          )}{' '}
          {codeBlock && codeBlock[0].example && (
            <CodeExample isOpen={showCode}>
            {codeBlock[0].example}
            </CodeExample>
          )}
          </section>
        );
    });

  return <span>{getChildren}</span>;
  }
}

ExampleComponents.defaultProps = {
  showCode: false,
};

ExampleComponents.propTypes = {
  match: PropTypes.object.isRequired,
  docData: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  showCode: PropTypes.bool,
};
