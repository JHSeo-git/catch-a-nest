import Home from '@src/pages/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {/* Landing Page */}
          <Home />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
