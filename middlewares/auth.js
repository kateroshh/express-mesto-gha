const jwt = require("jsonwebtoken");

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  let payload;

  try {
    // const { authorization } = req.headers;
    const token = req.cookies.userToken;

    if (!token) {
      return res.status(401).send({ message: "Необходима авторизация" });
    }

    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : "dev_secret");
  } catch (error) {
    if (error.message === "NotAutanticate") {
      return res.status(401).send({
        message: "Не правильный email или пароль",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).send({
        message: "Токен некорректный",
      });
    }

    return res.status(500).send({ message: "Ошибка на стороне сервера", error });
  }

  req.user = payload;
  next();
};

module.exports = auth;
