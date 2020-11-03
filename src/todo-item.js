import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="todo-item">
        <input type="checkbox" />
        <p>{this.props.todo.title}</p>
      </div>
    );
  }
}

export default TodoItem;
