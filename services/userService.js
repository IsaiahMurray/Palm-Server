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

const adminCreate = async ({ firstName, lastName, email, password }) => {
  try {
    const newAdmin = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      role: "admin",
    });

    return newAdmin;
  } catch (e) {
    throw e;
  }
};

const modifyName = async ( id, firstName, lastName ) => {
  try {
    const updatedUser = await UserModel.update(
      {
        firstName: firstName,
        lastName: lastName
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
        email: email
      },
      {
        where: {
          id: id
        },
      }
    );
    return updatedUser;
  } catch (e) {
    throw e;
  }
}

const modifyPassword = async (id, password) => {
  try {
    const updatedUserPass = await UserModel.update(
      {
        password: password
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
}

const modifyRole = async ({ userId, role }) => {
  try {
    const updatedUser = await UserModel.update(
      { role },
      {
        where: { id: userId },
      }
    );
    return updatedUser;
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

const getById = async ({ id }) => {
  const foundUser = await UserModel.findOne({ where: { id } });
  return foundUser;
};

const getAll = async () => {
  try {
    const users = await UserModel.findAll();
    return users;
  } catch (e) {
    throw e;
  }
};

const remove = async (id) => {
  try {
    const deletedUser = await UserModel.destroy({
      where: {
        id: id
      },
    });
    return deletedUser;
  } catch (e) {
    throw e;
  }
};

const adminRemove = async ({ userId }) => {
  try {
    const deletedUser = await UserModel.destroy({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  create,
  adminCreate,
  modifyName,
  modifyEmail,
  modifyPassword,
  modifyRole,
  getAll,
  getByEmail,
  getById,
  remove,
  adminRemove,
};
