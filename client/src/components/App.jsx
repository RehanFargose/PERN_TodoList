import { useState, useEffect } from 'react';
import InputTodos from './inputTodos';
import ListTodos from './listTodos';
import axios from 'axios';


export default function App() {
  // api url from .env
  // vite has separate way to import env variables
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



  // Add a new todo item to the db, when add button is clicked & update list of todos
  async function createTodo(newTodo){
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


  // function to edit todo item
  async function editTodo(editedTodo) {
    try {
      // Destructure the updated todo item object and extract its data for url and body parsing
      // So that db can edit it
      const {todo_id: ogID, title: updatedTitle, content: updatedContent} = editedTodo;
      
      // Created a todo object consisting only of title and content, to be passed as json body to backend api endpt
      const updatedTodoData = {
        "title": updatedTitle,
        "content": updatedContent
      };

      console.log("Trying to edit stuff");
      // console.log(updatedTitle);
      // console.log(updatedContent);
      console.log(updatedTodoData);
      
      
      const editResponse = await axios.put(API_URL+"/edit/"+ogID, updatedTodoData);

      const update = editResponse.data;
      console.log("Edit response from db is: ");
      console.log(update);

      // Get all the todos again, even the updated ones
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

    {/* The main input field to create new Todo items */}
    <InputTodos addTodo={createTodo}/>    

    </form>

    {/* Display all the todos */}
    {/* Use elem.todo_id which is PK in DB to eventually create delete and edit functionality, also pass full elem for edit functionality */}
    {todos.map((elem, index)=>(
      <ListTodos key={index} id={elem.todo_id} title={elem.title} 
      content={elem.content} delFunc={delTodo} editFunc={editTodo} todoItem={elem}/>
      ))}

  </div>
  )
}

