import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import logoImage from '../../images/logo.png';
import searchIcon from '../../images/searchIcon_yellow.png';
import filterIcon from '../../images/filter.png';
import locationIcon from '../../images/location.png';
import userIcon from '../../images/user.png';
import sliderIcon from '../../images/slider.png';

import * as actionCreators from '../../store/actions/index';
import MyInfoTab from './MyInfoTab/MyInfoTab';
import LocationTab from './LocationTab/LocationTab';
import FoodCategoryTab from './FoodCategoryTab/FoodCategoryTab';
import PreferenceVectorTab from './PreferenceVectorTab/PreferenceVectorTab';

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
  }

  // SubComponent
  render() {
    let tab;
    const { tabMode, searchWord } = this.state;
    const { searchLocation } = this.props;

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
        <div className="sidebar-header">
          <img id="logo-button" src={logoImage} onClick={() => this.onClickLogoButtonHandler()} alt="logo" />
          <br />
          <div className="search-box">
            <img id="search-icon" src={searchIcon} alt="search"/>
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
              <img id="user-icon" class="tab-icon" src={userIcon} alt="user"/>
            </div>
            <div id="location-tab-image-button" className="tab-button" onClick={() => this.onClickTabButtonHandler('Location')}>
              <img id="location-icon" class="tab-icon" src={locationIcon} alt="location"/>
            </div>
            <div id="food-category-tab-image-button" className="tab-button" onClick={() => this.onClickTabButtonHandler('FoodCategory')}>
              <img id="filter-icon" class="tab-icon" src={filterIcon} alt="filter"/>
            </div>
            <div id="preference-vector-tab-image-button" className="tab-button" onClick={() => this.onClickTabButtonHandler('PreferenceVector')}>
              <img id="slider-icon" class="tab-icon" src={sliderIcon} alt="slider"/>
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
              마이페이지
            </div>
            <div
              id="location-tab-name-button"
              className={tabMode === 'Location'
                ? 'tab-button-selected'
                : 'tab-button'}
              onClick={() => this.onClickTabButtonHandler('Location')}
            >
              {tabMode === 'Location'
                ? '위치'
                : searchLocation.address.region_2depth_name}
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
        </div>
        {tab}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchLocation: state.us.searchLocation,
});

export default connect(mapStateToProps, null)(withRouter(SideBar));
