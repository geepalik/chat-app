import monggose from 'mongoose';

const Schema = monggose.Schema;

const messageSchema = new Schema({
  user_name:{
    type: String,
    required: true
  },
  user_avatar: {
    type: String,
    required: false
  },
  message_text: {
    type: String,
    required: true
  }
},{
  //when a new version of row is added to database
  //automatically add timestamp to that row
  //to use with createdAt and updatedAt
  timestamps: true
})

exports.Message = monggose.model('Message',messageSchema);