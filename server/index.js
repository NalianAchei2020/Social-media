import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import db from "./dbconfig.js";
import userRoute from "./Routes/users.js";
import uploadRouter from "./Routes/upload.js";
const app = express();



//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());


db.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log("Connected to Mysql database");
    }
})

app.use('/users', userRoute);
app.use('/uploads', uploadRouter);


const port = 8000;
app.listen(port, ()=>{
    console.log("Running on port 8000");
});
