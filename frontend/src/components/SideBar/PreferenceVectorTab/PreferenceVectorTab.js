import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';
import './PreferenceVectorTab.css';

class PreferenceVectorTab extends Component {
  constructor(props) {
    super(props);
    // adjustedVector is the vector that will be submitted.
    this.state = {
      tasteFactorList: [
        '매운', '느끼한', '짭짤한', '달달한', '고소한',
        '싱거운', '담백한', '바삭바삭한', '부드러운', 
      ],
      serviceFactorList: [
        '저렴한', '혼밥하기좋은', '웨이팅이있는', '불친절한',
      ],
    };
  }

  static onClickHelpHandler(index) {
    const helpContent = document.getElementsByClassName('pref-help-content')[index];
    helpContent.style.display = helpContent.style.display === 'none' ? 'block' : 'none';
  }

  render() {
    const { tasteFactorList, serviceFactorList } = this.state;
    const { preferenceVector } = this.props;
    if (preferenceVector === null) return (<div />);
    const numList = [0, 1, 2, 3, 4, 5];
    const factorIndicator = numList.map((num) => {
      const marginLeft = `calc( ${(num * 20).toString()}% - ${(num * 10).toString()}px )`;
      return (
        <div key={num} className="factor-indicator" style={{ marginLeft }}>{num}</div>
      );
    });
    const tastePrefVecList = tasteFactorList.map((factor) => {
      const width = `calc((100% - 60px)*${(preferenceVector[factor] / 5).toString()})`;
      return (
        <div key={factor} className="slider-wrapper">
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

    const helpContentKind = [' 저렴한 ', ' 혼밥하기 좋은 ', ' 웨이팅이 많은 ', ' 불친절한 '];
    const helpContentUpdown = [' 증가', ' 증가', ' 감소', ' 감소'];
    let service_factor_index = -1;
    const servicePrefVecList = serviceFactorList.map((factor) => {
      service_factor_index += 1;
      const index = service_factor_index;
      const width = `calc((100% - 60px)*${(preferenceVector[factor] / 5).toString()})`;
      return (
        <div key={factor} className="slider-wrapper">
          <div className="user-factor">
            <span>{factor}</span>
            <span className="pref-help">
              <span className="questionmark" onMouseOver={() => PreferenceVectorTab.onClickHelpHandler(index)}
                                            onMouseLeave={() => PreferenceVectorTab.onClickHelpHandler(index)}>?</span>
              <div className="pref-help-content" style={{ display: 'none' }}>
                높을수록 
                <span className="red-text">{helpContentKind[service_factor_index]}</span>
                식당의 평점이 
                <span className="red-text">{helpContentUpdown[service_factor_index]}</span>
                합니다.
                <br />
              </div>
            </span>
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
          <div className="factor-type">맛</div>
          <hr width="90%"/>
          {tastePrefVecList}
          <div className="factor-type">서비스</div>
          <hr width="90%"/>
          {servicePrefVecList}
        </div>
      </div>
    );
  }
}

export default PreferenceVectorTab;
