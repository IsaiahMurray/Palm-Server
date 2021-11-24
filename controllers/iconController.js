const router = require("express").Router();
const { IconModel } = require("../models");
const chalk = require("chalk");

//! TEST ENDPOINT
router.get("/test", function (req, res) {
    res.send("Hey!! This is the icon route!");
  });
  
  //! CREATE ICON
  router.post("/create", async (req, res) => {
    const icon = {
      description: req.body.description
    };
  
    try {
      const newIcon = await IconModel.create(icon);
  
      res.status(200).json({
        message: "New icon has successfully been added!",
        newIcon,
      });
    } catch (err) {
      chalk.redBright(
        res.status(500).json({
          message: `Icon could not be created: ${err}`,
        })
      );
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
          message: "Icons have successfully been retrieved",
          allIcons,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: `Icons could not be retrieved: ${err}`,
      });
    }
  });
  
  

  
  //! UPDATE ICON BY ID
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
  
  //! DELETE ICON BY ID
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