import React, { Component } from 'react';
import * as actionCreators from '../../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {$} from 'jquery';
import { StarRatingInput, StarRating, css } from 'react-star-rating-input';
import insertCss from 'insert-css';
import './MyReview.css';

class MyReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      rating: props.rating,
      isEdit: false,
      preContent: '',
    }
  }

  onClickEditHandler = () => {
    this.setState({
      isEdit: true,
      preContent: this.state.content
    });
  }

  onClickEditDoneHandler = () => {
    this.props.onPutReview(this.props.reviewID, {
      content: this.state.content,
      rating: this.state.rating,
      modifiedTime: new Date(),
    });
    this.setState({isEdit: false});
  }

  onClickDeleteHandler = () => {
    if (window.confirm("Do you really want to Remove?")) {
      this.props.onDeleteReview(this.props.reviewID);
    }
  }

  onClickCancelHandler = () => {
    this.setState({
      isEdit: false,
      content: this.state.preContent
    });
  }

  onChangeRatingHandler = (newRating) => {
    this.setState({rating: newRating});
    console.log('HI')
  };

  render() {
    const starList = [];
    starList.push(<StarRating value={1} />);
    starList.push(<StarRating value={2} />);
    starList.push(<StarRating value={3} />);
    starList.push(<StarRating value={4} />);
    starList.push(<StarRating value={5} />);

    let StarInputOrShow = (
      this.state.isEdit
      ? <StarRatingInput size={5} value={this.state.rating} onChange={this.onChangeRatingHandler}>
        </StarRatingInput> 
      : starList[this.state.rating-1]
    );
    let EditOrDone = (
      this.state.isEdit
        ? <text id='review-edit-done-button' 
            onClick={() => this.onClickEditDoneHandler()}>저장</text>
        : <text id='review-edit-button'
            onClick={() => this.onClickEditHandler()}>수정</text>
    );
    let DeleteOrCancel = (
      this.state.isEdit
        ? <text id='review-cancel-button' 
            onClick={() => this.onClickCancelHandler()}>취소</text>
        : <text id='review-delete-button'
            onClick={() => this.onClickDeleteHandler()}>삭제</text>
    );
    let TextOrInput = (
      this.state.isEdit
        ? <input id='content-input' className='review-input' value={this.state.content} 
            onChange={event => this.setState({content: event.target.value})}>
            </input>
        : <text id='content-text'>{this.state.content}</text>
    );
    // we need to fix star
    return (
      <div className='MyReview'>
        <div className='review-info'>
          <div className='review-rating-stars'>
            {StarInputOrShow}
          </div>
          <div className='review-detail'>
            <text id='rating-text'>{this.state.rating}</text> 
            <text> | </text>
            <text id='modified-time-text'>{this.props.modifiedTime}</text> 
            <text> | </text>
            {EditOrDone}
            <text> | </text>
            {DeleteOrCancel}
          </div>
        </div>
        <div className='review-content'>
          {TextOrInput}
        </div>
      </div>
    );
  } 
}
const mapDispatchToProps = dispatch => {
  return {
    onPutReview: (reviewID, reviewInfo) =>
    dispatch(actionCreators.putReview({
      id: reviewID,
      ...reviewInfo
    })),
    onDeleteReview: reviewID =>
      dispatch(actionCreators.deleteReview(reviewID)),
  }
}

insertCss(css)

export default connect(null, mapDispatchToProps)(withRouter(MyReview));
