const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      minlength: [2, "Минимальная длинна 2 символа"],
      maxlength: [30, "Максимальная длинна 30 символов"],
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      required: false,
      minlength: [2, "Минимальная длинна 2 символа"],
      maxlength: [30, "Максимальная длинна 30 символов"],
      default: "Исследователь",
    },
    avatar: {
      type: String,
      required: false,
      default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator: (v) => validator.isURL(v, { protocols: ["http", "https"] }),
        message: (props) => `${props.value} некорректное значение avatar`,
      },
    },
    email: {
      type: String,
      unique: true,
      required: {
        value: true,
        message: "Поле email обязательное для заполнения",
      },
      validate: {
        validator: (v) => validator.isEmail(v),
        message: (props) => `${props.value} некорректное значение email`,
      },
    },
    password: {
      type: String,
      required: {
        value: true,
        message: "Поле password обязательное для заполнения",
      },
      select: false,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.path("avatar").validate((val) => {
  const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, "Некорректное значение поля avatar");

module.exports = mongoose.model("user", userSchema);
