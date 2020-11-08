import React, { Component } from 'react';
import * as actionCreators from '../../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import food1 from '../../../images/1_CreatePreferenceVector.jpg'
import food2 from '../../../images/2_CreatePreferenceVector.jpg'
import food3 from '../../../images/3_CreatePreferenceVector.jpg'
import food4 from '../../../images/4_CreatePreferenceVector.jpg'
import food5 from '../../../images/5_CreatePreferenceVector.jpg'
import food6 from '../../../images/6_CreatePreferenceVector.jpg'
import checkImage from '../../../images/check.png';
import './CreatePreferenceVector.css';

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


  // image selection is not complete
  render() {
    const foodImageList = [food1, food2, food3, food4, food5, food6];
    const foodCaptionList = ['해산물', '피자', '떡볶이', '스테이크', '샐러드', '오꼬노미야끼'];
    const foodImages = [];
    const foodListLength = this.state.foodList.length;
    for (let i = 0; i < foodListLength; i++) {
      foodImages.push(
        <div className='image-and-caption'>
          <img className={this.state.foodList[i]
            ? 'food-image-checked'
            : 'food-image'}
            onClick={() => this.onClickFoodHandler(i)} 
            src={foodImageList[i]}
          />

        {this.state.foodList[i] ? <img className='check-image' onClick={() => this.onClickFoodHandler(i)} src={checkImage}/>: <></> }
          <text>{foodCaptionList[i]}</text>
        </div>
      );
      if (i % 3 === 2) {
        foodImages.push(<br />);
      }
    }

    return (
      <div className='CreatePreferenceVector'>
        <div className='box'>
          <text className='signup'>회원가입</text>
          <text className='step2'>STEP2</text>
          <p>
            <text className='name-text'>{this.props.username}</text>
            &nbsp;님, 환영합니다!
            <br />
            마지막으로 아래의 목록에서 선호하시는 음식을 모두 골라주시면, 
            <br />
            준비 완료입니다!
          </p>
          <div className='images'>
            {foodImages}
          </div>          
          <div id='confirm-button' onClick={() => this.onClickConfirmHandler()}>
            가입 완료
          </div>
        </div>
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
