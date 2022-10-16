import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RecipeListView from './views/RecipeListView';
import RecipeView from './views/RecipeView';
import CreateRecipeView from './views/CreateRecipeView';
import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import { Toaster } from 'react-hot-toast';
import ToastConfig from './config/toaster';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import customTheme from './config/theme';
import { AuthGuard } from './components/AuthGuard';

const App = () => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ColorModeProvider
        options={{
          initialColorMode: 'light',
          useSystemColorMode: false,
        }}
      >
        <Routes>
          <Route path="/" element={<RecipeListView />} />
          <Route path="/sign-in" element={<LoginView />} />
          <Route path="/sign-out" element={<LogoutView />} />
          <Route
            path="/recipe/create"
            element={
              <AuthGuard>
                <CreateRecipeView />
              </AuthGuard>
            }
          />
          <Route path="/recipe/:recipeId" element={<RecipeView />} />
        </Routes>
        <Toaster toastOptions={ToastConfig} />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default App;
