import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import RestaurantSummary from '../../components/MainPage/RestaurantSummary/RestaurantSummary';
import * as actionCreators from '../../store/actions/index';
import './MainPage.css';

class MainPage extends Component {
  componentDidMount() {
    this.props.onGetRestaurantList(this.props.match.params.name);
    this.props.onGetFoodCategory();
  }

  render() {
    let order = 0;
    const list = this.props.storedList.map((el) => {
      let pos = false;
      for (const i in el.category) {
        const tmp = el.category[i];
        if (this.props.foodCategory[tmp] === true) pos = true;
      }

      if (pos === true) {
        order += 1;

        return (
          <RestaurantSummary
            title={el.title}
            id={el.id}
            img_src={el.img_src}
            rate={el.rate}
            category={el.category}
            order={order}
            preferenceVector={el.preferenceVector}
          />
        );
      }
    });

    return (
      <div>
        <div className="sideBar">
          <SideBar restaurantID={-1} />
        </div>
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
