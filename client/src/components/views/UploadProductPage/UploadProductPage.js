import React, { useState } from "react";
// antd라는 것을 이용해서 웹페이지를 쉽게 구성 머테리얼/부트스트랩과 같다
import { Typography, Button, Form, Input, Descriptions } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChaneHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const DescriptionChange = (event) => {
    setDescription(event.currentTarget.value);
  };

  const PriceChange = (event) => {
    setPrice(event.currentTarget.value);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}></div>
      {/* <Title level={2}>여행 샘플 업로드</Title> */}
      <Form>
        {/* DropZone */}

        <br />
        <br />

        <label>이름</label>
        <Input onChange={titleChaneHandler} value={Title} />
        <br />
        <br />

        <label>Description</label>
        <TextArea onChange={DescriptionChange} value={Description} />
        <br />
        <br />

        <label>가격($)</label>
        <Input type="number" onChange={PriceChange} value={Price} />
        <br />
        <br />

        <select>
          <option></option>
        </select>
        <br />
        <br />

        <Button>확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
