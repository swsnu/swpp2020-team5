import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import './RestaurantSummary.css';
class RestaurantSummary extends Component{
    
    onClickRestaurantHandler(restaurantID){
        this.props.history.push('/main/detail/'+restaurantID);
    }
    
    
    render(){
        
       let categorylist=null;
       for(var i in this.props.category){
            var category=this.props.category[i]
            if (categorylist===null)
              categorylist=category;
            else
              categorylist+='/'+category;
       }

        
        return(
            <div className='restaurantSummary'>
                <div className='order'>
                    {this.props.order}
                </div>
                <div className='image'>
                    <img src={this.props.img_url} width='230' height='180' 
                    onClick={()=>this.onClickRestaurantHandler(this.props.id)}/>
                </div>
            
                <div className='right'>
                    
                    <div className='rate' onClick={()=> this.onClickRestaurantHandler(this.props.id)}>
                      {this.props.rate}      
                    </div>
                    <div className='title' onClick={()=> this.onClickRestaurantHandler(this.props.id)}>
                      {this.props.title}
                    </div>
                    <div className ='category'>
                      {categorylist}
                    </div>
                    <div className='keywords'>
                        {this.props.keywords}
                    </div>
                </div>
     
            </div>
           
        );
    };
}

export default withRouter(RestaurantSummary);
