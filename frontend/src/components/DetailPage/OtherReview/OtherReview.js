import React, { Component } from 'react';
import ReactStars from 'react-rating-stars-component';
import userImage from '../../../images/user_image.png';
import './OtherReview.css';

class OtherReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSummary: true,
    };
  }

  onClickContentHandler = () => {
    if (this.state.isSummary) {
      this.setState({ isSummary: false });
    } else {
      this.setState({ isSummary: true });
    }
  }

  render() {
    let contentDisplay = this.props.content;

    if (contentDisplay.length > 10 && this.state.isSummary) {
      contentDisplay = contentDisplay.substring(0, 50).concat('...');
    }

    return (
      <div className="OtherReview">
        <div className="other-review-author">
          <img id="author-picture" src={userImage} alt="" width="100" height="100" />
          <p id="author-name">{this.props.author}</p>
        </div>
        <div className="other-review-right">
          <div className="other-review-stars">
            <ReactStars
              id="rate-star"
              value={this.props.rating}
              count={5}
              size={20}
              isHalf
              edit={false}
            />
            <p id="rating-text">{this.props.rating}</p>
            <p id="createTime">{this.props.date}</p>
          </div>
          <div className="other-review-content" id={this.props.author} onClick={() => this.onClickContentHandler()}>{contentDisplay}</div>
        </div>
      </div>
    );
  }
}

export default OtherReview;
