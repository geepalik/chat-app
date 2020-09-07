module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    user_name: {
      type: Sequelize.STRING
    },
    user_avatar: {
      type: Sequelize.STRING
    },
  }, {timestamps: false});
  return User;
}