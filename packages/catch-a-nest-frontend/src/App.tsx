import Home from '@src/pages/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {/* Landing Page */}
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
