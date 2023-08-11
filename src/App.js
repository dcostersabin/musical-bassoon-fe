import "./App.css";
import Router from "./route";
import InitializeGuard from "./guards/initialize.guard";

function App() {
  return (
    <div className="App">
      <InitializeGuard>
        <Router />
      </InitializeGuard>
    </div>
  );
}

export default App;
