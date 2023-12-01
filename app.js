const express = require('express')
//console.log(express)
const app = express()//method
const port = 4000
const web =require('./routes/web')

//html css views
app.set('view engine','ejs')

//route load
app.use('/',web)




  //server create
  app.listen(port,()=>console.log("server start localhost:4000"))  
