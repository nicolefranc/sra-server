// DB stuff
const { ApolloServer } = require("apollo-server");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const sendEmail = require("./emails/email");

// DB user athentication
dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
});

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });


//for pdf stuff
// const express = require('express')  ;
// const bodyParser = require('body-parser');
// const pdf = require('html-pdf');
// const cors = require('cors');

// const pdfTemplate = require('./documents');

// const app = express();

// const port = 5001;

// app.use(cors());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

// app.post('/create-pdf', (req,res) => {
//   pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
//     if(err) {
//       res.send(Promise.reject());
//     }

//     res.send( Promise.resolve());
//   })
// })

// app.get('/fetch-pdf', (req,res) => {
//   sendEmail();
//   res.sendFile(`${__dirname}/result.pdf`)
// })

// app.listen(port, () => console.log(`express app listening on port ${port}`));
//sendEmail();