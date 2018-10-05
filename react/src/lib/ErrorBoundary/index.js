import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {

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

ErrorBoundary.propTypes = {
  /** @prop Children nodes to render inside the ErrorBoundary | null */
  children: PropTypes.node,
  /** @prop Callback function invoked when an error has occured | null */
  errorCallback: PropTypes.func,
  /** @prop Sets a backup Component in the case of a failure | null */
  fallbackComponent: PropTypes.node,
};

ErrorBoundary.defaultProps = {
  children: null,
  errorCallback: null,
  fallbackComponent: null
};

ErrorBoundary.displayName = 'ErrorBoundary';

export default ErrorBoundary;