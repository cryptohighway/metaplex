import React from 'react';
import {
    //Row,
    //Col,
    Divider,
    //Layout,
    //Tag,
    //Button,
    //Skeleton,
    //List,
    Card,
    Avatar,
    Typography
  } from 'antd';
import { HeartOutlined, EllipsisOutlined, CloudUploadOutlined } from '@ant-design/icons';
import Masonry from 'react-masonry-css';

const { Meta } = Card;

export interface INFTDataProps {  
  nftData: any;
}

const breakpointColumnsObj = {
  default: 4,
};

//
// Displays a single NFT in a standard Card.
//
export const NFTCard = (props: INFTDataProps) => {
  const nftData = props.nftData; 
  //const entireCardStyle = {
  //  width: '285px',
  //  box-shadow: '0px 0px 24px rgba(26, 26, 26, 0.12)',
  //  border-radius: '20px',
  //  padding: '5px 5px',
  //  background-color: '#49527a'
  //};

  //           description={<Typography style={{fontSize: 12}}>{nftData.metadataExternal["description"]}</Typography>}        

    // console.log(nftData);
  return (
      <Card
        style={{
          width: 185, 
          padding: "5px 5px",
          backgroundColor: "#62688F",
          borderRadius: "8px",
          boxShadow: "0px 0px 24px rgba(26, 26, 26, 0.12)",
          border: "1px solid powderblue",
          borderBlockColor: "#83d6fe",       
          marginTop: "15px"   
        }}
        size='small'
        cover={
          <img style={{objectFit: "cover", borderRadius: "8px"}}
            alt={nftData.ID}
            src={nftData.metadataExternal["image"]}
          />
        }
        headStyle={{backgroundColor: "#62688F"}}
        bodyStyle={{backgroundColor: "#62688F"}}
      >
        <Meta className="nft-card"
          title={<Typography style={{fontSize: 14}}>{nftData.ID}</Typography>}
        />    
        <Divider style={{color: "#3dd0da", margin: 5}}/>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          <CloudUploadOutlined />
          <HeartOutlined />
          <EllipsisOutlined />
          <img src="/img/chain-sol-light.png" />
        </Masonry>
      </Card>
  );
};

export default NFTCard;