import PropTypes from 'prop-types';
import React from 'react';
import Media from 'react-media';
import { Spinner } from '@momentum-ui/react';
import PageHeader from '../../momentum-ui/PageHeader';
import AsyncComponent from '../../components/AsyncComponent';
import CodePen from '../../components/CodePen';

const chartsExamples = require('../../generated/examples/charts/chartsList');

const addScript = () => {
  if (!document.querySelector('SCRIPT[codepen]')) {
    let _script = document.createElement('SCRIPT');
    _script.src = 'https://static.codepen.io/assets/embed/ei.js';
    _script.setAttribute('codepen', 'codepen');
    document.getElementsByTagName('HEAD')[0].appendChild(_script);
  }
};

const getExample = (match) => {
  return match.params.section === 'api' ? chartsExamples[match.params.subSection] : null;
};

class ComponentPage extends React.Component {

  render() {
    const {
      child,
      components,
      loading,
      match
    } = this.props;

    const component = components[child.object_id] || {
      displayName: child.object_slug,
      lead: ''
    };

    let exampleList = true,
      thisExample = getExample(match),
      ifShowExamples = !!thisExample;
    addScript();

    return (
      <React.Fragment>
        <Media query="(min-width: 1025px)">
          {isDesktop => {
            return !exampleList
              ? (
                <PageHeader collapse={isDesktop} textAlign="left" />
              )
              : (
                <React.Fragment>
                  <PageHeader title={component.displayName} lead={component.description} textAlign="left" collapse={isDesktop} />
                  <div className='docs-content-area docs-component-overview'>
                    {loading
                      ? <Spinner />
                      : <AsyncComponent
                        loader={() => import(`../../generated/markdown${child.path.replace(/^charts/, '')}.js`)}
                        Placeholder={child.object_slug}
                      />
                    }
                    {
                      ifShowExamples
                        ? <CodePen exampleList={thisExample} generatedFolder='charts' name={child.object_slug} />
                        : ''
                    }
                  </div>
                </React.Fragment>
              );
          }}
        </Media>
      </React.Fragment>
    );
  }
}

ComponentPage.propTypes = {
  child: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired
};

ComponentPage.defaultProps = {
  error: false,
  loading: false,
};

ComponentPage.displayName = 'DataVisualizationComponentPage';

export default ComponentPage;
