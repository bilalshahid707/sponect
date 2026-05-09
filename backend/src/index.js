const dotenv = require('dotenv')
dotenv.config()
const app = require('./app')
const {sequelize} = require('./config/sequelize')
const User = require('./models/user.model')

const startServer = async()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is listening at port ${process.env.PORT || 3000}`)
    }).on("error",(err)=>{
        console.log("Error starting server")
        console.log(err)
        process.exit(1)
    })  
}

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize connection established");

    await sequelize.sync();
    console.log("Models synchronized");

    startServer();
  } catch (err) {
    console.error("Sequelize connection failed:", err);
  }
})();

// Handling Uncaught Exceptions and Unhandled Rejections
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
// process.on('unhandledRejection', (err) => {
//   console.log('UNHANDLED REJECTION! Shutting down...');
//   console.log(err, err.message);
//   process.exit(1);
// });
process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully');
    sequelize.close().then(() => {
      console.log('Process terminated!');
      process.exit(0);
    }).catch(err => {
        console.log("Error while closing sequelize connection");
        console.log(err);
        process.exit(1);
    });
});