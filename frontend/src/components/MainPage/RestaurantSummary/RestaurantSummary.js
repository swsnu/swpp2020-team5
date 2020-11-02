import React,{Component} from 'react';


class RestaurantSummary extends Component{
    render(){
        //이미지랑 타이틀 위에다가 링크 걸기할거에요~ 링크를 아직 몰라서
        //<NavLink to >
        return(
            <div className='restaurantSummary'>
                <div className='left'>
                    
                    <img src={this.props.img_url} width='100' height='100' 
                    onClick={()=>this.props.clickrestaurant()}/>
                </div>
                <div className='right'>
                    <p onClick={()=> this.props.clickrestaurant() }>
                        {this.props.title}</p>
                    <p>{this.props.rate} </p>
                </div>
     
            </div>
        );
    };
}

export default RestaurantSummary;