import { useState } from "react";
import "./App.css";
import HomePage from "./screens/Home";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p style={{color: "red"}}>This is</p>
        <HomePage />
      </div>
    </>
  );
}

export default App;
