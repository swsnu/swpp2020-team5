import React, { Component } from 'react';

import './FoodCategoryTab.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index';
import img from '../../../images/background.jpg';
class FoodCategoryTab extends Component {
  state = {
    foodCategory: {
      한식: false,
      양식: false,
      중식: false,
      일식: false,
    },
  }

  componentDidMount() {
    this.props.onGetFoodCategory();
  }

  postClickFoodCategoryHandler = category => {
    const newState = {...this.state}
    newState.foodCategory[category] = !this.state.foodCategory[category]
    this.setState(newState)
  }

  // before onGetUser ends, this func can make problem
  //id 추가해야되나?

  postClickSaveHandler = () => {
    const foodCategory = {
      foodCategory: this.state.foodCategory
    } 
    this.props.onEditUserFoodCategory(foodCategory)

    
  }
  // we need to add hover and clicked img showing
  // DB needed for image
  render() {
    let foodcategoryname=['한식','양식','중식','일식'];
    let categorylist=[];
    for (var i=0;i<foodcategoryname.length;i++)
       {categorylist.push( 
       <div>
          <img src={img} width='50' height='50'></img>
          <text>{foodcategoryname[i]}</text>
        </div>)
       }
    return (
    <div className='foodCategory'>
      <h1>Select what you want!</h1>
        {categorylist}
     <button onClick={() => this.postClickSaveHandler()}>
        SAVE
      </button>
    </div>
    )
  }
}
//만약에 유저에서 가져올거면 그거있어야함
const mapStateToProps = state =>{
  
}

// we can assume this popup occurs when the user is logging in
const mapDispatchToProps = dispatch => {
  return {
    onEditUserFoodCategory: foodCategory => 
      dispatch(actionCreators.editUserFoodCategory(foodCategory)),
    onGetFoodCategory: () =>
      dispatch(actionCreators.getFoodCategory()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FoodCategoryTab))
