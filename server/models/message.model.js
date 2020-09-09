module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("message", {
    user_name: {
      type: Sequelize.STRING
    },
    user_avatar: {
      type: Sequelize.STRING
    },
    message_text: {
      type: Sequelize.TEXT
    }
  },{
    timestamps: false
  });
  return Message;
}