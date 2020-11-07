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
  }



  render() {
    let order=0;
    const list=this.props.storedList.map((el)=>{
      order++;
      return <RestaurantSummary title={el.title} id={el.id} img_url={el.img_url} rate={el.rate} 
          menu={el.menu} category={el.category} order={order} keywords={el.keywords} />
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
    storedList: state.rs.restaurantlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetRestaurantList: (name) =>
      dispatch(actionCreators.getRestaurantList(name)),


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage))
