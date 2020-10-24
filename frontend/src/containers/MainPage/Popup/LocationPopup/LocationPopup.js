/*global kakao*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchResult from '../../../../components/SearchResult/SearchResult'
import * as actionCreators from '../../../../store/actions/index'
import './LocationPopup.css'

class LocationPopup extends Component {

  state = {
    script: document.createElement('script'),
    searchResultList: [],
  }

  componentDidMount() {

    // load Kakaomap API script
    this.setState(prevState => {
      let script = prevState.script;
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=f4eda0526e95ec9c05400d0a69066c5a&libraries=services&autoload=false";
      script.async = true;
      return { ...this.state, script: script };
    })
    document.head.appendChild(this.state.script);
  }

  //
  // open popup if closed, and vice versa
  //
  togglePopupHandler() {
    const popup = document.getElementById('searchPopup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    document.getElementById('searchBox').value = '';
    this.setState({searchResultList: []});
  }

  //
  // close the popup and change searchLocation
  //
  changeLocationHandler(location) {
    this.props.onChangeLocation(location);
    this.togglePopupHandler();
  }

  //
  // list the possible results of the searched word
  //
  searchResultListHandler(searchValue) {
    kakao.maps.load(() => {
      let places = new kakao.maps.services.Geocoder();
      let callback = (result) => {
        this.setState({searchResultList: result});
      };
      if(searchValue) {
        places.addressSearch(searchValue, callback, {page:10, size:10});
      }else {
        this.setState({searchResultList: []});
      }
    });
  }

  render(){

    const searchResultList = this.state.searchResultList.map((location) => {
      return (
        <div onClick = {() => this.changeLocationHandler(location)}>
          <SearchResult address_name = {location.address_name}/>
          <hr className = 'searchResultBorder'/>
        </div>
      )
    })

    // set the displayed name on the button to searchLocation
    let location = 'NULL';
    try {
      location = this.props.searchLocation;
      switch(location.address_type) {
        case 'REGION':
          location = location.address.region_2depth_name;
          break;
        case 'ROAD':
          location = location.road_address.region_2depth_name;
          break;
        }
      } catch (error) {
        location = '현위치';
    }

    return(
      <div className = 'locationPopup'>검색 위치
        <button onClick = {() => this.togglePopupHandler()} className = 'searchButton'>{location}</button>
        <div id = 'searchPopup' className = 'searchPopup'>
          <input  className = 'searchBox'
                  id = 'searchBox'
                  onChange = {(event) => this.searchResultListHandler(event.target.value)}
                  placeholder = '장소 검색...'>
          </input>
          <hr className = 'searchResultBorder'/>
          {searchResultList}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    searchLocation: state.us.searchLocation,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onChangeLocation: (location) => {
      dispatch(actionCreators.changeLocation(location));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationPopup)