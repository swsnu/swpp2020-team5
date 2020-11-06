import React, { Component } from 'react';
import * as actionCreators from '../../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CreatePreferenceVector extends Component {
  state = {
    foodList: [false, false, false, false, false, false],
  }

  onClickFoodHandler = (foodIndex) => {
    let newFoodList = this.state.foodList;
    newFoodList[foodNumber] = !newFoodList[foodNumber];
    this.setState({ foodList: newFoodList })
  }

  onClickConfirmHandler = () => {
    this.props.onPostSignUp({
      username: this.props.username,
      email: this.props.email,
      password: this.props.password,
      foodList: this.state.foodList,
    })
  }


  render() {
    const foodImages = [];
    const foodListLength = this.state.foodList.length;
    for (var i = 0; i < foodListLength; i++) {
      foodImages.push(
        <img id='food-image' 
          onClick={() => onClickFoodHandler(i)} 
        src='https://github.com/swsnu/swpp2020-team5/tree/master/frontend/src/img' + i + {this.state.foodList[i] ? '' : '_checked'} + '.jpeg' 
        />
      );
      if (i % 3 === 2) {
        foodImages.push(<br />);
      }
    }

    return (
      <div className='CreatePreferenceVector'>
        {foodImages}
        <button id='confirm-button' onClick={() => this.onClickConfirmHandler()}
          Confirm
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  onPostSignUp: userInfo => dispatch(actionCreators.postSignUp(userInfo)),
}

export default connect(null, mapDispatchToProps)(withRouter(CreatePreferenceVector));
