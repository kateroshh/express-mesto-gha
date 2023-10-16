const { celebrate, Joi } = require('celebrate');

module.exports = {
  validateObjId: celebrate({
    body: Joi.object().keys({
      _id: Joi.objectId().required(),
    }),
  }),
  validateAvatar: celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    }),
  }),
  validateProfile: celebrate({
    body: Joi.object().keys({
      name: Joi.string().default("Жак-Ив Кусто").required().min(2).max(30),
      about: Joi.string().default("Исследователь").required().min(2).max(30),
    }),
  }),
  validateNewUser: celebrate({
    body: Joi.object().keys({
      name: Joi.string().default("Жак-Ив Кусто").min(2).max(30),
      about: Joi.string().default("Исследователь").min(2).max(30),
      avatar: Joi.string().regex(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
      email: Joi.string().required().email({ tlds: { allow: false } }),
      password: Joi.string().required(),
    }),
  }),
  validateLogin: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email({ tlds: { allow: false } }),
      password: Joi.string().required(),
    }),
  }),
};
