import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
} from "./types";
import { USER_SERVER } from "../components/Config.js";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
export function addToCart(id) {
  let body = {
    productId: id,
  };
  const request = axios
    .post(`${USER_SERVER}/addToCart`, body)
    .then((response) => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getCartItems(cartData, userCart) {
  const request = axios
    .get(`/api/product/products_by_id?id=${cartData}&type=array`)
    .then((response) => {
      // cartData애 해당하는 정보를 찾아온뒤
      // quntity정보를 얻어준다.
      userCart.forEach((carts) => {
        response.data.forEach((productDetail, index) => {
          if (carts.id === productDetail._id) {
            response.data[index].quantity = carts.quantity;
          }
        });
      });
      return response.data;
    });
  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}

export function removeCartItem(id) {
  const request = axios
    .get(`/api/users/removeFromCart?id=${id}`)
    .then((response) => {
      response.data.cart.forEach((element) => {
        response.data.cartDetail.forEach((product, index) => {
          if (element.id === product._id) {
            response.data.cartDetail[index].quantity = element.quantity;
          }
        });
      });
      return response.data;
    });
  return {
    type: REMOVE_CART_ITEM,
    payload: request,
  };
}
