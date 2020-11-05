const mongoose = require('mongoose');

async function connectdb(){

 await mongoose.connect(process.env.DB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

console.log('database connected');

}
connectdb();

module.exports = mongoose;