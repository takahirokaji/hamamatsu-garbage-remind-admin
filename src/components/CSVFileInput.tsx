import React from "react";

type Props = {};

export const CSVFileInput: React.FC<Props> = (event: any) => {
  //縦横を逆転させる
  const transpose = (a: any) =>
    a[0].map((_: any, c: any) => a.map((r: any) => r[c]));

  const checkFileReader = () => {
    if (
      !window.File &&
      !window.FileReader &&
      !window.FileList &&
      !window.Blob
    ) {
      return true;
    } else {
      return false;
    }
  };

  const optimizeCSV = (csv: String) => {
    if (checkFileReader()) return;
    const base = transpose(
      csv.split("\r\n").map((array) => {
        return array.split(",");
      })
    );
    const collectionDay = base.shift();
    const collectionTime = base.shift().map((el: any) => {
      if (el === "No.") {
        return "No.";
      } else {
        return new Date(el);
      }
    });
    console.log(collectionDay);
    console.log(collectionTime);
    const collectionGarbage = base.map((arr: any) => {
      const area: Number = parseInt(arr.shift(), 10);
      arr.unshift(area);
      return arr;
    });
    console.log(collectionGarbage);
  };

  const fileHandler = async (e: any) => {
    const target = await e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(target);

    reader.onload = async (e: any) => {
      const result = e.target.result;
      optimizeCSV(await result);
    };
    reader.onerror = function () {
      alert("エラー：ファイルをロードできません。");
    };
  };
  return <input type="file" accept=".csv" onChange={fileHandler} />;
};
