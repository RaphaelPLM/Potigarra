const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const path = require('path');
const { errors } = require("celebrate");

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
  });
}

app.listen(port, () => console.log("Listening on port ", port));
