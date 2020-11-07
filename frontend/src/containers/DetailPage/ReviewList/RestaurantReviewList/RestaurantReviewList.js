import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


class RestaurantReviewList extends Component {

  componentDidMount() {
    //TODO backend needed!!
    //this.props.onGetRestaurantReviews(this.props.match.params.id);
  }

  
  render() {

    return (
      <div className='RestaurantReviewList'>
        <h1>Reviews</h1>
        
      </div>
    )
  }
}


const mapStateToProps = state => {
  
}

const mapDispatchToProps = dispatch => {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReviewList); 
