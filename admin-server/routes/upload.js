const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const fs = require("fs");

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b215f8f6b04092",
  password: "0afba604",
  database: "heroku_bb69fae61fac0c1",
});

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "node",
//   password: "pw",
//   database: "garbage_admin",
// });

router.post("/", upload.single("file"), (req, res, next) => {
  console.log("uploading file....");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  return res
    .status(200)
    .send({ message: "File Uploaded", code: 200, params: req.file.filename });
});

router.get("");

router.get("/garbade_days/update", async (req, res, next) => {
  let text = fs
    .readFileSync("uploads/0dfd3fcb245be2250aa63abf1af66c74")
    .toString("utf-8");

  const days = text.split("\r\n");
  const initial = days.shift();
  const separate = initial.split(",");
  separate.shift();
  separate.shift();
  let garbage_numbers_query = "day";
  separate.forEach((number) => {
    return (garbage_numbers_query += `, ${number}`);
  });

  console.log(garbage_numbers_query);

  const oneDays = days.map((day) => {
    const separateByGarbageNumber = day.split(",");
    separateByGarbageNumber.shift();
    return separateByGarbageNumber;
  });

  const joined = oneDays.map((arr) => {
    const sss = arr.map((el) => {
      const single = `'${el}'`;
      return single;
      // return (el = `'${el}'`);
    });
    return sss;
  });
  // console.log(oneDays);
  const jojoined = joined.map((arr) => {
    const jojojoined = arr.join(", ");
    return jojojoined;
  });
  console.log(jojoined[0]);

  connection.connect((err) => {
    if (err) throw err;
    // const sql =
    //   "CREATE TABLE garbage_days (day DATE NOT NULL PRIMARY KEY,`1` varchar(255),`2` varchar(255),`3` varchar(255),`4` varchar(255),`5` varchar(255),`6` varchar(255),`7` varchar(255),`8` varchar(255),`9` varchar(255),`10` varchar(255),`11` varchar(255),`12` varchar(255),`13` varchar(255),`14` varchar(255),`15` varchar(255),`16` varchar(255),`21` varchar(255),`22` varchar(255),`23` varchar(255),`24` varchar(255),`25` varchar(255),`26` varchar(255),`27` varchar(255),`28` varchar(255),`29` varchar(255),`30` varchar(255),`31` varchar(255),`32` varchar(255),`41` varchar(255),`42` varchar(255),`44` varchar(255),`45` varchar(255),`46` varchar(255),`47` varchar(255),`48` varchar(255),`49` varchar(255))";

    jojoined.forEach((day) => {
      const sql = `INSERT INTO garbage_days (day,\`1\` ,\`2\` ,\`3\` ,\`4\` ,\`5\` ,\`6\` ,\`7\` ,\`8\` ,\`9\` ,\`10\` ,\`11\` ,\`12\` ,\`13\` ,\`14\` ,\`15\` ,\`16\` ,\`21\` ,\`22\` ,\`23\` ,\`24\` ,\`25\` ,\`26\` ,\`27\` ,\`28\` ,\`29\` ,\`30\` ,\`31\` ,\`32\` ,\`41\` ,\`42\` ,\`44\` ,\`45\` ,\`46\` ,\`47\` ,\`48\` ,\`49\`) VALUES(${day})`;
      console.log(sql);
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });
    // oneDays.forEach((day) => {
    //   console.log("connected");
    //   const sql = `INSERT INTO garbage_days (day,${garbage_numbers_query})`;
    // const sql = `INSERT INTO cities (name, garbage_number, initial, how_read, ward) VALUES ('${cityInfo[2]}', '${cityInfo[4]}', '${cityInfo[1]}', '${cityInfo[3]}', '${cityInfo[0]}')`;
    //   connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    //   });
    // });
    connection.end();
  });

  return res.send("ok");
});

