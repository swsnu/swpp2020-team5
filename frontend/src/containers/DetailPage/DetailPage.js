import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import ReviewList from './ReviewList/ReviewList';
import Keywords from '../../components/DetailPage/Keywords/Keywords';
import SideBar from '../SideBar/SideBar';

import DownArrow from '../../images/arrow_down.png';
import UpArrow from '../../images/arrow_up.png';
import './DetailPage.css';

class DetailPage extends Component {
  componentDidMount() {
    this.props.onGetRestaurantDetail(parseInt(this.props.match.params.id, 10));
  }

  render() {
    const { selectedRestaurant } = this.props;
    let text; let image;

    if (selectedRestaurant.difference > 0) {
      text = `${selectedRestaurant.difference}점 상승!`;
      image = <img src={UpArrow} id="arrow" alt="upArrow" />;
    } else if (selectedRestaurant.difference < 0) {
      text = `${-selectedRestaurant.difference}점 하락!`;
      image = <img src={DownArrow} id="arrow" alt="downArrow" />;
    } else text = '변동없음!';

    let category = null;
    Object.keys(selectedRestaurant.foodCategory).forEach((cat) => {
      if (category === null) category = selectedRestaurant.foodCategory[cat];
      else category += `${selectedRestaurant.foodCategory[cat]}`;
    });
    const menu = selectedRestaurant.menu.map((el) => (
      <p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {el}
      </p>
    ));
    const imgList = selectedRestaurant.img_url_list.map((el) => <img src={el} width="280" height="200" alt="thumbnail" />);
    return (
      <div>
        <div className="sideBar">
          <SideBar restaurantID={parseInt(this.props.match.params.id, 10)} />
        </div>
        <div className="detailPage">
          <div className="right">
            <div className="restaurant" id="detail">
              <div className="image">
                <img src={selectedRestaurant.img_url} width="280" height="230" alt="thumbnail" />
              </div>
              <div className="imageright">
                <div className="up" id="new">
                  <div className="title">
                    {selectedRestaurant.title}
                  </div>
                  <div className="rate">
                    {selectedRestaurant.rate}
                  </div>
                  <div className="diff">
                    {image}
                    {text}
                  </div>
                </div>
                <div className="detailinfo" id="new">
                  <p>
                    카테고리&nbsp;&nbsp;&nbsp;
                    {category}
                  </p>
                  <p>
                    주소&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    서울 관악구 관악로14길 70 지하1층 (우)08789
                    &nbsp;&nbsp;
                    <a href="https://map.kakao.com/?urlX=490331&urlY=1105229&urlLevel=3&itemId=41742921&q=%EC%95%88%EB%85%95%EB%B2%A0%ED%8A%B8%EB%82%A8&srcid=41742921&map_type=TYPE_MAP">
                      카카오맵
                    </a>
                  </p>
                  <p>
                    영업시간&nbsp;&nbsp;&nbsp;
                    {selectedRestaurant.time}
                  </p>
                  <p>
                    메뉴&nbsp;&nbsp;&nbsp;
                    {menu}
                  </p>

                </div>
              </div>

            </div>
            <div className="keywords">
              <Keywords keywords={selectedRestaurant.keywords} />
            </div>
            <div className="moreImage">
              {imgList}

            </div>
            <div className="reviewlist">
              <ReviewList restaurantID={selectedRestaurant.id} />
            </div>
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
});
const mapStateToProps = (state) => ({
  selectedRestaurant: state.rs.selectedRestaurant,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailPage));
