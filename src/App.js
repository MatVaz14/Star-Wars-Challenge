import { Route, Redirect,Switch  } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import background from "./assets/background2.mp4";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <video src={background} autoPlay loop muted/>
      <Switch>
            <Route exact path="/" render={() => <Home />} />
      <Route exact path="/detail" render={() => <Detail />} />
      <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App;