import React from "react";
import { useState } from "react";


export default function ListTodos(props){


    return (<div>
            <h3>{props.id} {props.title}</h3>
            <p>{props.content}</p>
            <button className="btn btn-danger">Delete</button>
            <button className="btn btn-primary">Edit</button>
    </div>)
}




