const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  validateCardId: celebrate({
    params: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }),
  validateCardIdLike: celebrate({
    params: Joi.object().keys({
      cardId: Joi.objectId(),
    }),
  }),
  validateNewCard: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    }),
  }),
};
