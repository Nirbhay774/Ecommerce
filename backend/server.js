//Frist we get the express 


import express from 'express'
import morgan from 'morgan';
import cors from 'cors';


const app = express();
import  env from 'dotenv'
import Connection  from './config/db.js';

import auth from './routes/auth.js';
//config env 
env.config()

app.use(cors());

//create express json for read data 

app.use(express.json())
app.use(morgan('dev'))

app.get("/" , (req,res)=>{
    res.send({
        name:"Ecommerce website"
    })
    
})
const port = 3500;


//connect to the db 
Connection();


//routes 

app.use('/api/v1/auth' , auth)

console.log(process.env.name)
app.listen(port , ()=>{
    console.log("The app is running at "  +port )
})