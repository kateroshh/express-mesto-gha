const express = require("express");
const {
  getUsers,
  getUsersById,
  getUser,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/users");
const { validateObjId, validateAvatar, validateProfile } = require("../validators/user-validator");

const UserRouter = express.Router();

UserRouter.get("/users", getUsers);
UserRouter.get("/users/me", getUser);
UserRouter.get("/users/:id", validateObjId, getUsersById);
UserRouter.patch("/users/me", validateProfile, updateUserProfile);
UserRouter.patch("/users/me/avatar", validateAvatar, updateUserAvatar);

module.exports = { UserRouter };
