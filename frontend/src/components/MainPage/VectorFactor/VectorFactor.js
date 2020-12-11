import React, { Component } from 'react';
import './VectorFactor.css';

// eslint-disable-next-line react/prefer-stateless-function
class VectorFactor extends Component {
  render() {
    const width = ((5 - this.props.weight) * 20).toString().concat('%');
    return (
      <div className="restaurant-factor">
        <div className="factor-name">
          {this.props.factor}
        </div>
        <div className="factor-bar">
          <p className="factor-weight">
            {this.props.weight.toFixed(2)}
          </p>
          <div className="gauge" style={{width}}/>
        </div>
      </div>
    );
  }
}
export default VectorFactor;
