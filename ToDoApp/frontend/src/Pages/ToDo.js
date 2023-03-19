import React from "react";

const ToDo = () => {
  const [toDo, setToDo] = React.useState([]);
  const [text, setText] = React.useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [toDoId, setToDoId] = React.useState("");

  const addToDo = async (description, setText, setToDo) => {
    try {
      const body = { description };
      await fetch("http://localhost:8081/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setText("");
      getToDo(setToDo);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getToDo = async (setToDo) => {
    try {
      const response = await fetch("http://localhost:8081/todo", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setToDo(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateMode = (id, text) => {
    setText(text);
    setToDoId(id);
  };

  const updateToDo = async (
    id,
    description,
    setToDo,
    setText,
    setIsUpdating
  ) => {
    try {
      const body = { description };
      await fetch(`http://localhost:8081/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setText("");
      setIsUpdating(false);
      getToDo(setToDo);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/todo/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      getToDo(setToDo);
    } catch (error) {}
  };

  React.useEffect(() => {
    getToDo(setToDo);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />

          <button
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </button>
        </div>

        <div className="list">
          {toDo.map((content) => (
            <tr>
              <td>{content.id}</td>
              <td>{content.description}</td>
              <button
                onClick={() => {
                  updateMode(content.id, content.description);
                }}
              >
                Edit
              </button>
              <td>
                <button onClick={() => deleteTodo(content.id, setToDo)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
