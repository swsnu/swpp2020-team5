import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import RestaurantSummary from '../../components/MainPage/RestaurantSummary/RestaurantSummary';
import * as actionCreators from '../../store/actions/index';
import './MainPage.css';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curPage: 1,
      isLoading: true,
      scrollX: 0,
      scrollY: 0,
    };
  }

  componentDidMount() {
    const searchKeyword = this.props.match.params.name === undefined ? '' : this.props.match.params.name;
    this.props.onGetRestaurantList(searchKeyword);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.storedList) {
      return { isLoading: false };
    }
    return {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.scrollTo(this.state.scrollX, this.state.scrollY);
  }

  onClickHandler() {
    const { curPage } = this.state;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.setState({ curPage: curPage + 1, scrollX, scrollY });
  }

  static onClickHelpHandler() {
    const helpContent = document.getElementsByClassName('header-help-content')[0];
    helpContent.style.display = helpContent.style.display === 'none' ? 'block' : 'none';
  }

  render() {
    const searchKeyword = this.props.match.params.name === undefined ? '' : this.props.match.params.name;
    const { curPage, isLoading } = this.state;
    let order = 0;
    const list = [];
    let idx = 0;
    if (isLoading) {
      return (
        <div>
          <SideBar
            restaurantID={-1}
            onReloadHandler={() => this.props.onGetRestaurantList(searchKeyword)}
          />
          <div className="mainPage">
            <LoadingScreen loadingQuote="음식점 목록을 불러오는 중입니다..." />
          </div>
        </div>
      );
    }
    while (order < curPage * 10 && idx < this.props.storedList.length) {
      const el = this.props.storedList[idx];
      order += 1;
      idx += 1;
      list.push(
        <RestaurantSummary
          key={el.id}
          title={el.title}
          id={el.id}
          img_url_list={el.img_url_list}
          rate={el.rate}
          category={el.category}
          order={order}
          preferenceVector={el.preferenceVector}
        />,
      );
    }
    if (list.length === 0) {
      return (
        <div>
          <SideBar
            restaurantID={-1}
            onReloadHandler={() => this.props.onGetRestaurantList(searchKeyword)}
          />
          <div className="mainPage">
            <div className="no-result">현재 조건에 맞는 결과가 없습니다.</div>
          </div>
        </div>
      );
    }
    let moreButton;
    if (idx >= this.props.storedList.length) {
      moreButton = null;
    } else {
      moreButton = <button id="more-button" onClick={() => this.onClickHandler()}>더보기</button>;
    }
    let headerContent = '';
    if (!this.props.match.params.name) {
      headerContent = '모든 식당';
    } else {
      headerContent = `"${this.props.match.params.name}"`;
    }
    return (
      <div className="MainPage">
        <SideBar
          restaurantID={-1}
          onReloadHandler={() => {
            this.props.onGetRestaurantList(searchKeyword);
            this.setState({ curPage: 1, scrollX: 0, scrollY: 0 });
          }}
        />
        <div className="main-page-header">
          <div className="header-text">
            {headerContent}
            에 대한 검색 결과입니다.
          </div>
          <div className="header-help">
            <span
              className="questionmark"
              onMouseOver={() => MainPage.onClickHelpHandler()}
              onMouseLeave={() => MainPage.onClickHelpHandler()}
            >
              ?
            </span>
            <div className="header-help-content" style={{ display: 'none' }}>
              <span className="red-text">사용자의 취향</span>
              은 회원가입 시 입력한 정보로 정해집니다.
              <br />
              음식점에 리뷰를 남기면 해당 리뷰의 평점과 리뷰를 남긴 음식점의 성향을 반영하여
              사용자의 취향을 갱신합니다.
              <br />
              &quot;나의 취향&quot; 탭에서 이를 확인하고 임의로 조정할 수 있습니다.
              <br />
              <br />
              <span className="red-text">음식점의 성향</span>
              은 인터넷에서 음식점에 대한 정보를 수집하여
              미리 정해진 성향 요소들에 점수를 매겨 정해집니다.
              <br />
              현재 페이지에서는 해당 음식점에서 가장 두드러지게 나타난
              성향 요소 3가지를 골라서 보여줍니다.
              <br />
              <br />
              <span className="red-text">음식점의 평점</span>
              은 음식점의 성향과 사용자의 취향의 유사도를 반영하여
              기존 음식점의 평점에서 조정하고, 최종적으로 음식점의 대중적인
              인기를 반영하여 정해집니다.
              <br />
              <br />
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
});

const mapDispatchToProps = (dispatch) => ({
  onGetRestaurantList: (name) => dispatch(actionCreators.getRestaurantList(name)),

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));
