import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

type Props = {};

export const CSVFileUploader: React.FC<Props> = (event: any) => {
  const [file, setFile]: any = useState();
  const [fileName, setFileName] = useState("");
  let param = "";

  const fileHandler = (e: any) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post("http://localhost:9000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      param = res.data.params;
      if (param) {
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <Button component="label" variant="contained" color="primary">
        CSVファイルを選択してください
        <input
          type="file"
          accept=".csv"
          onChange={fileHandler}
          style={{ opacity: 0, appearance: "none", position: "absolute" }}
        />
      </Button>
      <Button onClick={uploadFile}>更新する</Button>
    </>
  );
};
