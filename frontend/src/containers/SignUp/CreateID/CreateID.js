import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePreferenceVector from '../CreatePreferenceVector/CreatePreferenceVector';
import './CreateID.css';

const Background = 'https://thewiki.ewr1.vultrobjects.com/data/4d61744672617365722e6a7067.jpg';

const backgroundStyle = {
  width: '1425px',
  height: '650px',
  backgroundImage: `url(${Background})`,
};

class CreateID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        username: null,
        email: null,
        password: null,
        foodList: [],
      },
      verifyPassword: null,
      mode: 'ID',
    };
  }

  onClickConfirmHandler() {
    this.setState({ mode: 'Preference' });
  }

  onChangeButtonHandler() {
    const { userInfo } = this.state;
    if (userInfo.username === null || userInfo.password === null
            || userInfo.email === null) return true;
    if (userInfo.password === this.state.verifyPassword) return false;
    return true;
  }

  render() {
    const { userInfo } = this.state;
    if (this.state.mode === 'Preference') this.props.onChangeStageHandler(userInfo);
    // return(
    // <CreatePreferenceVector  userInfo={userInfo}/>
    // );
    let isverified;
    if (userInfo.password === null
        || userInfo.password !== this.state.verifyPassword) {
      isverified = 'Password not verified';
    } else isverified = 'Ok';
    return (

    // <div className='createID' style={ backgroundStyle} >
      <div className="createID">
        <div className="box">
          <text className="signup">회원가입</text>
          <text className="step1">STEP1</text>

          <p>이름</p>
          <input
            id="username-input"
            type="text"
            value={userInfo.username}
            onChange={(ev) => {
              this.setState({ userInfo: { ...userInfo, username: ev.target.value } });
            }}
          />

          <p>이메일</p>
          <input
            id="email-input"
            type="text"
            value={userInfo.email}
            onChange={(ev) => {
              this.setState({ userInfo: { ...userInfo, email: ev.target.value } });
            }}
          />

          <p>비밀번호</p>
          <input
            id="password-input"
            type="password"
            value={userInfo.password}
            onChange={(ev) => {
              this.setState({ userInfo: { ...userInfo, password: ev.target.value } });
            }}
          />
          <p>비밀번호확인</p>
          <input
            id="verify-password-input"
            type="password"
            value={this.state.verifyPassword}
            onChange={(ev) => {
              this.setState({ verifyPassword: ev.target.value });
            }}
          />
          <p id="verified">{isverified}</p>

          <button
            id="confirm-button"
            disabled={this.onChangeButtonHandler()}
            onClick={() => this.onClickConfirmHandler()}
          >
            확인
          </button>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateID));
