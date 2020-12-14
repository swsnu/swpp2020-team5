import React, { Component } from 'react';

import './FoodCategoryTab.css';

class FoodCategoryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const categorylist = [];
    Object.keys(this.props.foodCategory).forEach((category) => {
      categorylist.push(
        <div key={category} className="category">
          <button
            className={this.props.foodCategory[category] && !this.props.selectAll
              ? 'checked' : 'unchecked'}
            onClick={() => this.props.postClickFoodCategoryHandler(category)}
          >
            {category}
          </button>
        </div>,
      );
    });
    return (
      <div className="tab" id="filter">
        <div className="tab-header">
          <span>음식 카테고리</span>
          <button className="tab-header-button" id="foodcategory-confirm" onClick={() => this.props.onClickSave()}>적용</button>
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
