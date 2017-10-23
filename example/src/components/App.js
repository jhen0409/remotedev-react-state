import React from 'react'
import Header from './Header'
import MainSection from './MainSection'

if (
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__.open
) {
  window.__REDUX_DEVTOOLS_EXTENSION__.open()
}

class App extends React.Component {
  state = {
    todos: [
      {
        id: 0,
        completed: false,
        text: 'TodoMVC Example'
      }
    ]
  }

  componentWillMount() {
    require('remotedev-react-state')(this, {
      name: 'App component',
      actionName: state => `State change (todo count: ${state.todos.length})`
    })
  }

  addTodo = text => {
    const todos = [
      {
        id:
          this.state.todos.reduce(
            (maxId, todo) => Math.max(todo.id, maxId),
            -1
          ) + 1,
        completed: false,
        text: text
      },
      ...this.state.todos
    ]
    this.setState({ todos })
  }

  deleteTodo = id =>
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) })

  editTodo = (id, text) =>
    this.setState({
      todos: this.state.todos.map(
        todo => (todo.id === id ? { ...todo, text } : todo)
      )
    })

  completeTodo = id =>
    this.setState({
      todos: this.state.todos.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    })

  completeAll = () => {
    const areAllMarked = this.state.todos.every(todo => todo.completed)
    this.setState({
      todos: this.state.todos.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))
    })
  }

  clearCompleted = () =>
    this.setState({
      todos: this.state.todos.filter(todo => todo.completed === false)
    })

  actions = {
    addTodo: this.addTodo,
    deleteTodo: this.deleteTodo,
    editTodo: this.editTodo,
    completeTodo: this.completeTodo,
    completeAll: this.completeAll,
    clearCompleted: this.clearCompleted
  }

  render() {
    return (
      <div>
        <Header addTodo={this.addTodo} />
        <MainSection todos={this.state.todos} actions={this.actions} />
      </div>
    )
  }
}

export default App
