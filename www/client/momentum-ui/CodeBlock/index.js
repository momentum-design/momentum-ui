import React from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-typescript.min';

class CodeExample extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  compondentDidUpdate() {
    Prism.highlightAll();
  }

  render() {
    const { children, codeType } = this.props;

    return (
      <pre  style={{paddingTop:'64px'}}>
        <code className={`language-${codeType}`}>
          {children}
        </code>
      </pre>
    );
  }
}

CodeExample.propTypes = {
  children: PropTypes.string,
  codeType: PropTypes.string,
};

CodeExample.defaultProps = {
  children: null,
  codeType: 'jsx'
};

export default CodeExample;
