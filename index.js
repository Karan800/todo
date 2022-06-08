const express = require('express')
const logger = require('morgan')
// for dev log  
const bodyParser = require('body-parser')
// for handling req acts as middlware

//init the app
const app = express()
const empRoute = require('./api/app/routes/emp');
const todoRoute = require('./api/app/routes/todo')
const { default: mongoose } = require('mongoose');

app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/emp',empRoute)
const jwt = require('jsonwebtoken')
app.set('secretKey',"aaaaa")

const empValidation = (req, res,next) => {
    // using jwt for gen the web token
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), 
    (err,decoded) =>{
        if(err){
            res.json({
                message: err
            })
        }
        next()
    })
}
app.get('/',(req,res)=>{res.json({

    "APP" : "JWT API APP",
    "messange":"conn"
})

})

app.use('/todo',empValidation, todoRoute)
const mongoURI = "mongodb+srv://karann:suplex8007@cluster0.teszuyb.mongodb.net/?retryWrites=true&w=majority"
// conn to db 
mongoose.connect(mongoURI)
.then(() => {
    console.log("Successfully Connected to the Database")
})
.catch((err) => {
    console.log(err)
})
app.listen(5000,()=>{

    console.log("Running on PORT");

})