const chalk = require("chalk");
const { IconModel } = require("../models");

const create = async ({ description }) => {
  try {
    const newTask = await TaskModel.create({
      description,
    });
    return newTask;
  } catch (e) {
    throw e;
  }
};

const getById = async ({ id }) => {
  try {
    const icon = await IconModel.findOne({ where: { id } });

    return icon;
  } catch (e) {
    throw e;
  }
};

const getAll = async () => {
  try {
    const allIcons = await IconModel.findAll();

    return allIcons;
  } catch (e) {
    throw e;
  }
};

const modify = async ({ description, id }) => {
  try {
    const updatedIcon = await IconModel.update(
      { description },
      { where: { id } }
    );

    return updatedIcon;
  } catch (e) {
    throw e;
  }
};

const remove = async ({ id }) => {
  try {
    const destroyedIcon = await IconModel.destroy({ where: { id } });
    return destroyedIcon;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  create,
  getById,
  getAll,
  modify,
  remove,
};
