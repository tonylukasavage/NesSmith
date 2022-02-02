import React from 'react';

const BASE_WIDTH = 256;
const BASE_HEIGHT = 240;

class SpriteEditor extends React.Component {
	state = {
		zoom: 1,
		width: BASE_WIDTH,
		height: BASE_HEIGHT
	};

	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	render() {
		return <canvas ref={this.canvasRef} width={this.state.zoom * BASE_WIDTH}
			height={this.state.zoom * BASE_HEIGHT}></canvas>;
	}

	componentDidMount() {
		this.draw();
	}

	componentDidUpdate() {
		this.draw();
	}

	draw() {
		const canvas = this.canvasRef.current;
		console.log(canvas.height);
		const ctx = canvas.getContext('2d');
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}

export default SpriteEditor;