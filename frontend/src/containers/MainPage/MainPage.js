import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import LocationPopup from './Popup/LocationPopup/LocationPopup';
import PreferencePopup from './Popup/PreferencePopup/PreferencePopup.js';
import RestaurantReviewList from '../DetailPage/RestaurantReviewList/RestaurantReviewList.js';

class MainPage extends Component {

  render() {
    return(
      <div className = 'mainPage'>
        <div className = 'locationPopup'>
          {<LocationPopup/>}
        </div>
        <div className='preferencePopup'>
          {<PreferencePopup/>}
        </div>
        <div className='reviewList test'>
          {<RestaurantReviewList/>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage))
