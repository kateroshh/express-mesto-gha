const Card = require("../models/card");

const checkError = (error, res) => {
  if (error.message === "NotFound") {
    res
      .status(400)
      .send({ message: "Переданы некорректные данные при создании карточки" });
  }

  if (error.message === "CastError") {
    res.status(404).send({ message: "Карточка с указанным _id не найдена" });
  }

  res.status(500).send({ message: "Ошибка на стороне сервера", error });
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (error) {
    return checkError(error, res);
  }
};

const createCard = async (req, res) => {
  try {
    const newCard = await new Card({ ...req.body, owner: req.user._id });
    return res.status(201).send(await newCard.save());
  } catch (error) {
    return checkError(error, res);
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.id);

    if (!card) {
      throw new Error("NotFound");
    }

    return res.send(card);
  } catch (error) {
    return checkError(error, res);
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true }
    );

    if (!card) {
      throw new Error("NotFound");
    }

    return res.send(card);
  } catch (error) {
    return checkError(error, res);
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true }
    );

    if (!card) {
      throw new Error("NotFound");
    }

    return res.send(card);
  } catch (error) {
    return checkError(error, res);
  }
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
