const chalk = require("chalk");
const { ListModel, TaskModel } = require("../models");

const create = async ({ title, description, categoryId, userId }) => {
  try {
    const newList = await ListModel.create({
      title,
      description,
      categoryId,
      userId,
    });
    return newList;
  } catch (e) {
    throw e;
  }
};

const getAll = async ({ userId }) => {
  try {
    const allLists = await ListModel.findAll({
      where: { userId },
      include: [{ model: TaskModel, as: "tasks" }],
      required: true,
    });

    if (allLists.length === 0 || null) {
      throw 404;
    } else {
      return allLists;
    }
  } catch (e) {
    throw e;
  }
};

const getById = async ({ id, userId }) => {
  try {
    const foundList = await ListModel.findOne({
      where: { id, userId },
      include: [{ model: TaskModel, as: "tasks" }],
      required: true,
    });

    if (foundList.length === 0 || null) {
      throw 404;
    } else {
      return foundList;
    }
  } catch (e) {
    throw e;
  }
};

const getByTitle = async ({ title, userId }) => {
  try {
    const allLists = await ListModel.findAll({
      where: { userId },
      include: [{ model: TaskModel, as: "tasks" }],
      required: true,
    });

    console.log(chalk.redBright(allLists));

    const foundLists = allLists.filter((list) => {
      let rTitle = list.title.replace(" ", "");
      return rTitle === title;
    });

    if (foundLists.length === 0 || null) {
      throw 404;
    } else {
      return foundLists;
    }
  } catch (e) {
    throw e;
  }
};

const modify = async ({title, description, categoryId, id, userId}) => {
  try {
    const updatedList = await ListModel.update(
      { title,description, categoryId },
      { where: { id, userId } }
    );

    return updatedList;
  } catch (e) {
    throw e;
  }
};

const remove = async ({ id, userId }) => {
  try {
    const destroyedList = await ListModel.destroy({ where: { id, userId } });
    return destroyedList;
  } catch (e) {
    throw e;
  }
};

//! NEEDS DEVELOPED
const removeMany = async ({}) => {
  try {
    return;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  create,
  getAll,
  getById,
  getByTitle,
  modify,
  remove,
  removeMany,
};
