import React, { Component, Fragment, useContext } from "react"
import PropTypes from 'prop-types'
import Context from '../context';

export default class Todo extends Component {
  static contextType = Context

  constructor(props) {
    super(props)
    console.log('constructor');
    //this.onClickHandler = this.onClickHandler.bind(this);//привязали функцию к контексту класса =
  }

  /*onClickHandler() {
    const { removeTodoMethod } = this.context
    const { todo } = this.props
    removeTodoMethod(todo.id)
  }*/

  onClickHandler = () => {
    const { removeTodoMethod } = this.context
    const { todo } = this.props
    removeTodoMethod(todo.id)
  }

  render() {
    const { todo } = this.props;

    const classes = []
  
    if (todo.completed) {
      classes.push('done')
    }
    //checked={todo.completed} если начальные значения комплитед не все фоллс, чтоб отображалось с самого начала как выполненное
    
    const styles = {
      li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
      },
      input: {
        marginRight: '1rem'
      }
    }
    return (
      <Fragment>
        <li style={styles.li}>
          <span className={classes.join(' ')}>
            {}
            <input
              checked={this.props.todo.completed}
              type="checkbox"
              onChange={() => this.props.onChangeMethod(this.props.todo.id)}
            />
            <strong>{this.props.index + 1}</strong>
            &nbsp;
            {this.props.todo.title}
          </span>


          <button className='rm' onClick={this.onClickHandler}>&times;</button>
        </li>
      </Fragment>
    )
  }
}
