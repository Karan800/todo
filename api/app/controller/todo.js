const todoModel = require('../models/todo')

const deletBytodo = (req,res,next) => {
    todoModel.findByIdAndRemove(req.params.id,(err,result) => {
        if(err)
            next(err)
        res.json({
            status:"Success",
            message:"Successfully Deleted Movie By ID",
            data:{
                movie: result
            }
        })
    })
} 
module.exports = {deletBytodo}