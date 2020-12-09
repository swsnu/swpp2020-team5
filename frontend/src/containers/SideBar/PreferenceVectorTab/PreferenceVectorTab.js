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
      preferenceVector: null,
    };
  }

  componentDidMount() {
    const { preferenceVector } = this.props;
    this.props.onGetPreferenceVector();
    this.setState({ preferenceVector });
  }

  onClickConfirmHandler = () => {
    this.props.onPutPreferenceVector(this.state.preferenceVector);
  }

  onChangeFactor = (id, event) => {
    const { preferenceVector } = this.state;
    preferenceVector[id] = event.target.value;
    console.log(preferenceVector[id]);
    this.setState({ preferenceVector });
  }

  render() {
    const { factor_list, preferenceVector } = this.state;
    if (preferenceVector === null) return (<div/>);
    const num = [0,1,2,3,4,5];
    const factorIndicator = num.map(num => {
      const marginLeft = "calc( " + (num * 20).toString() + "% - " + (num * 17).toString() + "px )";
      return (
      <div className="factor-indicator" style={{ marginLeft }}>{num}</div>
      )
    })
    const prefVecList = factor_list.map(factor => {
      const width = "calc((100% - 60px)*" + (preferenceVector[factor]/5).toString() + ")";
      return (
        <div className="slider-wrapper">
          <div className="user-factor">
            {factor}
          </div>
          <div className="slider">
            <input type="range"
                    min="0"
                    max="5"
                    value={preferenceVector[factor]}
                    onChange={this.onChangeFactor.bind(null, factor)}
                    step="0.01"
            />
            <div className="fill-lower" style={{ width }}></div>
          </div>
          <div className="factor-indicator-wrapper">
            {factorIndicator}
          </div>
        </div>
      )
    })

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
  preferenceVector: state.us.preferenceVector,
});

const mapDispatchToProps = (dispatch) => ({
  onGetUser: () => dispatch(actionCreators.getUser()),
  onGetPreferenceVector: () => dispatch(actionCreators.getPreferenceVector()),
  onPutPreferenceVector: (user) => dispatch(actionCreators.editPreferenceVector(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceVectorTab);
