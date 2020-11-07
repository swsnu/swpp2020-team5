import React, { Component } from 'react';
import * as actionCreators from '../../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import food1 from './img/1.jpeg';
import food1_clicked from './img/1_checked.jpeg';
import food2 from './img/2.jpeg';
import food2_clicked from './img/2_checked.jpeg';
import food3 from './img/3.jpeg';
import food3_clicked from './img/3_checked.jpeg';
import food4 from './img/4.jpeg';
import food4_clicked from './img/4_checked.jpeg';
import food5 from './img/5.jpeg';
import food5_clicked from './img/5_checked.jpeg';
import food6 from './img/6.jpeg';
import food6_clicked from './img/6_checked.jpeg';

class CreatePreferenceVector extends Component {
  state = {
    foodList: [false, false, false, false, false, false],
  }

  onClickFoodHandler = (foodIndex) => {
    let newFoodList = this.state.foodList;
    newFoodList[foodIndex] = !newFoodList[foodIndex];
    console.log(foodIndex);
    console.log(newFoodList);
    this.setState({ foodList: newFoodList })
  }

  onClickConfirmHandler = () => {
    this.props.onPostSignUp({
      username: this.props.username,
      email: this.props.email,
      password: this.props.password,
      foodList: this.state.foodList,
    });
    this.props.history.push('/sign-in/');
  }


  render() {
    const foodImageList = [food1, food2, food3, food4, food5, food6];
    const foodImageClickedList = [food1_clicked, food2_clicked, food3_clicked, food4_clicked, food5_clicked, food6_clicked];

    const foodImages = [];
    const foodListLength = this.state.foodList.length;
    for (let i = 0; i < foodListLength; i++) {
      foodImages.push(
        <img id='food-image' 
          onClick={() => this.onClickFoodHandler(i)} 
          src={this.state.foodList[i] ? foodImageList[i] : foodImageClickedList[i]}
        />
      );
      if (i % 3 === 2) {
        foodImages.push(<br />);
      }
    }

    return (
      <div className='CreatePreferenceVector'>
        {foodImages}
        <button id='confirm-button' onClick={() => this.onClickConfirmHandler()}>
          Confirm
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostSignUp: userInfo => dispatch(actionCreators.postSignUp(userInfo)),    
  }
}

export default connect(null, mapDispatchToProps)(withRouter(CreatePreferenceVector));
