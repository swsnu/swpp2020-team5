import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './RestaurantSummary.css';
import VectorFactor from '../VectorFactor/VectorFactor';

class RestaurantSummary extends Component {
  onClickRestaurantHandler(restaurantID) {
    this.props.history.push(`/detail/${restaurantID}`);
  }

  render() {
    const factors = this.props.preferenceVector;
    const topFactors = [];
    Object.keys(this.props.preferenceVector).forEach((factor) => {
      topFactors.push(<VectorFactor
        key={factor}
        factor={factor}
        weight={factors[factor]}
      />);
    });
    return (
      <div className="summary">
        <div className="order">
          {this.props.order}
        </div>
        <img
          alt="restautantThumbnail"
          src={this.props.img_url/* img_url */}
          className="image"
          onClick={() => this.onClickRestaurantHandler(this.props.id)}
        />
        <div className="text">
          <div className="head">
            <div className="title" onClick={() => this.onClickRestaurantHandler(this.props.id)}>
              {this.props.title}
            </div>
            <div className="rate" onClick={() => this.onClickRestaurantHandler(this.props.id)}>
              {this.props.rate}
            </div>
<<<<<<< HEAD
           
=======
>>>>>>> 788ef9e214f416a113466b4f578fdd58a6027574
          </div>
          <div className="category">
            {this.props.category}
          </div>
          <hr className="border" />
          <div className="factors">
            {topFactors}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RestaurantSummary);
