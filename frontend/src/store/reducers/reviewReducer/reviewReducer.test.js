import React from 'react';

import reducer from './reviewReducer';
import * as actionTypes from '../../actions/actionTypes';

const stubMyReivew = {
  id: 2,
  content: '아주 맛이 좋다',
  rating: 5,
  modifiedTime: 'test',
};

const stubOtherReview = {
  content: '맛있으나 즐거우나 나라 사랑하세.',
  rating: 1,
  createTime: new Date(),
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
      type: actionTypes.GET_REVIEWS,
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
        id: 2, content: 'BAD', rating: 2, modifiedTime: 'bad',
      }],
      otherReviews: {},
    };

    const newState = reducer(stubInitialState, {
      type: actionTypes.PUT_REVIEW,
      id: 2,
      content: '아주 맛이 좋다',
      rating: 5,
      modifiedTime: 'test',
    });

    expect(newState).toEqual({
      selectedReviews: {},
      myReviews: [{
        id: 2, content: '아주 맛이 좋다', rating: 5, modifiedTime: 'test',
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
      type: actionTypes.POST_REVIEW,
      id: 3,
      content: 'GOOD',
      rating: 5,
      modifiedTime: 'test',
    });

    expect(newState).toEqual({
      selectedReviews: {},
      myReviews: [{
        id: 3, content: 'GOOD', rating: 5, modifiedTime: 'test',
      }],
      otherReviews: {},
    });
  });

  it('should delete review', () => {
    stubInitialState = {
      selectedReviews: {},
      myReviews: [{
        id: 2, content: 'BAD', rating: 2, modifiedTime: 'bad',
      }],
      otherReviews: {},
    };

    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_REVIEW,
      target: 2,
    });

    expect(newState).toEqual({
      selectedReviews: {},
      myReviews: [],
      otherReviews: {},
    });
  });
});
