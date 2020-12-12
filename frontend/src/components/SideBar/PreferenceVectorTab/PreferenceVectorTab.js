import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';
import './PreferenceVectorTab.css';

class PreferenceVectorTab extends Component {
  constructor(props) {
    super(props);
    // adjustedVector is the vector that will be submitted.
    this.state = {
      factorList: [
        '매운', '느끼한', '짭짤한', '달달한', '고소한',
        '싱거운', '담백한', '바삭바삭한', '부드러운', '저렴한',
        '웨이팅이있는', '혼밥하기좋은', '불친절한',
      ],
    };
  }

  render() {
    const { factorList } = this.state;
    const { preferenceVector } = this.props;
    if (preferenceVector === null) return (<div />);
    const numList = [0, 1, 2, 3, 4, 5];
    const factorIndicator = numList.map((num) => {
      const marginLeft = `calc( ${(num * 20).toString()}% - ${(num * 10).toString()}px )`;
      return (
        <div className="factor-indicator" style={{ marginLeft }}>{num}</div>
      );
    });
    const prefVecList = factorList.map((factor) => {
      const width = `calc((100% - 60px)*${(preferenceVector[factor] / 5).toString()})`;
      return (
        <div className="slider-wrapper">
          <div className="user-factor">
            {factor}
          </div>
          <div className="slider">
            <input
              type="range"
              min="0"
              max="5"
              value={preferenceVector[factor]}
              onChange={this.props.onChangeFactor.bind(null, factor)}
              step="0.01"
            />
            <div className="fill-lower" style={{ width }} />
          </div>
          <div className="factor-indicator-wrapper">
            {factorIndicator}
          </div>
        </div>
      );
    });

    return (
      <div className="tab" id="preference">
        <div className="tab-header">
          <span>나의 취향 조정하기</span>
          <button className="tab-header-button" id="preference-confirm" onClick={() => this.props.onClickSave()}>적용</button>
      
        </div>
        <div className="tab-content">
          {prefVecList}
        </div>
      </div>
    );
  }
}

export default PreferenceVectorTab;
