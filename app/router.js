import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './page';
import PantryList from './pantrylist';
//import AddItem from './AddItem';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/pantry" component={PantryList} />
        <Route path="/add-item" component={AddItem} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;