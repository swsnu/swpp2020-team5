import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreatePreferenceVector extends Component{
    render(){
        return(
            <div>
                hi
            </div>
        );
    }
}


export default connect()(withRouter(CreatePreferenceVector));
  