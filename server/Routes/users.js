import express, { Router } from 'express';
import db from '../dbconfig.js';

const userRoute = express.Router();

userRoute.post('/register', (req, res)=>{
    const {username, password} = req.body;
    db.query('INSERT INTO user (username, password) VALUES(?, ?)',
    [username, password], (err, result)=>{
        if(err) throw err;
        else{
            res.send("success");
        }
    })
})

userRoute.post('/login', (req, res)=>{
    const {username, password} = req.body;
    db.query('SELECT * FROM user WHERE username = ?',
    [username], (err, result)=>{
        if(err) throw err;
       if(result[0]){
 if(password == result[0].password){
    res.json({isLogin:true, username:username})
 }
 else{
    res.json({isLogin:false, message:"You are login"})
   }
       }
       else{
        res.json({isLogin:false, message:"User not signed registered"});
       }
       
    })
})
export default userRoute;