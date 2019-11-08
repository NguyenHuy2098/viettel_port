import React from 'react';
import { Button } from 'reactstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    // console.log(error, errorInfo);
    this.setState({ hasError: true });
  }

  handleRefresh() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center">
          <h4 className="mb-3">Vui lòng tải lại trang!</h4>
          <Button color="primary" onClick={this.handleRefresh}>
            Refresh
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
