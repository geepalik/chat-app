module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("message", {
    user_id: {
      type: Sequelize.INTEGER
    },
    message_text: {
      type: Sequelize.TEXT
    }
  });
  return Message;
}