import React from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../utils';
import NoComponentMatch from '../NoComponentMatch';

export default class DocComponent extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    docData: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired,
  };

  renderMe(section, category) {
    try {
      return require(`../../components/${category}/${section}.js`);
    } catch (e) {
      return null;
    }
  }

  render() {
    const { match, category, docData } = this.props;
    const componentURL = match.params.subHeading;

    const componentTitleCase = utils.rmWhiteSpace(
      utils.mkTitleCase(componentURL)
    );

    const categoryTitleCase = utils.rmWhiteSpace(utils.mkTitleCase(category));
    const Component = () =>
      this.renderMe(utils.rmDash(docData.component), categoryTitleCase);

    /* eslint-disable */
    // Disabled to ignore Dangerously Setting Inner HTML

    return (
      <section
        id={docData.component}
        key={`${componentTitleCase}`}
        className="row"
      >
        {Component() ? (
          <div dangerouslySetInnerHTML={Component()} />
        ) : (
          NoComponentMatch()
        )}
      </section>
    );
    /* eslint-enable */
  }
}
