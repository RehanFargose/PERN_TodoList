import { useState } from 'react';
// import './App.css'
import InputTodos from './inputTodos';
import ListTodos from './listTodos';
import 'dotenv/config';

export default function App() {
  const API_URL = process.env.api_url;

  const [todos, setTodos] = useState([{title: "Dairy",
    content: "Get milk, yoghurt & cheese"
  }]);


  // Add a new todo item to the db
  async function updateTodoList(newTodo){




    // setTodos((prevTodo)=>{
    //   return [...prevTodo, newTodo];
    // });

  }

  // // Testing useState and prevent default
  // const [name, setName] = useState("");
  // function addHeading(){
  //   setName("Rehan");
  // }


  return (
    <div className="container">

    {/* Form tag instantly refreshes the page after submitting */}
    <form className="">
    <h1 className="text-center mt-5">PERN TodoList</h1>

    <InputTodos changeH1={addHeading} addTodo={updateTodoList}/>    

    </form>


    {/* Display all the todos */}
      {todos.map((elem, index)=>
      //  return <div key={index} id={index}> 
      //   <h3>{elem.title}</h3>
      //   <p>{elem.content}</p>
      //  </div> 
      (<ListTodos key={index} id={index} title={elem.title} content={elem.content}/>)
      )}

  </div>
  )
}

