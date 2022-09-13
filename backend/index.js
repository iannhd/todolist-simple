const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(express.json())
app.use(cors())


// console.log(process.env, "==> proses")
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('connect to database..');
}).catch((err)=> console.log(err))

const Todo = require('./models/Todo')

app.get('/test', (req, res)=>{
    // res.send('hello')
    res.status(200).json({message: "hello"} )
    console.log('hello');
})

app.get('/todos', async (req, res)=>{
    const todos = await Todo.find()

    res.status (200).json(todos)

    console.log('masuk sini')
})

app.post('/todo/new', (req, res)=>{

    const todo = new Todo({
        text: req.body.text,
    })

    todo.save()

    res.json(todo)

})



app.get('/todo/complete/:id', async(req, res)=>{
    const todo = await Todo.findById(req.params.id)

    // todo.complete = !todo.complete;

    todo.complete = !todo.complete;

    todo.save()

    res.json(todo)

})

app.delete('/todo/delete/:id', async (req, res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id)
    // res.json(result)
    res.json(result)
})


app.listen(5000, ()=>{
    console.log(`Server is running on port 5000`);
})