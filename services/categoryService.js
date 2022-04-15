const chalk = require("chalk");
const { CategoryModel } = require("../models");

const create = async ({ title, iconId, userId }) => {
  try {
    const newCategory = await CategoryModel.create({
      title,
      iconId,
      userId,
    });
    return newCategory;
  } catch (e) {
    throw e;
  }
};

const getAll = async ({ userId }) => {
  try {
    const allCategories = await CategoryModel.findAll({
      where: { userId },
    });

    if (allCategories.length === 0 || null) {
      throw 404;
    } else {
      return allCategories;
    }
  } catch (e) {
    throw e;
  }
};

const getById = async ({ id, userId }) => {
  try {
    const foundCategory = await CategoryModel.findOne({
      where: { id, userId },
    });

    if (foundCategory.length === 0 || null) {
      throw 404;
    } else {
      return foundCategory;
    }
  } catch (e) {
    throw e;
  }
};

const modify = async ({ title, iconId, id, userId }) => {
  try {
    const updatedList = await CategoryModel.update(
      { title, iconId },
      { where: { id, userId } }
    );

    return updatedList;
  } catch (e) {
    throw e;
  }
};

const remove = async ({ id, userId }) => {
  try {
    const destroyedCategory = await CategoryModel.destroy({
      where: { id, userId },
    });
    return destroyedCategory;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  create,
  getAll,
  getById,
  modify,
  remove,
};
