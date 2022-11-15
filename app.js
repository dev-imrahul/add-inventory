const express = require('express');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.Controller')

const app = express();

app.use(express.json());
app.use('/api/v1/user', userRouter)

// Always put this code bottom of all routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
});

app.use(globalErrorHandler);

module.exports = app;