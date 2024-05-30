const usersRouter=require("express").Router();
const { checkAuth } = require("../middlewares/auth");

const {
  findAllUsers, 
  createUser, 
  updateUser, 
  checkEmptyNameAndEmailAndPassword,
  checkIsUserExists,
  checkEmptyNameAndEmail, 
  deleteUser,
  hashPassword
}=require('../middlewares/users');

const {
  sendAllUsers, 
  sendUserCreated, 
  sendUserUpdated,
  sendUserDeleted,
  sendMe
}=require('../controllers/users');

usersRouter.get(
  "/users",
  findAllUsers,
  sendAllUsers);


usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);

usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);

usersRouter.delete(
  "/users/:id", 
  checkAuth,
  deleteUser, 
  sendUserDeleted);

usersRouter.get("/me", checkAuth, sendMe);

module.exports=usersRouter;