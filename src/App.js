import * as React from 'react';
import { Button } from 'antd';
import './App.css';

class App extends React.Component {
	render() {
		return <div><h2>Hello from React!!</h2><Button type="primary">Button</Button></div>;
	}
}

export default App;

// function render() {
// 	ReactDOM.render(<h2>Hello from React!!</h2>, document.body);
// }

// render();