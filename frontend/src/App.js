import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';

import MainPage from './containers/MainPage/MainPage'
import './App.css';
import DetailPage from './containers/DetailPage/DetailPage';

function App() {
  return (
    // temporarily using path '/' for MainPage for testing
    <BrowserRouter>
      <div className = "App">
        <Switch>
          <Route path = '/' exact render = {() => <MainPage/>} />
          <Route path='/main'exact component={MainPage}></Route>
          <Route path='/main/:name' exact render={()=><MainPage/>}/>
          <Route paht='/main/detail/:id' exact render={()=><DetailPage/>}/>
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
