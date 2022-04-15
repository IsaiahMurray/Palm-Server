const iconController = require("express").Router();
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
  NOT_FOUND,
} = require("./constants");

//! CREATE ICON
iconController.route("/create").post(async (req, res) => {
  const { description } = req.body.description;

  try {
    const newIcon = await Services.icon.create({ description });

    res.status(200).json({
      message: CREATE_SUCCESS,
      newIcon,
    });
  } catch (err) {
    chalk.redBright(
      res.status(500).json({
        message: CREATE_FAIL,
        error: err,
      })
    );
  }
});

//! GET ICON BY ID
iconController.route("/:iconId").get(async (req, res) => {
  try {
    const id = req.params.id;
    const icon = await Services.icon.getById({ id });

    res.status(200).json({
      message: GET_SUCCESS,
      icon,
    });
  } catch (err) {
    res.status(500).json({
      message: GET_FAIL,
      error: err,
    });
  }
});

//! GET ALL ICONS
iconController.route("/all").get(async (req, res) => {
  try {
    const allIcons = await Services.icon.getAll();

    if (allIcons.length === 0 || null) {
      return res.status(204).json({
        message: "You do not have any icons yet. Go make some!",
      });
    } else {
      return res.status(200).json({
        message: CREATE_SUCCESS,
        allIcons,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: CREATE_FAIL,
      error: err,
    });
  }
});

//! UPDATE ICON BY ID
iconController.route("/edit/:iconId").put(async (req, res) => {
  try {
    const { description } = req.body;
    const id = req.params.iconId;
    const updatedIcon = await Services.icon.modify({ description, id });

    res.status(200).json({
      message: UPDATE_SUCCESS,
      updatedIcon,
    });
  } catch (err) {
    res.status(500).json({
      message: UPDATE_FAIL,
      error: err,
    });
  }
});

//! DELETE ICON BY ID
iconController.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;

  try {
    const destroyedIcon = await Services.icon.remove({ id });
    res.status(200).json({
      message: DELETE_SUCCESS,
      destroyedIcon,
    });
  } catch (err) {
    res.status(500).json({
      message: DELETE_FAIL,
      error: err,
    });
  }
});

module.exports = iconController;
