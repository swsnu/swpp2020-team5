import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import * as actionCreators from '../../../store/actions/index';
import food1 from '../../../images/sign_up_food_짜장면.png';
import food2 from '../../../images/sign_up_food_쌀국수.jpeg';
import food3 from '../../../images/sign_up_food_떡볶이.jpg';
import food4 from '../../../images/sign_up_food_후라이드치킨.png';
import food5 from '../../../images/sign_up_food_김치찌개.jpeg';
import food6 from '../../../images/sign_up_food_티라미수.jpg';
import checkImage from '../../../images/check.png';
import './CreatePreferenceVector.css';

class CreatePreferenceVector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFoods: [false, false, false, false, false, false],
      foodCaptionList: ['짜장면', '쌀국수', '떡볶이', '후라이드치킨', '김치찌개', '티라미수'],
    };
  }

  onClickFoodHandler = (foodIndex) => {
    const { selectedFoods } = this.state;
    selectedFoods[foodIndex] = !selectedFoods[foodIndex];
    this.setState({ selectedFoods });
  }

  onClickConfirmHandler = () => {
    const { username, email, password } = this.props;
    const { selectedFoods, foodCaptionList } = this.state;
    const selectedFoodNames = [];
    for (let i = 0; i < selectedFoods.length; i++) {
      if (selectedFoods[i]) {
        selectedFoodNames.push(foodCaptionList[i]);
      }
    }
    this.props.onPostSignUp({
      username,
      email,
      password,
      selectedFoods: selectedFoodNames,
      // selectedFoods,
    });
    this.props.history.push('/');
  }

  // image selection is not complete
  render() {
    const { alert } = this.props;
    const foodImageList = [food1, food2, food3, food4, food5, food6];
    const { foodCaptionList } = this.state;
    const foodImages = [];
    const selectedFoodsLength = this.state.selectedFoods.length;
    for (let i = 0; i < selectedFoodsLength; i += 1) {
      foodImages.push(
        <div className="food-candidate">
          <div key={i} className="food-image-wrapper" onClick={() => this.onClickFoodHandler(i)}>
            <img
              alt="food-checked"
              className={this.state.selectedFoods[i]
                ? 'food-image-checked'
                : 'food-image'}
              src={foodImageList[i]}
            />
            {this.state.selectedFoods[i] ? <img alt="check" className="check-image" src={checkImage} /> : <></> }
          </div>
          <div>{foodCaptionList[i]}</div>
        </div>,
      );
      if (i % 3 === 2) {
        foodImages.push(<br />);
      }
    }

    return (
      <div className="CreatePreferenceVector">
        <div className="box">
          <text className="signup">회원가입</text>
          <text className="step2">STEP2</text>
          <p>
            <text className="name-text">{this.props.username}</text>
            &nbsp;님, 환영합니다!
            <br />
            마지막으로 아래의 목록에서 선호하시는 음식을 모두 골라주시면,
            <br />
            준비 완료입니다!
          </p>
          <div className="images">
            {foodImages}
          </div>

          <div className="survey" />

          <div
            id="confirm-button"
            onClick={() => {
              this.onClickConfirmHandler(); alert.show('가입 완료!');
            }}
          >
            가입 완료
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onPostSignUp: (userInfo) => dispatch(actionCreators.postSignUp(userInfo)),
});

export default connect(null, mapDispatchToProps)(withAlert()(withRouter(CreatePreferenceVector)));
