import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import RecipeListView from './views/RecipeListView';
import RecipeView from './views/RecipeView';
import CreateRecipeView from './views/CreateRecipeView';
import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import { Toaster } from 'react-hot-toast';
import ToastConfig from './config/toaster';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import customTheme from './config/theme';

const App: React.FC = () => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
          useSystemColorMode: true
        }}
      >
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
          <Toaster toastOptions={ToastConfig}/>
        </Router>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;