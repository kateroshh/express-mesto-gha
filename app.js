const express = require("express");
const mongoose = require("mongoose");
const { UserRouter } = require("./routes/users");
const { CardRouter } = require("./routes/cards");
const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/mestodb" } =
  process.env;

const app = express();

mongoose.connect(MONGO_URL).then(() => console.log("Connected!"));

//app.use(express.static(path.join(__dirname, 'public')));

//ждем от клиента объект и присваевает в req.body. Подключить до маршрутов
app.use(express.json());

//Временное решение: добавляет в каждый запрос объект user
app.use((req, res, next) => {
  req.user = {
    _id: "6515740521fc8060b58ccaa4", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.get("/", (req, res) => {
  res.send("Main");
});

app.use(UserRouter);
app.use(CardRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));