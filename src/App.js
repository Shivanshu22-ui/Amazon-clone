import "./App.css";
import Header from "./Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";

function App() {
  return (
    <div className="app">
      <Router>
       
        <Switch>
        <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
          <Header />
            <Checkout />
          </Route>
          {/* always put the default router at the end */}
          <Route path="/">
          <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
