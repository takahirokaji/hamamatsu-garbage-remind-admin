import React from "react";
import "./App.css";
// import Button from "@material-ui/core/Button";
import { CSVFileInput } from "./components/CSVFileInput";
import { CSVFileUploader } from "./components/CSVFileUploader";
import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
// import { useState, useEffect } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function a11yProps(index: any) {
  console.log(index);
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function App() {
  // let [message, setMessage] = useState("");
  // useEffect(() => {
  //   fetch("http://localhost:4000/upload")
  //     .then((res) => res.json())
  //     .then((data: any) => setMessage(data.users));
  // }, []);
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          浜松ゴミ出しリマインダー　<strong>管理者画面</strong>
        </p>
      </header>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="収集日一覧" {...a11yProps(0)} />
          <Tab label="町の番号" {...a11yProps(1)} />
          <Tab label="ごみ" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <main className="App-main">
        最終更新日：2020/3/31
        <TabPanel value={value} index={0}>
          <div className="Garbage-container">
            <div className="Garbage-container-title">
              <p>収集日一覧の更新</p>
            </div>
            <div className="Garbage-container-input">
              {/* <CSVFileInput />
              <Button variant="contained" color="primary">
                更新する
              </Button> */}
              <CSVFileUploader />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="Garbage-container">
            <div className="Garbage-container-title">
              <p>町の番号</p>
            </div>
            <div className="Garbage-container-input">
              <CSVFileInput />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="Garbage-container">
            <div className="Garbage-container-title">
              <p>ごみ</p>
            </div>
            <div className="Garbage-container-input">
              <CSVFileInput />
            </div>
          </div>
        </TabPanel>
      </main>
    </div>
  );
}

export default App;
