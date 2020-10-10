import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import Context from "../context";

export default class TodoListClass extends Component {
  state = {
    flag: false
  }
  constructor(props) {
    super(props)
    this.setState({flag: true})
  }
  render() {
    const styles = {
      ul: {
        listStyle: "none",
        margin: 0,
        padding: 0,
      },
    };
    return (
      <Fragment>
        <ul style={styles.ul}>
          {this.props.todos.map((todo, index) => {
            return (
              <TodoItem
                todo={todo}
                key={todo.id}
                index={index}
              />
            );
          })}
          <Context.Consumer>
            {(value) => {
              console.log(value);
            }}
          </Context.Consumer>
        </ul>
      </Fragment>
    )
  }

}
