import React, { Component } from 'react';
import RestaurantReview from '../../../components/RestaurantDetail/RestaurantReview/RestaurantReview.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCraetors from '../../../store/actions/index.js';


class RestaurantReviewList extends Component {

  componentDidMount() {
    //TODO backend needed!!
    //this.props.onGetRestaurantReviews(this.props.match.params.id);
  }

  
  render() {

    let reviews = [];
    if (this.props.selectedRestaurantReviews) {
      reviews = this.props.selectedRestaurantReviews.map((review) => {
        return ( <RestaurantReview
                  title={review.title}
                  content={review.content}
          reviewLink={review.link}
          onClickDetail={() => this.onClickReviewHandler()} />);
      });
    }

    return (
      <div className='RestaurantReviewList'>
        <h1>Reviews</h1>
        {reviews}
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    selectedRestaurantReviews: state.rv.selectedRestaurantReviews,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetRestaurantReviews: (restaurantID) => dispatch(actionCraetors.getRestaurantReviews(restaurantID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReviewList); 
