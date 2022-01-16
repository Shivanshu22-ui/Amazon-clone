import "./App.css";
import Header from "./Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Checkout from "./Checkout";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          {/* always put the default router at the end */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
