import React from 'react'
import ReactDOM from 'react-dom'

import ReactLifeCycleLogger from './ReactLifeCycleLogger';
import ParentComponent from './components/ParentComponent';

ReactDOM.render(<ParentComponent />, document.getElementById('root'));

ReactLifeCycleLogger(ParentComponent);