import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
function CartPage(props) {
  const dispatch = useDispatch();
  const [Cart, setCart] = useState();
  useEffect(() => {
    const userData = props.user.userData;
    let cartData = [];

    // 유저안에 카트에 상품이 있는지 확인
    if (userData && userData.cart) {
      if (userData.cart.length > 0) {
        userData.cart.forEach((element) => {
          cartData.push(element.id);
        });
        dispatch(getCartItems(cartData, userData.cart));
      }
      setCart(userData.cart);
      console.log(Cart);
    }
  }, [props.user.userData]);
  return <div>CartPage</div>;
}

export default CartPage;
