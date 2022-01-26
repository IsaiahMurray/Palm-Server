const { UserModel } = require("../models");

const create = async ({ firstName, lastName, email, password }) => {
  try {
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      role: "user",
    });

    return newUser;
  } catch (e) {
    throw e;
  }
};

const adminCreate = async () => {
  try {
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      role: "admin",
    });

    return newUser;
  } catch (e) {
    throw e;
  }
};

const modify = async ({userId, firstName, lastName, email, password}) => {
  try {
    const updatedUser = await UserModel.update({
      firstName,
      lastName,
      email,
      password,
    },{where: {
        id: userId
    }});
    return updatedUser;
  } catch (e) {
    throw e;
  }
};

const adminModify = async ({userId, firstName, lastName, email, password, role}) => {
  try {
    const updatedUser = await UserModel.update({
      firstName,
      lastName,
      email,
      password,
      role
    }, {
        where: {id: userId}
    });
    return updatedUser;
  } catch (e) {
    throw e;
  }
};

const getAll = async () => {
  try {
    const users = await UserModel.findAll();
    return users;
  } catch (e) {
    throw e;
  }
};
const remove = async ({userId}) => {
    try {
        const deletedUser =  await UserModel.destroy({
          where: {
            id: userId
          }
        })
        return deletedUser;
      } catch (e) {
        throw e;
      }
};
const adminRemove = async ({userId}) => {
    try {
        const deletedUser =  await UserModel.destroy({
          where: {
            id: userId
          }
        })
        return deletedUser;
      } catch (e) {
        throw e;
      }
};

module.exports = {
  create,
  adminCreate,
  modify,
  adminModify,
  getAll,
  remove,
  adminRemove,
};
