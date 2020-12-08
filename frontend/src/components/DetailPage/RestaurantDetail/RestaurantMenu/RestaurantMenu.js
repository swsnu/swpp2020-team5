import React, { Component } from 'react';
import './RestaurantMenu.css'

class RestaurantMenu extends Component {
  render() {
    const { name, price } = this.props;
    return (
      <div className="restaurant-menu">
        <div className="menu-name">
          {name}
        </div>
        <div className="menu-price">
          {price}
        </div>
        <div className="menu-line"/>
      </div>
    );
  }
}

export default RestaurantMenu;