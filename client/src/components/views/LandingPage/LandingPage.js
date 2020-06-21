import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSilder from "../../utils/imageSilder";
function LandingPage() {
  // 받아온 상품들을 저장한 state
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.MoreBtn) {
          setProducts([...Products, ...response.data.productsInfo]);
        } else {
          // console.log(response.data);
          setProducts(response.data.productsInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품가져오기 실패");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    let body = {
      skip: Skip,
      limit: Limit,
      MoreBtn: true,
    };
    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    // console.log(product, index);
    return (
      /* 
            한개의 Row는 24의 크기를 가짐
            크기에 따라(lg md xs)의 값을 지정해줌
            EX) lg의 경우 6으로 지정해주어 한개가 6의 크기를 가지며 하나의 row의 4개를 가짐
      */
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSilder images={product.images} />}>
          <Meta title={product.title} description={`$ ${product.price}`} />
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
      <br />
      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
