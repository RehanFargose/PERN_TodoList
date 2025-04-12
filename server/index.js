import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
import cors from "cors";
import pool from "./db.js"

// Set port for express app
const port = 3000;

// create an express server
const app = express();

// Get middlewares to deal with data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());




// ROUTES for todo website

// async function to query db and get all todos
async function getAll() {
    try {
        // const todoList = await pool.query("SELECT title, content FROM todo");
        const todoList = await pool.query("SELECT * FROM todo");

        const myTodos = todoList.rows;
        return myTodos;
    } catch (error) {
        console.log(error);
    }
}
// Get/display all todos
app.get("/todos", async(req, res)=>{
    try {
        const allTodos = await getAll();
        console.log("Testing if home route works, trying to get all todos from db: ");
        console.log(allTodos);
        res.json(allTodos);
    } catch (err) {
        console.log(err);
    }
});

// get a single todo
app.get("/todos/:id", async(req, res)=>{
    try {
        const todoID = req.params.id;
        console.log("Trying to get todo with id: "+todoID);
        

        const mytodo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [todoID]);
        console.log(mytodo.rows[0]);
        
        res.json(mytodo.rows);

    } catch (error) {
        console.error(error.message);
    }

});




// Creating a todo
async function createTodo(title, content) {
    try {
        const newTodo = await pool.query("INSERT INTO todo(title, content) VALUES($1, $2) RETURNING *", [title, content]);
        const newResponse = newTodo.rows;

        console.log("The newly added todo is: ");
        console.log(newResponse);

        return newResponse;
    } catch (error) {
        console.log(error);
    }
     
}

app.post("/create", async(req, res)=>{
    try {
        // Destructuring is done as followes:
        // const {ogkey1: newconst1, ogkey2: newconst2} = og_object;
        const {title: todoTitle, content: description} = req.body;
        console.log(todoTitle);
        console.log(description);

        const newStuff = await createTodo(todoTitle, description);
        
        // Display the newly added todo from db to an api endpoint as a json
        res.json(newStuff);

    } catch (error) {
        console.log(error);
    }
});



// update a todo
async function updateTodo(newTitle, newContent, id) {
    try {
        const updatedTodo = await pool.query("UPDATE todo SET title=$1, content=$2 WHERE todo_id=$3 RETURNING *",[newTitle, newContent, id]);
        console.log("The updated post is: ");
        const updateResp = updatedTodo.rows;
        console.log(updateResp);
        
        return updateResp[0];
    } catch (error) {
        console.error(error.message);
        
    }
}

app.put("/edit/:id", async(req, res)=>{
    try {
        const todoID = req.params.id;
        const newTitle = req.body.title;
        const newContent = req.body.content;       

        const updateResponse = await updateTodo(newTitle, newContent, todoID);
        console.log("Todo with id: "+todoID+" was updated!");
        
        res.json(updateResponse);

    } catch (error) {
        console.error(error.message);
    }

});






// delete a todo
async function delTodo(id) {
    try {
        const delTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1 ", [id]);
        const delResponse = delTodo.rows;

        console.log(delResponse);
        
    } catch (error) {
        console.error(error.message);
        
    }
}

app.delete("/delete/:id", async(req, res)=>{
    try {
        const delID = req.params.id;
        const deleting = await delTodo(delID);

        res.json("Todo item with id of "+delID+" was deleted");

    } catch (error) {
        console.error(error.message);
    }
});




// Start express server
app.listen(port, ()=>{
    console.log(`Main server for App is running on http://localhost:${port}`);
});
