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
  naver: [
    {
      content: '맛있으나 즐거우나 나라 사랑하세.',
      rating: 1,
      date: new Date(),
      authorName: 'TESTER',
    },
  ],
  kakao: [
  ],
  atm: [
  ],
};

let stubInitialState = {
  myReviews: [],
  otherReviews: {},
};

describe('Review reducer', () => {
  it('should get other reviews', () => {
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_OTHER_REVIEWS,
      target: stubOtherReview,
    });

    expect(newState).toEqual({
      myReviews: [],
      otherReviews: stubOtherReview,
    });
  });

  it('should get my reviews', () => {
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_MY_REVIEWS,
      target: [stubMyReivew],
    });

    expect(newState).toEqual({
      myReviews: [stubMyReivew],
      otherReviews: {},
    });
  });

  it('should put review', () => {
    stubInitialState = {
      myReviews: [{
        id: 2, content: 'BAD', rating: 2, date: 'bad',
      }],
      otherReviews: {},
    };

    const newState = reducer(stubInitialState, {
      type: actionTypes.EDIT_MY_REVIEW,
      target: {
        id: 2,
        content: '아주 맛이 좋다',
        rating: 5,
        date: 'test',

      },
    });

    expect(newState).toEqual({
      myReviews: [{
        id: 2, content: '아주 맛이 좋다', rating: 5, date: 'test',
      }],
      otherReviews: {},
    });
  });

  it('should post review', () => {
    stubInitialState = {
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
      myReviews: [{
        id: 3, content: 'GOOD', rating: 5, date: 'test',
      }],
      otherReviews: {},
    });
  });

  it('should delete review', () => {
    stubInitialState = {
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
      myReviews: [],
      otherReviews: {},
    });
  });

  it('should do nothing when type is wrong', () => {
    stubInitialState = {
      myReviews: [],
      otherReviews: {},
    };
    const newState = reducer(stubInitialState, {
      type: 'wrong',
    });

    expect(newState).toEqual({
      myReviews: [],
      otherReviews: {},
    });
  });
});
