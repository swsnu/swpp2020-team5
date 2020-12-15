import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactStars from 'react-rating-stars-component';
import * as actionCreators from '../../../store/actions/index';
import './MyReview.css';

const constStars = [];
for (let i = 0; i < 11; i += 1) {
  constStars.push(
  );
}
class MyReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      rating: props.rating,
      isEdit: false,
      preContent: '',
    };
  }

  onClickEditHandler = () => {
    const { content } = this.state;
    this.setState({
      isEdit: true,
      preContent: content,
    });
  }

  onClickEditDoneHandler = () => {
    this.props.onPutReview({
      id: this.props.reviewID,
      content: this.state.content,
      rating: this.state.rating,
      date: new Date(),
    });
    this.setState({ isEdit: false });
  }

  onClickDeleteHandler = () => {
    if (window.confirm('Do you really want to Remove?')) {
      this.props.onDeleteReview(this.props.reviewID);
    }
  }

  onClickCancelHandler = () => {
    const { preContent } = this.state;
    this.setState({
      isEdit: false,
      content: preContent,
    });
  }

  onChangeRatingHandler = (newRating) => {
    this.setState({ rating: newRating });
  }

  render() {
    const changeRatingStar = (
      this.state.isEdit
        ? (
          <ReactStars
            id="rate-star"
            value={this.props.rating}
            count={5}
            size={20}
            isHalf
            onChange={this.onChangeRatingHandler}
          />
        )
        : <></>
    );
    const ratingStar = (
      this.state.isEdit
        ? <></>
        : (
          <ReactStars
            key={this.props.rating}
            id="rate-star"
            value={this.props.rating}
            count={5}
            size={20}
            isHalf
            edit={false}
          />
        )
    );

    const EditOrDone = (
      this.state.isEdit
        ? (
          <text
            id="review-edit-done-button"
            onClick={() => this.onClickEditDoneHandler()}
          >
            저장
          </text>
        )
        : (
          <text
            id="review-edit-button"
            onClick={() => this.onClickEditHandler()}
          >
            수정
          </text>
        )
    );
    const DeleteOrCancel = (
      this.state.isEdit
        ? (
          <text
            id="review-cancel-button"
            onClick={() => this.onClickCancelHandler()}
          >
            취소
          </text>
        )
        : (
          <text
            id="review-delete-button"
            onClick={() => this.onClickDeleteHandler()}
          >
            삭제
          </text>
        )
    );
    const TextOrInput = (
      this.state.isEdit
        ? (
          <textarea
            id="content-input"
            className="review-input"
            value={this.state.content}
            onChange={(event) => this.setState({ content: event.target.value })}
          />
        )
        : <div id="content-text">{this.state.content}</div>
    );
    return (
      <div className="MyReview">
        <hr color="#EAEAEA" width="90%" />
        <div className="review-info">
          <span className="review-rating-stars">
            {changeRatingStar}
            {ratingStar}
          </span>
          <span className="review-detail">
            <text id="rating-text">{this.props.rating}</text>
            <text> | </text>
            <text id="modified-time-text">{this.props.date}</text>
            <text> | </text>
            {EditOrDone}
            <text> | </text>
            {DeleteOrCancel}
          </span>
        </div>
        <div className="review-content">
          {TextOrInput}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({

  onPutReview: (reviewInfo) => dispatch(actionCreators.editMyReview({
    ...reviewInfo,
  })),
  onDeleteReview: (reviewID) => dispatch(actionCreators.deleteMyReview(reviewID)),

});

export default connect(null, mapDispatchToProps)(withRouter(MyReview));
