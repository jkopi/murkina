import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import FoodListView from './views/FoodListView';
import RecipeView from './views/RecipeView';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <FoodListView />
        </Route>
        <Route exact path="/recipe/:recipeId">
          <RecipeView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;