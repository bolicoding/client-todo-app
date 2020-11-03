import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: "",
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
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
