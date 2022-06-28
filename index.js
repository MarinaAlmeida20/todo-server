const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json()); // req.body

// pool.connect();


const PORT = process.env.PORT;

// ROUTES//

// CREATE A TODO

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);

    // console.log(req.body); // { description: 'I need to clear my room' }
  } catch (err) {
    console.error(err.message);
  }
});

// GET ALL TODOS

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC");

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// GET A TODO

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(typeof id);

    if (!id) {
      return res.status(404).json("This is an incorrect entry!");
    }

    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [
      id,
    ]);

    
    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// UPDATE A TODO

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { description } = req.body;

    if (!id) {
        return res.status(404).json("This is an incorrect entry!");
      }

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Task updated")
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE A TODO

app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params

        if (!id) {
            return res.status(404).json("This is an incorrect entry!");
          }

        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);

        res.json(`Todo ${id} was deleted!`)

    } catch (err) {
        console.error(err.message)
    }
})

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
