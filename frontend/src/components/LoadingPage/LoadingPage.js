import React, { Component } from 'react';
import './LoadingPage.css'
class LoadingPage extends Component {
  render() {
    return (
      <div className="loading-page">
        <div className='loading-quote'>
          <div class="loading-spinner"/>
          {this.props.loadingQuote}
        </div>
      </div>
    )
  }
}
export default LoadingPage;