import { Component } from "react";
import ErrorState from "../shared/feedback/ErrorState";

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error("App render failure:", error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="page-stack">
          <ErrorState
            title="Dashboard failed to render"
            message={this.state.error.message || "An unexpected error stopped the app from rendering."}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
