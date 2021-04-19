import 'dotenv/config';
import app from './app';
import Database from './database';
// import 'reflect-metadata';
// import Server from './server';

// createConnection()
//   .then(async (connection) => {
//     const server = new Server();
//     server.start();
//   })
//   .catch((error) => console.log(error));

const { PORT } = process.env;

const database = new Database();
database
  .getConnection()
  .then(async (connection) => {
    app.listen(PORT, () => {
      console.log('✅ Server is listening to port ' + PORT);
    });
  })
  .catch((error) => console.log(error));
