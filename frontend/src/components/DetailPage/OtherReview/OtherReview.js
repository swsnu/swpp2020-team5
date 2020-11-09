import React, { Component } from 'react';
import ReactStars from 'react-rating-stars-component';
import userImage from '../../../images/user_image.png';
import './OtherReview.css';

class OtherReview extends Component {

  state = {
    isSummary: true
  }

  onClickContentHandler = () => {
   
    //TODO this.props.id를 전달해주는 걸로 수정해야 제대로 작동할 것임.
    //현재는 이름이 중복되는 경우 컨텐츠 펼치기가 제대로 작동안함.
    let content = document.getElementById(this.props.author);
    
    if (this.state.isSummary) {
      this.setState({isSummary: false});
      //TODO content 길이 최대 설정에 따라서 조절해줘야됨.
      content.style.width = '500px'
    }
    else {
      this.setState({isSummary: true});
      content.style.width = '100px'
    }
  }

  render() {


    return (
      <div className='OtherReview'>
        <div className='other-review-author'>
          <img id='author-picture' src={userImage} alt='' width='100' height='100' />
          <p id='author-name'>{this.props.author}</p>
        </div>
        <div className='other-review-right'>
          <div className='other-review-stars'>
            <ReactStars id='rate-star' value={this.props.rating} count={5} size={20} 
              isHalf={true} edit={false}/>
            <p id='rating-text'>{this.props.rating}</p>
            <p id='createTime'>{this.props.createTime}</p>
          </div>
          <div className='other-review-content' id={this.props.author} onClick={() => this.onClickContentHandler()}>{this.props.content}</div>
        </div>
      </div>
    );

  }
}

export default OtherReview;
