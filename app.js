const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
app.enable('trust proxy');


//Serving static files - Importing static files of the project.
app.use(express.static(path.join(__dirname, 'public')));

//Set security HTTP headers
app.use(helmet());

//limit requests from same API
const limiter = new rateLimit({
    max: 50,
    windowsMs: 60 * 60 * 1000,
    message:
        'Too many requests from this IP. Please try again later in an hour!'
});

app.use('/api', limiter);

//Body parser, reading data from body into req.body
//Limits the incoming data to body to 10kb
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//Data sanitization against XSS
app.use(xss());


app.all('*', (req, res, next) => {
    next(new Error(`Can't find ${req.originalUrl} on the server!`));
});

module.exports = app;