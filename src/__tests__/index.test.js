import React from 'react'
import ReactDOM from 'react-dom'
import connectToDevTools from '..'

// Mock redux-devtools-extension API
const init = jest.fn()
const send = jest.fn()
const subscribe = jest.fn(() => jest.fn())
window.devToolsExtension = {
  connect: jest.fn(() => ({
    init,
    send,
    subscribe
  }))
}

it('renders without crashing', () => {
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = { count: 0 }
    }
    componentWillMount() {
      connectToDevTools(this, {
        name: 'Component: App',
        actionName: state => `State change (count: ${state.count})`
      })
    }
    render() {
      return <div>${this.state.count}</div>
    }
  }
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)

  expect(window.devToolsExtension.connect).toHaveBeenCalled()
  expect(init).toHaveBeenCalledWith({ count: 0 })
  expect(subscribe).toHaveBeenCalled()
})
