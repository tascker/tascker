const express = require("express");
const router = express();
const Task = require("../models/Task");

// LIST ALL TASKS
router.get("/", (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => {
      res.json(error);
    });
});

// GET SPECIFIC TASK
router.get("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      if (!task) {
        res.status(404).json(task);
      } else {
        res.status(200).json(task);
      }
    })
    .catch((error) => {
      res.json(error);
    });
});

// DELETE A TASK
router.delete("/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((task) => {
      res.status(200).json({ message: "ok" });
    })
    .catch((error) => {
      res.json(error);
    });
});

// ADD NEW TASK
router.post("/", (req, res) => {
  const { title, notes, deadline, status, owner } = req.body;
  Task.create({
    title,
    notes,
    deadline,
    status,
    owner
  })
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((error) => {
      res.json(error);
    });
});

// UPDATE TASK
router.put("/:id", (req, res) => {
  const { title, notes, deadline, status } = req.body;
  Task.findByIdAndUpdate(
    req.params.id,
    { title, notes, deadline, status },
    { new: true }
  )
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
