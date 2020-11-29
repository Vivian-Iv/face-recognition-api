const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/Register');
const signin = require('./controllers/SignIn');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');

const knex = require('knex');
const { response } = require('express');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'post123',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {})

app.post('/signin', (req, res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`app running ${PORT}`);
})

console.log(PORT);

// --> res = this is working
// signin --> POST = SUCCESS/FAIL
// register --> POST = USER
// profile/:userID --> GET = user
// image --> PUT