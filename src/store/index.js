import { createStore } from 'vuex'
import {
  loginRequest,
  signupRequest,
  createOrder,
  addToCartServer,
  fetchCart,
  removeFromCartServer,
  getProducts,
  getOrders
} from '@/utils/api'

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
    user: JSON.parse(localStorage.getItem('myAppUser')) || null,
    cart: JSON.parse(localStorage.getItem('myAppCart')) || [],
    products: [],
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
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_CART(state, cartFromServer) {
      if (!Array.isArray(cartFromServer)) {
        console.error('SET_CART: получен не массив', cartFromServer);
        return;
      }

      const grouped = {};
      cartFromServer.forEach(item => {
        if (!item.product_id) {
          console.warn('Элемент корзины без product_id:', item);
          return;
        }
        const productId = item.product_id;
        if (!grouped[productId]) {
          grouped[productId] = {
            id: productId,
            name: item.name || 'Без названия',
            price: item.price || 0,
            quantity: 0,
            cartItemIds: []
          };
        }
        grouped[productId].quantity++;
        if (item.id) {
          grouped[productId].cartItemIds.push(item.id);
        } else {
          console.warn('Элемент корзины без id:', item);
        }
      });

      state.cart = Object.values(grouped);
      localStorage.setItem('myAppCart', JSON.stringify(state.cart));
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
      localStorage.removeItem('myAppCart');
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
    FETCH_ORDERS() {
      return getOrders();
    },
    ADD_TO_CART({ commit }, product) {
      return addToCartServer(product.id)
          .then(() => {
            commit('addToCart', product);
          })
          .catch(error => {
            console.error('Ошибка добавления на сервер:', error);
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
          });
    },
    REMOVE_FROM_CART({ commit, dispatch }, productGroup) {
      if (!productGroup.cartItemIds || !Array.isArray(productGroup.cartItemIds)) {
        return Promise.reject('Ошибка: нет идентификаторов');
      }
      const promises = productGroup.cartItemIds.map(id => removeFromCartServer(id));
      return Promise.all(promises)
          .then(() => {
            return dispatch('FETCH_CART');
          })
          .then(() => {
          })
          .catch(error => {
            console.error('Ошибка удаления с сервера:', error);
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
    FETCH_PRODUCTS({ commit }) {
      return getProducts()
          .then(products => {
            commit('SET_PRODUCTS', products);
          })
          .catch(error => {
            console.error('Ошибка загрузки товаров:', error);
            throw error;
          });
    },
    INCREMENT_ITEM({ commit }, productGroup) {
      return addToCartServer(productGroup.id)
          .then(() => {
            commit('incrementItem', productGroup.id);
          })
          .catch(error => {
            console.error('Ошибка увеличения количества:', error);
            throw error;
          });
    },

    DECREMENT_ITEM({ commit }, productGroup) {
      if (!productGroup.cartItemIds || productGroup.cartItemIds.length === 0) {
        return Promise.reject('Нет позиций для удаления');
      }
      const cartItemId = productGroup.cartItemIds[productGroup.cartItemIds.length - 1];
      return removeFromCartServer(cartItemId)
          .then(() => {
            if (productGroup.quantity > 1) {
              commit('decrementItem', productGroup.id);
            } else {
              commit('removeFromCart', productGroup.id);
            }
          })
          .catch(error => {
            console.error('Ошибка уменьшения количества:', error);
            throw error;
          });
    }
  },
});