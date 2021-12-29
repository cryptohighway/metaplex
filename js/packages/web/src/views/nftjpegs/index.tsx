import React from 'react';
import {
    //Row,
    //Col,
    //Divider,
    Descriptions,
    Layout,
    //Tag,
    //Button,
    //Skeleton,
    //List,
    Typography
  } from 'antd';
import Masonry from 'react-masonry-css';
import { bbcNFTList } from './bbcNFTList';
import { dapeNFTList } from './dapeNFTList';
import NFTCard from '../../components/NFTCard';
import { HowToBuyModal } from '../../components/HowToBuyModal';

const { Content } = Layout;

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  //const testList = JSON.parse(testJSONList);
  //const testList = testJSONList;
  export interface INFTCollectionViewProps {  
    title: string;
    website: string;
    nftJSONData: any;
  }
  
//
// Displays a single NFT in a standard Card.
//
export const NFTCollectionView = (props: INFTCollectionViewProps) => {
  const titleList = props.title;
  const website = props.website;
  const nftJPEGList = props.nftJSONData;
  const descriptionStyle = {
    color: "#000000",
    backgroundColor: "#8A92B2",
    padding: "0",
    borderRadius: "8px"
  }
  const descriptionItemStyle = {
    color: "#000000",
    backgroundColor: "#8A92B2",
    padding: "0",
    margin: "0",
    border: "10px"
  }

  return (
    <Content>   
      <Descriptions style={descriptionStyle} title="NFT Collection Info">
        <Descriptions.Item label="Name" style={descriptionItemStyle} >{titleList}</Descriptions.Item>
        <Descriptions.Item label="Website" style={descriptionItemStyle}>{website}</Descriptions.Item>
        <Descriptions.Item label="Symbol" style={descriptionItemStyle}>{nftJPEGList[0].metadataExternal["symbol"]}</Descriptions.Item>
        <Descriptions.Item span={3} label="Description" style={descriptionItemStyle}>{nftJPEGList[0].metadataExternal["description"]}</Descriptions.Item>
        <Descriptions.Item span={3} label="Mint Address" style={descriptionItemStyle}>{nftJPEGList[0].metadataOnchain["mint"]}</Descriptions.Item>
      </Descriptions>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {/*Hello {nftJPEGList[0].ID}!*/}
        {/*Number of elements: {Object.keys(nftJPEGList).length}*/}
        {nftJPEGList.map((nftJPEG, idx) => <NFTCard nftData={nftJPEG} key={idx} />)}
      </Masonry>      
    </Content>
    );
  };
      
export const NFTJPEGsView = () => {
  return (
    <Content>   
      <h2>All NFT Images</h2>       
      <NFTCollectionView title={bbcNFTList[0].ID} 
                          website={bbcNFTList[0].metadataExternal["external_url"]}
                          nftJSONData={bbcNFTList} />
      <NFTCollectionView title={dapeNFTList[0].ID} 
                          website={dapeNFTList[0].metadataExternal["external_url"]}
                          nftJSONData={dapeNFTList} />         
    </Content>
  );
};  
  
export default NFTJPEGsView;