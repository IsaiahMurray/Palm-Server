const router = require("express").Router();
const { TaskModel } = require("../models");
const {
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  GET_SUCCESS,
  DELETE_SUCCESS,
  CREATE_FAIL,
  UPDATE_FAIL,
  GET_FAIL,
  DELETE_FAIL,
} = require("./constants");

//!TEST ENDPOINT
router.get("/test", function (req, res) {
  res.send("Hey!! This is the task route!");
});

//! CREATE TASK
router.post("/create/:listId", async (req, res) => {
  const task = {
    description: req.body.description,
    owner: req.user.id,
    listId: req.params.listId,
  };
  try {
    const taskEntry = await TaskModel.create(task);

    res.status(200).json({
      message: CREATE_SUCCESS,
      taskEntry,
    });
  } catch (err) {
    res.status(500).json({
      message: CREATE_FAIL,
      error: err
    });
  }
});

//! UPDATE TASK BY ID
router.put("/update/:id", async (req, res) => {
  const task = {
    description: req.body.description,
  };

  const query = { where: { id: req.params.id } };
  try {
    const updatedTask = await TaskModel.update(task, query);

    res.status(200).json({
      message: UPDATE_SUCCESS,
      updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      message: UPDATE_FAIL,
      error: err
    });
  }
});

//! DELETE TASK BY ID
router.delete("/delete/:id", async (req, res) => {
  const query = { where: { id: req.params.id } };

  try {
    TaskModel.destroy(query);

    res.status(200).json({
      message: DELETE_SUCCESS
    });
  } catch (err) {
    res.status(500).json({
      message: DELETE_FAIL,
      error: err
    });
  }
});

module.exports = router;
