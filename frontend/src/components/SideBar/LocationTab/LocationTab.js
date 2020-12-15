/* global kakao */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchResult from '../SearchResult/SearchResult';

import searchIcon from '../../../images/searchIcon_red.png';
import './LocationTab.css';

class LocationTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      script: null, // for "testting"
      locationListWrapper: null,
      locationList: [],
      map: null,
      searchLocation: {
        x: null,
        y: null,
        address_name: null,
        radius: null,
      },
      marker: null,
    };
  }

  componentDidMount() {
    // load Kakaomap API script
    const script = document.createElement('script');
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=f4eda0526e95ec9c05400d0a69066c5a&libraries=services&autoload=false';
    script.async = true;
    document.head.appendChild(script);
    // load map
    script.onload = () => {
      kakao.maps.load(() => {
        
        if(this.state.searchLocation.x === null)
          this.setState({searchLocation:this.props.searchLocation});
        const { searchLocation } = this.state;
        const container = document.getElementById('current-location-map');
        const options = {
          center: new kakao.maps.LatLng(searchLocation.y, searchLocation.x),
          level: 4,
        };
        this.setState({ map: new window.kakao.maps.Map(container, options) });
        let markerPosition  = new kakao.maps.LatLng(searchLocation.y, searchLocation.x); 
        // 마커를 생성합니다
        this.setState({marker : new kakao.maps.Marker({
          position: markerPosition
        })})
        
        this.state.marker.setMap(this.state.map);
      });
    };
    
    // load location list
    this.setState({
      locationListWrapper: document.getElementById('location-list'),
      script,
    });
  }

  //
  // show the location list only if there are locations to display
  //
  onToggleListHandler(length) {
    const { locationListWrapper } = this.state;
    locationListWrapper.style.display = length === 0 ? 'none' : 'grid';
    this.setState({ locationListWrapper });
  }

  //
  // close the location list and change searchLocation
  //
  onClickLocationHandler(location) {
    const { onChangeLocation, onClickSave } =this.props
    const { map } = this.state;
    const {searchLocation} =this.state;
    this.setState({searchLocation:
      {...searchLocation,
        x: location.x, 
        y: location.y, 
        address_name: location.address_name
      }
    });
    const newSearchLoction = {
      x: location.x,
      y: location.y,
      address_name: location.address_name,
      radius: searchLocation.radius,
    }
    onChangeLocation(newSearchLoction);
    
    // reset searchbox
    document.getElementById('location-input').value = '';
    this.setState({ locationList: [] });
    // always close the list
    this.onToggleListHandler(0);

    // show new location on map
    this.state.marker.setMap(null);
    let markerPosition  = new kakao.maps.LatLng(location.y, location.x); 
    let newMarker = new kakao.maps.Marker({position: markerPosition});
    this.setState({
      marker : newMarker
    });
    map.setCenter(new kakao.maps.LatLng(location.y, location.x));
    newMarker.setMap(map);

  }
  //
  // list the locations found from the current input
  //
  
  onChangeLocationInputHandler(location) {
    // absolutely redundant, but included to satisfy the all mighty eslinter-sama
    const { script } = this.state;
    if (!script) return;

    const places = new kakao.maps.services.Geocoder();
    const callback = (result) => {
      this.setState({ locationList: result });
      this.onToggleListHandler(result.length);
    };

    if (location) {
      places.addressSearch(location, callback, { page: 10, size: 10 });
    } else {
      // empty list if no results are found
      this.setState({ locationList: [] });
    }
  }

  render() {
    let id = 0;
    const { searchLocation } = this.props;
    const { locationList } = this.state;

    const locationButtonList = locationList.map((location) => {
      id += 1;
      return (
        <button
          type="button"
          onClick={() => this.onClickLocationHandler(location)}
          className="candidate"
          key={id.toString()}
        >
          <SearchResult
            addressName={location.address_name}
            key={id.toString()}
          />
        </button>
      );
    });

    // set the displayed name on the button to searchLocation
    const locationString = searchLocation.address_name;
    const {radius} = this.state.searchLocation;
    return (
      <div className="tab" id="location">
        <div className="tab-header">
          검색 위치ㅣ
          <strong className="current-location">
            {locationString}
          </strong>
        </div>
        <div className="tab-content">
          <div id="search-box" className="box">
            <img src={searchIcon} alt="searchIcon" className="search-icon" />
            <input
              className="input"
              id="location-input"
              onChange={(event) => this.onChangeLocationInputHandler(event.target.value)}
              placeholder="장소 검색..."
            />
            <div id="location-list" className="list">
              {locationButtonList}
            </div>
          </div>
          <div id="current-location-map" className="map" />
        </div>
      </div>
    );
  }
}

LocationTab.propTypes = {
  searchLocation: PropTypes.arrayOf(PropTypes.any),
  onChangeLocation: PropTypes.func,
};

LocationTab.defaultProps = {
  searchLocation: null,
  onChangeLocation: null,
};

export default LocationTab;