router.get("/users/file", async (req, res, next) => {
  let text = fs
    .readFileSync("uploads/fc3de56bbeacc6177f5b358ec2c4382a")
    .toString("utf-8");

  const array = text.split("\r\n");
  array.shift();
  const newA = array.map((el) => {
    const newArr = el.split(",");
    console.log(newArr[0]);
    return newArr;
  });

  // newA.forEach((cityInfo) => {
  //   console.log("connected");
  //   var sql = `INSERT INTO cities (name, garbage_number, initial, how_read, ward) VALUES ('${cityInfo[2]}', '${cityInfo[4]}','${cityInfo[1]}', '${cityInfo[3]}', ${cityInfo[0]})`;
  //   console.log(sql);
  // });
  connection.connect((err) => {
    // const sql =
    //   "CREATE TABLE cities (name VARCHAR(255) NOT NULL PRIMARY KEY, garbage_number INT NOT NULL,initial VARCHAR(255) NOT NULL, how_read VARCHAR(255) NOT NULL, ward VARCHAR(255) NOT NULL)";
    // connection.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("Table created");
    // });
    newA.forEach((cityInfo) => {
      if (err) throw err;
      console.log("connected");
      var sql = `INSERT INTO cities (name, garbage_number, initial, how_read, ward) VALUES ('${cityInfo[2]}', '${cityInfo[4]}','${cityInfo[1]}', '${cityInfo[3]}', '${cityInfo[0]}')`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });
  });
  //   function handleDisconnect() {
  //     //connection取得
  //     connection.connect(function (err) {
  //       console.log("CONNECTION: continue");
  //       const sql =
  //         "CREATE TABLE garbage_days (day INT NOT NULL PRIMARY KEY,`1` varchar(255),`2` varchar(255),`3` varchar(255),`4` varchar(255),`5` varchar(255),`6` varchar(255),`7` varchar(255),`8` varchar(255),`9` varchar(255),`10` varchar(255),`11` varchar(255),`12` varchar(255),`13` varchar(255),`14` varchar(255),`15` varchar(255),`16` varchar(255),`17` varchar(255),`18` varchar(255),`19` varchar(255),`20` varchar(255),`21` varchar(255),`22` varchar(255),`23` varchar(255),`24` varchar(255),`25` varchar(255),`26` varchar(255),`27` varchar(255),`28` varchar(255),`29` varchar(255),`30` varchar(255),`31` varchar(255),`32` varchar(255),`33` varchar(255),`34` varchar(255),`35` varchar(255),`36` varchar(255),`37` varchar(255),`38` varchar(255),`39` varchar(255),`40` varchar(255),`41` varchar(255),`42` varchar(255),`43` varchar(255),`44` varchar(255),`45` varchar(255),`46` varchar(255),`47` varchar(255),`48` varchar(255),`49` varchar(255))";
  //       connection.query(sql, function (err, result) {
  //         if (err) throw err;
  //         console.log("Table created");
  //       });

  //       if (err) {
  //         console.log("ERROR.CONNECTION_DB: ", err);

  //         setTimeout(handleDisconnect, 1000);
  //       }
  //     });

  //     //error('PROTOCOL_CONNECTION_LOST')時に再接続
  //     connection.on("error", function (err) {
  //       console.log("ERROR.DB: ", err);
  //       if (err.code === "PROTOCOL_CONNECTION_LOST") {
  //         console.log("ERROR.CONNECTION_LOST: ", err);
  //         handleDisconnect();
  //       } else {
  //         throw err;
  //       }
  //     });

  //   connection.query("SELECT * from test;", function (err, rows, fields) {
  //     if (err) {
  //       console.log("err: " + err);
  //     }
  //     // 1 varchar(255),2 varchar(255),3 varchar(255),4 varchar(255),5 varchar(255),6 varchar(255),7 varchar(255),8 varchar(255),9 varchar(255),10 varchar(255),11 varchar(255),12 varchar(255),13 varchar(255),14 varchar(255),15 varchar(255),16 varchar(255),17 varchar(255),18 varchar(255),19 varchar(255),20 varchar(255),21 varchar(255),22 varchar(255),23 varchar(255),24 varchar(255),25 varchar(255),26 varchar(255),27 varchar(255),28 varchar(255),29 varchar(255),30 varchar(255),31 varchar(255),32 varchar(255),33 varchar(255),34 varchar(255),35 varchar(255),36 varchar(255),37 varchar(255),38 varchar(255),39 varchar(255),40 varchar(255),41 varchar(255),42 varchar(255),43 varchar(255),44 varchar(255),45 varchar(255),46 varchar(255),47 varchar(255),48 varchar(255),49 varchar(255)
  //     const sql =
  //       "CREATE TABLE garbage_days (1 INT NOYPRIMARY KEY, garbage_number INT NOT NULL,initial constCHAR(255) NOT NULL, how_read constCHAR(255) NOT NULL)";
  //     connection.query(sql, function (err, result) {
  //       if (err) throw err;
  //       console.log("Table created");
  //     });
  //   });
  // }

  //   handleDisconnect();

  //   return res.send("thank you for watching");
  // });

  // router.get("/update/cities", (req, res) => {
  //   const fs = require("fs");
  //   let text = fs.readFileSync(
  //     "../../../uploads/fc3de56bbeacc6177f5b358ec2c4382a"
  //   );
  //   console.log(text);
  //   connection.connect((err) => {
  //     // const sql = "";
  //     connection.query("SELECT * FROM test", (err, result) => {
  //       if (err) throw err;
  //       console.log(result);
  //       connection.end();
  //       res.send("ok");
  //     });
  //   });
  // });

  // router.get("/", function (req, res, next) {
  //   function handleDisconnect() {
  //     //connection取得
  //     connection.connect(function (err) {
  //       console.log("CONNECTION: continue");
  //       const sql =
  //         "CREATE TABLE garbage_days (day INT NOT NULL PRIMARY KEY,`1` varchar(255),`2` varchar(255),`3` varchar(255),`4` varchar(255),`5` varchar(255),`6` varchar(255),`7` varchar(255),`8` varchar(255),`9` varchar(255),`10` varchar(255),`11` varchar(255),`12` varchar(255),`13` varchar(255),`14` varchar(255),`15` varchar(255),`16` varchar(255),`17` varchar(255),`18` varchar(255),`19` varchar(255),`20` varchar(255),`21` varchar(255),`22` varchar(255),`23` varchar(255),`24` varchar(255),`25` varchar(255),`26` varchar(255),`27` varchar(255),`28` varchar(255),`29` varchar(255),`30` varchar(255),`31` varchar(255),`32` varchar(255),`33` varchar(255),`34` varchar(255),`35` varchar(255),`36` varchar(255),`37` varchar(255),`38` varchar(255),`39` varchar(255),`40` varchar(255),`41` varchar(255),`42` varchar(255),`43` varchar(255),`44` varchar(255),`45` varchar(255),`46` varchar(255),`47` varchar(255),`48` varchar(255),`49` varchar(255))";
  //       connection.query(sql, function (err, result) {
  //         if (err) throw err;
  //         console.log("Table created");
  //       });

  //       if (err) {
  //         console.log("ERROR.CONNECTION_DB: ", err);

  //         setTimeout(handleDisconnect, 1000);
  //       }
  //     });

  //     //error('PROTOCOL_CONNECTION_LOST')時に再接続
  //     connection.on("error", function (err) {
  //       console.log("ERROR.DB: ", err);
  //       if (err.code === "PROTOCOL_CONNECTION_LOST") {
  //         console.log("ERROR.CONNECTION_LOST: ", err);
  //         handleDisconnect();
  //       } else {
  //         throw err;
  //       }
  //     });

  //     connection.query("SELECT * from test;", function (err, rows, fields) {
  //       if (err) {
  //         console.log("err: " + err);
  //       }
  //       // 1 varchar(255),2 varchar(255),3 varchar(255),4 varchar(255),5 varchar(255),6 varchar(255),7 varchar(255),8 varchar(255),9 varchar(255),10 varchar(255),11 varchar(255),12 varchar(255),13 varchar(255),14 varchar(255),15 varchar(255),16 varchar(255),17 varchar(255),18 varchar(255),19 varchar(255),20 varchar(255),21 varchar(255),22 varchar(255),23 varchar(255),24 varchar(255),25 varchar(255),26 varchar(255),27 varchar(255),28 varchar(255),29 varchar(255),30 varchar(255),31 varchar(255),32 varchar(255),33 varchar(255),34 varchar(255),35 varchar(255),36 varchar(255),37 varchar(255),38 varchar(255),39 varchar(255),40 varchar(255),41 varchar(255),42 varchar(255),43 varchar(255),44 varchar(255),45 varchar(255),46 varchar(255),47 varchar(255),48 varchar(255),49 varchar(255)
  //       const sql =
  //         "CREATE TABLE garbage_days (1 INT NOYPRIMARY KEY, garbage_number INT NOT NULL,initial constCHAR(255) NOT NULL, how_read constCHAR(255) NOT NULL)";
  //       connection.query(sql, function (err, result) {
  //         if (err) throw err;
  //         console.log("Table created");
  //       });
  //     });
  // }

  // handleDisconnect();

  return res.send("ok");
});

module.exports = router;
