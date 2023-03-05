const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

//const notes = require("./public/notes.html");
//const home = require("./public/index.html");
//const api = require("./public/assets/js/index.js");

PORT = process.env.PORT || 3001;
const app = express();
//const notes = express.Router();

//app.use("/notes", notes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.Router());
//app.use("/api", api);

app.use(express.static("public"));

// app.get("/", (req, res) =>
//   res.sendFile(path.join(__dirname, "/public/notes.html"))
// );
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

app.post("/api/notes", (req, res) =>
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(req.body);
      console.log(parsedData);
      const stringedData = JSON.stringify(parsedData);
      fs.writeFile(path.join(__dirname, "/db/db.json"), stringedData, (err) => {
        err
          ? console.error(error)
          : res.sendFile(path.join(__dirname, "/db/db.json"));
      });
    }
  })
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
