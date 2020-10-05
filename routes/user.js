const express = require("express");
const router = express();
const User = require("../models/User");

// LIST ALL USERS
router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.json(error);
    });
});


// GET SPECIFIC USER
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json(user);
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      res.json(error);
    });
});

// DELETE A USER
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      res.status(200).json({ message: "ok" });
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
