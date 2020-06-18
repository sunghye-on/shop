import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import { FaAlignCenter } from "react-icons/fa";
import axios from "axios";
// import { response } from "express";

export function FileUpload() {
  // 업로드하는 이미지들을 잠시 저장한 state
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/fomr-data" },
    };
    formData.append("file", files[0]);

    // formData와 config를 같이 주지 않으면 에러가 난다.
    axios
      .post("/api/product/image", formData, config)
      // 정보를 보내주고 돌아온 정보가 response안에 있다.
      .then((response) => {
        if (response.data.success) {
          // 파일 저장 성공시 실행
          console.log("data" + response.data);
          setImages([...Images, response.data.filePath]);
        } else {
          alert("파일저장 실패");
        }
      });
  };

  const deleteHandler = (img) => {
    const currentIndex = Images.indexOf(img);
    let newImages = [...Images];
    // currentIndex에서부터 1개 만큼의 요소를 지워준다.
    newImages.splice(currentIndex, 1);
    setImages(newImages);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflow: "scroll hidden ",
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http:localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
