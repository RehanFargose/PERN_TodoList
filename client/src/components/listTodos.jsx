import React from "react";
import { useState } from "react";


export default function ListTodos(props){


    return (<div>
            <h3>{props.id} {props.title}</h3>
            <p>{props.content}</p>
            <button className="btn btn-danger" onClick={(event)=>{
                event.preventDefault();

                // Call the delete function and pass the props.id which is a db PK
                // to the delete function passed here as a prop
                props.delFunc(props.id);

            }}>Delete</button>
            <button className="btn btn-primary">Edit</button>
    </div>)
}




