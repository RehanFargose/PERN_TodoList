import React from "react";
import { useState } from "react";
import axios from "axios";

export default function InputTodos(props){

    // const to track todoItem state
    const [currentTodo, setTodoItem] = useState({title: "",
        content: "",
    });

    // function to set/display the input field values after user types them
    async function handleChange(event){
        const {name, value} = event.target;

        // console.log("Input field being edited currently is: "+name);
        // console.log("Input value of current field is: "+value);
        
        setTodoItem((prevItem)=>{
            return {
                // Spread unchanged field as is
                ...prevItem,
                // Changed field get assigned new value
                [name]: value
            }
        });



        
    }

    // Return html-jsx code
    return (
        <div>
            <input className="form-control mt-3" type="text" placeholder="Enter the title" name="title" value={currentTodo.title} onChange={handleChange}></input>
            <input className="form-control mt-3" type="text" placeholder="Enter the content" name="content" value={currentTodo.content} onChange={handleChange}></input>

            <button className="btn btn-success mt-2" onClick={(event)=>{
                // Prevent the page from abruptly refreshing and losing the new data
                event.preventDefault();

                // props.changeH1();

                props.addTodo(currentTodo);

                // After adding todos, set them to empty fields for next values to be entered
                setTodoItem({title: "", content:""});

                }}>
            Add Todo</button>

        </div>

    );


}

