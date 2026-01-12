import express from "express";
import cors from "cors"

const app = express()

app.use(cors({
    origin: "http://localhost:5175",
    methods: ['PUT', "DELETE", "OPTIONS", "POST", "GET"],
    credentials: true
}))

app.use(express.json())


let users = []
let todos = []

app.get("/health", (req, res) => {
    res.send("healthy!")
})

app.post("/signup", (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: "username and password required!"})
    }

    const exists = users.find(u => u.username === username)

    if (exists) {
        return res.status(404).json({ msg: "User already exists!"})
    }

    const user = {
        id: users.length + 1,
        username,
        password
    }


    users.push(user)

    return res.status(200).json({
        msg: "user created successfully!",
        user: user.id
    })
})

app.post("/signin", (req, res) => {
    
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: "username and password required!"})
    }

    const existingUser = users.find(u => u.username === username)

    if (!existingUser) {
        return res.status(404).json({ msg: "user doesnot exist" })
    }

    if (existingUser.password !== password) {
        return res.status(404).json({msg: "password is incorrect"})
    }

    return res.status(200).json({
        msg: "signin successfull",
        user: existingUser.id
    })
})

app.post("/createTodo", (req, res) => {
    const { userId, title, description, completed } = req.body

    const user = users.find(u => u.id === userId)

    if (!user) {
        return res.status(404).json({ msg: "user not found"})
    }

    if (!title || !description || typeof completed !== "boolean") {
        return res.status(404).json({ msg: "parameters not required"})
    }

    const todo = {
        userId,
        id: todos.length + 1,
        title,
        description,
        completed,
    }

    todos.push(todo)

    return res.status(200).json({
        msg: "todo created successfully"
    })
});

app.put("/updateTodo/:id", (req, res) => {
    const { userId, title, description, completed } = req.body;
    const todoId = Number(req.params.id);

    const index = todos.findIndex(t => t.userId === userId && t.id === todoId)

    if (index === -1) {
        return res.status(404).json({ msg: "todo not found"})
    }

    todos[index] = {
        ...todos[index],
        ...(title !== undefined &&{ title}),
        ...(description !== undefined && {description}),
        ...(completed !== undefined && {completed})
    }

    return res.status(200).json({
        msg: "todo updated successfully"
    })
})

app.get("/getallTodo", (req, res) => {
     const userId =  Number(req.query.userId)

     if (!userId) {
        return res.json({ msg: "user not found"});
     }

     const userTodos = todos.filter(t => t.userId === userId )

     return res.json(userTodos)
})

app.get("/getByTodoId/:id", (req, res) => {
    
    const userId = Number(req.query.userId);
    const todoId = Number(req.params.id);

    const todo = todos.find(t => t.userId === userId && t.id === todoId)

    if (!todo) {
        return res.status(404).json({ msg: "todo not found"})
    }

    return res.json(todo)
})

app.delete("/delete/:id", (req, res) => {
    const userId = req.query.userId
    const id = Number(req.params.id)

    if (!userId || isNaN(id)) {
        return res.status(404).json({ msg: "userId and todo id required"})
    }
    
    const index = todos.findIndex(t => t.id === id && t.userId === userId)

    if (index === -1) {
        return res.status(404).json({ msg: "todo not found!"})
    }

    todos.splice(index, 1)

    return res.status(200).json({ msg: "Todo deleted successfully"})
})

app.listen(3000, () => {
    console.log("server is runnning at http://localhost:3000")
})