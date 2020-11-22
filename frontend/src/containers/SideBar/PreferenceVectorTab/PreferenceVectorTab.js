import Slider from '@material-ui/core/Slider';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';
import './PreferenceVectorTab.css';

class PreferenceVectorTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPreferenceVector: {
        factor_one: 1,
        factor_two: 3,
        factor_three: 5,
      },
    };
  }

  componentDidMount() {
    // backend needed
    // this.props.onGetPreferenceVector();

    // get the current user from store and set the state with it.
    // this.setState({ preferenceVector: this.props.currentPreferenceVector });
  }

  onClickConfirmHandler = () => {
    this.props.onPutPreferenceVector(this.state.currentPreferenceVector);
  }

  onChangeFactor = (event, value) => {
    const { currentPreferenceVector } = this.state;
    currentPreferenceVector[event.target.id] = Math.round(value);
    this.setState({ currentPreferenceVector });
  }

  render() {
    return (
      <div className="PreferenceVectorTab">
        <div className="preference-upper-bar">
          <span>취향을 변경하신 후 적용 버튼을 누르세요!</span>
          <button id="preference-vector-button" onClick={() => this.onClickConfirmHandler()}>적용</button>
        </div>
        <div className="Slider">
          <p>매운맛</p>
          <Slider
            id="factor_one"
            value={this.state.currentPreferenceVector.factor_one}
            onChange={this.onChangeFactor}
            onChangeCommitted={this.onChangeFactor}
          />
        </div>
        <div className="Slider">
          <p>느끼한맛</p>
          <Slider
            id="factor_two"
            value={this.state.currentPreferenceVector.factor_two}
            max={41}
            onChange={this.onChangeFactor}
            onChangeCommitted={this.onChangeFactor}
          />
        </div>

        <div className="Slider">
          <p>웨이팅</p>
          <Slider
            id="factor_three"
            value={this.state.currentPreferenceVector.factor_three}
            max={41}
            step={0.1}
            onChange={this.onChangeFactor}
            onChangeCommitted={this.onChangeFactor}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.us.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onGetUser: () => dispatch(actionCreators.getUser()),
  onPutPreferenceVector: (user) => dispatch(actionCreators.editPreferenceVector(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceVectorTab);
