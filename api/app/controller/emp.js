const empModel = require('../models/emp')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const create = (req,res,next)=>{

    const {name,email,password} = req.body

    empModel.create({

        name,
        email,
        password


    },(err,result)=>{

        if(err)
        next(err)
        else
        res.status(200).json({
            status : "succ",
            msg : "user aded succ",
            data : result
        })
    })
}
const login = (req,res,next)=>{

    empModel.findOne({email:req.body.email},(err,result)=>{

        if(err)
        next(err)
        else{
            if(bcrypt.compare(req.body.password,result.password)){

                const token = jwt.sign({id:result._id},req.app.get('secretKey'),{expiresIn:'1h'})
                res.json({

                    status : "success",
                    msg : "succ logged in",
                    data : {
                        user : result,
                        token
                    }
                })

            }
        }
    })
}
module.exports = {create,login}