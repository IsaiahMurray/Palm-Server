const chalk = require("chalk");
const { CategoryModel } = require("../models");
const Services = require("../services");
const categoryController = require('express').Router();

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
  
  //! CREATE CATEGORY
  categoryController.route('/create').post(async (req, res) => {
    const { title, iconId } = req.body;
    const userId = req.user.id;
  
    try {
      const newCategory = await Services.category.create({title, iconId, userId});
  
      res.status(200).json({
        message: CREATE_SUCCESS,
        newCategory,
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
  
  //! GET ALL CATEGORIES FROM SINGLE USER
  router.get("/", async (req, res) => {
    try {
      const categories = await CategoryModel.findAll({
        where: { userId: req.user.id },
        required: true,
      });
  
      if (categories.length === 0 || null) {
        return res.status(204).json({
          message: "You do not have any categories yet. Go make some!",
        });
      } else {
        return res.status(200).json({
          message: GET_SUCCESS,
          categories,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: GET_FAIL,
        error: err
      });
    }
  });

   //! GET ALL CATEGORIES WITH LISTS FROM SINGLE USER
   router.get("/lists", async (req, res) => {
    try {
      const categories = await CategoryModel.findAll({
        where: { userId: req.user.id },
        include: [{ model: ListModel, as: "lists" }],
        required: true,
      });
  
      if (categories.length === 0 || null) {
        return res.status(204).json({
          message: "You do not have any categories yet. Go make some!",
        });
      } else {
        return res.status(200).json({
          message: GET_SUCCESS,
          categories,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: GET_FAIL,
        error: err
      });
    }
  });


  //! GET CATEGORY BY ID
  router.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
      const category = await CategoryModel.findOne({
        where: { id: id, userId: req.user.id },
        include: [{ model: ListModel, as: "lists" }],
        required: true,
      });
  
      if (category.length === 0 || null) {
        throw 404;
      } else {
        res.status(200).json({
          message: GET_SUCCESS,
          foundList,
        });
      }
    } catch (err) {
      if (err === 404) {
        res.status(404).json({
          message: NOT_FOUND,
          error: `You have no categories: ${err}`,
        });
      } else {
        res.status(500).json({
          message: GET_FAIL,
          error: err
        });
      }
    }
  });
  
  //! GET CATEGORY BY TITLE
  router.get("/:title", async (req, res) => {
    let title = req.params.title;
    try {
      const category = await CategoryModel.findAll({
        where: { title: title, userId: req.user.id },
        include: [{ model: ListModel, as: "lists" }],
        required: true,
      });
      if (category.length === 0 || null) {
        throw 404;
      } else {
        res.status(200).json({
          message: GET_SUCCESS,
          foundList,
        });
      }
    } catch (err) {
      if (err === 404) {
        res.status(404).json({
          message: GET_FAIL,
          error: `You have no category by that title: ${err}`,
        });
      } else {
        res.status(500).json({
          message: GET_FAIL,
          error: err
        });
      }
    }
  });
  
  //! UPDATE CATEGORY BY ID
  router.put("/edit/:categoryId", async (req, res) => {
    const { title, iconId } = req.body;
  
    try {
      const updatedList = await ListModel.update(
        { title, iconId },
        { where: { id: req.params.categoryId, userId: req.user.id } }
      );
  
      res.status(200).json({
        message: UPDATE_SUCCESS,
        updatedList,
      });
    } catch (err) {
      res.status(500).json({
        message: UPDATE_FAIL,
        error: err
      });
    }
  });
  
  //! DELETE CATEGORY BY ID
  router.delete("/delete/:id", async (req, res) => {
    const query = { where: { id: req.params.id, userId: req.user.id } };
  
    try {
      const destroyedCategory = await ListModel.destroy(query);
      res.status(200).json({
        message: DELETE_SUCCESS,
        destroyedCategory,
      });
    } catch (err) {
      res.status(500).json({
        message: DELETE_FAIL,
        error: err
      });
    }
  });
  
  module.exports = router;  