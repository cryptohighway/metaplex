import React from "react";
import { Card } from 'antd';

//
// Displays the basic types of NFTs supported.
//
export interface BrowseNFTTypesProps {  
    name: string;
    description: string;
    backgroundImageURL: string;
    iconImageURL: string;
    className?: string;
    small?: boolean;
  }
  
  const { Meta } = Card;
  
  export const BrowseNFTTypes = (props: BrowseNFTTypesProps) => {
  const {
      name,
      description,
      backgroundImageURL,
      iconImageURL,
      className,
      small
  } = props;

  const overlayImage = (
    <div className="browseNFTs-image-parent">
      <img className="browseNFTs-image-child1" src={backgroundImageURL} alt={name + ' image'} />
      <img className="browseNFTs-image-child2" src={iconImageURL} alt={name + ' icon'}/>
    </div>
  );

  const card = (
    <Card 
        hoverable={true}
        className={`art-card ${small ? 'small' : ''} ${className ?? ''}`}
        cover={overlayImage}
    >
        <Meta title={name} description={description} />
    </Card>
  );

  return ( card );
}
