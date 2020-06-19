import React from "react";
import { Carousel } from "antd";

function ImageSilder(porps) {
  return (
    <div>
      <Carousel autoplay>
        {porps.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", maxHeight: "150px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSilder;
