import React, { useEffect } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.post("/api/product/products").then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert("상품가져오기 실패");
      }
    });
  }, []);

  return <div>asd</div>;
}

export default LandingPage;
