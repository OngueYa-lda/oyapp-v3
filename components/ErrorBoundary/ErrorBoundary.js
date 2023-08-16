import React from "react";

import { log } from "next-axiom";

/**
 * @see https://nextjs.org/docs/advanced-features/error-handling
 */

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(/* error */) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    // eslint-disable-next-line
    console.debug({ error, errorInfo });
    log.debug("ErrorBoundary catch: ", { error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      const FallbackComponent = this.props.FallbackComponent;

      return (
        <FallbackComponent
          tryAgainClick={() => this.setState({ hasError: false })}
        />
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}
