const User = require("../models/user");

const checkError = (error, res) => {
  if (error.message === "NotFound") {
    return res.status(404).send({
      message: "Пользователь по указанному _id не найден",
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).send({
      message: "Переданы некорректные данные при создании пользователя",
    });
  }

  if (error.name === "CastError" || error.message === "CastError") {
    return res
      .status(400)
      .send({ message: "Переданы некорректные данные пользователя" });
  }

  return res.status(500).send({ message: "Ошибка на стороне сервера", error });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return checkError(error, res);
  }
};

const getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error("NotFound");
    }

    return res.send(user);
  } catch (error) {
    return checkError(error, res);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await new User({ name, about, avatar });
    return res.status(201).send(await newUser.save());
  } catch (error) {
    return checkError(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new Error("NotFound");
    }

    return res.send(user);
  } catch (error) {
    return checkError(error, res);
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new Error("NotFound");
    }

    return res.send(user);
  } catch (error) {
    return checkError(error, res);
  }
};

module.exports = {
  getUsers, getUsersById, createUser, updateUser, updateUserAvatar,
};
