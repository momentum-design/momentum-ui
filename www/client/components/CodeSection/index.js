import React from 'react';
import PropTypes from 'prop-types';
import { startCase, toLower } from 'lodash';
import { connect } from 'react-redux';
import CodeBlock from '../../collab-ui/CodeBlock';
import AsyncComponent from '../AsyncComponent';
import { Button } from '@collab-ui/react';
import { setCodePreference } from '../../containers/Component/actions';

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

     const mkTitleCase = str => startCase(toLower(str));

     const rmWhiteSpace = str => str.replace(/[\s-]/g, '');

     const componentTitleCase = rmWhiteSpace(
       mkTitleCase(component)
     );

     const countExamples = () => {
      let count = 0;

      for(const codeLanguage in variations) {
        variations[codeLanguage].example
          ? count+=1
          : count;
      }

      return count;
     };

     const loopCodeExamples = () => {
       return Object.keys(variations).reduce((agg, curr) => {
         return !agg && variations[curr].example
          ? { example: variations[curr].example, language: curr === 'core' ? 'html' : 'jsx' }
          : agg;
       }, null
       );
     };

     const codeExample = variations[codePreference].example
        ? { example: variations[codePreference].example, language: codePreference === 'core' ? 'html' : 'jsx' }
        : loopCodeExamples();

     return (
      <div className="docs-section" id={name}>
        <h4 className="cui-h4--bold cui-font-color--alternate docs-section__title">
          {mkTitleCase(name)}
        </h4>
        <h5>
          {description}
        </h5>
        <AsyncComponent
          loader={() => import(`../../examples/${componentTitleCase}/${rmWhiteSpace(name)}.js`)}
          Placeholder={example}
        />
        {
            countExamples() > 1
            &&
            <div
              className='cui-button-group cui-button-group--pill cui-button-group--justified'
            >
              {
                variations.core.example &&
                <Button
                  ariaLabel='Core'
                  className={`${codePreference === 'core' && 'active' || ''}`}
                  onClick={() => setCodePreference('core')}
                >
                  <h5 className='cui-h5--bold'>Core</h5>
                </Button>
              }
              {
                variations.react.example &&
                <Button
                  ariaLabel='React'
                  className={`${codePreference === 'react' && 'active' || ''}`}
                  onClick={() => setCodePreference('react')}
                >
                  <h5 className='cui-h5--bold'>React</h5>
                </Button>
              }
            </div>
        }
        <CodeBlock key={codeExample.language} codeType={codeExample.language}>
          {codeExample.example}
        </CodeBlock>
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

export default connect(mapStateToProps, { setCodePreference })(CodeSection);
