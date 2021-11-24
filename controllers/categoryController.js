const router = require("express").Router();
const { CategoryModel } = require("../models");
const chalk = require("chalk");


//! TEST ENDPOINT
router.get("/test", function (req, res) {
    res.send("Hey!! This is the category route!");
  });
  
  //! CREATE CATEGORY
  router.post("/create", async (req, res) => {
    const { title, iconId } = req.body;
    const category = {
      title: title,
      iconId: iconId,
      userId: req.user.id,
    };
  
    try {
      const newCategory = await CategoryModel.create(category);
  
      res.status(200).json({
        message: "New list has category been created!",
        newCategory,
      });
    } catch (err) {
      chalk.redBright(
        res.status(500).json({
          message: `Category could not be created: ${err}`,
        })
      );
    }
  });
  
  //! GET ALL CATEGORIES FROM SINGLE USER
  router.get("/all", async (req, res) => {
    try {
      const allLists = await CategoryModel.findAll({
        where: { userId: req.user.id },
        //include: [{ model: TodoModel, as: "todo Items" }],
        required: true,
      });
  
      if (allLists.length === 0 || null) {
        return res.status(204).json({
          message: "You do not have any lists yet. Go make some!",
        });
      } else {
        return res.status(200).json({
          message: "Lists have successfully been retrieved",
          allLists,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: `Lists could not be retrieved: ${err}`,
      });
    }
  });
  
  //! GET CATEGORY BY ID
  router.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
      const foundList = await ListModel.findOne({
        where: { id: id, userId: req.user.id },
        include: [{ model: TaskModel, as: "tasks" }],
        required: true,
      });
  
      if (foundList.length === 0 || null) {
        throw 404;
      } else {
        res.status(200).json({
          message: "Successfully retreived",
          foundList,
        });
      }
    } catch (err) {
      if (err === 404) {
        res.status(404).json({
          message: "Could not find that list",
          error: err,
        });
      } else {
        res.status(500).json({
          message: `List could not be retrieved: ${err}`,
        });
      }
    }
  });
  
  //! GET CATEGORY BY TITLE
  router.get("/:title", async (req, res) => {
    let title = req.params.title;
    try {
      const foundList = await ListModel.findAll({
        where: { title: title, userId: req.user.id },
        include: [{ model: TaskModel, as: "tasks" }],
        required: true,
      });
      if (foundList.length === 0 || null) {
        throw 404;
      } else {
        res.status(200).json({
          message: "Successfully retreived",
          foundList,
        });
      }
    } catch (err) {
      if (err === 404) {
        res.status(404).json({
          message: "Could not retreive lists",
          error: "You have no lists by that title",
        });
      } else {
        res.status(500).json({
          message: `Lists could not be retrieved: ${err}`,
        });
      }
    }
  });
  
  //! UPDATE CATEGORY BY ID
  router.put("/edit/:listId", async (req, res) => {
    const { title, description } = req.body;
  
    try {
      const updatedList = await ListModel.update(
        { title, description },
        { where: { id: req.params.listId, userId: req.user.id } }
      );
  
      res.status(200).json({
        message: "List has been updated!",
        updatedList,
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not update list: ${err}`,
      });
    }
  });
  
  //! DELETE CATEGORY BY ID
  router.delete("/delete/:id", async (req, res) => {
    const query = { where: { id: req.params.id, userId: req.user.id } };
  
    try {
      const destroyedList = await ListModel.destroy(query);
      res.status(200).json({
        message: "List has been destroyed!",
        destroyedList,
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not destroy list: ${err}`,
      });
    }
  });
  
  module.exports = router;  