const users = require('../models/user');
const bcrypt = require('bcryptjs');



const findAllUsers = async (req, res, next)=>{
    req.usersArray = await users.find({});
    next();
};

const findUserById = async (req, res, next) => {
  console.log("GET /users/:id");
  try {
      // Пробуем найти игру по id
    req.user = await users.findById(req.params.id); // Загрузка связанных записей о пользователях
    next(); // Передаём управление в следующую функцию
  } catch (error) {
    // На случай ошибки вернём статус-код 404 с сообщением, что игра не найдена
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
};

const createUser = async (req, res, next) => {
    console.log("POST /users");
    try {
      //console.log(req.body);
      req.user = await users.create(req.body);
      next();
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Ошибка создания пользователя" }));
    }
  };

  const updateUser = async (req, res, next) => {
    console.log("PUT /users/:id");
    try {
        // В метод передаём id из параметров запроса и объект с новыми свойствами
      req.user = await users.findByIdAndUpdate(req.params.id, req.body);
      next();
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
    }
  };

  const checkIsUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find((user) => {
      return req.body.email === user.email;
    });
    if (isInArray) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует" }));
    } else {
      next();
    }
  };

  const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Введите имя, email и пароль" }));
    } else {
      next();
    }
  };

  const checkEmptyNameAndEmail = async (req, res, next) => {
    if (!req.body.username || !req.body.email) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Введите имя и email" }));
    } else {
      next();
    }
  };

  const deleteUser = async (req, res, next) => {
    console.log("DELETE /users/:id");
    try {
      req.user = await users.findByIdAndDelete(req.params.id);
      next();
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
    }
  }; 

  const hashPassword=async (req,res,next)=>{
    try {
      //Создаем соль
      const salt=await bcrypt.genSalt(10);
      //Хешируем пароль
      const hash=await bcrypt.hash(req.body.password, salt);
      //Меняем пароль на хэш
      req.body.password=hash;
      next();
    }catch (error){
      console.log(error);
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Error hash"}));
    };

  };

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    deleteUser,
    hashPassword
};