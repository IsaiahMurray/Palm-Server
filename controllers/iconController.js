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
  router.put("/edit/:iconId", async (req, res) => {
  
    try {
      const updatedIcon = await IconModel.update(
        {description: req.body.description },
        { where: { id: req.params.iconId } }
      );
  
      res.status(200).json({
        message: "Icon has been updated!",
        updatedIcon,
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not update icon: ${err}`,
      });
    }
  });
  
  //! DELETE ICON BY ID
  router.delete("/delete/:id", async (req, res) => {
    const query = { where: { id: req.params.id } };
  
    try {
      const destroyedIcon = await IconModel.destroy(query);
      res.status(200).json({
        message: "Icon has been destroyed!",
        destroyedIcon,
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not destroy list: ${err}`,
      });
    }
  });
  
  module.exports = router;