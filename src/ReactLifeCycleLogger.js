import React, {Component} from 'react'

/**
 * Lifecycle logger. Log lifecycles in your React components. Easily spot deprecated methods.
 * 
 * Useage: ReactLifeCycleLogger(YourComponent);
 *  for a child component use : 
 *  const WrappedChild = ReactLogger(ChildComponent);
 *  <WrappedChild> ..... </WrappedChild>
 */

export default (Wrapped) => {

  let methods = ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount', 'getDerivedStateFromProps', 'getSnapshotBeforeUpdate', 'getSnapshotAfterUpdate', 'UNSAFE_componentWillMount', 'UNSAFE_componentWillReceiveProps', 'UNSAFE_componentWillUpdate'];

  let oldMethods = {}

  methods.forEach( (method) => {
    if (Wrapped.prototype[method]) {
      // save original so it can be called after we've overridden
      oldMethods[method] = Wrapped.prototype[method]
    }

    Wrapped.prototype[method] = function () {
      console.groupCollapsed(`${Wrapped.displayName} ${method}`);

      let oldFunction = oldMethods[method];

      if (method === 'componentWillMount' || method === 'UNSAFE_componentWillMount') {
        console.error(`DEPRECATED. For init state move to property init or constructor. 
        For fetching external data move to componentDidMount.
        For adding event listeners move to componentDidMount.`);
      }

      if (method === 'componentDidMount') {
        console.log(`If fetching external data on prop change you are advised to use getDerivedStateFromProps. Invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
        This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in componentWillUnmount().
        You may call setState() immediately in componentDidMount(). It will trigger an extra rendering, but it will happen before the browser updates the screen`);
      }

      if (method === 'componentWillReceiveProps' || 'shouldComponentUpdate'|| 'componentWillUpdate') {
        console.log('nextProps', arguments[0])
      }

      if (method === 'componentWillReceiveProps' || method === 'UNSAFE_componentWillReceiveProps') {
        console.error(`DEPRECATED. If updating state based on props, use getDerivedStateFromProps
        If utilising side effects on property change, move to componentDidUpdate
        If fetchiong external data in prop change`); 
      }

      if (method === 'componentWillUpdate' || method === 'UNSAFE_componentWillUpdate') {
        console.error(`DEPRECATED. Use getSnapshotBeforeUpdate with componentDidUpdate.
        If utilising side effects on property change, move to componentDidUpdate`); 
      }

      if (method === 'shouldComponentUpdate') {
        console.log('shouldComponentUpdate is best used as a performance optimization, not to ensure correctness of derived state.  let React know if a component’s output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior');
      }

      if (method === 'componentDidUpdate') {
        console.log('prevProps', arguments[0]);
        console.log('prevState', arguments[1]);
        console.log(' - invoked immediately after updating occurs. This method is not called for the initial render. Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed)');
      }

      if (method === 'getDerivedStateFromProps') {
        console.log('prevProps', arguments[0]);
        console.log('prevState', arguments[1]);
        console.log(' -is invoked after a component is instantiated as well as before it is re-rendered. It can return an object to update state, or null to indicate that the new props do not require any state updates. enables a component to update its internal state as the result of changes in props. derived state should be used sparingly. typical antipatterns:  unconditionally updating state from props or updating state whenever props and state don’t match ');
      }
      if (method === 'getSnapshotBeforeUpdate') {
        console.log('prevProps', arguments[0]);
        console.log('prevState', arguments[1]);
        console.log('getSnapshotBeforeUpdate -    is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle will be passed as a parameter to componentDidUpdate()');
      }
      
      console.groupEnd()

      // monkey patch the React lifecycle methods
      if (oldFunction) {
        oldFunction = oldFunction.bind(this);
        oldFunction(...arguments); // call the original function
      }

      if (method === 'shouldComponentUpdate' && typeof oldFunction === 'undefined') {
        return true
      }
    }
  })


  Wrapped.prototype.setState = function (partialState, callback) {
    console.groupCollapsed(`${Wrapped.displayName} setState`)
    console.log('partialState', partialState)
    console.log('callback', callback)
    console.groupEnd()
    this.updater.enqueueSetState(this, partialState, callback, 'setState')
  }


  return class extends Component {

    static displayName = "Logger"

    render() {
      return (
        <Wrapped
          {...this.props}
        />
      )
    }
  }

}

