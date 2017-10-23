# remotedev-react-state [![Build Status](https://travis-ci.org/jhen0409/remotedev-react-state.svg?branch=master)](https://travis-ci.org/jhen0409/remotedev-react-state) [![NPM version](http://img.shields.io/npm/v/remotedev-react-state.svg?style=flat)](https://www.npmjs.com/package/remotedev-react-state)

Inspecting / time travelling state changes of React component on [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension) or [React Native Debugger](https://github.com/jhen0409/react-native-debugger), inspired by the article - [Redux DevTools without Redux](https://medium.com/@zalmoxis/redux-devtools-without-redux-or-how-to-have-a-predictable-state-with-any-architecture-61c5f5a7716f), make it as simple util.

## Usage

```js
import React from 'react'
import connectToDevTools from 'remotedev-react-state'

class App extends React.Component {
  state = { count: 0 }

  componentWillMount() {
    // Connect to devtools after setup initial state
    connectToDevTools(this/*, options */)
  }

  ...
}
```

See [the example](example/src/components/App.js#L24-L27).

#### connectToDevTools(instance, options)

* `instance` - A react instance, you could get `this` in component lifecycle or by `ref`.
* `options` - Exposed options used for [connect API](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#options) of redux-devtools-extension. We have specific options:
  - `name`: String - Name of devtools instance, `Component - {display name}` by default.
  - `actionName`: String | Function - The action name will be displayed on devtools, you could use `function(state)` for return action name. `State change` by default.

#### connectToDevTools.ref(options)

Create `connectToDevTools` function can be used for component `ref` prop.

Example:

```js
<App ref={connectToDevTools.ref(/* options */)} />
```

If you haven't `redux-devtools-extension` on your environment (Any react renderer that not on Chrome/Firefox/Electron/React Native Debugger), it will use the remote API of [remotedev](https://github.com/zalmoxisus/remotedev#communicate-via-local-server).

## TODO

- [ ] Remove devtools instance when component unmount

## License

[MIT](LICENSE.md)
