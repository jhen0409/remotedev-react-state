import remotedev from 'remotedev'

function getActionName(actionName, state) {
  if (typeof actionName === 'function') {
    return actionName(state)
  }
  return actionName
}

function connectToDevTools(instance, options = {}) {
  if (!instance) {
    console.error(
      'Please provide react instance as argument of `remotedev-react-state`.'
    )
  }
  options.name =
    options.name ||
    (instance.constructor &&
      `Component - ${instance.constructor.name || 'Unknown'}`)

  const devtools = remotedev.connectViaExtension(options)
  const initialState = Object.assign({}, instance.state)

  devtools.init(initialState)

  const originSetState = instance.setState
  instance.setState = function setState(state, callback) {
    return originSetState.call(this, state, (...args) => {
      devtools.send(
        {
          type: getActionName(options.actionName, this.state) || 'State change',
          state: this.state
        },
        this.state
      )
      if (callback) {
        callback.apply(this, args)
      }
    })
  }

  const unsubscribe = devtools.subscribe(message => {
    if (message.type !== 'DISPATCH') return
    switch (message.payload.type) {
      case 'COMMIT':
        return devtools.init(remotedev.extractState(message))
      case 'RESET':
        devtools.init(initialState)
        return originSetState.call(instance, initialState)
      case 'ROLLBACK':
        return devtools.init(remotedev.extractState(message))
      case 'JUMP_TO_STATE':
      case 'JUMP_TO_ACTION':
        originSetState.call(instance, remotedev.extractState(message))
    }
  })

  const originCWUM = instance.componentWillUnMount
  instance.componentWillUnMount = function() {
    unsubscribe()
    originCWUM.call(instance)
  }
}

/**
 * Create `connectToDevTools` function can be used for component `ref` prop.
 * 
 * Example:
 *   <App ref={connectToDevTools.ref(options)} />
 */
connectToDevTools.ref = options => ref => connectToDevTools(ref, options)

module.exports = connectToDevTools
