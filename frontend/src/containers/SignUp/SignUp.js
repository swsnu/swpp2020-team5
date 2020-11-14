import React, { Component } from 'react';
import CreateID from './CreateID/CreateID';
import CreatePreferenceVector from './CreatePreferenceVector/CreatePreferenceVector';
import backgroundImage from '../../images/background.jpg';
import logoImage from '../../images/logo.png';
import './SignUp.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpMode: 'CreateID',
      username: '',
      email: '',
      password: '',
    };
  }

  onChangeStageHandler = (stateDict) => {
    const { signUpMode } = this.state;
    switch (signUpMode) {
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
        throw new Error('Invalid SignUpMode');
    }
  }

  render() {
    let signUpStage;
    const { signUpMode } = this.state;
    switch (signUpMode) {
      case 'CreateID':
        signUpStage = <CreateID onChangeStageHandler={this.onChangeStageHandler} />;
        break;
      case 'CreatePreferenceVector': {
        const { username, email, password } = this.state;
        signUpStage = (
          <CreatePreferenceVector
            onChangeStageHandler={this.onChangeStageHandler}
            username={username}
            email={email}
            password={password}
          />
        );
        break;
      }
      default:
        throw new Error('Invalid SignUpMode');
    }
    return (
      <div className="SignUp">
        <img className="background" src={backgroundImage} alt="background" />
        <img className="logo" alt="#AllTastesMatterLogo" src={logoImage} />
        {signUpStage}
      </div>
    );
  }
}

export default SignUp;
