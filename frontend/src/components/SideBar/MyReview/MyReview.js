import React, { Component } from 'react';
import * as actionCreators from '../../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {$} from 'jquery';
import { StarRatingInput, StarRating, css } from 'react-star-rating-input';
import insertCss from 'insert-css';

class MyReview extends Component {
  state = {
    content: 'Hi',
    rating: 0,
    isEdit: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      rating: props.rating,
    }
  }

  onClickEditHandler = () => {
    this.setState({isEdit: true});
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
    if ($.confirm("Do you really want to Remove?")) {
      this.props.onDeleteReview(this.props.reviewID);
    }
  }

  onClickCancelHandler = () => {
    this.setState({isEdit: false});
  }

  onChangeRatingHandler = (newRating) => {
    this.setState({rating: newRating});
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
            onClick={() => this.onClickEditDoneHandler()}>Done</text>
        : <text id='review-edit-button'
            onClick={() => this.onClickEditHandler()}>Edit</text>
    );
    let DeleteOrCancel = (
      this.state.isEdit
        ? <text id='review-cancel-button' 
            onClick={() => this.onClickCancelHandler()}>Cancel</text>
        : <text id='review-delete-button'
            onClick={() => this.onClickDeleteHandler()}>Delete</text>
    );
    let TextOrInput = (
      this.state.isEdit
        ? <textarea id='content-input' value={this.state.content} 
            onChange={event => this.setState({content: event.target.value})}>
            {this.state.content}</textarea>
        : <text id='content-text'>{this.state.content}</text>
    );
    return (
      <div className='MyReview'>
        {StarInputOrShow}
        <text id='rating-text'>{this.state.rating}</text> 
        <text id='modified-time-text'>{this.props.modifiedTime}</text> 
        <text> | </text>
        {EditOrDone}
        <text> | </text>
        {DeleteOrCancel}
        <br />
        {TextOrInput}
      </div>
    );
  } 
}
const mapDispatchToProps = dispatch => {
  return {
    onPutReview: (reviewID, reviewInfo) =>
      dispatch(actionCreators.putReview(reviewID, reviewInfo)),
    onDeleteReview: reviewID =>
      dispatch(actionCreators.deleteReview(reviewID)),
  }
}

insertCss(css)

export default connect(null, mapDispatchToProps)(withRouter(MyReview));
