const taskController = require("express").Router();
const Services = require("../services");

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

//! CREATE TASK
taskController.route("/create/:listId").post(async (req, res) => {
  try {
    const { description, color, categoryId, subCategoryId } = req.body;
    const listId = req.params.listId;
    const userId = req.user.id;

    const taskEntry = await Services.task.create({
      description,
      color,
      categoryId,
      subCategoryId,
      userId,
      listId,
    });

    res.status(200).json({
      message: CREATE_SUCCESS,
      taskEntry,
    });
  } catch (err) {
    res.status(500).json({
      message: CREATE_FAIL,
      error: err,
    });
  }
});

//! UPDATE TASK BY ID
taskController.route("/update/:id").put(async (req, res) => {
  const { description, color, categoryId, subCategoryId } = req.body;

  const id = req.params.id;
  const userId = req.user.id;
  try {
    const updatedTask = await Services.task.modify({ description, color, categoryId, subCategoryId, id, userId})

    res.status(200).json({
      message: UPDATE_SUCCESS,
      updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      message: UPDATE_FAIL,
      error: err,
    });
  }
});

//! DELETE TASK BY ID
taskController.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    Services.task.remove({id, userId});

    res.status(200).json({
      message: DELETE_SUCCESS,
    });
  } catch (err) {
    res.status(500).json({
      message: DELETE_FAIL,
      error: err,
    });
  }
});

module.exports = taskController;
