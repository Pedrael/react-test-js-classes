import React, { Component, Fragment, useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";

export default class Todo extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    let useless = "";
    //this.removeTodoHandler = this.removeTodoHandler.bind(this);//привязали функцию к контексту класса =
  }

  /*removeTodoHandler() {
    const { removeTodoMethod } = this.context
    const { todo } = this.props
    removeTodoMethod(todo.id)
  }*/

  removeTodoHandler = () => {
    const { removeTodoMethod } = this.context;
    const { todo } = this.props;
    removeTodoMethod(todo.id);
  };

  render() {
    const { todo } = this.props;
    const { toggleTodo } = this.context;

    const classes = [];

    if (todo.completed) {
      classes.push("done");
    }

    const styles = {
      li: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: ".5rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: ".5rem",
      },
      input: {
        marginRight: "1rem",
      },
    };

    return (
      <Fragment>
        <li style={styles.li}>
          <span className={classes.join(" ")}>
            <input
              checked={this.props.todo.completed}
              type="checkbox"
              onChange={toggleTodo(todo.id, !todo.completed)}
            />
            <strong>{this.props.index + 1}</strong>
            &nbsp;
            {this.props.todo.title}
          </span>

          <button className="rm" onClick={this.removeTodoHandler}>
            &times;
          </button>
        </li>
      </Fragment>
    );
  }
}
