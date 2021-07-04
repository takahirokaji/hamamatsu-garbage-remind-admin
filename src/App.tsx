import React from "react";
import "./App.css";
import { CSVFileInput } from "./components/CSVFileInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>浜松ゴミ出しリマインダー:管理画面</p>
      </header>
      <main className="App-main">
        <div className="Garbage-container">
          <div className="Garbage-container-title">
            <p>収集日一覧の更新</p>
          </div>
          <div className="Garbage-container-input">
            <CSVFileInput />
            <button>更新する</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
