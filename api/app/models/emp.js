const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const empSchema = new mongoose.Schema({

 name:{

    type:String,
    required : true
 },
 email:{

    type:String,
    required : true
 },
 password:{

    type:String,
    required : true
 },
})

const saltRounds = 10 // no of times it has to be hashed
empSchema.pre('save',function (next){ //pre and post are middllwares brfore making changes in db execute callback
    const saltRounds = 10
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next() 
})
module.exports = mongoose.model("emp",empSchema)