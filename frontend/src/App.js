import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';

import DetailPage from './containers/DetailPage/DetailPage';
import MainPage from './containers/MainPage/MainPage'
import DetailPage from './containers/DetailPage/DetailPage';
import CreateID from './containers/SignUp/CreateID/CreateID';
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className = "App">
        <Switch>
          <Redirect exact from='/'to='/sign-in' />
          <Route path='/main' exact component={MainPage}/>
          <Route path='/sign-in' exact render={() => <SignIn/>}/>
          <Route path='/sign-up' exact render={() => <SignUp/>}/>
          <Route path='/main/:name' exact render={()=><MainPage/>}/>
          <Route path='/main/detail/:id' exact render={()=><DetailPage/>}/>
          <Route path='/signup/createid' exact render={()=><CreateID/>}/>
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
