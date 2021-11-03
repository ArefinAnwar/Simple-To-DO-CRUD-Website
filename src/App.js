import logo from "./logo.svg";
import "./App.css";
import React from "react";
import TodoCard from "./components/todoCard";
import firebase from "firebase/app"; // Firebase Library
import "./components/Firebase";

function App() {
  React.useEffect(() => {
    getTodos();
  }, []);

  const saveTodo = (input) => {
    var todo = {
      item: input,
    };
    const saveToFirebase = firebase.firestore();
    saveToFirebase
      .collection("todos")
      .add({
        todo,
      })
      .then((snapshot) => {
        todo.id = snapshot.id;
        snapshot.set(todo);
      });
  };
  const [todos, setTodos] = React.useState([]);
  const getTodos = () => {
    const getFromFirebase = firebase.firestore().collection("todos");
    getFromFirebase.onSnapshot((querySnapShot) => {
      const saveFirebaseTodos = [];
      querySnapShot.forEach((doc) => {
        saveFirebaseTodos.push(doc.data());
      });
      setTodos(saveFirebaseTodos);
    });
  };
  //saveTodo("Test is succesful");
  const [input, setInput] = React.useState("");

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="heading">To-Do!</h1>
        <div id="inputBar">
          <input
            id="inputTextbox"
            placeholder="Add todo..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button id="addTaskButton" onClick={() => saveTodo(input)}>
            {/* <h1 id="addTaskButtonText">+</h1> */}
          </button>
        </div>
        <div id="todoContainer" style={{ overflowY: "scroll" }}>
          {todos.map((todo) => (
            <TodoCard id={todo.id} text={todo.item} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
