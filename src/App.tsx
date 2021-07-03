import React from "react";
import "./App.css";

const CSVFileInput = (event: any) => {
  const makeCSV = (csv: any) => {
    console.log("run");
    const tmp = csv.split("\n");

    console.log(tmp);
  };

  const fileHandler = async (e: any) => {
    if (!window.File && !window.FileReader && !window.FileList && !window.Blob)
      return console.log("error");
    const target = await e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(target);

    reader.onload = (e: any) => {
      const result = e.target.result;
      makeCSV(result);
    };
    reader.onerror = function () {
      alert("エラー：ファイルをロードできません。");
    };
  };
  return <input type="file" accept=".csv" onChange={fileHandler} />;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>浜松ゴミ出しリマインダー:管理画面</p>
      </header>
      <main className="App-main">
        <div className="Garbage-container">
          <div className="Garbage-container-title">
            <p>ごみ・資源物分別品目一覧の更新</p>
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
