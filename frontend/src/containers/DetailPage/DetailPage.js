import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import ReviewList from './ReviewList/ReviewList';
import Keywords from '../../components/DetailPage/Keywords/Keywords';
import SideBar from '../SideBar/SideBar';
import RestaurantMenu from '../../components/DetailPage/RestaurantDetail/RestaurantMenu/RestaurantMenu'
import RestaurantDetail from '../../components/DetailPage/RestaurantDetail/RestaurantDetail';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import DownArrow from '../../images/arrow_down.png';
import UpArrow from '../../images/arrow_up.png';
import NoImage from '../../images/no_img.png';
import './DetailPage.css';

class DetailPage extends Component {
  componentDidMount() {
    this.props.onGetRestaurantDetail(parseInt(this.props.match.params.id, 10));
    this.props.onGetReviews(parseInt(this.props.match.params.id, 10));
    window.scrollTo(0,0);
  }

  render() {

    const { selectedRestaurant } = this.props;
    if(selectedRestaurant === null) {
      return (
        <div>
          <SideBar restaurantID={-1} />
          <div className="detailPage">
            <LoadingScreen loadingQuote="음식점 정보를 불러오는 중입니다..."/>
          </div>
        </div>
      )
    }
    console.log(selectedRestaurant.id)
    const ratingDiff = selectedRestaurant.difference.toFixed(2);
    const imgList = selectedRestaurant.img_url_list.map((el) => {
      return (
        <img
        src={el}
        className="restaurant-image"
        alt="restaurant image"
        onError={ev => ev.target.style.display='none'}
        />
        );
      });
    const ratingDiffWrapper = () => {
      let text, image;
      if (ratingDiff > 0) {
        text = <div className="rating-increased">{ratingDiff}점 상승!</div>;
        image = <img src={UpArrow} id="arrow" alt="upArrow" />;
      }
      else if (ratingDiff < 0) {
        text = <div className="rating-decreased">{-ratingDiff}점 하락!</div>;
        image = <img src={DownArrow} id="arrow" alt="downArrow" />;
      }
      else {
        text = <div className="rating-unchanged">'변동없음!'</div>;
      }
      return (
        <div className="rating-diff-wrapper">
          {image}{text}
        </div>)
    }

    const category = selectedRestaurant.category;
    const location =  <div>
                        {selectedRestaurant.location}
                        &nbsp;&nbsp;
                        <a href={selectedRestaurant.location_link} style={{textDecoration: 'none'}}>
                          카카오맵
                        </a>
                      </div>;

    function buildMenu(key, dataDict) {
      return(
        <RestaurantMenu
          name = {key}
          price = {dataDict[key]}
        />
      )
    }
      
    function buildOnTime(key, dataDict) {
      return(
        <div>
          {key} {dataDict[key]}
        </div>
      )
    }
    function buildOffTime(key, dataDict) {
      return(
        <div>
          {dataDict[key]}
        </div>
      )
    }
    
    function loadData(dataType, dataDict, buildFunc) {
      if (Object.keys(dataDict).length === 0) {
        dataType.push(<div>(정보없음)</div>)
      }
      else {
        Object.keys(dataDict).forEach((key) => {
          dataType.push(buildFunc(key, dataDict));
        });
      }
    }
    
    const menu = [];
    loadData(menu, selectedRestaurant.menu, buildMenu);

    const onTime = [];
    loadData(onTime, selectedRestaurant.time["영업 시간"], buildOnTime);
    
    const offTime = [];
    loadData(offTime, selectedRestaurant.time["휴무일"], buildOffTime);
    let i = 0;
    const urlListLength = selectedRestaurant.img_url_list.length;
    return (
      <div>
        <div className="sideBar">
          <SideBar restaurantID={parseInt(this.props.match.params.id, 10)} />
        </div>
        <div className="detailPage">
          <div className="restaurant-details">
            <img 
              onError={ev => {
                i += 1;
                if (i > urlListLength) ev.target.src = NoImage;
                else ev.target.src = selectedRestaurant.img_url_list[i];
              }}
              src={
                urlListLength === 0 ? NoImage : selectedRestaurant.img_url_list[0]
              }
              className="thumbnail"
              alt="thumbnail"
            />
            <div className="imageright">
              <div className="up">
                <div className="title">
                  {selectedRestaurant.name}
                </div>
                <div className="rate">
                  {selectedRestaurant.rate}
                </div>
                {ratingDiffWrapper()}
              </div>
              <div className="detailinfo">
                <RestaurantDetail detailType='카테고리' detailData={category}/>
                <RestaurantDetail detailType='주소' detailData={location}/>
                <RestaurantDetail detailType='영업시간' detailData={onTime}/>
                <RestaurantDetail detailType='휴무일' detailData={offTime}/>
                <RestaurantDetail detailType='메뉴' detailData={menu}/>
              </div>
            </div>
          </div>
          <div className="info-type">주요 키워드 ㅣ</div>
          <div className="keywords">
            <Keywords keywords={selectedRestaurant.keywords} />
          </div>
          <div className="info-type">리뷰 이미지 ㅣ</div>
          <div className="moreImage">
            {imgList}
          </div>
          <div className="info-type">방문자 리뷰 ㅣ</div>
          <div className="reviewlist">
            <ReviewList restaurantID={selectedRestaurant.id} otherReviews={this.props.otherReviews} />
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  onGetRestaurantDetail: (restaurantID) => {
    dispatch(actionCreators.getRestaurantDetail(restaurantID));
  },
  onGetReviews: (restaurantID) => dispatch(actionCreators.getOtherReviews(restaurantID)),
});
const mapStateToProps = (state) => ({
  selectedRestaurant: state.rs.selectedRestaurant,
  otherReviews: state.rv.otherReviews,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailPage));
