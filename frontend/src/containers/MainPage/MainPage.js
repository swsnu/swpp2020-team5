import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import RestaurantSummary from '../../components/MainPage/RestaurantSummary/RestaurantSummary';
import ReviewList from '../DetailPage/ReviewList/ReviewList/ReviewList';
import MyInfoTab from '../SideBar/MyInfoTab/MyInfoTab';
import LocationTab from '../SideBar/LocationTab/LocationTab';
import FoodCategoryTab from '../SideBar/FoodCategoryTab/FoodCategoryTab';
import PreferenceVectorTab from '../SideBar/PreferenceVectorTab/PreferenceVectorTab';
import * as actionCreators from '../../store/actions/index';
import './MainPage.css';
class MainPage extends Component {
  componentDidMount(){
    this.props.onGetRestaurantList(this.props.match.params.name);
    this.props.onGetFoodCategory();
  }



  render() {
    
    let order=0;
    const list=this.props.storedList.map((el)=>{
      let pos=false;
      for (var i in el.category){
        let tmp=el.category[i];
        if(this.props.foodCategory[tmp]===true) pos=true;
      }

      if(pos===true){ 
      order++;

      return <RestaurantSummary title={el.title} id={el.id} /*img_url={el.img_url}*/ img_src={el.img_src} rate={el.rate} 
          category={el.category} order={order} preferenceVector={el.preferenceVector} />}

    })

    return(
      <div className = 'mainPage'>
        <div className='sideBar'>
          <SideBar restaurantID={-1}/>
        </div>
        <div className='restaurantList'>
          {list}
        </div>
      </div>



    )
  }
}

const mapStateToProps = state => {
  return {
    storedList: state.rs.restaurantlist,
    foodCategory: state.us.foodCategory,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetRestaurantList: (name) =>
      dispatch(actionCreators.getRestaurantList(name)),
    onGetFoodCategory: () =>
      dispatch(actionCreators.getFoodCategory()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage))
