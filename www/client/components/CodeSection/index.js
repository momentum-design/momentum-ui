import React from 'react';
import PropTypes from 'prop-types';
import { startCase, toLower, camelCase } from 'lodash';
import { connect } from 'react-redux';
import CodeBlock from '../../momentum-ui/CodeBlock';
import AsyncComponent from '../AsyncComponent';
import { Button } from '@momentum-ui/react';
import { setCodePreference } from '../../containers/Component/actions';
import Collapse from '../../momentum-ui/Collapse';

class CodeSection extends React.Component {
  static displayName = 'CodeSection';

  render() {
    const {
      name,
      codePreference,
      component,
      example,
      description,
      setCodePreference,
      variations,
    } = this.props;

    const pascalCase = str => {
      const camel = camelCase(str);
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    };

    const mkTitleCase = str => startCase(toLower(str));

    const rmWhiteSpace = str => str.replace(/[\s-]/g, '');

    const componentTitleCase = rmWhiteSpace(pascalCase(component));

    const countExamples = () => {
      let count = 0;

      for (const codeLanguage in variations) {
        variations[codeLanguage].example ? (count += 1) : count;
      }

      return count;
    };

    const getLanguage = language => {
      switch (language) {
        case 'core':
          return 'html';
        case 'angular':
          return 'ts';
        case 'react':
          return 'jsx';
      }
    };
    const loopCodeExamples = () => {
      return Object.keys(variations).reduce((agg, curr) => {
        return !agg && variations[curr].example
          ? { example: variations[curr].example, language: getLanguage(curr) }
          : agg;
      }, null);
    };

    const getPlaceholder = () => variations.core.example ? example : '';

    const codeExample = variations[codePreference].example
      ? {
          example: variations[codePreference].example,
          language: getLanguage(codePreference),
        }
      : loopCodeExamples();

    return (
      <div className="docs-section" id={name}>
        <h4 className="md-h4--bold md-font-color--alternate docs-section__title">
          {mkTitleCase(name)}
        </h4>
        <h5>{description}</h5>
        <div className="row">
          <AsyncComponent
            loader={() => import(`../../examples/${componentTitleCase}/${pascalCase(name)}.js`)}
            Placeholder={getPlaceholder()}
          />
        </div>
        <div className="code-block-container">
        {countExamples() > 0 && (
          <div className="md-button-group md-button-group--pill" role="group">
            {variations.core.example && (
              <Button
                ariaLabel="Core"
                className={`${(codePreference === 'core' && 'active') || ''}`}
                onClick={() => setCodePreference('core')}
              >
                Core
              </Button>
            )}
            {variations.react.example && (
              <Button
                ariaLabel="React"
                className={`${(codePreference === 'react' && 'active') || ''}`}
                onClick={() => setCodePreference('react')}
              >
                React
              </Button>
            )}
            {variations.angular.example && (
              <Button
                ariaLabel="Angular"
                className={`${(codePreference === 'angular' && 'active') || ''}`}
                onClick={() => setCodePreference('angular')}
              >
                Angular
              </Button>
            )}
          </div>
        )}
        <Collapse collapseLabel="Show less" expandLabel="Show more">
          <CodeBlock key={codeExample.language} codeType={codeExample.language}>
            {codeExample.example}
          </CodeBlock>
        </Collapse>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  codePreference: state.componentsReducer.codePreference,
});

CodeSection.defaultProps = {
  component: '',
  description: '',
  example: '',
  name: '',
  setCodePreference: null,
};

CodeSection.propTypes = {
  component: PropTypes.string,
  codePreference: PropTypes.string.isRequired,
  description: PropTypes.string,
  example: PropTypes.string,
  name: PropTypes.string,
  setCodePreference: PropTypes.func,
  variations: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  { setCodePreference }
)(CodeSection);
