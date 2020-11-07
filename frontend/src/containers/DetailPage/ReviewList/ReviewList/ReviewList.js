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
    //




    return (
      <div className='ReviewList'>
        <div className='tab'>
          <button className='tablinks' id='naver-tab-button' onClick={(event) => {this.onClickTabButtonHandler(event, 'naver-content')}}>네이버 리뷰</button> 
          <button className='tablinks' id='kakao-tab-button' onClick={(event) => {this.onClickTabButtonHandler(event,'kakao-content')}}>카카오 리뷰</button> 
          <button className='tablinks' id='atm-tab-button' onClick={(event) => {this.onClickTabButtonHandler(event,'atm-content')}}>ATM 리뷰</button> 
        </div>

        <div className='tabcontent' id='naver-content'>
          <OtherReview content='this is naver sosososososo very Long content is here.' author='swpp' createTime='minute ago' rating='4'/>
        </div>
        <div className='tabcontent' id='kakao-content'>
          <p>this is kakao</p>
        </div>
        <div className='tabcontent' id='atm-content'>
          <p>this is atm</p>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    selectedReviews: state.rv.otherReview,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetReviews: (restaurantID) => dispatch(actionCraetors.getReviews(restaurantID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList); 
