const express = require("express");
const controller = require("./controller");
const db = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3001;

db.authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/v/", controller);

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
