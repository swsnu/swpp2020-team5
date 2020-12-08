import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

import * as actionCreators from '../../../store/actions/index';
import './PreferenceVectorTab.css';

class PreferenceVectorTab extends Component {
  constructor(props) {
    super(props);
    //adjustedVector is the vector that will be submitted.
    this.state = {
      factor_list: [
        '매운', '느끼한', '짭짤한', '달달한', '고소한',
        '싱거운', '담백한', '바삭바삭한', '부드러운', '저렴한',
        '웨이팅이있는', '혼밥하기좋은', '불친절한'
      ],
      currentPreferenceVector: {
        '매운': 0, '느끼한': 0, '짭짤한': 0, '달달한': 0, '고소한': 0,
        '싱거운': 0, '담백한': 0, '바삭바삭한': 0, '부드러운': 0, '저렴한': 0,
        '웨이팅이있는': 0, '혼밥하기좋은': 0, '불친절한': 0
      },
      adjustedPreferenceVector: {
        '매운': 0, '느끼한': 0, '짭짤한': 0, '달달한': 0, '고소한': 0,
        '싱거운': 0, '담백한': 0, '바삭바삭한': 0, '부드러운': 0, '저렴한': 0,
        '웨이팅이있는': 0, '혼밥하기좋은': 0, '불친절한': 0
      },
    };
  }

  componentDidMount() {
    this.props.onGetPreferenceVector();
    this.setState({ currentPreferenceVector: this.props.currentPreferenceVector,
                    adjustedPreferenceVector: this.props.adjustedPreferenceVector });
  }

  onClickConfirmHandler = () => {
    this.props.onPutPreferenceVector(this.state.adjustedPreferenceVector);
  }

  onChangeFactor = (id, event) => {
    let newPref = {...this.state.currentPreferenceVector};
    let newAdjPref = {...this.state.adjustedPreferenceVector};
    newPref[id] = parseInt(event.target.value);
    newAdjPref[id] = newPref[id] / 10;
    console.log(newPref[id]);
    console.log(newPref);
    console.log(newAdjPref);
    this.setState({ currentPreferenceVector: newPref, adjustedPreferenceVector: newAdjPref });
  }

  render() {

    let prefVecList = this.state.factor_list.map(factor => {
      return (
        <div className="Slider">
          <p>{factor}</p>
          <RangeSlider
            value={this.state.currentPreferenceVector[factor]}
            max={50}
            onChange={this.onChangeFactor.bind(null, factor)}
            tooltip='off'
          />
        </div>
      )})

    return (
      <div className="tab" id="preference">
        <div className="tab-header">
          <span>나의 취향 조정하기</span>
          <button className="tab-header-button" id="preference-confirm" onClick={() => this.onClickConfirmHandler()}>적용</button>
        </div>
        <div className="tab-content">
          {prefVecList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.us.currentUser,
  currentPreferenceVector: state.us.currentPreferenceVector,
  adjustedPreferenceVector: state.us.adjustedPreferenceVector,
});

const mapDispatchToProps = (dispatch) => ({
  onGetUser: () => dispatch(actionCreators.getUser()),
  onGetPreferenceVector: () => dispatch(actionCreators.getPreferenceVector()),
  onPutPreferenceVector: (user) => dispatch(actionCreators.editPreferenceVector(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceVectorTab);
