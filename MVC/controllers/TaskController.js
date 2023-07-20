const Task = require('../model/Tasks')

module.exports = class TaskController{

    static createTask(req,res){
        res.render('tasks/create')
    }
    static async createTaskSave(req,res){
         const task={
            title: req.body.title,
            description: req.body.description,
            done:false
         }

         //validações
         //Processar dados

         await Task.create(task)

         res.redirect('/tasks')
    }
    static async showTasks(req,res){
        const tasks = await Task.findAll({raw: true})

        res.render('tasks/all',{tasks})
    }

}