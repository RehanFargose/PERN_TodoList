import { useState, useEffect } from 'react';
// import './App.css'
import InputTodos from './inputTodos';
import ListTodos from './listTodos';
import axios from 'axios';


export default function App() {
  // api url from .env
  const API_URL = import.meta.env.VITE_API_URL;

  // useState const for list of all todos
  const [todos, setTodos] = useState([]);
  

  // Function to retrieve all todoitems from db
  async function getTodos() {
    try {
      const response = await axios.get(API_URL+"/todos");
      console.log("The list of todos from db is: ");
      const todosList = response.data;
      console.log(todosList);
      
      // Display in the front end
      setTodos((prevTodo)=>{
        return todosList;
      });

    } catch (error) {
      
    }
  }

  // useEffect hook to retrieve and display all Todos during 1st load and page refresh
  useEffect(()=>{
    // Code that does some work, when something in dependency array tells it to
    // Call the function to display list in the beggining
    getTodos();

    // Dependency array, tells what useEffect should react to and perform the above code
    // Even if the dep array is empty, useEffect always runs at least once when component mounts
    // Usually provide useState const in dep array
  }, []);



  // Add a new todo item to the db, when add button is clicked
  async function updateTodoList(newTodo){
    try {
      // Retrieve the newTodo object passed from inputTodos button and pass to api url
      const response = await axios.post(API_URL+"/create", newTodo);
      const allTodos = response.data;
      console.log(allTodos);

      // api endpt to get all posts stored in db
      // const getresp = await getTodos();
      getTodos();

    } catch (error) {
        console.error(error.message); 
    }

  }


  // function to get id and delete a todo item from db
  async function delTodo(todoID) {
    try {
      console.log("Trying to delete todo with db id as: "+todoID);
      
      const delResponse = await axios.delete(API_URL+"/delete/"+todoID);
      console.log(delResponse.data);
      
      
      // api endpt to get all posts stored in db
      // const getresp = await getTodos();
      getTodos();

    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <div className="container">

    {/* Form tag instantly refreshes the page after submitting */}
    <form className="">
    <h1 className="text-center mt-5">PERN TodoList</h1>

    <InputTodos addTodo={updateTodoList}/>    

    </form>


    {/* Display all the todos */}
    {/* Use elem.todo_id which is PK in DB to eventually create delete and edit functionality */}
    {todos.map((elem, index)=>(
      <ListTodos key={index} id={elem.todo_id} title={elem.title} content={elem.content} delFunc={delTodo}/>
      ))}

  </div>
  )
}

