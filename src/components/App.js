import * as React from 'react';
import { Layout, Menu } from 'antd';
import {
	UserOutlined,
	UploadOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import SpriteEditor from './SpriteEditor';
import './App.css';

const { Content, Sider } = Layout;

class App extends React.Component {
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