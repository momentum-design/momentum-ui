import React from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../utils';
import DocComponent from '../DocComponent';
import ExampleComponents from '../ExampleComponents';
import Colors from '../ColorsPage';
import NoComponentMatch from '../NoComponentMatch';
import { Button } from '@collab-ui/react';
import Header from '../Header';

export default class ChildContainer extends React.Component {
  state = { showCode: false };

  render() {
    const { match, docData, category } = this.props;
    const { showCode } = this.state;

    const componentURL = match.params.subHeading;
    const navIndex = utils.findIndex(docData, {
      component: componentURL
    });

    const componentTitleCase = utils.rmWhiteSpace(
      utils.mkTitleCase(componentURL)
    );

    const renderStaticChildren = () => {
      const staticComponents = ['getting-started', 'changelog', 'contributing'];

      if (
        docData[navIndex] &&
        staticComponents.includes(docData[navIndex].component)
      ) {
        return (
          <article className="row copy-spacing" key={`${componentTitleCase}-1`}>
            <div className="docs-container">
              <DocComponent
                match={match}
                category={category}
                docData={docData[navIndex]}
              />
            </div>
          </article>
        );
      } else if (docData[navIndex].component === 'colors') {
        return (
          <article className="row" key={`${componentTitleCase}-1`}>
            <Colors />
          </article>
        );
      } else if (docData[navIndex] && docData[navIndex].sections) {
        return (
          <article className="row" key={`${componentTitleCase}-1`}>
            <div className="docs-container">
              <Button
                label="Show Code"
                onClick={() =>
                  this.setState({
                    showCode: !showCode
                  })
                }
                ariaLabel="Show Code"
                className="show-code-button"
              />
              <ExampleComponents
                match={match}
                docData={docData[navIndex]}
                category={category}
                showCode={showCode}
              />
            </div>
          </article>
        );
      }

      return (
        <article className="row copy-spacing">
          <NoComponentMatch />
        </article>
      );
    };

    return (
      <span>
        <Header
          title={docData[navIndex].name}
          description={docData[navIndex].description}
        />
        {renderStaticChildren()}
      </span>
    );
  }
}

ChildContainer.propTypes = {
  match: PropTypes.object.isRequired,
  docData: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
};
