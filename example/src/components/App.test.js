import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Mock redux-devtools-extension API
const init = jest.fn()
const send = jest.fn()
const subscribe = jest.fn(() => jest.fn())
window.__REDUX_DEVTOOLS_EXTENSION__ = window.devToolsExtension = {
  connect: jest.fn(() => ({
    init,
    send,
    subscribe
  }))
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
