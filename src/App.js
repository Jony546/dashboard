import "./App.css";
import { useState } from "react";
import { Login } from "./components/login";
import { Dashboard } from "./components/dashboard";

function App() {
  const [logged, setLogged] = useState(false);
  
  return <div className="App">{!logged ? <Login setLogged={setLogged}/> : <Dashboard />}</div>;
}

export default App;
