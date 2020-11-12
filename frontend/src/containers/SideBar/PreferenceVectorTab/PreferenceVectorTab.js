import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';
import './PreferenceVectorTab.css';
import Slider from '@material-ui/core/Slider'

class PreferenceVectorTab extends Component {

  state = {
    currentPreferenceVector: {
        factor_one: 1,
        factor_two: 3,
        factor_three: 5,
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


  onChangeFactor = (event, value) => {
    let temp_preferenceVector = this.state.currentPreferenceVector;
    temp_preferenceVector[event.target.id] = Math.round(value);
    console.log('working');
    console.log(this.state.currentPreferenceVector);
    this.setState({currentPreferenceVector: temp_preferenceVector});
  }

  render() {
    return (
      <div className='PreferenceVectorTab'>
        <div className='preference-upper-bar'>
          <span>취향을 변경하신 후 적용 버튼을 누르세요!</span>
          <button id='preference-vector-button' onClick={()=> this.onClickConfirmHandler()}>적용</button>
        </div>
           <div className='Slider'>
              <p>매운맛</p>
              <Slider id='factor_one' value={this.state.currentPreferenceVector.factor_one} 
               onChange={this.onChangeFactor} onChangeCommitted={this.onChangeFactor}/>
            </div>
           <div className='Slider'>
              <p>느끼한맛</p>
              <Slider id='factor_two' value={this.state.currentPreferenceVector.factor_two} max={41} 
                onChange={this.onChangeFactor} onChangeCommitted={this.onChangeFactor}/>
            </div>
 
           <div className='Slider'>
              <p>웨이팅</p>
              <Slider id='factor_three' value={this.state.currentPreferenceVector.factor_three} max={41}
               step={0.1} onChange={this.onChangeFactor} onChangeCommitted={this.onChangeFactor}/>
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
