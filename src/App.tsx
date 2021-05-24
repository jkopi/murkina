import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import RecipeListView from './views/RecipeListView';
import RecipeView from './views/RecipeView';
import CreateRecipeView from './views/CreateRecipeView';
import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/sign-in">
          <LoginView />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/sign-out">
          <LogoutView />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/">
          <RecipeListView />
        </Route>
        <Route exact path="/recipe/create">
          <CreateRecipeView />
        </Route>
        <Route exact path="/recipe/:recipeId">
          <RecipeView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;