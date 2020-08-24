process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 🎇 Shutting down..');
    console.log(err.name, err.message);
    console.log(err);
    process.exit(1);
});

const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 🎇 Shutting down..');
    server.close(() => {
        console.log(err.name, err.message);
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
