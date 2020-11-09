import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCraetors from '../../../../store/actions/index';
import './ReviewList.css';
import OtherReview from '../../../../components/DetailPage/OtherReview/OtherReview';

class ReviewList extends Component {

  state = {
    currentReviews: {
      naver: [],
      kakao: [],
      atm: [],
    },
    selectedTab: '',
  };
  
  componentDidMount() {
    //TODO backend needed!!
    //this.props.onGetReviews(this.props.match.params.id);
  }

  onClickTabButtonHandler= (event, siteName) => {
    let i;
    let tabcontent;
    let tablinks;

    // set the content hidden
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    //
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(siteName).style.display = 'block';
    event.target.className += ' active';

    this.setState({selectedTab: siteName});
  }

  
  render() {
    
    //TODO other review 분류작업? + <OtherReview> 로 렌더링
    //

    let naverReview = this.props.otherReviews.naver.map(review => {
      return (
        <OtherReview content={review.content} author={review.authorName} createTime={review.createTime.toLocaleDateString()} rating={review.rating}/>
      )
    });

    let kakaoReview = this.props.otherReviews.kakao.map(review => {
      return (
        <OtherReview content={review.content} author={review.authorName} createTime={review.createTime.toLocaleDateString()} rating={review.rating}/>
      )
    });

    let atmReview = this.props.otherReviews.atm.map(review => {
      return (
        <OtherReview content={review.content} author={review.authorName} createTime={review.createTime.toLocaleDateString()} rating={review.rating}/>
      )
    });

    let naverCnt = naverReview.length;
    let kakaoCnt = kakaoReview.length;
    let atmCnt = atmReview.length;

    return (
      <div className='ReviewList'>
        <div className='tab'>
          <button className='tablinks' id='naver-tab-button' onClick={(event) => {this.onClickTabButtonHandler(event, 'naver-content')}}>네이버 리뷰</button> 
          <button className='tablinks' id='kakao-tab-button' onClick={(event) => {this.onClickTabButtonHandler(event,'kakao-content')}}>카카오 리뷰</button> 
          <button className='tablinks' id='atm-tab-button' onClick={(event) => {this.onClickTabButtonHandler(event,'atm-content')}}>ATM 리뷰</button> 
        </div>

        <div className='tabcontent' id='naver-content'>
          <p>다른 사용자들이 총 {naverCnt}개의 리뷰를 남겼습니다.</p>
          {naverReview}
        </div>
        <div className='tabcontent' id='kakao-content'>
          <p>다른 사용자들이 총 {kakaoCnt}개의 리뷰를 남겼습니다.</p>
          {kakaoReview}
        </div>
        <div className='tabcontent' id='atm-content'>
          <p>다른 사용자들이 총 {atmCnt}개의 리뷰를 남겼습니다.</p>
          {atmReview}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    otherReviews: state.rv.otherReviews,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetReviews: (restaurantID) => dispatch(actionCraetors.getReviews(restaurantID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList); 
