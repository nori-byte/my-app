import { createStore } from 'vuex'
import {
  loginRequest,
  signupRequest,
  createOrder,
  addToCartServer,
  fetchCart,
  removeFromCartServer
} from '@/utils/api'

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
    user: JSON.parse(localStorage.getItem('myAppUser')) || null,
    cart: JSON.parse(localStorage.getItem('myAppCart')) || [],
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
  },
  mutations: {
    AUTH_SUCCESS(state, { token, user }) {
      state.token = token;
      state.user = user;
      localStorage.setItem('myAppToken', token);
      localStorage.setItem('myAppUser', JSON.stringify(user));
    },
    AUTH_ERROR(state) {
      state.token = '';
      state.user = null;
      localStorage.removeItem('myAppToken');
      localStorage.removeItem('myAppUser');
    },
    SET_CART(state, cart) {
      state.cart = cart;
      localStorage.setItem('myAppCart', JSON.stringify(cart));
    },
    UPDATE_CART_ITEM_QUANTITY(state, { id, quantity }) {
      const item = state.cart.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('myAppCart', JSON.stringify(state.cart));
      }
    },
    addToCart(state, product) {
      const item = state.cart.find(i => i.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        state.cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        });
      }
      localStorage.setItem('myAppCart', JSON.stringify(state.cart));
    },
    incrementItem(state, productId) {
      const item = state.cart.find(i => i.id === productId);
      if (item) {
        item.quantity++;
        localStorage.setItem('myAppCart', JSON.stringify(state.cart));
      }
    },
    decrementItem(state, productId) {
      const item = state.cart.find(i => i.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('myAppCart', JSON.stringify(state.cart));
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
      localStorage.setItem('myAppCart', JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.setItem('myAppCart', JSON.stringify(state.cart));
    },
  },
  actions: {
    AUTH_REQUEST({ commit }, credentials) {
      return loginRequest(credentials)
          .then(({ token, user }) => {
            commit('AUTH_SUCCESS', { token, user });
          })
          .catch(error => {
            commit('AUTH_ERROR');
            throw error;
          });
    },
    REGISTER_REQUEST({ commit }, userData) {
      return signupRequest(userData)
          .then(({ token, user }) => {
            commit('AUTH_SUCCESS', { token, user });
          })
          .catch(error => {
            commit('AUTH_ERROR');
            throw error;
          });
    },
    logout({ commit }) {
      commit('AUTH_ERROR');
    },
    ADD_TO_CART({ commit }, product) {
      return addToCartServer(product.id)
          .then(() => {
            commit('addToCart', product);
          })
          .catch(error => {
            console.error('Ошибка добавления товара на сервер:', error);
            throw error;
          });
    },
    FETCH_CART({ commit }) {
      return fetchCart()
          .then(cart => {
            commit('SET_CART', cart);
          })
          .catch(error => {
            console.error('Ошибка загрузки корзины:', error);
            throw error;
          });
    },
    REMOVE_FROM_CART({ commit }, cartItemId) {
      return removeFromCartServer(cartItemId)
          .then(() => {
            commit('removeFromCart', cartItemId);
          })
          .catch(error => {
            console.error('Ошибка удаления товара из корзины:', error);
            throw error;
          });
    },
    ORDER_REQUEST({ commit }) {
      return createOrder()
          .then(response => {
            commit('clearCart');
            return response.data;
          })
          .catch(error => {
            console.error('Ошибка оформления заказа:', error);
            throw error;
          });
    },
  },
});