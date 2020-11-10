import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index';
import MyInfoTab from './MyInfoTab/MyInfoTab';
import LocationTab from './LocationTab/LocationTab';
import FoodCategoryTab from './FoodCategoryTab/FoodCategoryTab';
import PreferenceVectorTab from './PreferenceVectorTab/PreferenceVectorTab';
import logoImage from '../../images/logo.png';
import { faSearch, faUser, faMapMarkerAlt, faFilter, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './SideBar.css';

class SideBar extends Component {

  // State
  state = {
    searchWord: '',
    tabMode: 'MyInfo',
  }

  // Method
  onClickSearchButtonHandler = () => {
    this.props.history.push('/main/'+this.state.searchWord);
  }

  onClickTabButtonHandler = (tabMode) => {
    this.setState({ tabMode: tabMode });
  }

  onClickLogoButtonHandler = () => {
    this.setState({ searchWord: '' });
    this.props.history.push('/main/');
    // this.setState({ tabMode: 'MyInfo' })
  }

  // SubComponent
  render() {
    let tab;
    switch (this.state.tabMode) {
      case 'MyInfo': 
        tab = <MyInfoTab id='my-info-tab' restaurantID={this.props.restaurantID} />;
        break;
      case 'Location': 
        tab = <LocationTab id='location-tab' restaurantID={this.props.restaurantID} />;
        break;
      case 'FoodCategory': 
        tab = <FoodCategoryTab id='food-category-tab' restaurantID={this.props.restaurantID} />;
        break;
      case 'PreferenceVector': 
        tab = <PreferenceVectorTab id='preference-vector-tab' restaurantID={this.props.restaurantID} />;
        break;
      default:
        const error = new Error('Invalid tabMode');
        console.log(error.message);
    }
    return (
      <div className='SideBar'>
        <img id='logo-button' src={logoImage} onClick={() => this.onClickLogoButtonHandler()}>
        </img> 
        <br />
        <div className='search-box'>
          <FontAwesomeIcon className='search-icon' icon={faSearch} />
          <button id='search-button' onClick={() => this.onClickSearchButtonHandler()}>
            검&emsp;색
          </button> 
          <input id='search-input' type='text' placeholder='식당 또는 음식...' value={this.state.searchWord} 
            onChange={event => this.setState({searchWord: event.target.value })} />
        </div>
        <br />
        <div className='tab-button-image-line'>
          <div id='my-info-tab-button' className='tab-button' onClick={ () => this.onClickTabButtonHandler('MyInfo') }>
            <FontAwesomeIcon icon={faUser} size='3x' />
          </div>
          <div id='location-tab-button' className='tab-button' onClick={() => this.onClickTabButtonHandler('Location')}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size='3x' />
          </div>
          <div id='food-category-tab-button' className='tab-button' onClick={() => this.onClickTabButtonHandler('FoodCategory')}>
            <FontAwesomeIcon icon={faFilter} size='3x' />
          </div>
          <div id='preference-vector-tab-button' className='tab-button' onClick={() => this.onClickTabButtonHandler('PreferenceVector')}>
            <FontAwesomeIcon icon={faSlidersH} size='3x' /> 
          </div>
        </div>
        <div className='tab-button-name-line'>
          <div id='my-info-tab-button' 
            className={this.state.tabMode == 'MyInfo' 
              ? 'tab-button-selected' 
              : 'tab-button'} 
            onClick={() => this.onClickTabButtonHandler('MyInfo')}>
            나의 정보 
          </div>
          <div id='location-tab-button'
            className={this.state.tabMode == 'Location' 
              ? 'tab-button-selected' 
              : 'tab-button'} 
            onClick={() => this.onClickTabButtonHandler('Location')}>
            위치
          </div>
          <div id='food-category-tab-button' 
            className={this.state.tabMode == 'FoodCategory' 
              ? 'tab-button-selected' 
              : 'tab-button'} 
            onClick={() => this.onClickTabButtonHandler('FoodCategory')}>
            필터
          </div>
          <div id='preference-vector-tab-button' 
            className={this.state.tabMode == 'PreferenceVector' 
              ? 'tab-button-selected' 
              : 'tab-button'} 
            onClick={() => this.onClickTabButtonHandler('PreferenceVector')}>
            나의 취향
          </div>
        </div>
        <br />
        <div className='tab'>
          {tab}
        </div>
      </div>
    )
  }
}

export default withRouter(SideBar);
