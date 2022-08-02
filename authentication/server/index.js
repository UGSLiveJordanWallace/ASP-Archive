const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host:'us-cdbr-east-03.cleardb.com',
  user:'bc775ee66e30b7',
  password:'fcb659ba',
  database:'heroku_3e2d5234dae34bd'
});
  
// const db = mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   password:'rgbd224488*/+2746?',
//   database:'asp'
// });

// Online Database Structure
/* mysql:// username "bc775ee66e30b7": password "fcb659ba" : hostname "@us-cdbr-east-03.cleardb.com" : database "/heroku_3e2d5234dae34bd" ?reconnect=true */


//Signup Page and Actual engine

app.post('/signup', (req, res) => {
  const saltRounds = 10;
  
  const email = req.body.email;
  const password = req.body.password;
  const classOB = req.body.classOB;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      res.send({errorMessage: "Error!"});
    }
    // Store hash in password database
    db.query("INSERT INTO users (email, password, class) VALUES (?, ?, ?)", [email, hash, classOB], (err, result) => {
      if(err) {
        res.send({message: "User Already Exists, USE A DIFFERENT COMBINATION!!!"});
      }
    });
  });

});

app.listen(process.env.PORT || 3001, () => {
  console.log("running...");
});
