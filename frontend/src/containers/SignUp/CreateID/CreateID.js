import { withRouter } from 'react-router';
import { withAlert } from 'react-alert';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index'
import CreatePreferenceVector from '../CreatePreferenceVector/CreatePreferenceVector';
import './CreateID.css';

const Background = 'https://thewiki.ewr1.vultrobjects.com/data/4d61744672617365722e6a7067.jpg';

const backgroundStyle = {
  width: '1425px',
  height: '650px',
  backgroundImage: `url(${Background})`,
};

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
      shouldCheck: false,
    };
  }

  componentDidMount() {
    this.props.onResetCheckUser();
      // 'NotYet' is not checked yet
      // 'NotExist' is checked but not exist
      // 'Exist' is checked and exist
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.shouldCheck) {
      if (nextProps.checkUserStatus === 'NotExist') {
        return { 
          mode: 'Preference',
          shouldCheck: false,
        }
      } else if (nextProps.checkUserStatus === 'Exist') {
        const { alert } = nextProps; 
        alert.show('이미 가입된 회원입니다!');
        nextProps.onResetCheckUser();
        return {
          shouldCheck: false,
        }
      }
      
    }
  }

  onClickConfirmHandler() {
    const { username, email } = this.state.userInfo;
    this.props.onCheckUser(username, email);
    this.setState({
      shouldCheck: true,
    })
  }

  onChangeButtonHandler() {
    const { userInfo } = this.state;
    if (userInfo.username && userInfo.password 
        && emailRegex.test(userInfo.email)
        && userInfo.password 
        && (userInfo.password === this.state.verifyPassword)) return false;

    return true;
  }

  render() {
    const { userInfo } = this.state;
    if (this.state.mode === 'Preference') {
      this.props.onChangeStageHandler(userInfo);
    }
    // return(
    // <CreatePreferenceVector  userInfo={userInfo}/>
    // );
    let isverified;
    if (userInfo.password === null
        || userInfo.password === ""
        || userInfo.password !== this.state.verifyPassword) {
      isverified = 'Password not verified';
    } else isverified = 'Ok';

    let validEmail = emailRegex.test(this.state.userInfo.email) ? 
                      '' : 'Invalid form!';

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
          {this.state.userInfo.email === null ? '' : validEmail}

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
          {this.state.userInfo.password === null ? '' : isverified}

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

const mapStateToProps = (state) => ({
  checkUserStatus: state.us.checkUserStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onCheckUser: (username, email) => dispatch(actionCreators.checkUser(username, email)),
  onResetCheckUser: () => dispatch(actionCreators.resetCheckUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(withRouter(CreateID)));
