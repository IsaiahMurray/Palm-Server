const {
  INVALID_TOKEN,
  TOKEN_ERROR,
  NO_AUTH,
} = require("../controllers/constants");
const { jwt } = require("../services");
const { UserModel } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const result = await jwt.verifyJWT(token);
    if (result) {
      const admin = await UserModel.findOne({
        where: {
          id: req.userId,
          role: "admin",
        },
      });
      if (admin) {
        next();
      } else {
        throw new Error(NO_AUTH);
      }
    } else {
      throw new Error(INVALID_TOKEN);
    }
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = {
        title: TOKEN_ERROR,
        info: {
          message: e.message,
        },
      };
      res.send(errorMessage);
    }
  }
};
