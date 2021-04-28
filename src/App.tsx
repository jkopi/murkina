import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import FoodListView from './views/FoodListView';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <FoodListView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;