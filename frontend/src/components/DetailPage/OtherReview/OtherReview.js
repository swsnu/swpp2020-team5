import React, { Component } from 'react';

const OtherReview = props => {
  return (
    <div className='RestaurantReview'>
      <p>Title: {props.title} </p>
      <button id='restaurant-review-detail-button' onClick={props.onClickDetail}>
        {props.content}
      </button>
      <p>Link: {props.reviewLink} </p>
    </div>
  );
}

export default OtherReview;
