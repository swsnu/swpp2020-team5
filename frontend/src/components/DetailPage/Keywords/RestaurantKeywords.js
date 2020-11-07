import React,{Component} from 'react';
import RestaurantSummary from '../../MainPage/RestaurantSummary/RestaurantSummary';
import './RestaurantKeywords.css';


class RestaurantKeywords extends Component{
    
    render(){
        let id=0;
        const list=this.props.keywords.map((el)=>{
            id++;
            return <div className={id}>{el}</div>;
        
        })
         
        return(
            <div className='restaurantKeywords'>
                {list}
            </div>
        );
 

    };

    
};


export default RestaurantKeywords;
