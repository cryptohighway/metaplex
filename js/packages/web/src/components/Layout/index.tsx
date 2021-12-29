import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';

import { AppBar } from '../AppBar';
import { WavesImage } from '../WavesImage';
import { Footer } from '../Footer';

import { useWallet } from '@solana/wallet-adapter-react';

const { Header, Sider, Content } = Layout;

export const AppLayout = React.memo((props: any) => {
  const { connected } = useWallet();
  return (
    <>
      <Layout id={'main-layout'}>
        <span id={'main-bg'}></span>
        <span id={'bg-gradient'}></span>
        <span id={'static-header-gradient'}></span>
        <span id={'static-end-gradient'}></span>
        <Header className="App-Bar">
          <AppBar />
        </Header>
        <Layout id={'width-layout'}>
        <Sider className="tsunami-sidebar">
            <Menu className="tsunami-sidebar-menu">
              <Menu.Item key={'explore'}>
                <Link to={`/`} key={'explore'}>
                  <Button className="app-btn">Explore</Button>
                </Link>
              </Menu.Item>
              <Menu.Item key={'artwork'}>
                <Link to={`/artworks`} key={'artwork'}>
                  <Button className="app-btn">{connected ? 'My Items' : 'Artwork'}</Button>
                </Link>
              </Menu.Item>
              <Menu.Item key={'artists'}>
                <Link to={`/artists`} key={'artists'}>
                  <Button className="app-btn">Creators</Button>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content 
            style={{
              overflow: 'scroll'
            }} >
            <WavesImage />
          <Content
            style={{
              overflow: 'scroll',
              padding: '30px 48px ',
            }}
          >
            {props.children}
          </Content>
          </Content>
        </Layout>
        <Footer />
      </Layout>
    </>
  );
});
