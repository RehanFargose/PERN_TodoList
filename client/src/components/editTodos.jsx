import React from "react";
import { useEffect, useState } from "react";
// Reuse the input component
import InputTodos from "./inputTodos";

export default function EditTodos(props){
    // useState to keep track of current todo being edited
    const [todo, setTodo] = useState(props.todoItem);

    // Function to handle changes in the input field of modal
    async function handleChange(event) {
        const {name, value} = event.target;

        // console.log("Input field being edited currently is: "+name);
        // console.log("Input value of current field is: "+value);
        
        setTodo((prevItem)=>{
            return {
                // Spread unchanged field as is
                ...prevItem,
                // Changed field get assigned new value
                [name]: value
            }
        });
    }

    return (<>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" 
            // Below property allows the modals to be unique based on the unique id string
            // Maps diff modals to diff rendered elements
            data-bs-target={"#id"+todo.todo_id}>
            Edit
            </button>

            {/* <!-- The Modal --> */}
            {/* Below id is a combo of string and element id to make dynamic modals */}
            <div className="modal" id={"id"+todo.todo_id}>
            <div className="modal-dialog">
                <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                    <h4 className="modal-title">Edit Todo</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" 
                    // if we did not save changes, then any typed stuff should revert to original values in input fields
                    onClick={(event)=>{
                        setTodo(props.todoItem);
                    }}
                    ></button>
                </div>


                {/* <!-- Modal body --> */}
                <div className="modal-body">
                    {/* <InputTodos workTodo={props.editTodo} editID={props.editID} buttonName="Edit Todo"/> */}
                    <input className="form-control mt-3" type="text" 
                    placeholder="Enter a new title" name="title" value={todo.title} onChange={handleChange}>
                    </input>

                    <input className="form-control mt-3" type="text" 
                    placeholder="Enter a new content" name="content" value={todo.content} onChange={handleChange}>
                    </input>

                    <button className="btn btn-warning mt-2" data-bs-dismiss="modal" onClick={(event)=>{
                    // Prevent the page from abruptly refreshing and losing the new data
                    event.preventDefault();
                    
                    // Pass the updated Data js object of todo to the edit function
                    props.editTodo(todo);

                    // console.log("Submitting changes!");
                    
                    }}>
                    Edit Todo</button>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" 
                    // if we did not save changes, then any typed stuff should revert to original values in input fields
                    onClick={(event)=>{
                        setTodo(props.todoItem);
                    }}
                    >Close</button>
                </div>

                </div>
            </div>
            </div>
    
    </>);

}


