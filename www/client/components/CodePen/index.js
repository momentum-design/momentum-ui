import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncComponent from '../AsyncComponent';

class CodePen extends React.Component {
  static displayName = 'CodePen';

  render() {
    const {
      name,
      exampleList,
      generatedFolder
    } = this.props;

    const mkTitleCase = (w) => {
      return w.replace(/^[a-z]/, function (word) {
        return word.toUpperCase();
      }).replace(/\.js$/, '');
    };

    const examples = Object.values(exampleList);

    return (
      <div className="docs-markdown-warp">
        <h4 className="md-h4--bold md-font-color--alternate docs-section__title">
          {mkTitleCase(name)} Examples
        </h4>
        {examples.map((fileName) =>
          (<div key={name + '-' + fileName}>
            <h5>{mkTitleCase(fileName)}</h5>
            {<AsyncComponent
              loader={() => import(`../../generated/examples/${generatedFolder}/${name}/${fileName}`)}
              Placeholder={`${name}-${fileName}`}
            />}
          </div>))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  codePreference: state.componentsReducer.codePreference,
});

CodePen.defaultProps = {
  component: '',
  description: '',
  name: '',
  exampleList: [],
  generatedFolder: ''
};

CodePen.propTypes = {
  component: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  exampleList: PropTypes.object,
  generatedFolder: PropTypes.string
};

export default connect(
  mapStateToProps
)(CodePen);
