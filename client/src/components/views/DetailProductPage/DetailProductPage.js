import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductInfo from "./Section/ProductInfo";
import ProductImage from "./Section/ProductImage";
import { Col, Row } from "antd";

function DetailProductPage(props) {
  const [Product, setProduct] = useState({});
  const productId = props.match.params.productId;
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          setProduct(response.data.product[0]);
          console.log(response.data);
        } else {
          alert("실패");
        }
      });
  }, []);
  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} sm={24}>
          <ProductInfo />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
