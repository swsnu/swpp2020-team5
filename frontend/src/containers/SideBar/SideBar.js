import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  faSearch, faUser, faMapMarkerAlt, faFilter, faSlidersH,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyInfoTab from './MyInfoTab/MyInfoTab';
import LocationTab from './LocationTab/LocationTab';
import FoodCategoryTab from './FoodCategoryTab/FoodCategoryTab';
import PreferenceVectorTab from './PreferenceVectorTab/PreferenceVectorTab';
import logoImage from '../../images/logo.png';

import './SideBar.css';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      tabMode: 'MyInfo',
    };
  }

  onClickSearchButtonHandler = () => {
    const { searchWord } = this.state;
    this.props.history.push(`/main/${searchWord}`);
  }

  onClickTabButtonHandler = (tabMode) => {
    this.setState({ tabMode });
  }

  onClickLogoButtonHandler = () => {
    this.setState({ searchWord: '' });
    this.props.history.push('/main/');
    // this.setState({ tabMode: 'MyInfo' })
  }

  // SubComponent
  render() {
    let tab;
    const { tabMode, searchWord } = this.state;
    switch (tabMode) {
      case 'MyInfo':
        tab = <MyInfoTab id="my-info-tab" restaurantID={this.props.restaurantID} />;
        break;
      case 'Location':
        tab = <LocationTab id="location-tab" restaurantID={this.props.restaurantID} />;
        break;
      case 'FoodCategory':
        tab = <FoodCategoryTab id="food-category-tab" restaurantID={this.props.restaurantID} />;
        break;
      case 'PreferenceVector':
        tab = <PreferenceVectorTab id="preference-vector-tab" restaurantID={this.props.restaurantID} />;
        break;
      default:
        throw new Error('Invalid tabMode');
    }
    return (
      <div className="SideBar">
        <img id="logo-button" src={logoImage} onClick={() => this.onClickLogoButtonHandler()} alt="logo" />
        <br />
        <div className="search-box">
          <FontAwesomeIcon className="search-icon" icon={faSearch} />
          <button id="search-button" onClick={() => this.onClickSearchButtonHandler()}>
            검&emsp;색
          </button>
          <input
            id="search-input"
            type="text"
            placeholder="식당 또는 음식..."
            value={searchWord}
            onChange={(event) => this.setState({ searchWord: event.target.value })}
          />
        </div>
        <br />
        <div className="tab-button-image-line">
          <div id="my-info-tab-image-button" className="tab-button" onClick={() => this.onClickTabButtonHandler('MyInfo')}>
            <FontAwesomeIcon icon={faUser} size="3x" />
          </div>
          <div id="location-tab-image-button" className="tab-button" onClick={() => this.onClickTabButtonHandler('Location')}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />
          </div>
          <div id="food-category-tab-image-button" className="tab-button" onClick={() => this.onClickTabButtonHandler('FoodCategory')}>
            <FontAwesomeIcon icon={faFilter} size="3x" />
          </div>
          <div id="preference-vector-tab-image-button" className="tab-button" onClick={() => this.onClickTabButtonHandler('PreferenceVector')}>
            <FontAwesomeIcon icon={faSlidersH} size="3x" />
          </div>
        </div>
        <div className="tab-button-name-line">
          <div
            id="my-info-tab-name-button"
            className={tabMode === 'MyInfo'
              ? 'tab-button-selected'
              : 'tab-button'}
            onClick={() => this.onClickTabButtonHandler('MyInfo')}
          >
            나의 정보
          </div>
          <div
            id="location-tab-name-button"
            className={tabMode === 'Location'
              ? 'tab-button-selected'
              : 'tab-button'}
            onClick={() => this.onClickTabButtonHandler('Location')}
          >
            위치
          </div>
          <div
            id="food-category-tab-name-button"
            className={tabMode === 'FoodCategory'
              ? 'tab-button-selected'
              : 'tab-button'}
            onClick={() => this.onClickTabButtonHandler('FoodCategory')}
          >
            필터
          </div>
          <div
            id="preference-vector-tab-name-button"
            className={tabMode === 'PreferenceVector'
              ? 'tab-button-selected'
              : 'tab-button'}
            onClick={() => this.onClickTabButtonHandler('PreferenceVector')}
          >
            나의 취향
          </div>
        </div>
        <div className="tab">
          {tab}
        </div>
      </div>
    );
  }
}
export default withRouter(SideBar);
