import React, { Component } from 'react';
import CreateID from './CreateID/CreateID';
import CreatePreferenceVector from './CreatePreferenceVector/CreatePreferenceVector';

let Background = 'https://t1.daumcdn.net/cfile/tistory/99C145465C875C1C30';

var backgroundStyle = {
  width: '100%',
  height: '400px',
  backgroundImage: `url(${Background})`
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
      <div className='SignUp' style={backgroundStyle}>
        {signUpStage}
      </div>
    );
  }
}

export default SignUp;
