const express = require("express");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const { validateCardId, validateNewCard, validateCardIdLike } = require("../validators/card-validator");

const CardRouter = express.Router();

CardRouter.get("/cards", getCards);
CardRouter.post("/cards", validateNewCard, createCard);
CardRouter.delete("/cards/:id", validateCardId, deleteCard);
CardRouter.put("/cards/:cardId/likes", validateCardIdLike, likeCard);
CardRouter.delete("/cards/:cardId/likes", validateCardIdLike, dislikeCard);

module.exports = { CardRouter };
