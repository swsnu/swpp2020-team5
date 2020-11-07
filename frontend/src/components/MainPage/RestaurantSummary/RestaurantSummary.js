import React, { Component } from 'react';


class RestaurantSummary extends Component {
  onClickRestaurantHandler = () => {
    this.props.history.push(`/detail/${this.props.restaurantID}/`);
  }

  render() {
    return(
      <div className='restaurantSummary'>
        <div className='left'>
          <img src={this.props.imgURL} width='100' height='100' 
            onClick={() => this.onClickRestaurantHandler()}/>
        </div>
        <div className='right'>
          <p onClick={() => this.onClickRestaurantHandler()}>{this.props.name}</p>
          <p>{this.props.rating} </p>
          <p>{this.props.foodCategory} </p>
        </div>
      </div>
    );
  };
}

export default RestaurantSummary;
