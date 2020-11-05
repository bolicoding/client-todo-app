import React from "react";
import ReactDOM from "react-dom";

import "./style.css";
import TodoItem from "./todo-item";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: "",
      todos: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      todo: e.target.value,
    });
  };

  addTodo = (e) => {
    e.preventDefault();
    fetch("https://bm-flask-todo-api.herokuapp.com/api/create-todo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: this.state.todo,
        done: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState((prevState) => ({
          todos: [...prevState.todos, data],
          todo: "",
        }));
      });
  };

  deleteTodo = (id) => {
    fetch(`https://bm-flask-todo-api.herokuapp.com/api/delete-todo/${id}`, {
      method: "DELETE",
    }).then(
      this.setState((prevState) => ({
        todos: prevState.todos.filter((todo) => {
          return todo.id !== id;
        }),
      }))
    );
  };

  componentDidMount() {
    fetch("https://bm-flask-todo-api.herokuapp.com/api/get-all-todos")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          todos: data,
        })
      );
  }

  renderTodos = () => {
    return this.state.todos.map((todo) => {
      return (
        <TodoItem key={todo.id} todo={todo} deleteTodo={this.deleteTodo} />
      );
    });
  };

  render() {
    return (
      <div className="app">
        <h1>Todo List</h1>
        <form className="add todo" onSubmit={this.addTodo}>
          <input
            type="text"
            placeholder="add todo"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
