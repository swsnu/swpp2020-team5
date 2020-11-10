import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReviewList from './ReviewList/ReviewList/ReviewList';
import Keywords from '../../components/DetailPage/Keywords/Keywords';
import * as actionCreators from '../../store/actions/index';
import SideBar from '../SideBar/SideBar';
import './DetailPage.css';
import UpArrow from '../../images/arrow_up.png';
import DownArrow from '../../images/arrow_down.png';
class DetailPage extends Component{
    componentDidMount() {
        this.props.onGetRestaurantDetail(parseInt(this.props.match.params.id));
    }
    
    render(){
        //detailinfo에 레스토랑 디테일 넣고
        
        //해야할거 화살표 만드는거랑
        //주소 하는거
        let text,image;
        if(this.props.selectedRestaurant.difference>0){ 
            text=this.props.selectedRestaurant.difference+'점 상승!'
            image=<img src={UpArrow} id='arrow'></img>   
        }    
        else if(this.props.selectedRestaurant.difference<0){
            text= this.props.selectedRestaurant.difference+'점 하락!'
            image=<img src={DownArrow} id='arrow'></img>
        }
        else 
            text='변동없음!'


        let category=null;
        for(var i in this.props.selectedRestaurant.category){
            if(category===null)
              category=this.props.selectedRestaurant.category[i];
            else
              category+='/'+this.props.selectedRestaurant.category[i];    
        }
        const menu=this.props.selectedRestaurant.menu.map(el=>{
        return <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;{el}</p>
        })
        const imgList=this.props.selectedRestaurant.img_url_list.map(el=>{
          return <img src={el} width='280' height='200'/>
        })
        return(
          <div>
            <div className='sideBar'>
                  <SideBar restaurantID={parseInt(this.props.match.params.id)}/>
            </div>
            <div className='detailPage'>
              <div className='right'>
                  <div className='restaurant'id='detail'>
                    <div className='image'>
                      <img src={this.props.selectedRestaurant.img_url} width='280' height='230' />
                    </div>
                    <div className='imageright'>
                    <div className ='up' id='new'>
                      <div className='title' >
                        {this.props.selectedRestaurant.title}
                      </div>
                      <div className='rate'>
                        {this.props.selectedRestaurant.rate}
                      </div>
                      <div className='diff'>
                          {image}
                          {text}
                      </div>
                    </div>
                    <div className='detailinfo' id='new' >
                      <p>카테고리&nbsp;&nbsp;&nbsp;{category}</p>
                      <p>주소&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {"서울 관악구 관악로14길 70 지하1층 (우)08789"}&nbsp;&nbsp;
                      <a href="https://map.kakao.com/?urlX=490331&urlY=1105229&urlLevel=3&itemId=41742921&q=%EC%95%88%EB%85%95%EB%B2%A0%ED%8A%B8%EB%82%A8&srcid=41742921&map_type=TYPE_MAP" >
                        카카오맵</a></p>
                      <p>영업시간&nbsp;&nbsp;&nbsp;{this.props.selectedRestaurant.time}</p>
                      <p>메뉴&nbsp;&nbsp;&nbsp;{menu}</p>
                      
                      
                    </div>
                    </div>
                
                </div>
                <div className='keywords'>
                  <Keywords keywords={this.props.selectedRestaurant.keywords} />
                </div>
                <div className='moreImage'>
                  {imgList}
                
                </div>
                <div className='reviewlist'>
                  <ReviewList restaurantID={this.props.selectedRestaurant.id}/>
                </div>    
              </div>
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
        selectedRestaurant:state.rs.selectedRestaurant
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailPage));
