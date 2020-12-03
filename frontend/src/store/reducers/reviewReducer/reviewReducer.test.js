import React from 'react';

import reducer from './reviewReducer';
import * as actionTypes from '../../actions/actionTypes';

const stubMyReivew = {
  id: 2,
  content: '아주 맛이 좋다',
  rating: 5,
  date: 'test',
};

const stubOtherReview = {
  content: '맛있으나 즐거우나 나라 사랑하세.',
  rating: 1,
  date: new Date(),
  authorName: 'TESTER',
};

let stubInitialState = {
  selectedReviews: {},
  myReviews: [],
  otherReview: {},
};

describe('Review reducer', () => {
  it('should get review', () => {
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_OTHER_REVIEWS,
      target: stubOtherReview,
    });

    expect(newState).toEqual({
      selectedReviews: stubOtherReview,
      myReviews: [],
      otherReview: {},
    });
  });

  it('should put review', () => {
    stubInitialState = {
      selectedReviews: {},
      myReviews: [{
        id: 2, content: 'BAD', rating: 2, date: 'bad',
      }],
      otherReviews: {},
    };

    const newState = reducer(stubInitialState, {
      type: actionTypes.EDIT_MY_REVIEW,
      id: 2,
      content: '아주 맛이 좋다',
      rating: 5,
      date: 'test',
    });

    expect(newState).toEqual({
      selectedReviews: {},
      myReviews: [{
        id: 2, content: '아주 맛이 좋다', rating: 5, date: 'test',
      }],
      otherReviews: {},
    });
  });

  it('should post review', () => {
    stubInitialState = {
      selectedReviews: {},
      myReviews: [],
      otherReviews: {},
    };

    const newState = reducer(stubInitialState, {
      type: actionTypes.POST_MY_REVIEW,
      id: 3,
      content: 'GOOD',
      rating: 5,
      date: 'test',
    });

    expect(newState).toEqual({
      selectedReviews: {},
      myReviews: [{
        id: 3, content: 'GOOD', rating: 5, date: 'test',
      }],
      otherReviews: {},
    });
  });

  it('should delete review', () => {
    stubInitialState = {
      selectedReviews: {},
      myReviews: [{
        id: 2, content: 'BAD', rating: 2, date: 'bad',
      }],
      otherReviews: {},
    };

    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_MY_REVIEW,
      target: 2,
    });

    expect(newState).toEqual({
      selectedReviews: {},
      myReviews: [],
      otherReviews: {},
    });
  });
});
