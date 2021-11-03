import React from "react";
import "./todoCard.css";
import "./Firebase";
import firebase from "firebase/app";
import Popup from "./popup";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function TodoCard(props) {
  const deleteTodo = () => {
    const deleteFromFirebase = firebase.firestore().collection("todos");
    deleteFromFirebase.doc(props.id).delete();
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="mainCon">
      <h2 id="todoText">{props.text}</h2>
      <button onClick={deleteTodo} id = "deleteTodoIcon"><DeleteForeverIcon id  = "d" /></button>
      <button onClick={togglePopup} id = "editTodoIcon"><EditIcon id = "e" /></button>
      
      {isOpen && <Popup handleClose={togglePopup} id={props.id} />}
    </div>
  );
}

//export default TodoCard;
