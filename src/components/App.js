import * as React from 'react';
import { Layout, Menu } from 'antd';
import {
	UserOutlined,
	UploadOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import SpriteEditor from './SpriteEditor';
import './App.css';

const { ipcRenderer } = window.require('electron');
const { Header, Content, Footer, Sider } = Layout;

function pad(o) {
	while (o.length < 2) {
		o = '0' + o;
	}
	return o;
}

function toHex(n) {
	return pad(n.toString(16));
}

function getHeader(buffer) {
	if (!(buffer[0] === 0x4E &&
		buffer[1] === 0x45 &&
		buffer[2] === 0x53 &&
		buffer[3] === 0x1A)) {
		throw 'invalid ROM header constant';
	}
	const header = {
		_data: buffer.slice(0),
		prgrom: buffer[4],
		chrrom: buffer[5],
		mapperLow: (buffer[6] & 0xF0) >> 4,
		ignoreMirror: !!(buffer[6] & 0x8 >> 3),
		hasTrainer: !!(buffer[6] & 0x4 >> 2),
		hasBatteryPrgRam: !!(buffer[6] & 0x2 >> 1),
		mirroring: (buffer[6] & 0x1) === 1 ? 'vertical' : 'horizontal',
		mapperHigh: (buffer[7] & 0xF0) >> 4,
		isNes2: (buffer[7] & 0xC >> 2) == 2,
		isPlayChoice: !!(buffer[7] & 0x2 >> 1),
		isVsUnisystem: !!(buffer[7] & 0x1)
	};

	// if it's a Nes 2.0 header
	if (header.isNes2) {
		// TODO
	}

	return header;
}

class App extends React.Component {
	state = {
		rombuffer: null
	}

	componentDidMount() {
		ipcRenderer.on('rombuffer', (evt, rombuffer) => {
			const iNes = {};
			let offset = 0;

			// get NES header
			const headerSize = 16;
			const header = getHeader(rombuffer.slice(0, headerSize));
			offset += headerSize;
			iNes.header = header;

			// TODO: trainer
			if (header.hasTrainer) {
				offset += 512;
			}

			// prg rom
			const prgromSize = 16384 * header.prgrom;
			iNes.prgrom = rombuffer.slice(offset, offset + prgromSize);
			offset += prgromSize;

			// chr rom
			const chrromSize = 8192 * header.chrrom;
			iNes.chrrom = rombuffer.slice(offset, offset + chrromSize);
			offset += chrromSize;

			// TODO: playchoice
			if (header.isPlayChoice) {
				offset += 8192;
			}

			console.log({ iNes, offset });

			// offset = 0;
			// const base = 0x1FA96;


			// // get dimensions of screen
			// const width = rombuffer[base + offset++];
			// const height = rombuffer[base + offset++];

			// // get pointers for each section of the room
			// const ptrSize = width * height * 2;
			// const ptrs = [];
			// for (let i = 0; i < ptrSize; i += 2) {
			// 	const low = toHex(rombuffer[base + offset + i]);
			// 	const high = toHex(rombuffer[base + offset + i + 1]);
			// 	ptrs.push(parseInt(`0x${high}${low}`, 16));
			// }
			// offset += ptrSize;

			// console.log({
			// 	width,
			// 	height,
			// 	ptrs: ptrs.map(p => p.toString(16))
			// });
		});
	}

	render() {
		return <Layout hasSider>
			<Sider
				style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
					top: 0,
					bottom: 0,
				}}
			>
				<div className="logo" />
				<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
					<Menu.Item key="1" icon={<UserOutlined />}>
						nav 1
					</Menu.Item>
					<Menu.Item key="2" icon={<VideoCameraOutlined />}>
						nav 2
					</Menu.Item>
					<Menu.Item key="3" icon={<UploadOutlined />}>
						nav 3
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className="site-layout" style={{ marginLeft: 200 }}>
				<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
					<div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
						<SpriteEditor />
					</div>
				</Content>
			</Layout>
		</Layout>;
	}
}

export default App;