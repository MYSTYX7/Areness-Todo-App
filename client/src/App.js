// app.js
import { useEffect, useState } from "react";
const serverURL = "http://localhost:8000";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(serverURL + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    try {
      const response = await fetch(serverURL + "/todo/complete/" + id);
      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to complete todo. Server response:", data);
        return;
      }

      setTodos((todos) =>
        todos.map((todo) => {
          if (
            todo._id === data._id &&
            data.complete !== undefined &&
            todo !== null
          ) {
            todo.complete = data.complete;
          }

          return todo;
        })
      );
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  const addTodo = async () => {
    try {
      const data = await fetch(serverURL + "/todo/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTodo,
        }),
      }).then((res) => res.json());

      setTodos([...todos, data]);

      setPopupActive(false);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id, event) => {
    event.stopPropagation();
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (!confirmed) {
        return;
      }

      const data = await fetch(serverURL + "/todo/delete/" + id, {
        method: "DELETE",
      }).then((res) => res.json());

      setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdateTodo = async () => {
    try {
      if (editingTodo) {
        const response = await fetch(
          serverURL + "/todo/update/" + editingTodo._id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: newTodo,
            }),
          }
        );

        if (!response.ok) {
          console.error(
            "Failed to update todo. Server response:",
            await response.json()
          );
          return;
        }

        setTodos((todos) =>
          todos.map((todo) =>
            todo._id === editingTodo._id ? { ...todo, text: newTodo } : todo
          )
        );

        setEditingTodo(null);
      } else {
        addTodo();
      }

      setPopupActive(false);
      setNewTodo("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const startEditingTodo = (todo, event) => {
    event.stopPropagation();

    setEditingTodo(todo);
    setNewTodo(todo.text);
    setPopupActive(true);
  };

  return (
    <div className="App">
      <h1>MERN Todo App</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              className={"todo" + (todo.complete ? " is-complete" : "")}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"></div>

              <div className="text">{todo.text}</div>
              <div
                className="edit-todo"
                onClick={(event) => startEditingTodo(todo, event)}
              >
                <button>Update Task</button>
              </div>

              <div
                className="delete-todo"
                onClick={(event) => deleteTodo(todo._id, event)}
              >
                <button>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>You have no tasks currently</p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>{editingTodo ? "Update Task" : "Add Task"}</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={handleUpdateTodo}>
              {editingTodo ? "Update" : "Add"}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
