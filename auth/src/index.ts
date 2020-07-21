import mongoose from 'mongoose';

import { app } from './app';

// depending on the version of node
// all await function needs to be wrapped inside of a function
// the latest version of Node can allow await at the top level,
// outside of function
const start = async () => {
  console.log('Starting up...');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb: ' + process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('v0.0.2');
    console.log('Auth Service Listening on port 3000!!!!!!');
  });
};

start();
