import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorContainer extends React.Component {
  static propTypes = {
    error: PropTypes.object,
    errorInfo: PropTypes.object
  };

  static defaultProps = {
    error: {},
    errorInfo: {}
  }

  render() {
    const { error, errorInfo} = this.props;
    
    return (
      <div>
        <h2>Something went wrong.</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {error && error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      </div>
    );
  }
}

