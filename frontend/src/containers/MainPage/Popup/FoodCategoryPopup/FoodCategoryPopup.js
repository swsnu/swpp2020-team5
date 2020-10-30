import React, { Component } from 'react';

import './FoodCategoryPopup.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions/actionTypes';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../../store/actions/index';
import KoreanImage from './img/Korean.jpeg'
import VietnamImage from './img/Vietnam.jpeg'
import ChineseImage from './img/Chinese.jpeg'
import ChickenImage from './img/Chicken.jpeg'

const foodCategoryName = [
  "Korean",
  "Chinese",
  "Western",
  "Vietnam",
]


// props = {
//   user_id
//   closepopup
// }
class FoodCategoryPopup extends Component {
  state = {
    foodCategory: {
      Korean: false,
      Western: false,
      Chinese: false,
      Vietnam: false,
      Chicken: false,
    },
  }

  componentDidMount() {
  }

  postClickFoodCategoryHandler = category => {
    const newState = {...this.state}
    newState.foodCategory[category] = !this.state.foodCategory[category]
    this.setState(newState)
  }

  // before onGetUser ends, this func can make problem
  postClickSaveHandler = () => {
    const id_and_foodCategory = {
      id: this.props.user_id,
      foodCategory: this.state.foodCategory
    } 
    this.props.onEditUserFoodCategory(id_and_foodCategory)

    this.props.closepopup()
  }
  // we need to add hover and clicked img showing
  // DB needed for image
  render() {
    return (
    <div className='FoodCategoryPopup'>
      <h1>Select what you want!</h1>
        <img className={this.state.foodCategory.Korean ? 'ClickedImage' : 'unClickedImage'}
          src={KoreanImage}
          alt="Korean" 
          onClick={ () => this.postClickFoodCategoryHandler("Korean") }
        >
        </img>
        <img className={this.state.foodCategory.Chinese? 'ClickedImage' : 'unClickedImage'}
          src={ChineseImage}
          alt="Chinese" 
          onClick={ () => this.postClickFoodCategoryHandler("Chinese") }
        >
        </img>
        <br/>
        <img className={this.state.foodCategory.Vietnam ? 'ClickedImage' : 'unClickedImage'}
          src={VietnamImage}
          alt="Vietnam" 
          onClick={ () => this.postClickFoodCategoryHandler("Vietnam") }
        >
        </img>
        <img className={this.state.foodCategory.Chicken ? 'ClickedImage' : 'unClickedImage'}
          src={ChickenImage}
          alt="Chicken" 
          onClick={ () => this.postClickFoodCategoryHandler("Chicken") }
        >
        </img>
      <br/>
     <button onClick={() => this.postClickSaveHandler()}>
        SAVE
      </button>
    </div>
    )
  }
}

// we can assume this popup occurs when the user is logging in
const mapDispatchToProps = dispatch => {
  return {
    onEditUserFoodCategory: id_and_foodCategory => 
      dispatch(actionCreators.editUserFoodCategory(id_and_foodCategory)),
  }
}

export default connect(null, mapDispatchToProps)(withRouter(FoodCategoryPopup))
