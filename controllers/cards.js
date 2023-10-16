const Card = require("../models/card");
const {
  NotFoundError, NoRights,
} = require("../errors/errors");

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards)).catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card({ name, link, owner: req.user._id }).save()
    .then((newCard) => res.status(201).send(newCard))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка по указанному _id не найдена");
      }

      if (card?.owner && (String(card.owner) !== req.user._id)) {
        throw new NoRights("Нет прав на удаления карточек других пользователей");
      }

      return res.send(card);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка по указанному _id не найдена");
      }
      return res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка по указанному _id не найдена");
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
