import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/vs2015.css';

// This way is easy, but adds 170K gzipped to bundle since all langs are included.
// import Highlight from 'react-highlight';

class CodeExample extends React.Component {
  componentDidMount() {
    hljs.registerLanguage(`javascript`, javascript);
    hljs.registerLanguage(`xml`, xml);
  }

  componentDidUpdate() {
    this.props.isOpen && hljs.highlightBlock(this.element);
  }

  render() {
    const { isOpen } = this.props;

    return (
      isOpen && (
        <pre
          ref={ref => {
            this.element = ref;
          }}
        >
          <code>{this.props.children}</code>
        </pre>
      )
    );
  }
}

CodeExample.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

CodeExample.defaultProps = {
  children: null,
  isOpen: false,
};

export default CodeExample;
