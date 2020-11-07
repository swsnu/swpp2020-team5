import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';



class SideBar extends Component{
    render(){
        return(
            <div>
                hi
            </div>
        );
    }
}



const mapStateToProps = state => {
    
  };
  
  const mapDispatchToProps = dispatch => {
    
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideBar))

