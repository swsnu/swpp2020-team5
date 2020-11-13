/*global kakao*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../../../store/actions/index'
import SearchResult from '../../../components/SearchResult/SearchResult'

import searchIcon from '../../../images/searchIcon_red.png'
import './LocationTab.css'

class LocationTab extends Component {
  
  state = {
    locationListWrapper: null,
    locationList: [],
    map: null,
  }

  componentDidMount() {

    // load Kakaomap API script
    const script = document.createElement('script');
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=f4eda0526e95ec9c05400d0a69066c5a&libraries=services&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    // load map
    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById('current-location-map');
        let options = {
          center: new kakao.maps.LatLng(this.props.searchLocation.y, this.props.searchLocation.x),
          level: 4
        };
        this.setState({map: new window.kakao.maps.Map(container, options)});
      });
    };

    // load location list
    this.setState({locationListWrapper: document.getElementById('location-list')});

  }

  //
  // show the location list only if there are locations to display
  //
  onToggleListHandler(length) {
    const tempWrapper = this.state.locationListWrapper;
    tempWrapper.style.display = length == 0 ? 'none' : 'grid';
    this.setState({locationListWrapper: tempWrapper});
  }
  
  //
  // close the location list and change searchLocation
  //
  onClickLocationHandler(location) {

    this.props.onChangeLocation(location);

    // reset searchbox
    document.getElementById('location-input').value = '';
    this.setState({locationList: []});

    // always close the list
    this.onToggleListHandler(0);

    // show new location on map
    this.state.map.setCenter(new kakao.maps.LatLng(location.y, location.x));
  }

  //
  // list the locations found from the current input
  //
  onChangeLocationInputHandler(location) {
    let places = new kakao.maps.services.Geocoder();
    let callback = (result) => {
      this.setState({locationList: result});
      this.onToggleListHandler(result.length);
    };
    
    if(location) {
      places.addressSearch(location, callback, {page:10, size:10});
    }else {
      // empty list if no results are found
      this.setState({locationList: []});
    }
  }

  render(){
    const locationList = this.state.locationList.map((location) => {
      return (
        <button onClick={() => this.onClickLocationHandler(location)}
                className='candidate'>
          <SearchResult address_name = {location.address_name}/>
        </button>
      )
    })

    // set the displayed name on the button to searchLocation
    let locationString = this.props.searchLocation.address_name;
    return(
      <div className='location-tab'>
        <div className='location'>
          현재 위치ㅣ
          <strong className='current-location'>
            {locationString}
          </strong>
        </div>
        <hr className='line'/>
        <div id='search-box' className='box'>
          <img src={searchIcon} className='search-icon'/>
          <input  className='input'
                  id='location-input'
                  onChange={(event) => this.onChangeLocationInputHandler(event.target.value)}
                  placeholder='장소 검색...'>
          </input>
          <div id='location-list' className='list'>
            {locationList}
          </div>
        </div>
        <div id='current-location-map' className='map'></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(LocationTab)
