import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCraetors from '../../../store/actions/index';
import './ReviewList.css';
import OtherReview from '../../../components/DetailPage/OtherReview/OtherReview';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class ReviewList extends Component {

  state = {
    currentReviews: {
      naver: [],
      kakao: [],
      atm: [],
    },
    tab_index: 0,
  };
  


  componentDidMount() {
    this.props.onGetReviews(this.props.RestaurantID);
    
  }
  onClickTabHandler = (index) => {
    this.setState({tab_index: index});
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
        <Tabs selectedIndex={this.state.tab_index} onSelect={this.onClickTabHandler}>
          <TabList>
            <Tab>네이버 리뷰</Tab> 
            <Tab>카카오 리뷰</Tab> 
            <Tab>ATM 리뷰</Tab> 
          </TabList>

          <TabPanel className='tabcontent' id='naver-content'>
            <p>다른 사용자들이 총 {naverCnt}개의 리뷰를 남겼습니다.</p>
            {naverReview}
          </TabPanel>
          <TabPanel className='tabcontent' id='kakao-content'>
            <p>다른 사용자들이 총 {kakaoCnt}개의 리뷰를 남겼습니다.</p>
            {kakaoReview}
          </TabPanel>
          <TabPanel className='tabcontent' id='atm-content'>
            <p>다른 사용자들이 총 {atmCnt}개의 리뷰를 남겼습니다.</p>
            {atmReview}
          </TabPanel>
        </Tabs>
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
