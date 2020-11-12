import React, { Component } from 'react';

import './FoodCategoryTab.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index';
import img from '../../../images/logo.png';
class FoodCategoryTab extends Component {
  state = {
    foodCategory: {
      한식: false,
      양식: false,
      중식: false,
      일식: false,
    },
  }

  componentDidMount() {
    this.props.onGetFoodCategory();
    let changed=false;
    for(let category in this.props.foodCategory){
      if(this.props.foodCategory[category]===false) 
        changed=true;
    }
    if(changed===true)
      this.setState({foodCategory:this.props.foodCategory});
  }

  postClickFoodCategoryHandler = category => {
    const newState = {...this.state}
    newState.foodCategory[category] = !this.state.foodCategory[category]
    this.setState(newState)
  }

  // before onGetUser ends, this func can make problem
  //id 추가해야되나?

  postClickSaveHandler = () => {
    const foodCategory = {
      foodCategory: this.state.foodCategory
    } 
    this.props.onEditUserFoodCategory(foodCategory)

    
  }
  // we need to add hover and clicked img showing
  // DB needed for image
  render() {
    let foodimg=['https://image.ytn.co.kr/general/jpg/2016/0424/201604241752313492_t.jpg','https://media.istockphoto.com/photos/japanese-deep-fried-pork-cutlet-with-white-cabbage-salad-picture-id1164831977',
    'https://lh3.googleusercontent.com/proxy/ztMRN1Wey-nVftrIsSjFRCuBo9Ws5MesfbPOf0UJO1jx4HoosKWQhBvhzKmgnJLYZgDJMqytot0dUlMT6Y1LOWxkotiYeLPysPsMdHAAx2_1g7xGT0y-6jFyjMaYr1AEDeDSEiNcQmT5hEIzTnPF6LrfMQ',
    'https://t1.daumcdn.net/cfile/blog/995FA8485BFFA07012','https://cdn.koreahealthlog.com/news/photo/202004/23745_12548_945.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUNyFIhrZjJwD5tBRbgQl6SpJCA5vtZtgi1A&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRPojAjUzHpJGgt8w9AsUtzJSS_EHyPh_8RWw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSbAVL6Ary5UJt88nTJxBu8UDcQfYkntPH4MA&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaqsOYZ1PmXe87ArhNIwhd5_YRBA5f1_du1w&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTM8slOqomlXtNTIcceB4rW5ovYw2qwTTNVTQ&usqp=CAU']
    let categorylist=[];
    let id=0;
    for(let category in this.state.foodCategory){
      categorylist.push( 
       <div className='category'>
          <img src={foodimg[id]} className={this.state.foodCategory[category]?
          'checked':'unchecked'} width='50' height='50' 
          onClick={() => this.postClickFoodCategoryHandler(category)}
          ></img>
          
        </div>);
        id++;
    }  
    return (
    <div className='foodCategory'>
      <h1>Select what you want!</h1>
      <div className='images'>
        {categorylist}
      </div>
     <button id='savebutton' onClick={() => this.postClickSaveHandler()}>
        SAVE
      </button>
    </div>
    )
  }
}
//만약에 유저에서 가져올거면 그거있어야함
const mapStateToProps = state =>{
  return{foodCategory:state.us.foodCategory};
}

// we can assume this popup occurs when the user is logging in
const mapDispatchToProps = dispatch => {
  return {
    onEditUserFoodCategory: foodCategory => 
      dispatch(actionCreators.editUserFoodCategory(foodCategory)),
    onGetFoodCategory: () =>
      dispatch(actionCreators.getFoodCategory()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FoodCategoryTab))
