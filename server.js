const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let whiteList = ["http://localhost:8081"];

let corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// parse request application/json x-www-form-urlencode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
