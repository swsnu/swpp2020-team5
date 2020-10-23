import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import LocationPopup from './Popup/LocationPopup/LocationPopup'

class MainPage extends Component {

  render() {
    return(
      <div className = 'mainPage'>
        <div className = 'locationPopup'>
          {<LocationPopup/>}
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