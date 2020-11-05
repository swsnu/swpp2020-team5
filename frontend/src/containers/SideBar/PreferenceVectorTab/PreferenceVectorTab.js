import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import * as actionTypes from '../../../../store/actions/actionTypes.js';
import * as actionCreators from '../../../../store/actions/index.js';

class PreferenceVectorTab extends Component {

    state = {
        preferenceVector: {
            factor_one: 1,
            factor_two: 3,
            factor_three: 5,
        },
    }


    componentDidMount() {
        
        //backend needed
        //this.props.onGetUser();

        //get the current user from store and set the state with it.
     //   this.setState({preferenceVector: this.props.currentUser.preferenceVector});
    }


    changeHandler = () => {
        let user  = this.props.currentUser;
        user.preferenceVector = this.state.preferenceVector;
        this.props.onChangePreferenceVector(user);
        
        //TODO popup closing
        //this.props.closepopup

    }


    onFactorOneChange = event => {
        let temp_preferenceVector = this.state.preferenceVector;
        temp_preferenceVector.factor_one = event.target.value;
        console.log('working');
        console.log(this.state.preferenceVector);
        this.setState({preferenceVector: temp_preferenceVector});
    }
    onFactorTwoChange = event => {
        let temp_preferenceVector = this.state.preferenceVector;
        temp_preferenceVector.factor_two = event.target.value;
        console.log('working');
        console.log(this.state.preferenceVector);
        this.setState({preferenceVector: temp_preferenceVector});
    }
    onFactorThreeChange = event => {
        let temp_preferenceVector = this.state.preferenceVector;
        temp_preferenceVector.factor_three = event.target.value;
        console.log('working');
        console.log(this.state.preferenceVector);
        this.setState({preferenceVector: temp_preferenceVector});
    }


    render() {
        return (
            <Popup trigger={<button onClick={()=>{this.props.closepopup()}}>Preference Vector</button>} position='right top' className='PreferenceVectorPopup'>
                <h1>Configure your current preference vector</h1>
                    <p>Factor 1: </p>
                    <div className='Factor_one'>
                        <input type='radio' name='Factor1' id='one' value={1}
                            checked={this.state.preferenceVector.factor_one == 1}
                            onChange={this.onFactorOneChange}/>
                        <label htmlFor='one'>1</label>
                        
                        <input type='radio' name='Factor1' id='two' value={2}
                            checked={this.state.preferenceVector.factor_one == 2}
                            onChange={this.onFactorOneChange}/>
                        <label htmlFor='two'>2</label>
                        
                        <input type='radio' name='Factor1' id='three' value={3}
                            checked={this.state.preferenceVector.factor_one == 3}
                            onChange={this.onFactorOneChange}/>
                        <label htmlFor='three'>3</label>
            
                        <input type='radio' name='Factor1' id='four' value={4}
                            checked={this.state.preferenceVector.factor_one == 4}
                            onChange={this.onFactorOneChange}/>
                        <label htmlFor='four'>4</label>
            
                        <input type='radio' name='Factor1' id='five' value={5}
                            checked={this.state.preferenceVector.factor_one == 5}
                            onChange={this.onFactorOneChange}/>
                        <label htmlFor='five'>5</label>
                    </div>

                    <p>Factor 2: </p>
                    <div className='Factor_two'>
                        <input type='radio' name='Factor2' id='one' value={1}
                            checked={this.state.preferenceVector.factor_two == 1}
                            onChange={this.onFactorTwoChange}/>
                        <label htmlFor='one'>1</label>
                        
                        <input type='radio' name='Factor2' id='two' value={2}
                            checked={this.state.preferenceVector.factor_two == 2}
                            onChange={this.onFactorTwoChange}/>
                        <label htmlFor='two'>2</label>
                        
                        <input type='radio' name='Factor2' id='three' value={3}
                            checked={this.state.preferenceVector.factor_two == 3}
                            onChange={this.onFactorTwoChange}/>
                        <label htmlFor='three'>3</label>
            
                        <input type='radio' name='Factor2' id='four' value={4}
                            checked={this.state.preferenceVector.factor_two == 4}
                            onChange={this.onFactorTwoChange}/>
                        <label htmlFor='four'>4</label>
            
                        <input type='radio' name='Factor2' id='five' value={5}
                            checked={this.state.preferenceVector.factor_two == 5}
                            onChange={this.onFactorTwoChange}/>
                        <label htmlFor='five'>5</label>
                    </div>
                    <p>Factor 3: </p>
                    <div className='Factor_one'>
                        <input type='radio' name='Factor3' id='one' value={1}
                            checked={this.state.preferenceVector.factor_three == 1}
                            onChange={this.onFactorThreeChange}/>
                        <label htmlFor='one'>1</label>
                        
                        <input type='radio' name='Factor3' id='two' value={2}
                            checked={this.state.preferenceVector.factor_three == 2}
                            onChange={this.onFactorThreeChange}/>
                        <label htmlFor='two'>2</label>
                        
                        <input type='radio' name='Factor3' id='three' value={3}
                            checked={this.state.preferenceVector.factor_three == 3}
                            onChange={this.onFactorThreeChange}/>
                        <label htmlFor='three'>3</label>
            
                        <input type='radio' name='Factor3' id='four' value={4}
                            checked={this.state.preferenceVector.factor_three == 4}
                            onChange={this.onFactorThreeChange}/>
                        <label htmlFor='four'>4</label>
            
                        <input type='radio' name='Factor3' id='five' value={5}
                            checked={this.state.preferenceVector.factor_three == 5}
                            onChange={this.onFactorThreeChange}/>
                        <label htmlFor='five'>5</label>
                    </div>
              
                    <div>
                        <button id='preference-vector-button' onClick={()=> this.changeHandler()}>Change</button>
                    </div>
            </Popup>

        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.us.currentUser
    };
}

const mapDispatchToProps = dispatch => {
    return {
     //   onGetUser: () => dispatch(actionCreators.getUser()),
     //   onChangePreferenceVector: (user) => dispatch(actionCreators.changePreferenceVector(user)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceVectorTab);