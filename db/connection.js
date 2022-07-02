// // const MongoClient = require("mongodb").MongoClient;
// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.Promise = global.Promise;
// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(express.json());
// app.use(cors());


// const connectContacts = async () => {
//   // const client = await mongoose.connect(process.env.MONGO_URL, {
//   //   useNewUrlParser: true,
//   //   useUnifiedTopology: true,
//   // });
//   mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     useUnifiedTopology: true,
//   });
//   // const db = client.db();
//   // return (Collection = db.collection("contacts"));
// };
// module.exports = connectContacts;
