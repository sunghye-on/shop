import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSilder from "../../utils/imageSilder";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import Search from "./Sections/SearchFeature";
import { continents, price } from "./Sections/Datas";

function LandingPage() {
  // 받아온 상품들을 저장한 state
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");

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

  const showFilterResult = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (val) => {
    const data = price;
    let arr = [];
    for (const key in data) {
      if (data[key]._id === parseInt(val)) {
        arr = data[key].array;
      }
    }
    return arr;
  };
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);
      console.log(priceValues);
      newFilters[category] = priceValues;
    }

    showFilterResult(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newValue) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newValue,
    };
    setSkip(0);
    setSearchTerm(newValue);
    getProducts(body);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          여행합시다
          <Icon type="rocket" />
        </h2>
      </div>
      {/* 필터 */}
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* 체크박스 */}
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>
      {/* 검색 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <Search refreshFunction={updateSearchTerm} />
      </div>
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
