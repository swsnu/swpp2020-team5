import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';

import DetailPage from './containers/DetailPage/DetailPage';
import MainPage from './containers/MainPage/MainPage'
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import './App.css';

// for testing
import LocationTab from './containers/SideBar/LocationTab/LocationTab'
import Keywords from './components/DetailPage/Keywords/Keywords'

function App() {
  return (
    // /loc, /key: for design testing
    <BrowserRouter>
      <div className = "App">
        <Switch>
          <Redirect exact from='/'to='/sign-in' />
          <Route path='/loc' exact render={() => <LocationTab/>}/>
          <Route path='/key' exact render={() => <Keywords/>}/>
          <Route path='/main' exact component={MainPage}/>
          <Route path='/sign-in' exact render={() => <SignIn/>}/>
          <Route path='/sign-up' exact render={() => <SignUp/>}/>
          <Route path='/main/:name' exact render={()=><MainPage/>}/>
          <Route paht='/main/detail/:id' exact render={()=><DetailPage/>}/>
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
