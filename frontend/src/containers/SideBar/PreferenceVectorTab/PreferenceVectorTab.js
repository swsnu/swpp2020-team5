import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes.js';
import * as actionCreators from '../../../store/actions/index.js';

class PreferenceVectorTab extends Component {

  state = {
    currentPreferenceVector: {
        'factor_one': 1,
        'factor_two': 3,
        'factor_three': 5,
    },
  }


  componentDidMount() {

        //backend needed
        //this.props.onGetPreferenceVector();

        //get the current user from store and set the state with it.
    this.setState({preferenceVector: this.props.currentPreferenceVector});
  }


  onClickConfirmHandler = () => {
    this.props.onPutPreferenceVector(this.state.currentPreferenceVector);

  }


  onChangeFactor = (event) => {
    let temp_preferenceVector = this.state.currentPreferenceVector;
    temp_preferenceVector[event.target.name] = event.target.value;
    console.log('working');
    console.log(this.state.currentPreferenceVector);
    this.setState({currentPreferenceVector: temp_preferenceVector});
  }

  render() {
    return (
      <div className='PreferenceVectorTab'>
        <h1>Configure your current preference vector</h1>
          <p>Factor 1: </p>
            <div className='Factor_one'>
              <input type='range' name='factor_one' id='one' value={this.state.currentPreferenceVector.factor_one}
                        min="0" max="20"
                        onChange={this.onChangeFactor}/>
              <label htmlFor='one'>1</label>
            </div>

          <p>Factor 2: </p>
            <div className='Factor_two'>
              <input type='range' name='factor_two' id='two' value={this.state.currentPreferenceVector.factor_two}
                        min="0" max="20"
                        onChange={this.onChangeFactor}/>
              <label htmlFor='two'>1</label>
            </div>

          <p>Factor 3: </p>
            <div className='Factor_three'>
              <input type='range' name='factor_three' id='three' value={this.state.currentPreferenceVector.factor_three}
                        min="0" max="20"
                        onChange={this.onChangeFactor}/>
              <label htmlFor='three'>1</label>
            </div>

          <div>
            <button id='preference-vector-button' onClick={()=> this.onClickConfirmHandler()}>Change</button>
          </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceVectorTab);
