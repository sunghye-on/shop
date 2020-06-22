import React, { useState } from "react";
// antd라는 것을 이용해서 웹페이지를 쉽게 구성 머테리얼/부트스트랩과 같다
import { Typography, Button, Form, Input, Descriptions } from "antd";
import { FileUpload } from "../../utils/FileUpload";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "아프리카" },
  { key: 2, value: "유럽" },
  { key: 3, value: "아시아" },
  { key: 4, value: "남미" },
  { key: 5, value: "북미" },
  { key: 6, value: "호주" },
  { key: 7, value: "태평양" },
];

function UploadProductPage(props) {
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

  const ContinentChange = (event) => {
    setContinent(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    // 지동으로 새로고침되는 것을 막음
    event.preventDefault();
    // state 중 하나라도 채워지지 않았다면 alert를 발생
    if (!Title || !Description || !Price || !Continent || !Images) {
      return alert("값을 모두 채워주세요");
    }

    // 서버에게 전달할 정보들
    console.log(Images);
    const body = {
      // 현재 로그인되어 있는 유저의 정보
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continents: Continent,
    };
    // 서버에게 값을 request 한다.
    axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드 완료");
        props.history.push("/");
      } else {
        alert("업로드 실패");
      }
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}></div>
      {/* <Title level={2}>여행 샘플 업로드</Title> */}
      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />
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

        <select onChange={ContinentChange} value={Continent}>
          {Continents.map((obj) => (
            <option key={obj.key} value={obj.key}>
              {obj.value}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="submit" onClick={submitHandler}>
          확인
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
