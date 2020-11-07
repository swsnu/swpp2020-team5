import React, { Component } from 'react';
<<<<<<< HEAD
import StarRatings from 'react-star-ratings';
import './OtherReview.css';

class OtherReview extends Component {

  state = {
    isSummary: true
  }

  onClickContentHandler = () => {
    
    let content = document.getElementById('content');
    
    if (this.state.isSummary) {
      this.setState({isSummary: false});
      //TODO content 길이 최대 설정 어떻게?
      content.style.width = '500px'
    }
    else {
      this.setState({isSummary: true});
      content.style.width = '100px'
    }
  }

  render() {


    return (
      <div className='OtherReview'>
        <img id='author-picture' src={'../../../../public/logo192.png'} alt='' width='100' height='100' />
        <p id='author-name'>{this.props.author}</p>
        <StarRatings id='rating-star' rating={parseInt(this.props.rating)} starRatedColor='red' 
          changeRating={() => {}} numberOfStars={5} />
        <p id='rating-text'>{this.props.rating}</p>
        <p id='createTime'>{this.props.createTime}</p>
        
        <div id='content' onClick={() => this.onClickContentHandler()}>{this.props.content}</div>
      </div>
    );

  }
=======

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
>>>>>>> 5afe51a538de10a57c7a5db2d3f527e6e692e108
}

export default OtherReview;
