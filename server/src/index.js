const connectDB=require('./db/db');
const app= require('./app');
const port= process.env.port || 8080;


connectDB();


app.listen(port, ()=>{
    console.log(`server is listening at port ${port}`);
})