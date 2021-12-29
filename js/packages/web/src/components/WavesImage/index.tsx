import React from "react";

export function WavesImage() {

  //<Box sx={{ maxHeight: { xs: 233, md: 167 }, maxWidth: { xs: 350, md: 250 } }}>
  //       <div className={`waves-image ${className || ""}`}>

  //
  // WAS:
  // <div className="waves-image">
  //   <img className="intersect" src="/img/intersect@1x.svg" alt="intersect@1x.svg" />
  //   <img className="intersect-1" src="/img/intersect-1@1x.svg" alt="intersect-1@1x.svg" />
  //   <img className="intersect-2" src="/img/intersect-2@1x.svg" alt="intersect-2@1x.svg" />
  // </div>
  //
  return (
   <div className="waves-image">
     <img className="intersect" src="/img/intersect@1x.svg" alt="intersect@1x.svg" />
     <img className="intersect-1" src="/img/intersect-1@1x.svg" alt="intersect-1@1x.svg" />
     <img className="intersect-2" src="/img/intersect-2@1x.svg" alt="intersect-2@1x.svg" />
   </div>
  );
}
