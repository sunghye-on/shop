import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import UserCartBlock from "./Section/UserCartBlock";
function CartPage(props) {
  const dispatch = useDispatch();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
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
    }
  }, [props.user.userData]);
  // const userCart = props.user.cartDetail;
  const gettotal = (userCart) => {
    let total = 0;
    console.log(userCart);
    for (const i in userCart) {
      total += parseInt(userCart[i].price) * parseInt(userCart[i].quantity);
    }
    setTotal(total);
    return total;
  };
  const removeFromCart = (productId) => {
    console.log("test", productId);
    dispatch(removeCartItem(productId)).then((response) => {
      console.log(response);
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

      <div style={{ marginTop: "3rem" }}>합계 {Total}원</div>
    </div>
  );
}

export default CartPage;
