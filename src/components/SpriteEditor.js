import React from 'react';
const { ipcRenderer } = window.require('electron');

const BASE_WIDTH = 256;
const BASE_HEIGHT = 240;

class SpriteEditor extends React.Component {
	state = {
		rom: null,
		romData: null,
		zoom: 2,
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


		let pos = romData.chrrom.pos + 16;
		const palette = [
			[0, 0, 0, 0x0],
			[0xFF, 0, 0, 0xFF],
			[0, 0xFF, 0, 0xFF],
			[0, 0, 0xFF, 0xFF]
		];

		const tile = ctx.createImageData(8, 8);
		let offset = 0;
		for (let y = 0; y < 8; y++) {
			const byte1 = rom[pos + y];
			const byte2 = rom[pos + y + 8];

			for (let x = 0; x < 8; x++) {
				const bit = Math.pow(2, 7 - x);
				const shift = 7 - x;
				const val = ((byte1 & bit) >> shift) + (2 * ((byte2 & bit) >> shift));
				tile.data.set(palette[val], offset);
				offset += 4;
			}
		}

		console.log(tile);
		ctx.putImageData(tile, 0, 0);
	}
}

export default SpriteEditor;