const express = require('express')
const router = express.Router()
const todoController = require('../controller/todo')

router.delete('/deletBytodo/:id',todoController.deletBytodo)

module.exports = router