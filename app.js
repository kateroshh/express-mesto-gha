const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { errors } = require('celebrate');
const { UserRouter } = require("./routes/users");
const { CardRouter } = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");

const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/mestodb" } = process.env;

const app = express();

mongoose.connect(MONGO_URL).then(() => console.log("Connected!"));

//  app.use(express.static(path.join(__dirname, 'public')));

//  ждем от клиента объект и присваевает в req.body. Подключить до маршрутов
app.use(express.json());
app.use(cookieParser());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use(UserRouter);
app.use(CardRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Страница не найдена",
  });
});

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
