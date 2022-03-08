require("dotenv").config();
const chalk = require("chalk");

const Services = require("../services/index");
const userController = require("express").Router();
const {ValidateSession} = require("../middleware");

const {
  INCORRECT_EMAIL_PASSWORD,
  USER_CREATED,
  ADMIN_CREATED,
  USER_FOUND,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  TITLE_LOGIN_ERROR,
  TITLE_SIGNUP_ERROR,
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
    const {firstName, lastName } = req.body;
    const {id} = req.user;

    const updatedUser = await services.user.modifyName(id, firstName, lastName);
    res.json({
      user: updatedUser,
      info: {
        message: UPDATE_SUCCESS
      }
    })
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
})

/**********************************
 ********   USER DELETE   *********
 *********************************/

/**********************************
 ********   ADMIN CREATE   ********
 *********************************/

userController.route("/register/admin").post(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password) throw new Error(INCORRECT_EMAIL_PASSWORD);

    const hashedPassword = await Services.password.hashPassword(password);
    const userId = await Services.user.adminCreate({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      userId,
      info: {
        message: ADMIN_CREATED,
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

/**********************************
 ****** MODIFY ADMIN STATUS *******
 *********************************/

/**********************************
 ******* ADMIN USER DELETE ********
 *********************************/

module.exports = userController;
