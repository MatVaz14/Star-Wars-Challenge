import Home from "./pages/Home.jsx";
import background from "./assets/background2.mp4";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <video src={background} autoPlay loop muted/>
      <Home />
    </div>
  )
}

export default App;