const chalk = require("chalk");
const { ListModel, TaskModel } = require("../models");

const create = async ({ title, description, userId }) => {
  try {
    const newList = await ListModel.create({ title, description, userId });
    return newList;
  } catch (e) {
    throw e;
  }
};

const getaAll = async ({ userId }) => {
  try {
    const allLists = await ListModel.findAll({
      where: { userId },
      include: [{ model: TaskModel, as: "Tasks" }],
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

const getbyId = async ({ id, userId }) => {
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

const getbyTitle = async ({ title, userId }) => {
  try {
    const foundList = await ListModel.findAll({
      where: { title, userId },
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

const modify = async ({ title, description, id, userId }) => {
  try {
    const updatedList = await ListModel.update(
      { title, description },
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

const removeMany = async ({}) => {
  try {
    return;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  create,
  getaAll,
  getbyId,
  getbyTitle,
  modify,
  remove,
  removeMany,
};
