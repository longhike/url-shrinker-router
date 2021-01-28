const express = require("express");
const router = express.Router();

const db = require("../config/db");
const MiniURL = require("../models/MiniURL");

router.get("/*", (req, res) => {
  const search_param = req.params["0"];
  if (search_param.length <= 0) {
    res.sendStatus(404);
    return;
  } else {
    MiniURL.findOne({
      where: {
        alias_hash: search_param,
      },
    })
    // .then(response => console.log(response))
    .then((response) => res.redirect(response.dataValues.target_url))
    .catch(err => console.log(err.message))
  }
});

module.exports = router;
