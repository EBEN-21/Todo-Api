const express = require('express');
const auth = require('./middlewares/auth');
const logger = require('./middlewares/logger');
const morgan = require('morgan');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(logger);
app.use(auth);
app.use(express.json());

app.use('/api/v1/items', userRoutes);
morgan.token('host', (req, res) =>{
    return req.hostname;
})

const port = process.env.PORT;


app.listen(port, function (){
    console.log(`Server is running on ${port}`);
    
})