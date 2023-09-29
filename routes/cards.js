const express = require("express");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const CardRouter = express.Router();

CardRouter.get("/cards", getCards);

CardRouter.post("/cards", createCard);

CardRouter.delete("/cards/:id", deleteCard);

CardRouter.put("/cards/:cardId/likes", likeCard);

CardRouter.delete("/cards/:cardId/likes", dislikeCard);

module.exports = { CardRouter };
