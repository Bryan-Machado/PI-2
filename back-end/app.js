var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin')
const clientesRouter = require('./routes/clientes');
const motoristaRouter = require('./routes/motoristas');
const linhasRouter = require('./routes/linhas');
const onibusRouter = require('./routes/onibus');
const viagemRouter = require('./routes/viagem');
const agendamentoRouter = require('./routes/agendamento');
const countRouter = require('./routes/count')

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const cors = require('cors');

var app = express();

// app.use(cors({origin: process.env.CLIENT_ORIGIN_URL}));
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/admin', adminRouter)
app.use('/api/clientes', clientesRouter);
app.use('/api/motoristas', motoristaRouter);         
app.use('/api/linhas', linhasRouter);
app.use('/api/onibus', onibusRouter);
app.use('/api/viagens', viagemRouter);
app.use('/api/agendamento', agendamentoRouter)  
app.use('/api/count', countRouter)
//os relacionamentos ficam dentro do próprios arquivos => exemplo: todos os clientes que uma viagem possui etá em viagem.js

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
