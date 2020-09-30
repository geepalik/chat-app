import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import 'regenerator-runtime/runtime';

let _db;

/**
 * connection pooling
 * @returns {Promise<void>}
 */
const mongoConnect = async () =>{
  _db = await mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
}

const getClient = () => {
  if(!_db){
    _db = mongoConnect();
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getClient = getClient;

