require("dotenv").config();
const chalk = require("chalk");

const Services = require("../services/index");
const adminController = require("express").Router();

const {
  INCORRECT_EMAIL_PASSWORD,
  USER_CREATED,
  ADMIN_CREATED,
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
 ********   ADMIN CREATE   ********
 *********************************/

adminController.route("/register").post(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password) throw new Error(INCORRECT_EMAIL_PASSWORD);

    const hashedPassword = await Services.password.hashPassword(password);
    const userId = await Services.admin.adminCreate({
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

adminController.route("/modify-role/:id").put(async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;
    const updatedRole = await services.admin.modifyRole(id, role);
    res.json({
      user: updatedRole,
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
 ******* ADMIN USER DELETE ********
 *********************************/

module.exports = adminController;
