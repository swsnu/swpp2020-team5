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
import LocationTab from '../../components/SideBar/LocationTab/LocationTab';
import FoodCategoryTab from '../../components/SideBar/FoodCategoryTab/FoodCategoryTab';
import PreferenceVectorTab from '../../components/SideBar/PreferenceVectorTab/PreferenceVectorTab';

import './SideBar.css';

function isEmptyObject(param) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      tabMode: 'MyInfo',
      searchLocation: {},
      radius:10,
      initSearchLocation: false,
      foodCategory: {},
      initFoodCategory: false,
      selectAllCategory: false,
      preferenceVector: {},
      initPreferenceVector: false,
    };
  }

  componentDidMount() {
    this.props.onGetSearchLocation();
    this.props.onGetFoodCategory();
    this.props.onGetPreferenceVector();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.initSearchLocation === false) {
      if (!isEmptyObject(nextProps.searchLocation)) {
        return {
          searchLocation: { ...nextProps.searchLocation },
          initSearchLocation: true,
        };
      }
    }
    if (prevState.initFoodCategory === false) {
      if (!isEmptyObject(nextProps.foodCategory)) {
        let isAllTrue = true;
        Object.keys(nextProps.foodCategory).forEach((category) => {
          isAllTrue = isAllTrue && nextProps.foodCategory[category];
        });
        return {
          foodCategory: { ...nextProps.foodCategory },
          initFoodCategory: true,
          selectAllCategory: isAllTrue,
        };
      }
    }
    if (prevState.initPreferenceVector === false) {
      if (!isEmptyObject(nextProps.preferenceVector)) {
        return {
          preferenceVector: { ...nextProps.preferenceVector },
          initPreferenceVector: true,
        };
      }
    }
    return {};
  }

  postClickFoodCategoryHandler = (category) => {
    const newState = { ...this.state };
    if (category === 'total') {
      if (newState.selectAllCategory === false) {
        Object.keys(this.state.foodCategory).forEach((cat) => {
          newState.foodCategory[cat] = true;
        });
        newState.selectAllCategory = true;
      } else {
        Object.keys(this.state.foodCategory).forEach((cat) => {
          newState.foodCategory[cat] = false;
        });
        newState.selectAllCategory = false;
      }
    } else {
      if (newState.selectAllCategory) {
        Object.keys(this.state.foodCategory).forEach((cat) => {
          newState.foodCategory[cat] = false;
        });
        newState.selectAllCategory = false;
      }
      newState.foodCategory[category] = !this.state.foodCategory[category];
    }
    this.setState(newState);
  }

  onChangeVectorHandler = (id, event) => {
    const { preferenceVector } = this.state;
    preferenceVector[id] = event.target.value;
    this.setState({ preferenceVector });
  }

  onSearchHandler = () => {
    const {
      searchWord, searchLocation, foodCategory, preferenceVector,
    } = this.state;
    this.props.onEditSearchLocation(searchLocation);
    this.props.onEditFoodCategory(foodCategory);
    this.props.onEditPreferenceVector(preferenceVector);
    this.props.history.push(`/main/${searchWord}`);
  }

  onSaveHandler = () => {
    const {
      searchWord, searchLocation, foodCategory, preferenceVector,
    } = this.state;
    this.props.onEditSearchLocation(searchLocation);
    this.props.onEditFoodCategory(foodCategory);
    this.props.onEditPreferenceVector(preferenceVector);
    this.props.onReloadHandler();
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
        tab = (
          <MyInfoTab
            id="my-info-tab"
            restaurantID={this.props.restaurantID}
          />
        );
        break;
      case 'Location':
        tab = (
          <LocationTab
            id="location-tab"
            searchLocation={this.props.searchLocation}
            onChangeLocation={(newLocation, radius) => this.setState({ searchLocation: newLocation})}
          />
        );
        break;
      case 'FoodCategory':
        tab = (
          <FoodCategoryTab
            id="food-category-tab"
            foodCategory={this.state.foodCategory}
            postClickFoodCategoryHandler={
                  (category) => this.postClickFoodCategoryHandler(category)
                }
            selectAll={this.state.selectAllCategory}
            onClickSave={this.onSaveHandler}
          />
        );
        break;
      case 'PreferenceVector':
        tab = (
          <PreferenceVectorTab
            id="preference-vector-tab"
            preferenceVector={this.state.preferenceVector}
            onChangeFactor={this.onChangeVectorHandler}
            onClickSave={this.onSaveHandler}
          />
        );
        break;
      default:
        throw new Error('Invalid tabMode');
    }
    return (
      <div className="SideBar">
        <div className="sidebar-header">
          <img id="logo-button" src={logoImage} onClick={() => this.onClickLogoButtonHandler()} alt="logo" />
          <br />
          <form className="search-box" onSubmit={() => this.onSearchHandler()}>
            <img id="search-icon" src={searchIcon} alt="search" />
            <input
              id="search-input"
              type="text"
              placeholder="식당 또는 음식..."
              value={searchWord}
              onChange={(event) => this.setState({ searchWord: event.target.value })}
            />
            <button type="submit" id="search-button">
              검&emsp;색
            </button>
          </form>
          <br />
          <div className="tab-button-image-line">
            <div id="my-info-tab-image-button" className="tab-button" onClick={() => this.onClickTabButtonHandler('MyInfo')}>
              <img id="user-icon" className="tab-icon" src={userIcon} alt="user" />
            </div>
            <div id="location-tab-image-button" className="tab-button" onClick={() => this.onClickTabButtonHandler('Location')}>
              <img id="location-icon" className="tab-icon" src={locationIcon} alt="location" />
            </div>
            <div id="food-category-tab-image-button" className="tab-button" onClick={() => this.onClickTabButtonHandler('FoodCategory')}>
              <img id="filter-icon" className="tab-icon" src={filterIcon} alt="filter" />
            </div>
            <div id="preference-vector-tab-image-button" className="tab-button" onClick={() => this.onClickTabButtonHandler('PreferenceVector')}>
              <img id="slider-icon" className="tab-icon" src={sliderIcon} alt="slider" />
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
                : searchLocation.address_name.split(' ')[1]}
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

const mapDispatchToProps = (dispatch) => ({
  onEditSearchLocation: (location, radius) => dispatch(actionCreators.editSearchLocation(location, radius)),
  onGetSearchLocation: () => dispatch(actionCreators.getSearchLocation()),
  onEditFoodCategory: (foodCategory) => dispatch(actionCreators.editFoodCategory(foodCategory)),
  onGetFoodCategory: () => dispatch(actionCreators.getFoodCategory()),
  onEditPreferenceVector: (preferenceVector) => dispatch(
    actionCreators.editPreferenceVector(preferenceVector),
  ),
  onGetPreferenceVector: () => dispatch(actionCreators.getPreferenceVector()),
});

const mapStateToProps = (state) => ({
  searchLocation: state.us.searchLocation,
  foodCategory: state.us.foodCategory,
  preferenceVector: state.us.preferenceVector,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideBar));
