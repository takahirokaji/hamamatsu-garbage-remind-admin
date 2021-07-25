var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
  return res.status(200).send({ message: "File Uploaded", code: 200 });
});

module.exports = router;
