require('dotenv').config()
const connectDB = require('./db/connect');
const data = require('./models/model');
const jsonData = require('./data.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await data.User.create(jsonData.slice(0,3));
    await data.Class.create(jsonData.slice(3));
    console.log('Success!!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();