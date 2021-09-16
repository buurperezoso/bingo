import './App.css';
import { Route, Switch } from 'react-router';
import Home from './views/Home';

function App() {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
