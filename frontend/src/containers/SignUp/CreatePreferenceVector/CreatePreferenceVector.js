import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import * as actionCreators from '../../../store/actions/index';
import food1 from '../../../images/1_CreatePreferenceVector.jpg';
import food2 from '../../../images/2_CreatePreferenceVector.jpg';
import food3 from '../../../images/3_CreatePreferenceVector.jpg';
import food4 from '../../../images/4_CreatePreferenceVector.jpg';
import food5 from '../../../images/5_CreatePreferenceVector.jpg';
import food6 from '../../../images/6_CreatePreferenceVector.jpg';
import checkImage from '../../../images/check.png';
import './CreatePreferenceVector.css';

class CreatePreferenceVector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFoods: [false, false, false, false, false, false],
    };
  }

  onClickFoodHandler = (foodIndex) => {
    const { selectedFoods } = this.state;
    selectedFoods[foodIndex] = !selectedFoods[foodIndex];
    this.setState({ selectedFoods });
  }

  onClickConfirmHandler = () => {
    const { username, email, password } = this.props;
    const { selectedFoods } = this.state;
    this.props.onPostSignUp({
      username,
      email,
      password,
      selectedFoods: ['짜장면']
      //selectedFoods,
    });
    this.props.history.push('/');
  }

  // image selection is not complete
  render() {
    const { alert } = this.props;
    const foodImageList = [food1, food2, food3, food4, food5, food6];
    const foodCaptionList = ['해산물', '피자', '떡볶이', '스테이크', '샐러드', '오꼬노미야끼'];
    const foodImages = [];
    const selectedFoodsLength = this.state.selectedFoods.length;
    for (let i = 0; i < selectedFoodsLength; i += 1) {
      foodImages.push(
        <div key={i} className="image-and-caption">
          <img
            alt="food-checked"
            className={this.state.selectedFoods[i]
              ? 'food-image-checked'
              : 'food-image'}
            onClick={() => this.onClickFoodHandler(i)}
            src={foodImageList[i]}
          />

          {this.state.selectedFoods[i] ? <img alt="check" className="check-image" onClick={() => this.onClickFoodHandler(i)} src={checkImage} /> : <></> }
          <text>{foodCaptionList[i]}</text>
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
