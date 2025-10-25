const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');


router.get('/todos',async (req,res)=>{
    
    try{
        const todos = await Todo.find();
        res.json(todos);
    }
    catch(err){
        res.status(500).json({message:err.message});
        
    }
});
router.post('/todos', async (req, res) => {
    const {title,description} = req.body;
    if(!title){
        return res.status(400).json({message:err.message});
    }
    try {
        const newTodoItem = new Todo({
            title: req.body.title,
            description: req.body.description,
        });

        const savedTodo = await newTodoItem.save();  
        res.status(201).json(savedTodo);      
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/todos/:id',async (req,res)=>{
try{
    const {title,description,completed} =req.body;
    const updatedTodo =  await Todo.findByIdAndUpdate(
        req.params.id,
        {title,description,completed},
        {new : true}
    );
    if(!updatedTodo){
        return res.status(404).json({message:"not found"});
    }
    res.json(updatedTodo);
}
catch(err){
    res.status(400).json({message:err.message});
}
});
router.post("/todos/:id/important", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.important = !todo.important; // toggle
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/todos/:id', async (req,res)=>{
    try{
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
            if(!deletedTodo){
                return res.status(404).json({message:"Todo not found"});
            }
            res.json({message:"Todo deleted sucessfully"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});


module.exports = router;