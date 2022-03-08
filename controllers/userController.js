require("dotenv").config();
const chalk = require("chalk");

const Services = require("../services/index");
const userController = require("express").Router();
const { ValidateSession } = require("../middleware");

const {
  INCORRECT_EMAIL_PASSWORD,
  USER_CREATED,
  USER_FOUND,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  TITLE_LOGIN_ERROR,
  TITLE_SIGNUP_ERROR,
  DELETE_FAIL,
  DELETE_SUCCESS,
} = require("../controllers/constants");
const services = require("../services/index");

/**********************************
 ********   USER CREATE   *********
 *********************************/

userController.route("/register").post(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await Services.password.hashPassword(password);
    const userId = await Services.user.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      userId,
      info: {
        message: USER_CREATED,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = {
        title: TITLE_SIGNUP_ERROR,
        info: {
          message:
            e.message === "Validation error" ? e.original.detail : e.message,
        },
      };
      res.send(errorMessage);
    }
  }
});

/*********************************
 ********   USER LOGIN   *********
 *********************************/

userController.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error(INCORRECT_EMAIL_PASSWORD);

    const foundUser = await Services.user.getByEmail(email);

    if (!foundUser) throw new Error(INCORRECT_EMAIL_PASSWORD);
    if (
      !(await Services.password.validatePassword(password, foundUser.password))
    )
      throw new Error(INCORRECT_EMAIL_PASSWORD);

    const userId = foundUser?.id;
    const token = await Services.jwt.createSessionToken(userId);

    res.json({
      user: foundUser,
      token: token,
      info: {
        message: USER_FOUND,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = {
        title: TITLE_LOGIN_ERROR,
        info: {
          message: e.message,
        },
      };
      res.send(errorMessage);
    }
  }
});

/**********************************
 ******   USER UPDATE NAME  *******
 *********************************/
userController.route("/update-name").put(ValidateSession, async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const { id } = req.user;

    const updatedUserName = await services.user.modifyName(
      id,
      firstName,
      lastName
    );
    res.json({
      user: updatedUserName,
      info: {
        message: UPDATE_SUCCESS,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = {
        title: UPDATE_FAIL,
        info: {
          message: e.message,
        },
      };
      res.send(errorMessage);
    }
  }
});

/**********************************
 ******   USER UPDATE EMAIL  ******
 *********************************/

userController.route("/update-email").put(ValidateSession, async (req, res) => {
  try {
    const { email } = req.body;
    const { id } = req.user;

    const updatedUserEmail = await services.user.modifyEmail(id, email);
    res.json({
      user: updatedUserEmail,
      info: {
        message: UPDATE_SUCCESS,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = {
        title: UPDATE_FAIL,
        info: {
          message: e.message,
        },
      };
      res.send(errorMessage);
    }
  }
});

/**********************************
 *****   USER UPDATE PASSWORD  *****
 *********************************/

userController
  .route("/update-password")
  .put(ValidateSession, async (req, res) => {
    try {
      const { password } = req.body;
      const { id } = req.user;
      const hashedPassword = await Services.password.hashPassword(password);
      const updatedUserPass = await services.user.modifyPassword(
        id,
        hashedPassword
      );
      res.json({
        user: updatedUserPass,
        info: {
          message: UPDATE_SUCCESS,
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        const errorMessage = {
          title: UPDATE_FAIL,
          info: {
            message: e.message,
          },
        };
        res.send(errorMessage);
      }
    }
  });

/**********************************
 ********   USER DELETE   *********
 *********************************/

userController.route("/delete").delete(ValidateSession, async (req, res) => {
  try {
    const { id } = req.user;
    const destroyedUser = await services.user.remove(id);

    res.status(200).json({
      destroyedUser,
      info: {
        message: DELETE_SUCCESS,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = {
        title: DELETE_FAIL,
        info: {
          message: e.message,
        },
      };
      res.send(errorMessage);
    }
  }
});

module.exports = userController;
