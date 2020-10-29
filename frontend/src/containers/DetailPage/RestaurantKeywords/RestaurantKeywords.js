import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

class RestaurantKeywords extends Component{
    componentDidMount(){
        this.onGetRestaurantDetail()
    }
    render(){
        return(
          <div>
              hi
          </div>
        );
    };
};
const mapStateToProps = dispatch =>{
    return{

    };
};
const mapDispatchToProps = dispatch => {
    return{

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RestaurantKeywords));