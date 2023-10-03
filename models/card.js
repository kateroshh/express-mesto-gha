const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: "Поле name обязательное для заполнения",
      },
      minlength: [2, "Минимальная длинна 2 символа"],
      maxlength: [30, "Максимальная длинна 30 символов"],
    },
    link: {
      type: String,
      required: {
        value: true,
        message: "Поле link обязательное для заполнения",
      },
    },
    owner: {
      type: mongoose.ObjectId,
      required: {
        value: true,
        message: "Поле owner обязательное для заполнения",
      },
    },
    likes: [
      {
        type: mongoose.ObjectId,
        default: [],
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("card", cardSchema);
