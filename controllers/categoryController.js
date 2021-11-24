const router = require("express").Router();
const { CategoryModel, ListModel } = require("../models");
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
  router.get("/", async (req, res) => {
    try {
      const categories = await CategoryModel.findAll({
        where: { userId: req.user.id },
        //include: [{ model: TodoModel, as: "todo Items" }],
        required: true,
      });
  
      if (categories.length === 0 || null) {
        return res.status(204).json({
          message: "You do not have any categories yet. Go make some!",
        });
      } else {
        return res.status(200).json({
          message: "Categories have successfully been retrieved",
          categories,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: `Lists could not be retrieved: ${err}`,
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
          message: "Categories have successfully been retrieved",
          categories,
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
      const category = await CategoryModel.findOne({
        where: { id: id, userId: req.user.id },
        include: [{ model: ListModel, as: "lists" }],
        required: true,
      });
  
      if (category.length === 0 || null) {
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
          message: "Could not find that category",
          error: err,
        });
      } else {
        res.status(500).json({
          message: `Category could not be retrieved: ${err}`,
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
          message: "Successfully retreived",
          foundList,
        });
      }
    } catch (err) {
      if (err === 404) {
        res.status(404).json({
          message: "Could not retreive category",
          error: "You have no category by that title",
        });
      } else {
        res.status(500).json({
          message: `Category could not be retrieved: ${err}`,
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
        message: "Category has been updated!",
        updatedList,
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not update category: ${err}`,
      });
    }
  });
  
  //! DELETE CATEGORY BY ID
  router.delete("/delete/:id", async (req, res) => {
    const query = { where: { id: req.params.id, userId: req.user.id } };
  
    try {
      const destroyedCategory = await ListModel.destroy(query);
      res.status(200).json({
        message: "Category has been destroyed!",
        destroyedCategory,
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not destroy category: ${err}`,
      });
    }
  });
  
  module.exports = router;  