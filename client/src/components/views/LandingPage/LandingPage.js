import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
function LandingPage() {
  // 받아온 상품들을 저장한 state
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    axios.post("/api/product/products").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setProducts(response.data.productsInfo);
      } else {
        alert("상품가져오기 실패");
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
    console.log(product, index);
    return (
      /* 
            한개의 Row는 24의 크기를 가짐
            크기에 따라(lg md xs)의 값을 지정해줌
            EX) lg의 경우 6으로 지정해주어 한개가 6의 크기를 가지며 하나의 row의 4개를 가짐
      */
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={<img src={`http://localhost:5000/${product.images[0]}`} />}
        >
          <Meta title={product.title} description={product.price} />
        </Card>
      </Col>
    );
  });
  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          여행합시다
          <Icon type="rocket" />
        </h2>
      </div>
      {/* 필터 */}
      {/* 검색 */}
      {/* 카드 */}
      {/* renderCArd를 이용해서 위에서 처리한다 */}
      <Row gutter={[16, 16]}>{renderCards}</Row>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
