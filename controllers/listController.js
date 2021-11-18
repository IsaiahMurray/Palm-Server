const router = require("express").Router();
const { ListModel, TodoModel } = require("../models");
const chalk = require("chalk");

//! TEST ENDPOINT
router.get("/test", function (req, res) {
  res.send("Hey!! This is the list route!");
});

//! CREATE LIST
router.post("/create", async (req, res) => {
  const { title, description } = req.body;
  const listEntry = {
    title: title,
    description: description,
    ownerId: req.user.id,
  };

  try {
    const newList = await ListModel.create(listEntry);

    res.status(200).json({
      message: "New list has successfully been created!",
      newList,
    });
  } catch (err) {
    chalk.redBright(
      res.status(500).json({
        message: `List could not be created: ${err}`,
      })
    );
  }
});

//! GET ALL LISTS FROM SINGLE USER
router.get("/", async (req, res) => {
  try {
    const allLists = await ListModel.findAll({
      where: { ownerId: req.user.id },
      include: [{ model: TodoModel, as: "todo Items" }],
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
      message: `Lists could not be created: ${err}`,
    });
  }
});


//! GET LISTS BY TITLE
router.get("/:title", (req, res) => {
  let title = req.params.title;

  ListModel.findAll({
    where: { title: title, ownerId: req.user.id },
    include: [{ model: TodoModel, as: "todoItems" }],
    required: true,
  })
    .then((lists) => res.status(200).json(lists))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


//! UPDATE LIST BY ID
router.put("/edit/:listId", async (req, res) => {
  const { title, description } = req.body;

  try {
    const updatedList = await ListModel.update(
      { title, description },
      { where: { id: req.params.listId, ownerId: req.user.id } }
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


//! DELETE LIST BY ID
router.delete("/delete/:id", async (req, res) => {
  const query = { where: { id: req.params.id, ownerId: req.user.id } };

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