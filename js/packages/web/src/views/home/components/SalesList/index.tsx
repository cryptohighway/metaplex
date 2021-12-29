import { useWallet } from '@solana/wallet-adapter-react';
import { Col, Layout, Row, Tabs } from 'antd';
import React, { useState } from 'react';
import Masonry from 'react-masonry-css';

import { useMeta } from '../../../../contexts';
import { CardLoader } from '../../../../components/MyLoader';
import { Banner } from '../../../../components/Banner';
import { HowToBuyModal } from '../../../../components/HowToBuyModal';
import { BrowseNFTTypes } from '../../../../components/BrowseNFTTypes';
import { Link } from 'react-router-dom';

import { useSales } from './hooks/useSales';
import SaleCard from './components/SaleCard';

const { TabPane } = Tabs;
const { Content } = Layout;

export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};


export const SalesListView = () => {
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { isLoading } = useMeta();
  const { connected } = useWallet();
  const { sales, hasResaleAuctions } = useSales(activeKey);

  return (
    <>
      <span style={{margin: 0, marginTop: 0, alignItems: 'left'}}  >
          <div style={{ alignItems: 'left', fontWeight: 500, fontSize: '28px', color: '#ffffff', lineHeight: '28px', padding: '1px 7px 1px 1px;' }}>Purchase Our Content</div>
          <div style={{ fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '16px', padding: '1px 1px 1px 1px;'}}>Search the Tsunami marketplace to find then purchase the dataset or algorithm you need</div>
      </span>
      <Layout>
        <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col style={{ width: '100%', marginTop: 32 }}>
            <Row>
              <Tabs
                activeKey={activeKey}
                onTabClick={key => setActiveKey(key as LiveAuctionViewState)}
              >
                <TabPane
                  tab={
                    <>
                      <span className="live"></span> Live
                    </>
                  }
                  key={LiveAuctionViewState.All}
                ></TabPane>
                {hasResaleAuctions && (
                  <TabPane
                    tab="Secondary Marketplace"
                    key={LiveAuctionViewState.Resale}
                  ></TabPane>
                )}
                <TabPane tab="Ended" key={LiveAuctionViewState.Ended}></TabPane>
                {connected && (
                  <TabPane
                    tab="Participated"
                    key={LiveAuctionViewState.Participated}
                  ></TabPane>
                )}
              </Tabs>
            </Row>
            <Row>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
              >
                <BrowseNFTTypes name='Algorithm NFTs' description='3k NFTs | [volume] daily' backgroundImageURL='/img/background-Algorithm.png' iconImageURL='/img/icon-Algorithm.png' />
                <BrowseNFTTypes name='Audio NFTs' description='3k NFTs | [volume] daily' backgroundImageURL='/img/background-Audio.png' iconImageURL='/img/icon-Audio.png' />
                <BrowseNFTTypes name='Data NFTs' description='3k NFTs | [volume] daily' backgroundImageURL='/img/background-Data.png' iconImageURL='/img/icon-Data.png' />
                <BrowseNFTTypes name='Gaming NFTs' description='3k NFTs | [volume] daily' backgroundImageURL='/img/background-Gaming.png' iconImageURL='/img/icon-Gaming.png' />
                <BrowseNFTTypes name='Subscription NFTs' description='3k NFTs | [volume] daily' backgroundImageURL='/img/background-Subscription.png' iconImageURL='/img/icon-Subscription.png' />
                <Link to={`/nftjpegs`} key={'nftjpegs'}>
                  <BrowseNFTTypes name='JPEG NFTs' description='3k NFTs | [volume] daily' backgroundImageURL='/img/background-JPEG.png' iconImageURL='/img/icon-JPEG.png' />
                </Link>
                <BrowseNFTTypes name='Real Estate NFTs' description='3k NFTs | [volume] daily' backgroundImageURL='/img/background-RealEstate.png' iconImageURL='/img/icon-RealEstate.png' />
                {isLoading &&
                  [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
                {!isLoading && sales.length > 0 &&
                  sales.map((sale, idx) => <SaleCard sale={sale} key={idx} />)}
              </Masonry>
            </Row>
          </Col>
        </Content>
      </Layout>
    </>
  );
};
