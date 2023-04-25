//Frist we get the express 


import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import path, { dirname } from 'path'


const app = express();
import  env from 'dotenv'
import Connection  from './config/db.js';   

import auth from './routes/auth.js';
import category from './routes/CategoryRoute.js';
import product from './routes/ProductRoute.js'

//config env 
env.config()

app.use(cors());

//create express json for read data 

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(--dirname ,"../frontend/my-app/build")))

app.get("/" , (req,res)=>{
    res.send({
        name:"Ecommerce website"
    })
    
})

app.use("*" , function(req ,res){
    res.sendFile(path.join(--dirname ,"../frontend/my-app/build/index.html"))
})
const port = 3500;


//connect to the db 
Connection();


//routes 

app.use('/api/v1/auth' , auth)

//this is the product route 

app.use('/api/v1/product' , product)

app.use('/api/v1/category' , category)
app.listen(port , ()=>{
    console.log("The app is running at "  +port )
})