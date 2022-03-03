const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const cutToken = req.headers.authorization.substring(7);
      const decodedToken = jwt.verify(cutToken, process.env.SECRET_KEY);

      res.locals.decodedToken = decodedToken;
      next();
    } else {
      throw { message: "You do not have permission." };
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error from jwtMiddleware", error: error.message });
  }
};

module.exports = {
  jwtMiddleware,
};
