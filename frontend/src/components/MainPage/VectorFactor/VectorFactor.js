import React,{ Component } from 'react';
import './VectorFactor.css'

class VectorFactor extends Component {
  
  render() {
    const width = (this.props.weight * 20).toString().concat('%');
    console.log(width);
    return (
      <div className='factor'>
        {this.props.factor}
        <div className='bar'>
          <div
            className='gauge'
            style={{
              width: width,
              background: "linear-gradient(to right, #FFAA29 , #E44142)",
              float: 'left',
              height: '100%'
            }}
          >
          {this.props.weight}
          </div>
        </div>
      </div>
    )
  }
}
export default VectorFactor;