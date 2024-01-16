const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    //
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    //if fail: exit the entire process
    process.exit(1);
  }
};

//export module: connectDB
module.exports = connectDB;
