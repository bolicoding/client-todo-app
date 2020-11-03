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
  };

  componentDidMount() {
    fetch("http://localhost:5000/api/get-all-todos")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          todos: data,
        })
      );
  }

  renderTodos = () => {
    return this.state.todos.map((todo) => {
      return <TodoItem key={todo.id} todo={todo} />;
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
