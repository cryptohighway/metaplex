import React from 'react';
import { Layout } from 'antd';

import { AppBar } from '../AppBar';
import { WavesImage } from '../WavesImage';
import { Footer } from '../Footer';

const { Header, Content } = Layout;

export const AppLayout = React.memo((props: any) => {
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
        <WavesImage />
        <Layout id={'width-layout'}>
          <Content
            style={{
              overflow: 'scroll',
              padding: '30px 48px ',
            }}
          >
            <div className="directionsText">
              <div className="directionsTitle">Purchase Content</div>
              <div className="directionsSubTitle">Search the Tsunami marketplace to find then purchase the dataset or algorithm you need</div>
            </div>
            {props.children}
          </Content>
        </Layout>
        <Footer />
      </Layout>
    </>
  );
});
