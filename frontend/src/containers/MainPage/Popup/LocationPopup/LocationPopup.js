import React, { Component } from 'react'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'
class LocationPopup extends Component {
  render(){
    return(
      <Popup className = "locationPopup"></Popup>
    )
  }
}
const mapStateToProps = state => {
  return {

  }
}
export default connect(mapStateToProps, null)(LocationPopup)