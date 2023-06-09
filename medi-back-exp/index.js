const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(express.static('./server/public'))
// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json({limit: '50mb'}));

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD}@mediback.iab7nd7.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))
// import routes
// route middlewares

const router = require('./routes');
app.use('/api', router);

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})