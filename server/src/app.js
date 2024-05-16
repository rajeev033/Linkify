const express=require('express');
const cors=require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app= express();
const userRouter=require('./routes/user.routes');
const urlRouter=require('./routes/url.routes');
const analyticsRouter=require('./routes/analytics.routes');
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
  });
app.use('/api/v1/user', userRouter);
app.use('/api/v1/url', urlRouter);
app.use('/api/v1/analytics', analyticsRouter);
app.use('/', urlRouter)

module.exports=app;