import React, { Component } from 'react';

import './FoodCategoryTab.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index';
import img from '../../../images/logo.png';

class FoodCategoryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodCategory: {
        한식 : true,
        일식 : true,
        중식 : true,
        양식 : true,
        분식 : true,
        술집 : true,
        카페 : true,
        치킨 : true,
        간식 : true,
        퓨전요리 : true,
        아시아음식 : true,
        패스트푸드 : true,
      },
      selectAll: false,
      isFirst: true,
    };
  }

  componentDidMount() {
    this.props.onGetFoodCategory();
    // let changed = false;
    // Object.keys(this.props.foodCategory).forEach((category) => {
    //   if (this.props.foodCategory[category] === false) { changed = true; }
    // });
    // if (changed === true) 
    //this.setState({ foodCategory: this.props.foodCategory });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.foodCategory) {
      if (!prevState.isFirst) {
        return {}
      }
      let isAllTrue = true
      Object.keys(prevState.foodCategory).forEach((category) => {
        isAllTrue = isAllTrue && nextProps.foodCategory[category]
      });
      return {
        foodCategory: { ...nextProps.foodCategory },
        isFirst: false,
        selectAll: isAllTrue,
      }
      
    }

  }

  postClickFoodCategoryHandler = (category) => {
    const newState = { ...this.state };
    if (category === 'total') {
      if (newState.selectAll === false) {
        Object.keys(this.state.foodCategory).forEach((category) => {
          newState.foodCategory[category] = true
        });
        newState['selectAll'] = true
      } else {
        Object.keys(this.state.foodCategory).forEach((category) => {
          newState.foodCategory[category] = false
        });
        newState['selectAll'] = false
      }
    } else {
      if (newState.selectAll) {
        Object.keys(this.state.foodCategory).forEach((category) => {
          newState.foodCategory[category] = false
        });
        newState['selectAll'] = false
      }
      newState.foodCategory[category] = !this.state.foodCategory[category];
    }
    this.setState(newState);
  }

  // before onGetUser ends, this func can make problem
  // id 추가해야되나?

  postClickSaveHandler = () => {
    this.props.onEditUserFoodCategory({...this.state.foodCategory});
  }

  // we need to add hover and clicked img showing
  // DB needed for image
  render() {
    
    const categorylist = [];
    let id = 0;
    Object.keys(this.state.foodCategory).forEach((category) => {
      categorylist.push(
        <div className="category">
          <button
            className={this.state.foodCategory[category] && !this.state.selectAll
              ? 'unchecked' : 'checked'}
            onClick={() => this.postClickFoodCategoryHandler(category)}
          >
          {category}
          </button>
        </div>
      );
      id += 1;
    });
    return (
      <div className="tab" id="filter">
        <div className="tab-header">
          <span>음식 카테고리</span>
        <button className="tab-header-button" id="foodcategory-confirm" onClick={() => this.postClickSaveHandler()}>적용</button>
        </div>
        <div className="tab-content">
          <div className="category-list">
            {categorylist}
          </div>
          <div className="category">
            <button
              className={this.state.selectAll
                ? 'unchecked' : 'checked'}
                onClick={() => this.postClickFoodCategoryHandler('total')}
                >
              {'모두'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
// 만약에 유저에서 가져올거면 그거있어야함
const mapStateToProps = (state) => ({ 
  foodCategory: state.us.foodCategory,
});

// we can assume this popup occurs when the user is logging in
const mapDispatchToProps = (dispatch) => ({
  onEditUserFoodCategory: (foodCategory) => dispatch(
    actionCreators.editFoodCategory(foodCategory),
  ),
  onGetFoodCategory: () => dispatch(actionCreators.getFoodCategory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FoodCategoryTab));
