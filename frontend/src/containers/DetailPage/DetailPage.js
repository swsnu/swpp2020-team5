import ReactStars from "react-rating-stars-component";
import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Keywords from '../../components/DetailPage/Keywords/Keywords';
import * as actionCreators from '../../store/actions/index';
import SideBar from '../SideBar/SideBar';
import './DetailPage.css';
class DetailPage extends Component{
    componentDidMount() {
        this.props.onGetRestaurantDetail(parseInt(this.props.match.params.id));
    }
    
    render(){
        //detailinfo에 레스토랑 디테일 넣고
        
        //해야할거 화살표 만드는거랑
        //주소 하는거
        let text;
        if(this.props.selectedrestaurant.difference>0) 
            text=this.props.selectedrestaurant.difference+'점 상승!'
        else if(this.props.selectedrestaurant.difference<0)
            text= this.props.selectedrestaurant.difference+'점 하락!'
        else 
            text='변동없음!'


        let category=null;
        for(var i in this.props.selectedrestaurant.category){
            if(category===null)
              category=this.props.selectedrestaurant.category[i];
            else
              category+='/'+this.props.selectedrestaurant.category[i];    
        }
        const menu=this.props.selectedrestaurant.menu.map(el=>{
        return <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;{el}</p>
        })
        return(
          <div className='detailPage'>
            <div className='sideBar'>
                  <SideBar restaurantID={parseInt(this.props.match.params.id)}/>
            </div>

            <div className='right'>
                <div className='restaurant'id='detail'>
                  <div className='image'>
                    <img src={this.props.selectedrestaurant.img_url} width='280' height='230' />
                  </div>
                  <div className='imageright'>
                  <div className ='up' id='new'>
                    <div className='title' >
                      {this.props.selectedrestaurant.title}
                    </div>
                    <div className='rate'>
                      {this.props.selectedrestaurant.rate}
                    </div>
                    <div className='diff'>
                        {text}
                    </div>
                  </div>
                  <div className='detailinfo' id='new' >
                    <p>카테고리&nbsp;&nbsp;&nbsp;{category}</p>
                    <p>주소&nbsp;&nbsp;&nbsp;{}</p>
                    <p>영업시간&nbsp;&nbsp;&nbsp;{this.props.selectedrestaurant.time}</p>
                    <p>메뉴&nbsp;&nbsp;&nbsp;{menu}</p>
                    
                    
                  </div>
                  </div>
              </div>
              <div className='keywords'>
                  <Keywords keywords={this.props.selectedrestaurant.keywords} />
              </div>
              
            </div>
              
              
          </div>
          
        );
  /*      <div className='keywords'>
        <Keywords keywords={this.props.selectedrestaurant.keywords}/>
    </div>
   <div className='reviewlist'>
       <RestaurantReviewList restaurantID={parseInt(this.props.match.params.id)}/>
   </div>
  */
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