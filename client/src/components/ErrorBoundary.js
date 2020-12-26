import React from "react";
import Rollbar from "utils/RollbarErrorTracking";

class ErrorBoundary extends React.Component {
  state = { error: undefined };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    Rollbar.logErrorInfo(errorInfo);
    Rollbar.logErrorInRollbar(error);
  }

  renderErrorComponent = (
    <div>
      <h1>Something went wrong.</h1>
      <p>Please refresh or try again later.</p>
    </div>
  );

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? this.renderErrorComponent : children;
  }
}

export default ErrorBoundary;
