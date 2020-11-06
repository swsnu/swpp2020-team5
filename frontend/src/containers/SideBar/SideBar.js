import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index';
import MyInfoTab from './MyInfoTab/MyInfoTab';
import LocationTab from './LocationTab/LocationTab.js';
import FoodCategoryTab from './FoodCategoryTab/FoodCategoryTab';
import PreferenceVectorTab from './PreferenceVectorTab/PreferenceVectorTab';
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
        tab = <MyInfoTab id='my-info-tab' restaurantID={this.props.restaurantID}/>;
        break;
      case 'Location': 
        tab = <LocationTab id='location-tab' restaurantID={this.props.restaurantID}/>;
        break;
      case 'FoodCategory': 
        tab = <FoodCategoryTab id='food-category-tab' restaurantID={this.props.restaurantID}/>;
        break;
      case 'PreferenceVector': 
        tab = <PreferenceVectorTab id='preference-vector-tab' restaurantID={this.props.restaurantID}/>;
        break;
      default:
        const error = new Error('Invalid tabMode');
        console.log(error.message);
    }
    return (
      <div className='SideBar'>
        <button id='logo-button' onClick={ () => this.onClickLogoButtonHandler() }>
          AllTastsMatter
          {/*<img logo/>*/}
        </button> 
        <br/>
          {/*<img magnifying/>*/}
        <input id='search-input' type='text' value={this.state.searchWord} 
          onChange={ event => this.setState({ searchWord: event.target.value }) }/>
        <button id='search-button' onClick={ () => this.onClickSearchButtonHandler() }>
          Search
        </button> 
        <br/>
        <button id='my-info-tab-button' onClick={ () => this.onClickTabButtonHandler('MyInfo') }>
          myinfo 
          {/*<img/>*/}
        </button>
        <button id='location-tab-button' onClick={ () => this.onClickTabButtonHandler('Location') }>
          location 
          {/*<img/>*/}
        </button>
        <button id='food-category-tab-button' onClick={ () => this.onClickTabButtonHandler('FoodCategory') }>
          food category 
          {/*<img/>*/}
        </button>
        <button id='preference-vector-tab-button' onClick={ () => this.onClickTabButtonHandler('PreferenceVector') }>
          preference vector 
          {/*<img/>*/}
        </button>
        <br/>
      </div>
    )
  }
}

export default SideBar;
