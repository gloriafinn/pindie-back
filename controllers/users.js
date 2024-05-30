const sendAllUsers= (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.usersArray));
};

// controllers/users.js
const sendUserCreated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
  };


  const sendUserUpdated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({ message: "Пользователь обновлен" }));
  };

  const sendUserDeleted = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
  }; 

  const sendMe = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
  };

module.exports= {
    sendAllUsers,
    sendUserCreated,
    sendUserUpdated,
    sendUserDeleted,
    sendMe
};