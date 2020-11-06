import React, { Component } from 'react';
import CreateID from './CreateID/CreateID';

let Background = 'https://t1.daumcdn.net/cfile/tistory/99C145465C875C1C30'

var backgroundStyle = {
  width: '100%',
  height: '400px',
  backgroundImage: `url(${Background})`
}

class SignUp extends Component {
  render() {
    return (
      <div className='SignUp' style={ backgroundStyle }>
        <CreateID></CreateID>
      </div>
    );
  }
}

export default SignUp;
