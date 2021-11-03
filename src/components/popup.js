import React from "react";
import "./popup.css";
import "./Firebase";
import firebase from "firebase/app";

function Popup(props) {
  const [input, setInput] = React.useState("");
  const updateTodo = () => {
    const editTodo = firebase.firestore().collection("todos");
    editTodo.doc(props.id).update({
      item: input,
    });
  };
  return (
    <div className="popup-box">
      
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <h1 id = "popupHeading">Edit To-Do</h1>
        <>
          <input
            type="text"
            id="inputBox"
            placeholder="Add todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </>
                
        <button onClick={updateTodo} id = "popupUpdateTodoButton"><span >Update</span></button>
      
    </div>
  );
}

export default Popup;
