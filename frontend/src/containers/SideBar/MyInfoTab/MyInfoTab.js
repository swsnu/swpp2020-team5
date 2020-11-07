import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index';

class MyInfoTab extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {

  }
}
const maDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps, maDispatchToProps)(MyInfoTab)