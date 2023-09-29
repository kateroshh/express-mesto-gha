const express = require("express");
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
} = require("../controllers/users");

const UserRouter = express.Router();

UserRouter.get("/users", getUsers);

UserRouter.get("/users/:id", getUsersById);

UserRouter.post("/users", createUser);

UserRouter.patch(["/users/me", "/users/me/avatar"], updateUser);

module.exports = { UserRouter };
