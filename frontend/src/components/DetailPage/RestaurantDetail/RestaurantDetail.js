import React, { Component } from 'react';
import './RestaurantDetail.css'

class RestaurantDetail extends Component {
  render() {
    const { detailType, detailData } = this.props;
    return (
      <div className="restaurant-detail">
        <div className="detail-type">
          {detailType}
        </div>
        <div className="detail-data">
          {detailData}
        </div>
      </div>
    );
  }
}

export default RestaurantDetail;