import mongoose from 'mongoose';
import { config } from '../config';

export const dbConn = () => {
  mongoose.connect(config.db.connectionString);
  mongoose.connection.on("connected", function () {
    console.log("Default database connection is open");
  });
  mongoose.connection.on("error", function (err) {
    console.log(`${err}, Error has occured on default database connection`);
  });
  mongoose.connection.on("disconnected", function () {
    console.log("Default database connection is disconnected");
  });

  process.on("SIGINT", function () {
    mongoose.connection.close();
    console.log("Default DB disconnected");
    process.exit(0); 
});
}