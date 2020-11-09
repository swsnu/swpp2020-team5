import React, { Component } from 'react';
import CreateID from './CreateID/CreateID';
import CreatePreferenceVector from './CreatePreferenceVector/CreatePreferenceVector';
import backgroundImage from '../../images/background.jpg';
import logoImage from '../../images/logo.png'
import './SignUp.css';

var backgroundStyle = {
  width: '100%',
  height: '400px',
  backgroundImage: backgroundImage
}

class SignUp extends Component {
  state = {
    signUpMode: 'CreateID',
    username: '',
    email: '',
    password: '',
  }

  onChangeStageHandler = (stateDict) => {
    switch (this.state.signUpMode) {
      case 'CreateID':
        this.setState({ 
          signUpMode: 'CreatePreferenceVector',
          username: stateDict.username,
          email: stateDict.email,
          password: stateDict.password,
        });
        break;
      /*   This is needed optionally
      case 'CreatePreferenceVector':
        this.setState({ signUpMode: 'CreateID' });
        break;
      */
      default:
        const error = new Error('Invalid SignUpMode');
        console.log(error.message);
    }
  }

  render() {
    let signUpStage;
    switch (this.state.signUpMode) {
      case 'CreateID':
        signUpStage = <CreateID onChangeStageHandler={this.onChangeStageHandler}></CreateID>
        break;
      case 'CreatePreferenceVector':
        signUpStage = <CreatePreferenceVector 
          onChangeStageHandler={this.onChangeStageHandler}
          username={this.state.username}
          email={this.state.email}
          password={this.state.password}
        />
        break;
      default:
        const error = new Error('Invalid SignUpMode');
        console.log(error.message);
    }
    return (
      <div className='SignUp'>
        <img className='background' src={backgroundImage}></img>
        <img className='logo' alt='#AllTastesMatterLogo' src={logoImage}></img>
          {signUpStage}
      </div>
    );
  }
}

export default SignUp;
