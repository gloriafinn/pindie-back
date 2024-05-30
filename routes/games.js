const gamesRouter=require("express").Router();
const { checkAuth } = require("../middlewares/auth");

const {
  findAllGames, 
  createGame, 
  findGameById, 
  updateGame, 
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable, 
  checkEmptyFields, 
  checkIsGameExists,
  checkIsVoteRequest, 
  deleteGame}=require('../middlewares/games');
const {
  sendAllGames, 
  sendGameById,
  sendGameCreated, 
  sendGameUpdated,  
  sendGameDeleted}=require('../controllers/games');

  gamesRouter.get("/games/:id", 
  findGameById, 
  sendGameById);

gamesRouter.get(
  "/games", 
  findAllGames, 
  sendAllGames);

gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  createGame,
  sendGameCreated
);

gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  updateGame,
  sendGameUpdated
);

  gamesRouter.delete(
    "/games/:id", // Слушаем запросы по эндпоинту
    checkAuth, 
    deleteGame,
    sendGameDeleted // Тут будут функция удаления элементов из MongoDB и ответ клиенту
  ); 

module.exports=gamesRouter;