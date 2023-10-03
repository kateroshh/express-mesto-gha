const express = require("express");
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

const UserRouter = express.Router();

UserRouter.get("/users", getUsers);

UserRouter.get("/users/:id", getUsersById);

UserRouter.post("/users", createUser);

UserRouter.patch("/users/me", updateUser);

UserRouter.patch("/users/me/avatar", updateUserAvatar);

module.exports = { UserRouter };
