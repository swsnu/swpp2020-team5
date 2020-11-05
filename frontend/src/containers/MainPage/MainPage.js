import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import RestaurantSummary from '../../components/MainPage/RestaurantSummary/RestaurantSummary';
import LocationPopup from './Popup/LocationPopup/LocationPopup';
import PreferenceVectorPopup from './Popup/PreferenceVectorPopup/PreferenceVectorPopup';
import PreferencePopup from './Popup/PreferencePopup/PreferencePopup.js';
import FoodCategoryPopup from './Popup/FoodCategoryPopup/FoodCategoryPopup';
import RestaurantReviewList from '../DetailPage/RestaurantReviewList/RestaurantReviewList.js';
import * as actionCreators from '../../store/actions/index';

class MainPage extends Component {
  componentDidMount(){
    this.props.onGetRestaurantlist();

  }

  onClickSearchHandler(restaurantname){
    this.props.onGetRestaurantName(restaurantname);
    this.props.history.push('/main/' + restaurantname);
    //서치한 페이지로 가는 거 
    //서치드 페이지 하나 만들어서 메인 페이지 밑에 거기다가 넣어놔야할듯
    //서치드 페이지에는 버튼 같은거 없고 그냥 음식점 리스트랑 뒤로가기 버튼 정도만 있으면 될듯합니다.
    //axios.get(그거 줘야할듯 파라미터)
    //그페이지에서 검색하는 음식이 없었을 때 나올 멘트도 정해놔야할듯
  }
  onClickNameHandler(restaurant_id){
    this.props.history.push('/main/detail/'+restaurant_id);
  }
  state={
   searchbyname:null

  }
  render() {
    const restaurantlists=this.props.storedlist.map(rl =>{
      return (
         <RestaurantSummary title={rl.title} rate={rl.rate} 
         img_url={rl.img_url} clickrestaurant={()=>this.onClickNameHandler(rl.id)}
        />
      );
    });


    return(
      <div className = 'mainPage'>
        <div className='locationPopup'>
        <LocationPopup />
        </div>
        <div className='preferencePopup'>
        <PreferenceVectorPopup />
        </div>
        <div className='foodPopup'>
        <FoodCategoryPopup />
        </div>
        <h1>
          <input type='text' id='searchByName'
            value={this.state.searchbyname} 
            onChange={(ev)=>this.setState({searchbyname:ev.target.value})}>
          </input>
          <button onClick={()=>this.onClickSearchHandler(this.state.searchbyname)}>
            Search
          </button>
        </h1>
        {restaurantlists}
      </div>



    )
  }
}

const mapStateToProps = state => {
  return {
    storedlist: state.rs.restaurantlist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetRestaurantlist: () =>
      dispatch(actionCreators.getRestaurantList()),
    onGetRestaurantName: (restaurantname)=>
      dispatch(actionCreators.getRestaurantName(restaurantname))    
    

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage))
