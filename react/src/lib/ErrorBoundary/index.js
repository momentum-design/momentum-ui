import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  static displayName = 'ErrorBoundary';

  state = { 
    error: null, 
    errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    if (this.props.errorCallback) {

      this.props.errorCallback(error, errorInfo);
    }
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children, fallbackComponent } = this.props;

    const errorComponent = () =>
      fallbackComponent
      ? React.cloneElement(fallbackComponent, {
          error: error,
          errorInfo: errorInfo
        })
      : (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );

    return (
      errorInfo
        ?
        errorComponent()
        :
        children
    );
  }
}

ErrorBoundary.defaultProps = {
  fallbackComponent: null,
  errorCallback: null,
  children: null
};

ErrorBoundary.propTypes = {
  fallbackComponent: PropTypes.node,
  errorCallback: PropTypes.func,
  children: PropTypes.node,
};

export default ErrorBoundary;