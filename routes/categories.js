// Создаём роут для запросов категорий 
const categoriesRouter=require("express").Router();
const { checkAuth } = require("../middlewares/auth");
// Импортируем вспомогательные функции
const {
  findAllCategories, 
  createCategory, 
  updateCategory, 
  checkEmptyName, 
  deleteCategory,  
  checkIsCategoryExists
}=require('../middlewares/categories');
const {
  sendAllCategories, 
  sendCategoryCreated, 
  sendCategoryUpdated, 
  sendCategoryDeleted
}=require('../controllers/categories');

// Обрабатываем GET-запрос с роутом '/categories'
categoriesRouter.get(
  "/categories",
  findAllCategories,
  sendAllCategories);

categoriesRouter.post(
  "/categories",
  findAllCategories,
  checkIsCategoryExists,
  checkEmptyName,
  checkAuth,
  createCategory,
  sendCategoryCreated
);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
categoriesRouter.put(
  "/categories/:id",
  checkEmptyName,
  checkAuth,
  updateCategory,
  sendCategoryUpdated
);

  categoriesRouter.delete(
    "/categories/:id", 
    checkAuth,
    deleteCategory, 
    sendCategoryDeleted);
  
// Экспортируем роут для использования в приложении — app.js
module.exports=categoriesRouter;