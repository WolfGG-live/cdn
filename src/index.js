const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
app.set("port", 3238);
app.use(require('./routes/router'));

const server = app.listen(app.get("port"), async () => {
    console.log(`Puerto: ${app.get("port")}`);
})
