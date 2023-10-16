const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");
const {
  NotFoundError, DuplcateErr, ValidationErr,
} = require("../errors/errors");

const MONGE_DUPLCATE_ERROR_CODE = 11000;
const SOLT_ROUND = 10;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return res.status(500).send({ message: "Ошибка на стороне сервера", error });
  }
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.send(user);
    }).catch(next);
};

const getUsersById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь по указанному id не найден");
      }
      res.send(user);
    }).catch(next);
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  const hash = await bcrypt.hash(password, SOLT_ROUND);

  User({
    name, about, avatar, email, password: hash,
  }).save()
    .then((newUser) => {
      const userWithoutPassword = newUser.toObject();
      delete userWithoutPassword.password;
      res.status(201).send(userWithoutPassword);
    })
    .catch((error) => {
      if (error.code === MONGE_DUPLCATE_ERROR_CODE) {
        next(new DuplcateErr("Такой пользователь уже существует"));
      }

      next(error);
    });

  // try {
  //   const {
  //     name, about, avatar, email, password,
  //   } = req.body;

  //   const hash = await bcrypt.hash(password, SOLT_ROUND);

  //   const newUser = await new User({
  //     name, about, avatar, email, password: hash,
  //   });
  //   return res.status(201).send(await newUser.save());
  // } catch (error) {
  //   if (error.code === MONGE_DUPLCATE_ERROR_CODE) {
  //     throw new DuplcateErr("Такой пользователь уже существует");
  //   }
  //   return res.status(500).send({ message: "Ошибка на стороне сервера", error });
  // }
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.send(user);
    }).catch(next);

  // try {
  //   const { name, about } = req.body;
  //   const user = await User.findByIdAndUpdate(
  //     req.user._id,
  //     { name, about },
  //     { new: true, runValidators: true },
  //   );

  //   if (!user) {
  //     throw new NotFoundError("Пользователь не найден");
  //   }

  //   return res.send(user);
  // } catch (error) {
  //   return res.status(500).send({ message: "Ошибка на стороне сервера", error });
  // }
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.send(user);
    }).catch(next);

  // try {
  //   const { avatar } = req.body;
  //   const user = await User.findByIdAndUpdate(
  //     req.user._id,
  //     { avatar },
  //     { new: true, runValidators: true },
  //   );

  //   if (!user) {
  //     throw new NotFoundError("Пользователь не найден");
  //   }

  //   return res.send(user);
  // } catch (error) {
  //   return res.status(500).send({ message: "Ошибка на стороне сервера", error });
  // }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password").orFail(next);
    // .orFail(() => { throw new ValidationErr("Не правильный email или пароль"); })
    const matched = await bcrypt.compare(String(password), user.password);

    if (!matched) {
      next(new ValidationErr("Не правильный email или пароль"));
    }

    const token = generateToken({ _id: user._id, email: user.email });

    res.cookie("userToken", token, { maxAge: 360000, httpOnly: true, sameSite: true });

    return res.status(200).send({ email: user.email });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers, getUsersById, createUser, updateUser, updateUserAvatar, login, getUser,
};
