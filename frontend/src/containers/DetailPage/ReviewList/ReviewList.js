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
      // NOT USED YET
      // currentReviews: {
      //   naver: [],
      //   kakao: [],
      //   atm: [],
      // },
      tab_index: 0,
    };
  }

  componentDidMount() {
    this.props.onGetReviews(this.props.restaurantID);
  }

  onClickTabHandler = (index) => {
    this.setState({ tab_index: index });
  }

  render() {
    // TODO other review 분류작업? + <OtherReview> 로 렌더링
    //

    const naverReview = this.props.otherReviews.naver.map((review) => (
      <OtherReview
        content={review.content}
        author={review.authorName}
        date={review.date}
        rating={review.rating}
      />
    ));

    const kakaoReview = this.props.otherReviews.kakao.map((review) => (
      <OtherReview
        content={review.content}
        author={review.authorName}
        date={review.date}
        rating={review.rating}
      />
    ));

    const atmReview = this.props.otherReviews.atm.map((review) => (
      <OtherReview
        content={review.content}
        author={review.authorName}
        date={review.date}
        rating={review.rating}
      />
    ));

    const naverCnt = naverReview.length;
    const kakaoCnt = kakaoReview.length;
    const atmCnt = atmReview.length;

    return (
      <div className="ReviewList">
        <Tabs selectedIndex={this.state.tab_index} onSelect={this.onClickTabHandler}>
          <TabList>
            <Tab>네이버 리뷰</Tab>
            <Tab>카카오 리뷰</Tab>
            <Tab>ATM 리뷰</Tab>
          </TabList>

          <TabPanel className="tabcontent" id="naver-content">
            <p>
              다른 사용자들이 총
              {naverCnt}
              개의 리뷰를 남겼습니다.
            </p>
            {naverReview}
          </TabPanel>
          <TabPanel className="tabcontent" id="kakao-content">
            <p>
              다른 사용자들이 총
              {kakaoCnt}
              개의 리뷰를 남겼습니다.
            </p>
            {kakaoReview}
          </TabPanel>
          <TabPanel className="tabcontent" id="atm-content">
            <p>
              다른 사용자들이 총
              {atmCnt}
              개의 리뷰를 남겼습니다.
            </p>
            {atmReview}
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  otherReviews: state.rv.otherReviews,
});

const mapDispatchToProps = (dispatch) => ({
  onGetReviews: (restaurantID) => dispatch(actionCraetors.getOtherReviews(restaurantID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
