import React from "react";
import EditTodos from "./editTodos";

export default function ListTodos(props) {

  return (
    <div className="card my-2 shadow-sm" style={{ fontSize: "0.9rem" }}>
      <div className="card-body py-2 px-3">
        <h6 className="card-title mb-1">
          #{props.id} - {props.title}
        </h6>
        <p className="card-text mb-2">{props.content}</p>
        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-danger"
            onClick={(event) => {
              event.preventDefault();
              props.delFunc(props.id);
            }}
          >
            Delete
          </button>


          {/* Send the edit function and todo item with id which will be used for editing purposes */}
          <EditTodos editTodo={props.editFunc} todoItem={props.todoItem}/>

        </div>
      </div>
    </div>
  );
}
