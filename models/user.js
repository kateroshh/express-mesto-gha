const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
    about: {
      type: String,
      required: {
        value: true,
        message: "Поле about обязательное для заполнения",
      },
      minlength: [2, "Минимальная длинна 2 символа"],
      maxlength: [30, "Максимальная длинна 30 символов"],
    },
    avatar: {
      type: String,
      required: {
        value: true,
        message: "Поле avatar обязательное для заполнения",
      },
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("user", userSchema);
