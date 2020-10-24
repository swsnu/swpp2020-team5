import React, { Component } from 'react';
import './FoodCategoryPopup.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions/actionTypes';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../../store/actions/index';
import KoreanImage from './img/Korean.jpeg'

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
  render() {
    return (
    <div className='FoodCategoryPopup'>
      <button>
        <img 
          src={KoreanImage} 
          alt="Korean" 
          onClick={
            () => this.postClickFoodCategoryHandler("Korean")
          }>
        </img>
      </button>     
      <button onClick={() => this.postClickSaveHandler()}>
        Save
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
