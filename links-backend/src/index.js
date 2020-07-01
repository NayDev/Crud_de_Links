const express = require('express');
const cors = require('cors');
const db = require('./models');
const response = require('./middlewares/response');
const checkJwt = require('./middlewares/jwt');

const authController = require('./controllers/auth');
const linkController = require('./controllers/link');

const app = express(); //chamo a função


app.use(cors());
app.use(response); //middlewares
app.use(checkJwt);

app.use(express.json()); //receber os dados em json
app.use(express.urlencoded({ extended: false })); //pegar o body

app.use('/auth', authController);
app.use('/link', linkController);

app.get('/', (req, res) => {
    return res.json('Api running...');
});

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Listening on port 3001')
    });
});