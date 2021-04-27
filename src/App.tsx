import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/test">
          <TestComponent />
        </Route>
      </Switch>
    </Router>
  );
}

// just for testing
function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>Here is my home</p>
    </>
  )
}

function TestComponent() {
  return (
    <>
      <h1>Test</h1>
      <p>dis is a test</p>
    </>
  )
}

export default App;
