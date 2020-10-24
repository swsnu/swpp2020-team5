import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import LocationPopup from './Popup/LocationPopup/LocationPopup'
import PreferenceVectorPopup from './Popup/PreferenceVectorPopup/PreferenceVectorPopup.js'

class MainPage extends Component {

  render() {
    return(
      <div className = 'mainPage'>
        <div className = 'locationPopup'>
          {<LocationPopup/>}
        </div>
        <div className='preferencePopup'>
          {<PreferenceVectorPopup/>}
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
