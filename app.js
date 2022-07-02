const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./api')
const authRouter = require('./api/auth')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api/v1/contacts", contactsRouter);
app.use("/api/users", authRouter);
// app.use((_, res, __) => {
//   res.status(404).json({
//     status: 'error',
//     code: 404,
//     message: 'Use api on routes: /api/v1/contacts',
//     data: 'Not found',
//   })
// })

// app.use((err, req, res, next) => {
//   // console.log(err.stack)
//   res.status(500).json({
//     status: 'fail',
//     code: 500,
//     message: err.message,
//     data: 'Internal Server Error',
//   })
// })

app.use((req, res, next) => {
  next({status: 404, message: "Not Found"});
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({message});
});
module.exports = app
