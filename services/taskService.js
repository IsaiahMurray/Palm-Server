const chalk = require("chalk");
const { TaskModel } = require("../models");

const create = async ({ description, color, categoryId, subCategoryId, userId, listId }) => {
  try {
    const newTask = await TaskModel.create({
      description,
      color,
      categoryId,
      subCategoryId,
      userId,
      listId
    });
    return newTask;
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

const modify = async ({ description, color, categoryId, subCategoryId, id, userId}) => {
  try {
    const updatedTask = await TaskModel.update(
      { description, color, categoryId, subCategoryId },
      { where: { id, userId } }
    );

    return updatedTask;
  } catch (e) {
    throw e;
  }
};

const remove = async ({ id, userId }) => {
  try {
    const destroyedTask = await TaskModel.destroy({ where: { id, userId } });
    return destroyedTask;
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
  modify,
  remove,
  removeMany,
};
