import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './RestaurantSummary.css';
import VectorFactor from '../VectorFactor/VectorFactor';

class RestaurantSummary extends Component {
  onClickRestaurantHandler(restaurantID) {
    this.props.history.push(`/main/detail/${restaurantID}`);
  }

  render() {
    let categorylist = null;
    for (const i in this.props.category) {
      const category = this.props.category[i];
      if (categorylist === null) categorylist = category;
      else categorylist += `ㅣ${category}`;
    }
    const factors = this.props.preferenceVector;
    const topFactors = [];
    for (const factor in factors) {
      topFactors.push(<VectorFactor factor={factor} weight={factors[factor]} />);
    }
    return (
      <div className="summary">
        <div className="order">
          {this.props.order}
        </div>
        <img src={this.props.img_src/* img_url */} className="image" onClick={() => this.onClickRestaurantHandler(this.props.id)} />
        <div className="text">
          <div className="head">
            <div className="rate" onClick={() => this.onClickRestaurantHandler(this.props.id)}>
              {this.props.rate}
            </div>
            <div className="title" onClick={() => this.onClickRestaurantHandler(this.props.id)}>
              {this.props.title}
            </div>
          </div>
          <div className="category">
            {categorylist}
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
