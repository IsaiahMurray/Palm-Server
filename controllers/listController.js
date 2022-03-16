const chalk = require("chalk");
const { ListModel } = require("../models");
const Services = require("../services");
const listController = require("express").Router();

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

//! CREATE LIST
listController.route("/create").post( async (req, res) => {
  const { title, description, categoryId } = req.body;
  const userId = req.user.id;

  try {
    const newList = await Services.list.create({title, description, categoryId, userId});

    res.status(200).json({
      message: CREATE_SUCCESS,
      newList,
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

//! GET ALL LISTS FROM SINGLE USER
listController.route("/all").get(async (req, res) => {
  try {
    const userId = req.user.id;
    const allLists = await Services.list.getAll({userId})

    if (allLists.length === 0 || null) {
      return res.status(204).json({
        message: "You do not have any lists yet. Go make some!",
      });
    } else {
      return res.status(200).json({
        message: GET_SUCCESS,
        allLists,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: GET_FAIL,
      error: err
    });
  }
});

//! GET LIST BY ID
listController.route("/:id").get( async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id; 
    const foundList = await Services.list.getById({id, userId})

    if (foundList.length === 0 || null) {
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
        error: err,
      });
    } else {
      res.status(500).json({
        message: GET_FAIL,
        error: err
      });
    }
  }
});

//! GET LISTS BY TITLE(NEEDS WORKED ON)
listController.route("/:title").get( async (req, res) => {
  console.log(chalk.redBright("HIT THE ENDPOINT"))
  try {
    const userId = req.user.id;

    const foundList = await Services.list.getByTitle({title, userId})
    if (foundList.length === 0 || null) {
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
        error: NOT_FOUND,
      });
    } else {
      res.status(500).json({
        message: GET_FAIL,
        error: err
      });
    }
  }
});

//! UPDATE LIST BY ID
listController.route("/edit/:listId").put( async (req, res) => {
  try {
    const { title, description, categoryId } = req.body;
    const userId = req.user.id;
    const id = req.params.listId
    
    const updatedList = await Services.list.modify({title, description, categoryId, id, userId})
    

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

//! DELETE LIST BY ID
listController.route("/delete/:id").delete( async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    Services.list.remove({id, userId});

    res.status(200).json({
      message: DELETE_SUCCESS,
    });
  } catch (err) {
    res.status(500).json({
      message: DELETE_FAIL,
    });
  }
});

//! DELETE MULTIPLE LISTS BY ID (In progress)
listController.route("/multi-delete/:idArr").delete( async (req, res) => {
  //const query = { where: { id: req.params.id, userId: req.user.id } };
  const idArr = req.params.idArr;
  const userId = req.user.id;

  try {
    let arr = [];
    idArr.forEach((id) => {
      let found = ListModel.findOne({
        where: {
          id: id,
          userId: userId
        }
      })
      if(found){
        found.push(arr);
      }
    })
    
    res.status(200).json({
      message: "IT WORKED",
      arr,
    });
  } catch (err) {
    res.status(500).json({
      message: DELETE_FAIL,
    });
  }
});

module.exports = listController;