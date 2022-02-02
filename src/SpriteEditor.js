import React from 'react';

const BASE_WIDTH = 256;
const BASE_HEIGHT = 240;

class SpriteEditor extends React.Component {
	state = {
		width: BASE_WIDTH,
		height: BASE_HEIGHT
	};

	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	render() {
		return <canvas id="sprite-editor" ref={this.canvasRef} width={this.props.zoom * BASE_WIDTH}
			height={this.props.zoom * BASE_HEIGHT}></canvas>;
	}

	componentDidMount() {
		this.draw();
	}

	componentDidUpdate() {
		this.draw();
	}

	draw() {
		const canvas = this.canvasRef.current;
		const ctx = canvas.getContext('2d');
		ctx.fillRect(25, 25, 100, 100);
		ctx.clearRect(45, 45, 60, 60);
		ctx.strokeRect(50, 50, 50, 50);
	}
}

export default SpriteEditor;