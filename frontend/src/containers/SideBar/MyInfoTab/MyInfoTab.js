import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';
import './MyInfoTab.css';



class MyInfoTab extends Component {
  
  state = {
    rating: 0,
    content: ''
  }

  componentDidMount() {
    //this.props.onGetUser();
    //this.props.onGetMyReviewList(this.props.restaurantID);
  }

  onChangeReviewInputHandler = (event) => {
    this.setState({content: event.target.value});
  }

  onClickConfirmHandler = (event) => {
    this.props.onPostMyReview(this.props.restaurantID, this.state.content, this.state.rating, new Date());
    this.setState({content: ''});
  }

  onChangeRating = (newRating) => {
    this.setState({rating: newRating});
    //TODO rating star is not properly set the rating. why? and making there is no way to make it zero
    console.log(this.state.rating);
  }



  render() {

    //page selectors
    let myInfo = '';
    let onDetailPage = '';
    let onMainPage = (
      <div className='on-main-page'>
        <img id='welcome-img' src={'../../../../public/logo192.png'} alt='' width='100' height='100'/>
        <p id='welcome-text'> 
          #AllTastesMatter에 오신것을 환영합니다!<br/>
          천천히 둘러보세요
        </p>
      </div>
    );

    //components that should be shown when detail page
    let myReview = [];
    let reviewInput = (
        <input id='review-input' type='text' placeholder='리뷰를 작성해주세요' value={this.state.content} 
          onChange={this.onChangeReviewInputHandler}/>
      );
    let reviewConfirmButton = (
        <button id='review-confirm' onClick={this.onClickConfirmHandler}>리뷰작성</button>
      );
    //TODO rateStar 작동 이상함.
    let rateStar = (
        <StarRatings id='rate-star' rating={this.state.rating} starRatedColor='red' changeRating={this.onChangeRating}
          numberOfStars={5} />
      );



    //if current page is not Mainpage, myInfoTab should show onDetailPage. otherwise, should show onMainPage
   // if(this.props.restaurantID != -1) {
    if(true) {
      myReview = this.props.myReviewList.map((review) => {
        return (//TODO It should be changed into <Review> component when the component is implemented.
          <div className='Review'>
            <p>id: {review.id}</p>
            <p>content: {review.content}</p>
          </div>
        );})


      //TODO review 갯수 카운트하는 거 수정해야함. reviewlist 받아온 후에 len method 쓰면 될듯.
      onDetailPage = (
        <div className='on-detail-page'>
          <p><span id='restaurantName'>{this.props.selectedRestaurant.name}</span> 평가하기</p>
          <div>{rateStar}</div>
          <div className='review-input-set'>
            {reviewInput}
            {reviewConfirmButton}
          </div>
          <div className='my-review-count-text'>
            <span id='name'>{this.props.selectedUser.name}&nbsp;</span>님은 &nbsp;
            <span id='restaurantName'>{this.props.selectedRestaurant.name}</span> 에<br/>
            총 &nbsp;<span id='review-count'>{'test number'}</span> 개의 리뷰를 남겼습니다.
          </div>
          {myReview}
        </div>
      );

      myInfo = onDetailPage;
    }
    else {
      myInfo = onMainPage;
    }

    return (
      <div className='MyInfoTab'>
        <div className='upper-bar'>
          <span className='upper-bar-welcome'>
            안녕하세요, <span id='name'>{this.props.selectedUser.name}</span> 님!
          </span>
          <button id='sign-out' onClick={this.props.onGetSignOut}>로그아웃</button>
        </div>
        {myInfo}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedUser: state.us.selectedUser,
    myReviewList: state.rv.myReview,
    selectedRestaurant: state.rs.selectedRestaurant,
  };
}

const mapDispatchToProps = dispatch => {
  return {
   // onGetUser: () => dispatch(actionCreators.getUser()),
   // onGetSignOut: () => dispatch(actionCreators.getSignOut()),
   // onGetMyReviewList: (restaurantID) => {
   //   if (restaurantID !== -1) {
   //     dispatch(actionCreators.getMyReviewList(restaurantID));
   //   }
   // },
   // onPostMyReview: (restaurantID, content, rating, createTime) => 
   //   dispatch(actionCreators.postMyReview(restaurantID, content, rating, createTime)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInfoTab);
