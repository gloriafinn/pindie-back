const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter = require('./routes/api');
const pagesRouter = require('./routes/page');
const cookieParser = require("cookie-parser");

const connectToDatabase = require('./database/connect');
const cors = require('./middlewares/cors');

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(
  cors,//
  cookieParser(), // Добавляем миддлвар для работы с куки
  bodyParser.json(),
  pagesRouter, // Добавляем роутер для страниц
  apiRouter,
  express.static(path.join(__dirname, 'public'))
);

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});