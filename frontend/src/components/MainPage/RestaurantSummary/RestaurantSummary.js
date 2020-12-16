import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './RestaurantSummary.css';
import NoImage from '../../../images/no_img.png';
import VectorFactor from '../VectorFactor/VectorFactor';

class RestaurantSummary extends Component {
  onClickRestaurantHandler(restaurantID) {
    this.props.onClickSummary();
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
    let i = 0;
    const urlListLength = this.props.img_url_list.length;
    return (
      <div className="summary">
        <div className="order">
          {this.props.order}
        </div>
        <img
          alt="restautantThumbnail"
          onError={(ev) => {
            i += 1;
            const component = ev.target;
            if (i > urlListLength) component.src = NoImage;
            else component.src = `https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f180_180&src=${this.props.img_url_list[i]}`;
          }}
          src={
            urlListLength === 0 ? NoImage : `https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f180_180&src=${this.props.img_url_list[0]}`
          }
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
