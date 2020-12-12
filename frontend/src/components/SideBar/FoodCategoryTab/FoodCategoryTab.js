import React, { Component } from 'react';

import './FoodCategoryTab.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index';
import img from '../../../images/logo.png';

class FoodCategoryTab extends Component {
  render() {
    const categorylist = [];
    let id = 0;
    Object.keys(this.props.foodCategory).forEach((category) => {
      categorylist.push(
        <div className="category">
          <button
            className={this.props.foodCategory[category] && !this.props.selectAll
              ? 'checked' : 'unchecked'}
            onClick={() => this.props.postClickFoodCategoryHandler(category)}
          >
            {category}
          </button>
        </div>,
      );
      id += 1;
    });
    return (
      <div className="tab" id="filter">
        <div className="tab-header">
          <span>음식 카테고리</span>
        </div>
        <div className="tab-content">
          <div className="category-list">
            {categorylist}
          </div>
          <div className="category">
            <button
              id="total-button"
              className={this.props.selectAll
                ? 'checked' : 'unchecked'}
              onClick={() => this.props.postClickFoodCategoryHandler('total')}
            >
              모두
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodCategoryTab;
