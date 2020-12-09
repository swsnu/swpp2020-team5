import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import RestaurantSummary from '../../components/MainPage/RestaurantSummary/RestaurantSummary';
import * as actionCreators from '../../store/actions/index';
import './MainPage.css';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curPage: 1,
    };
  }
  
  componentDidMount() {
    if(this.props.match.params.name === undefined){
      this.props.onGetRestaurantList("");
    }
    else{ 
      this.props.onGetRestaurantList(this.props.match.params.name)
    }
    this.props.onGetFoodCategory();
  }
  onClickHandler() {
    const {curPage} = this.state
    this.setState({curPage: curPage+1});
  }
  render() {
    const{curPage} = this.state;
    let order = 0;
    let list =[];
    let idx=0;
    if(this.props.storedList.length === 0) 
      return(
        <div>
          <SideBar restaurantID={-1} />
            <div className='no-restaurant'>
              <p className='word'>결과가 없어요ㅠㅠ</p>
          </div>
        </div>
      );
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
            <div className='no-restaurant'>
              <p className='word'>결과가 없어요ㅠㅠ</p>
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
  foodCategory: state.us.foodCategory,
});

const mapDispatchToProps = (dispatch) => ({
  onGetRestaurantList: (name) => dispatch(actionCreators.getRestaurantList(name)),
  onGetFoodCategory: () => dispatch(actionCreators.getFoodCategory()),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));
