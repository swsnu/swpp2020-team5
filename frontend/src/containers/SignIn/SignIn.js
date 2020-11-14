import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../store/actions/index';

import logo from '../../images/logo.png';
import background from '../../images/background.jpg';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onClickSignInHandler = () => {
    const { onPostSignIn } = this.props;
    const { history } = this.props;
    const { password } = this.state;
    const { email } = this.state;

    onPostSignIn(email, password);
    history.push('/main');
  }

  render() {
    const { password } = this.state;
    const { email } = this.state;
    return (
      <div className="sign-in">
        <img className="background" alt="background" src={background} />
        <img className="logo" alt="#AllTastesMatterLogo" src={logo} />
        <div className="phrase">나만의 입맛, 나만의 평점.</div>
        <div id="sign-in-box" className="box">
          <h1 className="box-head">로그인</h1>
          <div className="box-text">이메일</div>
          <input
            type="text"
            id="email-input"
            className="input"
            value={email}
            onChange={(event) => this.setState({ email: event.target.value })}
          />
          <div className="box-text">비밀번호</div>
          <input
            type="password"
            id="password-input"
            className="input"
            value={password}
            onChange={(event) => this.setState({ password: event.target.value })}
          />
          <div>
            <button
              type="button"
              id="sign-in-button"
              onClick={() => this.onClickSignInHandler()}
            >
              로그인
            </button>
          </div>
          <div className="sign-up">
            아직 회원이 아니신가요?
            {' '}
            <a id="sign-up-link" className="link" href="/sign-up">회원 가입</a>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  onPostSignIn: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
};

SignIn.defaultProps = {
  onPostSignIn: null,
  history: null,
};

const mapStatetoProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  onPostSignIn: (email, password) => {
    dispatch(actionCreators.postSignIn(email, password));
  },
});

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(SignIn));
