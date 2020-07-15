import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Empty, Alert, Button } from "antd";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import UserCartBlock from "./Section/UserCartBlock";
import Paypal from "../../utils/Paypal";

function CartPage(props) {
  const dispatch = useDispatch();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const userData = props.user.userData;
    let cartData = [];
    // 유저안에 카트에 상품이 있는지 확인
    if (userData && userData.cart) {
      if (userData.cart.length > 0) {
        userData.cart.forEach((element) => {
          cartData.push(element.id);
        });
        dispatch(getCartItems(cartData, userData.cart)).then((response) => {
          gettotal(response.payload);
        });
      }
      setCart(userData.cart);
    } else {
      loadingHandler();
    }
  }, [props.user.userData]);
  // const userCart = props.user.cartDetail;
  const loadingHandler = () => {
    return (
      <div>
        <Button type="primary" loading>
          가져오는중
        </Button>
      </div>
    );
  };
  const gettotal = (userCart) => {
    let total = 0;
    console.log(userCart);
    for (const i in userCart) {
      total += parseInt(userCart[i].price) * parseInt(userCart[i].quantity);
    }
    setTotal(total);
    setShowTotal(true);
    return total;
  };
  const removeFromCart = (productId) => {
    console.log("test", productId);
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.cartDetail) {
        console.log("enter?");
        if (response.payload.cartDetail.length <= 0) {
          setShowTotal(false);
        }
      }
    });
  };
  // console.log(props.user.cartDetail);
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>장바구니</h1>
      <div>
        <UserCartBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />
      </div>
      {ShowTotal ? (
        <div style={{ marginTop: "3rem" }}>
          <Alert
            message="전체 가격"
            description={`합계 ${Total}원`}
            type="info"
            showIcon
          />
        </div>
      ) : (
        <>
          <br />
          <br />
          {Loading ? (
            <div>{loadingHandler()}</div>
          ) : (
            <div>
              <Empty description={false} />
              <Alert message="장바구니에 상품이 없습니다." type="error" />
            </div>
          )}
        </>
      )}
      <br />
      {ShowTotal ? <Paypal total={Total} /> : <></>}
    </div>
  );
}

export default CartPage;
