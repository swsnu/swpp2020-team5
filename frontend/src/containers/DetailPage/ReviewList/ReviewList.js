import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import * as actionCraetors from '../../../store/actions/index';
import OtherReview from '../../../components/DetailPage/OtherReview/OtherReview';
import './ReviewList.css';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      currReviewCnt: 10,
      scrollX: 0,
      scrollY: 0,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.scrollTo(this.state.scrollX, this.state.scrollY);
  }

  onClickTabHandler = (index) => {
    this.setState({ tabIndex: index });
    this.setState({ currReviewCnt: 10 });
  }

  onClickShowMoreHandler = () => {
    const { currReviewCnt } = this.state;
    const increasedCnt = currReviewCnt + 10;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    this.setState({ currReviewCnt: increasedCnt, scrollX, scrollY });
  }

  render() {
    // TODO other review 분류작업? + <OtherReview> 로 렌더링
    const { currReviewCnt } = this.state;
    const { otherReviews } = this.props;
    function loadReview(reviewList) {
      const loadedList = [];
      for (let i = 0; i < Math.min(currReviewCnt, reviewList.length); i += 1) {
        const review = reviewList[i];
        loadedList.push(
          <OtherReview
            key={review.id}
            content={review.content}
            author={review.author_name}
            date={review.date}
            rating={review.rating}
          />,
        );
      }
      return (loadedList);
    }
    const naverReview = loadReview(otherReviews.naver);
    const kakaoReview = loadReview(otherReviews.kakao);
    const atmReview = loadReview(otherReviews.atm);
    const naverCnt = otherReviews.naver.length;
    const kakaoCnt = otherReviews.kakao.length;
    const atmCnt = otherReviews.atm.length;

    const showMoreButton = (
      <button id="show-more" onClick={this.onClickShowMoreHandler}>리뷰 더보기</button>
    );

    return (
      <div className="ReviewList">
        <Tabs id="review-tab" selectedIndex={this.state.tabIndex} onSelect={this.onClickTabHandler}>
          <TabList>
            <Tab>네이버 리뷰</Tab>
            <Tab>카카오 리뷰</Tab>
            <Tab>ATM 리뷰</Tab>
          </TabList>

          <TabPanel className="tabcontent" id="naver-content">
            <p>
              사용자들이 총
              {naverCnt}
              개의 리뷰를 남겼습니다.
            </p>
            {naverReview}
            {(naverCnt > 10 && naverCnt > this.state.currReviewCnt) ? showMoreButton : ''}
          </TabPanel>
          <TabPanel className="tabcontent" id="kakao-content">
            <p>
              사용자들이 총
              {kakaoCnt}
              개의 리뷰를 남겼습니다.
            </p>
            {kakaoReview}
            {(kakaoCnt > 10 && kakaoCnt > this.state.currReviewCnt) ? showMoreButton : ''}
          </TabPanel>
          <TabPanel className="tabcontent" id="atm-content">
            <p>
              사용자들이 총
              {atmCnt}
              개의 리뷰를 남겼습니다.
            </p>
            {atmReview}
            {(atmCnt > 10 && atmCnt > this.state.currReviewCnt) ? showMoreButton : ''}
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // otherReviews: state.rv.otherReviews,
});

const mapDispatchToProps = (dispatch) => ({
  // onGetReviews: (restaurantID) => dispatch(actionCraetors.getOtherReviews(restaurantID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
