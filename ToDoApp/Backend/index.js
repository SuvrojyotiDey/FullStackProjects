const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes

//create a todo
app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) Returning *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});
// get all todo
app.get("/todo", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
    res.json(allTodo.rows);
  } catch (error) {
    console.log(error.message);
  }
});
// get todo by id
app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTodo = await pool.query("SELECT * FROM todo WHERE id=$1", [id]);
    res.json(allTodo.rows);
  } catch (error) {
    console.log(error.message);
  }
});
// update a todo
app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const allTodo = await pool.query(
      "UPDATE todo SET description =$1 WHERE ID=$2",
      [description, id]
    );
    res.json(`${id} was updated.`);
  } catch (error) {
    console.log(error.message);
  }
});
// delete a todo
app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTodo = await pool.query("DELETE FROM todo WHERE ID=$1", [id]);
    res.json(`${id} was deleted.`);
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(8081, () => console.log("server listening to port 8081"));
