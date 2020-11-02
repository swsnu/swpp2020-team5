import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import * as actionTypes from '../../../../store/actions/actionTypes.js';
import * as actionCreators from '../../../../store/actions/index.js';

class PreferenceVectorPopup extends Component {

  state = {
    preferenceVector: {
        factor_one: 1,
        factor_two: 3,
        factor_three: 5,
    },
  }


  componentDidMount() {
        
        //backend needed
        //this.props.onGetUser();

        //get the current user from store and set the state with it.
    this.setState({preferenceVector: this.props.currentUser.preferenceVector});
  }


  changeHandler = () => {
    let user  = this.props.currentUser;
    user.preferenceVector = this.state.preferenceVector;
    this.props.onChangePreferenceVector(user);
        
        //TODO popup closing
        //this.props.closepopup
  }


  onFactorOneChange = event => {
    let temp_preferenceVector = this.state.preferenceVector;
    temp_preferenceVector.factor_one = event.target.value;
    //TODO delete these console function!!!!!
    console.log('working');
    console.log(this.state.preferenceVector);
    this.setState({preferenceVector: temp_preferenceVector});
  }
  onFactorTwoChange = event => {
    let temp_preferenceVector = this.state.preferenceVector;
    temp_preferenceVector.factor_two = event.target.value;
    console.log('working');
    console.log(this.state.preferenceVector);
    this.setState({preferenceVector: temp_preferenceVector});
  }
  onFactorThreeChange = event => {
    let temp_preferenceVector = this.state.preferenceVector;
    temp_preferenceVector.factor_three = event.target.value;
    console.log('working');
    console.log(this.state.preferenceVector);
    this.setState({preferenceVector: temp_preferenceVector});
  }


  render() {
    return (
      <Popup trigger={<button>Preference Vector</button>} position='right top' className='PreferenceVectorPopup'>
        <h1>Configure your current preference vector</h1>
          <p>Factor 1: </p>
            <div className='Factor_one'>
              <input type='range' name='Factor1' id='one' value={this.state.preferenceVector.factor_one}
                        min="0" max="20"
                        onChange={this.onFactorOneChange}/>
              <label htmlFor='one'>1</label>
            </div>

          <p>Factor 2: </p>
            <div className='Factor_two'>
              <input type='range' name='Factor2' id='two' value={this.state.preferenceVector.factor_two}
                        min="0" max="20"
                        onChange={this.onFactorTwoChange}/>
              <label htmlFor='two'>1</label>
            </div>
                
          <p>Factor 3: </p>
            <div className='Factor_three'>
              <input type='range' name='Factor3' id='three' value={this.state.preferenceVector.factor_three}
                        min="0" max="20"
                        onChange={this.onFactorThreeChange}/>
              <label htmlFor='three'>1</label>
            </div>
          
          <div>
            <button id='preference-vector-button' onClick={()=> this.changeHandler()}>Change</button>
          </div>
    </Popup>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.us.currentUser
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetUser: () => dispatch(actionCreators.getUser()),
    onChangePreferenceVector: (user) => dispatch(actionCreators.changePreferenceVector(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceVectorPopup);
