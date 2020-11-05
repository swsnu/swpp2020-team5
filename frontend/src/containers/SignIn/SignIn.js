import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';

class SignIn extends Component{
  state = {
    email: '',
    password: '',
  }
  onClickSignInHandler = () => {
    this.props.onPostSignIn(this.state.email, this.state.password);
  }
  render(){
    return (
      <div className="sign-in">
        <img id="logo"></img>
        <div>나만의 입맛, 나만의 평점.</div>
        <div id="sign-in-box">
          <h1>로그인</h1>
          <div>이메일</div>
          <input type="text" id="email-input" value={this.state.email}
            onChange={(event) => this.setState({ email: event.target.value })} />
          <div>비밀번호</div>
          <input type="text" id="password-input" value={this.state.password}
            onChange={(event) => this.setState({ password: event.target.value })} />
          <button id="sign-in-button" onClick = {()=>this.onClickSignInHandler()} >로그인</button>
          <div>
            아직 회원이 아니신가요? <a id="sign-up-link" href='/sign-up'>회원 가입</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostSignIn: (email, password) => {
      dispatch(actionCreators.postSignIn(email, password));
    },
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(SignIn));