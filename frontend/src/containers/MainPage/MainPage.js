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
  }
  onClickHandler() {
    const {curPage} = this.state
    this.setState({curPage: curPage+1});
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
      order++;
      idx++;
      list.push(
        <RestaurantSummary
            title={el.title}
            id={el.id}
            img_url={el.img_url}
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
    // const list = this.props.storedList.map((el) => {
    //   if (this.props.foodCategory[el.category] === true){
        
    //     order += 1;
    //     return (
    //       <RestaurantSummary
    //         title={el.title}
    //         id={el.id}
    //         img_url={el.img_url}
    //         rate={el.rate}
    //         category={el.category}
    //         order={order}
    //         preferenceVector={el.preferenceVector}
    //       />
    //     );
    //   }
    //   return null;
    // });

    return (
      <div>
        <SideBar restaurantID={-1} />
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
  onGetRestaurantList: (name) => dispatch(actionCreators.getRestaurantList(name)).then(),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));
