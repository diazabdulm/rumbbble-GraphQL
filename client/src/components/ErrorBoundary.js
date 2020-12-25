import { Component } from "react";
import { logErrorInfo, logErrorInRollbar } from "utils/RollbarErrorTracking";

class ErrorBoundary extends Component {
  state = { error: undefined };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    logErrorInfo(errorInfo);
    logErrorInRollbar(error);
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
