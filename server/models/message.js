import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
  //we save created time, but don't need for the scope of this project
  //an update time
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
})

export default mongoose.model('Message',messageSchema);