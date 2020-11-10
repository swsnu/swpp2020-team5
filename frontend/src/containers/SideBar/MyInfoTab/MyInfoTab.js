import React, { Component } from 'react';
import ReactStars from 'react-rating-stars-component';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';
import welcomeImage from '../../../../src/images/that_bonobono.jpg';
import MyReview from '../../../components/SideBar/MyReview/MyReview';
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
  }



  render() {

    //page selectors
    let myInfo = '';
    let onDetailPage = '';
    let onMainPage = (
      <div className='on-main-page'>
        <img id='welcome-img' src={welcomeImage} alt='' width='400' height='300'/>
        <p id='welcome-text'> 
          #AllTastesMatter에 오신것을 환영합니다!<br/>
          천천히 둘러보세요
        </p>
      </div>
    );

    //components that should be shown when detail page
    let myReview = [];
    let reviewInput = (
        <textarea id='review-input' placeholder='리뷰를 작성해주세요. 작성하신 리뷰와 평점은 현재 내 취향을 업데이트하는데 사용됩니다.' value={this.state.content} 
          onChange={this.onChangeReviewInputHandler}/>
      );
    let reviewConfirmButton = (
        <button id='review-confirm' onClick={this.onClickConfirmHandler}>리뷰작성</button>
      );
    let rateStar = (
        <ReactStars id='rate-star' value={this.state.rating} count={5} size={40} 
          isHalf={true} onChange={this.onChangeRating} />
      );



    //if current page is not Mainpage, myInfoTab should show onDetailPage. otherwise, should show onMainPage
    if(this.props.restaurantID != -1) {
      myReview = this.props.myReviewList.map((review) => {

        //let time = review.modifiedTime.toLocaleDateString(); //for parsing time object
        return (//TODO It should be changed into <Review> component when the component is implemented.
          <MyReview className='Review' 
            reviewID={review.id}
            content={review.content}
            rating={review.rating}
            modifiedTime={review.modifiedTime} >
          </MyReview>
        );})


      onDetailPage = (
        <div className='on-detail-page'>
          <p className='second-line'><span id='restaurantName'>&nbsp;&nbsp;{this.props.selectedRestaurant.title}&nbsp;&nbsp;</span> 평가하기</p>
          <div>{rateStar}</div>
          <div className='review-input-set'>
            {reviewInput}
            {reviewConfirmButton}
          </div>
          <div className='my-review-count-text'>
            <span id='name'>{this.props.selectedUser.username}&nbsp;</span>님은 &nbsp;
            <span id='restaurantName'>{this.props.selectedRestaurant.title}</span> 에<br/>
            총 &nbsp;<span id='review-count'>{myReview.length}</span> 개의 리뷰를 남겼습니다.
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
            안녕하세요, <span id='name'>{this.props.selectedUser.username}</span> 님!
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
    //myReviewList: state.rv.myReviews,
    myReviewList: [{
      id: 1,
      content: '내스타일의 매운맛',
      rating: 5,
      modifiedTime: '2020.11.01'
    },],
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
