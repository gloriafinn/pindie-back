const mongoose=require("mongoose");
// Импорт модели для связывания 
const userModel=require('./user');
const categoryModel=require('./category');

const gameSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    developer:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    },
    // Добавляем поле для списка пользователей
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
    }],
    // Добавляем свойство категории с массивом объектов, в котором укажем 
  // тип ObjectId и ref на существующую модель категорий
    categories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: categoryModel,
    }],
});
// Добавим метод для поиска игр по категории 
gameSchema.statics.findGameByCategory = function(category) {
    return this.find({}) // Выполним поиск всех игр
    .populate({
      path: "categories",
      match: { name: category } // Опция поможет сопоставить подходящие игры по выбранной категории 
    })
    .populate({
      path: "users",
      select: "-password" // Позволяет получить записи о пользователях за исключением их паролей (они же хранятся в зашифрованном виде)
    })
    .then(games => {
        // Отфильтруем по наличию искомой категории 
      return games.filter(game => game.categories.length > 0);
    });
  };
module.exports= mongoose.model("game",gameSchema);