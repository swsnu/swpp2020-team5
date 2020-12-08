import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import DetailPage from './containers/DetailPage/DetailPage';
import MainPage from './containers/MainPage/MainPage';
import CreateID from './containers/SignUp/CreateID/CreateID';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import './App.css';
import * as actionCreators from './store/actions/index';
class App extends Component {
  componentDidMount() {
    this.props.onGetUser();
  }
  render(){
    return (
      <ConnectedRouter history={this.props.history}>
        {this.props.isSignIn ?
          (<div className="App">
            <Switch>
              <Redirect exact from="/" to="/main" />
              <Route path="/sign-in" exact render={() => <SignIn />} />
              <Route path="/sign-up" exact render={() => <SignUp />} />
              <Route path="/main" exact render={() => <MainPage />} />
              <Route path="/main/:name" exact render={() => <MainPage />} />
              <Route path="/detail/:id" exact render={() => <DetailPage />} />
              <Route render={() => <h1>Not Found</h1>} />
            </Switch>
          </div>) : (
          <div className="App">
            <Switch>
              <Route path="/sign-in" exact render={() => <SignIn />} />
              <Route path="/sign-up" exact render={() => <SignUp />} />
              <Redirect exact to="/sign-in" />
            </Switch>
          </div>
          )
        }
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignIn: state.us.isSignIn,
});

const mapDispatchToProps = (dispatch) => ({
  onGetUser:() => dispatch(actionCreators.getUser()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
