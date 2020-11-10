import React, { Component } from 'react';

import './FoodCategoryTab.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index';
import img from '../../../images/logo.png';
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
    let changed=false;
    for(let category in this.props.foodCategory){
      if(this.props.foodCategory[category]===false) 
        changed=true;
    }
    if(changed===true)
      this.setState({foodCategory:this.props.foodCategory});
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
    
    let categorylist=[];
    for(let category in this.state.foodCategory){
      categorylist.push( 
       <div className='category'>
          <img src={img} className={this.state.foodCategory[category]?
          'checked':'unchecked'} width='50' height='50' 
          onClick={() => this.postClickFoodCategoryHandler(category)}
          ></img>
          
        </div>)
    }  
    return (
    <div className='foodCategory'>
      <h1>Select what you want!</h1>
      <div className='images'>
        {categorylist}
      </div>
     <button id='savebutton' onClick={() => this.postClickSaveHandler()}>
        SAVE
      </button>
    </div>
    )
  }
}
//만약에 유저에서 가져올거면 그거있어야함
const mapStateToProps = state =>{
  return{foodCategory:state.us.foodCategory};
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
