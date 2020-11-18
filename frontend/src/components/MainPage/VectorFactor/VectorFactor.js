import React, { Component } from 'react';
import './VectorFactor.css';

// eslint-disable-next-line react/prefer-stateless-function
class VectorFactor extends Component {
  render() {
    const width = (this.props.weight * 20).toString().concat('%');
    return (
      <div className="factor">
        {this.props.factor}
        <div className="bar">
          <div
            className="gauge"
            style={{
              width,
              background: 'linear-gradient(to right, #FFAA29 , #E44142)',
              float: 'left',
              height: '100%',
            }}
          >
            {this.props.weight}
          </div>
        </div>
      </div>
    );
  }
}
export default VectorFactor;
