const express = require("express");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const { validateCardId, validateNewCard } = require("../validators/card-validator");

const CardRouter = express.Router();

CardRouter.get("/cards", getCards);
CardRouter.post("/cards", validateNewCard, createCard);
CardRouter.delete("/cards/:id", validateCardId, deleteCard);
CardRouter.put("/cards/:cardId/likes", validateCardId, likeCard);
CardRouter.delete("/cards/:cardId/likes", validateCardId, dislikeCard);

module.exports = { CardRouter };
