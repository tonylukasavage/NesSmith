import React from 'react';
const { ipcRenderer } = window.require('electron');

const BASE_WIDTH = 256;
const BASE_HEIGHT = 240;

class SpriteEditor extends React.Component {
	state = {
		rom: null,
		romData: null,
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
		ipcRenderer.on('romload', (evt, data) => {
			const { rom, romData } = data;
			console.log(rom);
			console.log(romData);
			this.setState({ rom, romData });
		});
		this.draw();
	}

	componentDidUpdate() {
		this.draw();
	}

	draw() {
		const canvas = this.canvasRef.current;
		const ctx = canvas.getContext('2d');
		const { rom, romData } = this.state;

		if (!rom || !romData) {
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			return;
		}

		const tile = []
		let pos = romData.chrrom.pos + 16;
		for (let x = 0; x < 8; x++) {
			const byte1 = rom[pos + x];
			const byte2 = rom[pos + x + 8];

			for (let b = 7; i >= 0; b--) {
				tile[y][x] = byte1 >> b
			}

			const pixel = (byte1 >> 7) | (byte2 >> 6 & 0x10);
			console.log(pixel);
		}
	}
}

export default SpriteEditor;