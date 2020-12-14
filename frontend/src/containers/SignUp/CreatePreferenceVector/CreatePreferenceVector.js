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
    this.handleRadio = this.handleRadio.bind(this);
    this.state = {
      selectedFoods: [false, false, false, false, false, false],
      foodCaptionList: ['짜장면', '쌀국수', '떡볶이', '후라이드치킨', '김치찌개', '티라미수'],
      serviceOptionList: [null, null, null, null],
    };
  }

  handleRadio(event) {
    const { serviceOptionList } = this.state;
    const numbers = event.target.value.split('_');
    serviceOptionList[numbers[0]] = Number(numbers[1]);
    this.setState({ serviceOptionList });
  }

  onClickFoodHandler = (foodIndex) => {
    const { selectedFoods } = this.state;
    selectedFoods[foodIndex] = !selectedFoods[foodIndex];
    this.setState({ selectedFoods });
  }

  onClickConfirmHandler = () => {
    const {
      username, email, password, alert,
    } = this.props;
    const { selectedFoods, foodCaptionList, serviceOptionList } = this.state;
    const selectedFoodNames = [];
    for (let i = 0; i < serviceOptionList.length; i += 1) {
      if (serviceOptionList[i] === null) {
        alert.error('설문을 완료해주세요!');
        return;
      }
    }
    for (let i = 0; i < selectedFoods.length; i += 1) {
      if (selectedFoods[i]) {
        selectedFoodNames.push(foodCaptionList[i]);
      }
    }
    this.props.onPostSignUp({
      username,
      email,
      password,
      selectedFoods: selectedFoodNames,
      serviceOptionList,
    });
    this.props.history.push('/');
    alert.show('가입 완료!');
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
        <div key={i} className="food-candidate">
          <div className="food-image-wrapper" onClick={() => this.onClickFoodHandler(i)}>
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
        foodImages.push(<br key={`${i}br`} />);
      }
    }

    const radioOptionsArray = [];
    // 저렴한 혼밥 웨이팅 친절한
    radioOptionsArray.push([
      '가격이 저렴한 것을 중요시 하시나요?',
      { label: '중요해요.' },
      { label: '보통이에요.' },
      { label: '상관없어요.' },
    ]);
    radioOptionsArray.push([
      '혼밥을 자주 하시나요?',
      { label: '자주해요.' },
      { label: '보통이에요.' },
      { label: '거의안해요.' },
    ]);
    radioOptionsArray.push([
      '웨이팅이 있어도 괜찮으신가요?',
      { label: '괜찮아요.' },
      { label: '보통이에요.' },
      { label: '없으면좋아요.' },
    ]);
    radioOptionsArray.push([
      '친절한 서비스를 중요시 하시나요?',
      { label: '중요해요.' },
      { label: '보통이에요.' },
      { label: '상관없어요.' },
    ]);
    let i = -1;
    let j = -1;
    const surveyList = radioOptionsArray.map((option) => {
      i += 1;
      j = -1;
      return (
        <p key={i}>
          {option[0]}
          <br />
          {
          option.slice(1).map((radioButton) => {
            j += 1;
            return (
              <div key={j} className="checks small">
                <input
                  type="radio"
                  id={`rd${i}_${j}`}
                  name={`rds_${i}`}
                  value={`${i}_${j}`}
                  onChange={this.handleRadio}
                />
                <label htmlFor={`rd${i}_${j}`}>{option[j + 1].label}</label>
              </div>
            );
          })
        }
        </p>
      );
    });

    return (
      <div className="CreatePreferenceVector">
        <div className="box">
          <text className="signup">회원가입</text>
          <text className="step2">STEP2</text>
          <p>
            <text className="name-text">{this.props.username}</text>
            &nbsp;님, 환영합니다!
            <br />
            마지막으로 아래의 목록에서 선호하시는 음식을 모두 고르고 설문을 해주시면,
            <br />
            준비 완료입니다!
          </p>
          <hr />
          <div className="images-and-surveys">
            <div id="foods">
              {foodImages}
            </div>
            <hr width="93%" />
            <div className="survey">
              <div className="survey-line">
                {surveyList}
              </div>
            </div>
          </div>
          <div
            id="confirm-button"
            onClick={() => {
              this.onClickConfirmHandler();
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
