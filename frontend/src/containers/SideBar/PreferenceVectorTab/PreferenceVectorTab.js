import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';
import './PreferenceVectorTab.css';

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
    temp_preferenceVector[event.target.name] = parseInt(event.target.value);
    console.log('working');
    console.log(this.state.currentPreferenceVector);
    this.setState({currentPreferenceVector: temp_preferenceVector});
  }

  render() {
    return (
      <div className='PreferenceVectorTab'>
        <div className='upper-bar'>
          <span>원하는 대로 취향을 변경하신 후 적용 버튼을 누르세요!</span>
          <button id='preference-vector-button' onClick={()=> this.onClickConfirmHandler()}>적용</button>
        </div>
          <p>Factor 1: </p>
            <div className='Factor_one'>
              <input type='range' name='factor_one' id='one' value={this.state.currentPreferenceVector.factor_one}
                        min="0" max="40"
                        onChange={this.onChangeFactor}/>
            </div>

          <p>Factor 2: </p>
            <div className='Factor_two'>
              <input type='range' name='factor_two' id='two' value={this.state.currentPreferenceVector.factor_two}
                        min="0" max="40"
                        onChange={this.onChangeFactor}/>
            </div>

          <p>Factor 3: </p>
            <div className='Factor_three'>
              <input type='range' name='factor_three' id='three' value={this.state.currentPreferenceVector.factor_three}
                        min="0" max="40"
                        onChange={this.onChangeFactor}/>
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
