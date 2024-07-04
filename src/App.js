import "./App.css";
import POS from "./data/POS.svg";
import nameLogo from "./data/logo.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={POS} className="App-logo" alt="logo" />
        <img src={nameLogo} className="h-48 my-0" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={POS}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to POS
        </a>
      </header>
    </div>
  );
}

export default App;
