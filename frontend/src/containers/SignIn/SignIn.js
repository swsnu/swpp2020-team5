import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

import logo from '../../../images/logo.png'
import background from '../../../images/background.jpg'
import './SignIn.css'

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
        <img className='background' alt='background' src={background}></img>
        <img className='logo' alt='#AllTastesMatterLogo' src={logo}></img>
        <div className='phrase'>나만의 입맛, 나만의 평점.</div>
        <div id='sign-in-box' className='box'>
          <h1 className='box-head'>로그인</h1>
          <div className='box-text'>이메일</div>
          <input type="text" id="email-input" className='input' value={this.state.email}
            onChange={(event) => this.setState({ email: event.target.value })} />
          <div className='box-text'>비밀번호</div>
          <input type="text" id="password-input" className='input' value={this.state.password}
            onChange={(event) => this.setState({ password: event.target.value })} />
          <div>
            <button id="sign-in-button" onClick = {()=>this.onClickSignInHandler()} >로그인</button>
          </div>
          <div className='sign-up'>
            아직 회원이 아니신가요? <a id="sign-up-link" className='link' href='/sign-up'>회원 가입</a>
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