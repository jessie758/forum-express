const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');

const { generalMessageHandler } = require('./middlewares/message-handler');
const { generalErrorHandler } = require('./middlewares/error-handler');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
const SESSION_SECRET = 'secret';

app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
);
app.use(flash());

app.use(generalMessageHandler);
app.use(routes);
app.use(generalErrorHandler);

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`);
});

module.exports = app;
