import React, { Component } from 'react';
import './LoadingScreen.css';

class LoadingScreen extends Component {
  render() {
    return (
      <div className="loading-screen">
        <div className="loading-quote">
          <div className="loading-spinner" />
          {this.props.loadingQuote}
        </div>
      </div>
    );
  }
}
export default LoadingScreen;
