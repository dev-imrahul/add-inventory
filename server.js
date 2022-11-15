const mongoose = require("mongoose")
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });


mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
}, (error, res) => console.log('Connected', error));

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});