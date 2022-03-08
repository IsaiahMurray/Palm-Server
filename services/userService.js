const chalk = require("chalk");
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

const getByEmail = async (email) => {
  try {
    const foundUser = await UserModel.findOne({ where: { email } });

    return foundUser;
  } catch (e) {
    throw e;
  }
};

const modifyName = async (id, firstName, lastName) => {
  try {
    const updatedUser = await UserModel.update(
      {
        firstName: firstName,
        lastName: lastName,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return updatedUser;
  } catch (e) {
    throw e;
  }
};

const modifyEmail = async (id, email) => {
  try {
    const updatedUser = await UserModel.update(
      {
        email: email,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return updatedUser;
  } catch (e) {
    throw e;
  }
};

const modifyPassword = async (id, password) => {
  try {
    const updatedUserPass = await UserModel.update(
      {
        password: password,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return updatedUserPass;
  } catch (e) {
    throw e;
  }
};

const remove = async (id) => {
  try {
    const deletedUser = await UserModel.destroy({
      where: {
        id: id,
      },
    });
    return deletedUser;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  create,
  getByEmail,
  modifyName,
  modifyEmail,
  modifyPassword,
  remove,
};
