import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import * as actionTypes from '../../../../store/actions/actionTypes.js';
import * as actionCreators from '../../../../store/actions/index.js';
import { shallow, mount } from 'enzyme';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import PreferenceVectorPopup from './PreferenceVectorPopup.js';

const stubInitialState = {
    
    preferenceVector: {
        factor_one: 1,
        factor_two: 1,
        factor_three: 1,
    },
}

//TODO mock the store
//


//Test suite
//

describe('<PreferenceVectorPopup/>', () => {
    it('should render without errors', () => {
        const component = shallow(<PreferenceVectorPopup/>);
        const wrapper = component.find('.PreferenceVectorPopup');
        expect(wrapper.length).toBe(1);
    });
})

