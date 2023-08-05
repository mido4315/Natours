const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection established successfully'))
  .catch(() => console.log('DB connection failed'));




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}....`);
});
