import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import RestaurantSummary from '../../components/MainPage/RestaurantSummary/RestaurantSummary';
import * as actionCreators from '../../store/actions/index';
import './MainPage.css';

class MainPage extends Component {
  componentDidMount() {
    if(this.props.match.params.name === undefined){
      this.props.onGetRestaurantList("");
    }
    else{ 
      this.props.onGetRestaurantList(this.props.match.params.name)
    }
    this.props.onGetFoodCategory();
  }

  render() {
    let order = 0;
    const list = this.props.storedList.map((el) => {
      if (this.props.foodCategory[el.category] === true){
        order += 1;

        return (
          <RestaurantSummary
            title={el.title}
            id={el.id}
            img_url={el.img_url}
            rate={el.rate}
            category={el.category}
            order={order}
            preferenceVector={el.preferenceVector}
          />
        );
      }
      return null;
    });

    return (
      <div>
        <SideBar restaurantID={-1} />
        <div className="mainPage">
          <div className="restaurantList">
            {list}
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
