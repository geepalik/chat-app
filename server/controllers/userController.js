import db from '../models'
const User = db.users;
const Message = db.messages;
const Op = db.Sequelize.Op;

exports.saveNewUser = (req, res, next) =>{
  const user = {
    user_name: req.body.username,
    user_avatar: req.image_url ? req.image_url : ""
  }
  User.create(user)
    .then(data => {
      const userData = {
        "user_id": data.dataValues.id
      }
      if(req.image_url !== undefined){
        userData.current_user_avatar = req.image_url
      }
      res.status(201).json(userData);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Could not initialize user to log in"
      });
    });
};