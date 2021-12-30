const router = require("express").Router();
const { IconModel } = require("../models");
const chalk = require("chalk");

const {
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  GET_SUCCESS,
  DELETE_SUCCESS,
  CREATE_FAIL,
  UPDATE_FAIL,
  GET_FAIL,
  DELETE_FAIL,
  NOT_FOUND
} = require("./constants");

//! CREATE ICON
router.post("/create", async (req, res) => {
  const icon = {
    description: req.body.description,
  };

  try {
    const newIcon = await IconModel.create(icon);

    res.status(200).json({
      message: CREATE_SUCCESS,
      newIcon,
    });
  } catch (err) {
    chalk.redBright(
      res.status(500).json({
        message: CREATE_FAIL,
        error: err
      })
    );
  }
});

//! GET ICON BY ID
router.get("/:iconId", async (req, res) => {
  try {
    const icon = await IconModel.findOne({ where: { id: req.params.iconId } });

    res.status(200).json({
      message: GET_SUCCESS,
      icon,
    });
  } catch (err) {
    res.status(500).json({
      message: GET_FAIL,
      error: err
    });
  }
});

//! GET ALL ICONS
router.get("/all", async (req, res) => {
  try {
    const allIcons = await IconModel.findAll();

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
      error: err
    });
  }
});

//! UPDATE ICON BY ID
router.put("/edit/:iconId", async (req, res) => {
  try {
    const updatedIcon = await IconModel.update(
      { description: req.body.description },
      { where: { id: req.params.iconId } }
    );

    res.status(200).json({
      message: UPDATE_SUCCESS,
      updatedIcon,
    });
  } catch (err) {
    res.status(500).json({
      message: UPDATE_FAIL,
      error: err
    });
  }
});

//! DELETE ICON BY ID
router.delete("/delete/:id", async (req, res) => {
  const query = { where: { id: req.params.id } };

  try {
    const destroyedIcon = await IconModel.destroy(query);
    res.status(200).json({
      message: DELETE_SUCCESS,
      destroyedIcon,
    });
  } catch (err) {
    res.status(500).json({
      message: DELETE_FAIL,
      error: err
    });
  }
});

module.exports = router;