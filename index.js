const http = require('http');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const configs = require('./configs');
const bodyParser = require('body-parser');
const {models} = require('./database/collections');

const app = express();
const server = http.createServer(app);

app.use(express.json({extended: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With,Content-Type,Accept'
    );
    next();
});

require('./database/index')(configs, mongoose);
require('./routes/swagger.route')(app);
require('./routes/client.route')(app, models, configs);
require('./routes/provider.route')(app, models, configs);

server.listen(
        configs.port,
        () => console.log(`NodeJS server listen on port ${configs.port}`)
);
