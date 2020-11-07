import { withRouter } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePreferenceVector from '../CreatePreferenceVector/CreatePreferenceVector';
import './CreateID.css';

let Background = 'https://thewiki.ewr1.vultrobjects.com/data/4d61744672617365722e6a7067.jpg'

var backgroundStyle = {
  width: '1425px',
  height: '650px',
  backgroundImage: `url(${Background})`
}


class CreateID extends Component{
    state={
        userInfo: {
            username:null,
            email:null,
            password:null,
            foodList:[],
            },
        verifyPassword:null,
        mode:'ID',
    }
    onClickConfirmHandler(){
        this.setState({mode:'Preference'})
    }
    onChangeButtonHandler(){
        if(this.state.userInfo.username===null||this.state.userInfo.password===null
            ||this.state.userInfo.email===null) return true;
        if(this.state.userInfo.password===this.state.verifyPassword) return false;
        else return true;
    }
    render()
    {
        if(this.state.mode==='Preference')
        return(
            <CreatePreferenceVector  userInfo={this.state.userInfo}/>
        );
        let isverified;
        if(this.state.userInfo.password===null
            ||this.state.userInfo.password!=this.state.verifyPassword) 
                isverified='Password not verified'
        else isverified='Ok'
        return(

            <div className='createID' style={ backgroundStyle} >
                <div className='box'>
                <h1>회원가입</h1>

                <p>이름</p><input id='username-input' type='text'
                value={this.state.userInfo.username}
                onChange={(ev)=>{
                    this.setState({userInfo:{...this.state.userInfo,username:ev.target.value}});
                }}/>

                <p>이메일</p><input id='email-input' type='text'
                value={this.state.userInfo.email}
                onChange={(ev)=>{
                    this.setState({userInfo:{...this.state.userInfo,email:ev.target.value}});
                }}/>

                <p>비밀번호</p><input id='password-input' type='text'
                value={this.state.userInfo.password}
                onChange={(ev)=>{
                    this.setState({userInfo:{...this.state.userInfo,password:ev.target.value}});
                }}/>
                <p>비밀번호확인</p>
                    <input id='verify-password-input' type='text'
                    value={this.state.verifyPassword}
                    onChange={(ev)=>{
                        this.setState({verifyPassword:ev.target.value});
                    }}/>
                   <p>{isverified}</p>
                
                <button 
                disabled={this.onChangeButtonHandler()}
                onClick={()=>this.onClickConfirmHandler()}>확인</button>

            </div>



            </div>
        );
    };

}



const mapStateToProps = state => {
    
  };
  
  const mapDispatchToProps = dispatch => {
    
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateID));
  
