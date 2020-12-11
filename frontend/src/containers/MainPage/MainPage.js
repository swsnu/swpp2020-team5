import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import RestaurantSummary from '../../components/MainPage/RestaurantSummary/RestaurantSummary';
import * as actionCreators from '../../store/actions/index';
import './MainPage.css';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curPage: 1,
      isLoading: true,
    };
  }
  
  componentDidMount() {
    const searchKeyword = this.props.match.params.name === undefined ? "" : this.props.match.params.name;
    this.props.onGetRestaurantList(searchKeyword).then(()=>{this.setState({isLoading: false})});
    this.props.onGetFoodCategory();
  }
  onClickHandler() {
    const {curPage} = this.state
    this.setState({curPage: curPage+1});
  }
  onClickHelpHandler() {
    const helpContent = document.getElementsByClassName('header-help-content')[0];
    helpContent.style.display = helpContent.style.display === 'none' ? 'block' : 'none';
  }
  render() {
    const{ curPage, isLoading } = this.state;
    let order = 0;
    let list =[];
    let idx=0;
    if (isLoading) {
      return(
        <div>
          <SideBar restaurantID={-1} />
          <div className='mainPage'>
            <LoadingScreen loadingQuote="음식점 목록을 불러오는 중입니다..."/>
          </div>
        </div>
      );
    }
    while(order<curPage*10 && idx < this.props.storedList.length) {
      let el = this.props.storedList[idx];
      if(this.props.foodCategory[el.category]=== false) {
        idx++;
        continue;
      }
      order++;
      idx++;
      list.push(
        <RestaurantSummary
            title={el.title}
            id={el.id}
            img_url_list={el.img_url_list}
            rate={el.rate}
            category={el.category}
            order={order}
            preferenceVector={el.preferenceVector}
          />
      )
    }
    if(list.length === 0) {
      return(
        <div>
          <SideBar restaurantID={-1} />
          <div className='mainPage'>
            <div className='no-result'>현재 조건에 맞는 결과가 없습니다.</div>
          </div>
        </div>
      )
    }
    let moreButton;
    if(idx >= this.props.storedList.length) {
      moreButton=null;
    }
    else {
      moreButton= <button id="more-button" onClick={() => this.onClickHandler()}>더보기</button>
    }
    return (
      <div>
        <SideBar restaurantID={-1} />
        <div className="main-page-header">
          <div className="header-text">
            "{this.props.match.params.name}" 에 대한 검색 결과입니다.
          </div>
          <div className="header-help" onClick={() => this.onClickHelpHandler()}>
            <span className="questionmark">?</span>
            <div className="header-help-content" style={{display: "none"}}>
              <span className="red-text">사용자의 취향</span>
                은 회원가입 시 입력한 정보로 정해집니다.<br/>
                음식점에 리뷰를 남기면 해당 리뷰의 평점과 리뷰를 남긴 음식점의 성향을 반영하여
                사용자의 취향을 갱신합니다.<br/>
                "나의 취향" 탭에서 이를 확인하고 임의로 조정할 수 있습니다.<br/><br/>
              <span className="red-text">음식점의 성향</span>
                은 인터넷에서 음식점에 대한 정보를 수집하여
                미리 정해진 성향 요소들에 점수를 매겨 정해집니다.<br/>
                현재 페이지에서는 해당 음식점에서 가장 두드러지게 나타난
                성향 요소 3가지를 골라서 보여줍니다.<br/><br/>
              <span className="red-text">음식점의 평점</span>
                은 음식점의 성향과 사용자의 취향의 유사도를 반영하여
                기존 음식점의 평점에서 조정하여 정해집니다.<br/>
                음식점의 성향과 사용자의 취향의 요소들은 모두 동일합니다.<br/><br/>
              <span className="red-text">음식점의 순위</span>
                는 취향이 반영된 평점과
                음식점의 대중적인 인기를 모두 반영하여 정해집니다.<br/><br/>
            </div>
          </div>
        </div>
        <div className="mainPage">
          <div className="restaurantList">
            {list}
            {moreButton}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storedList: state.rs.restaurantlist,
  foodCategory: state.us.foodCategory,
});

const mapDispatchToProps = (dispatch) => ({
  onGetRestaurantList: (name) => dispatch(actionCreators.getRestaurantList(name)).then(),
  onGetFoodCategory: () => dispatch(actionCreators.getFoodCategory()),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));
