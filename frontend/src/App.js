import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';

import DetailPage from './containers/DetailPage/DetailPage';
import SignIn from "./containers/SignIn/SignIn";
import MainPage from './containers/MainPage/MainPage'
import './App.css';

function App() {
  return (
    // temporarily using path '/' for MainPage for testing
    <BrowserRouter>
      <div className = "App">
        <Switch>
          <Route path='/sign-in' exact render={() => <SignIn/>}/>
          <Route path='/main' exact component={MainPage}/>
          <Route path='/main/:name' exact render={()=><MainPage/>}/>
          <Route paht='/main/detail/:id' exact render={()=><DetailPage/>}/>
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
