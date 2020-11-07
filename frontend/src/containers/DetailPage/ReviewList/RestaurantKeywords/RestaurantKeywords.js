import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
class RestaurantKeywords extends Component{
    componentDidMount(){
      }
    render(){
        return(
          <div>
              HI
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