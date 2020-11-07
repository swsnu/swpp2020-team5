import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { getRestaurantDetail } from '../../store/actions/restaurantActions/restauraunActions';
import RestaurantKeywords from '../../components/DetailPage/Keywords/RestaurantKeywords';
import ReactStars from "react-rating-stars-component";
class DetailPage extends Component{
    componentDidMount() {
        this.props.onGetRestaurantDetail(parseInt(this.props.match.params.id));
    }
    
    render(){
        //detailinfo에 레스토랑 디테일 넣고
        const ratingChanged=(rates)=>{
            this.setState({rates:rates});
            
        }
        return(
          <div className='detailPage'>
              <div className='left'>
                <img src={this.props.selectedrestaurant.img_url} width='100' height='100' />
              </div>
              <div className='title'>
                <p>{this.props.selectedrestaurant.title}</p>
              </div>
              <p>{this.props.selectedrestaurant.rate}</p>
              <div className='detailinfo'>
                <p>{this.props.selectedrestaurant.menu}</p>
                <p>{this.props.selectedrestaurant.time}</p>
              </div>
              <div className='keywords'>
                  <RestaurantKeywords keywords={this.props.selectedrestaurant.keywords} />
              </div>
              <div className='rating'>
              평가하기
              <ReactStars count={5} 
              onChange={ratingChanged} size={24} activeColor="#ffd700"/>
              </div>
    
          </div>
          
        );
    };
}
const mapDispatchToProps= dispatch =>{
    return{
        onGetRestaurantDetail: restaurantID =>{
            dispatch(actionCreators.getRestaurantDetail(restaurantID))
        }
    };
    
};
const mapStateToProps= state =>{
    return{
        selectedrestaurant:state.rs.selectedrestaurant
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailPage));
