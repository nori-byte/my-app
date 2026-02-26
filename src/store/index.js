// import { createStore } from 'vuex'
// import {loginRequest} from "@/utils/api.js";
//
// export default createStore({
//   state: {
//     token: localStorage.getItem('myAppToken') || '',
//   },
//   getters: {
//     isAuthenticated: (state) => !!state.token,
//   },
//   mutations: {
//     AUTH_SUCCESS: (state, token) => {
//       state.token = token;
//     },
//     AUTH_ERROR: (state) => {
//       state.token = '';
//     },
//   },
//   actions: {
//     AUTH_REQUEST: ({commit}, user) => {
//       return new Promise((resolve, reject) => {
//         loginRequest(user)
//             .then((token) => {
//               commit('AUTH_SUCCESS', token);
//               localStorage.setItem('myAppToken', token);
//               resolve();
//             })
//             .catch(() => {
//               commit('AUTH_ERROR');
//               localStorage.removeItem('myAppToken');
//               reject();
//             });
//       })
//     }
//   },
//   modules: {
//   }
// })
import { createStore } from 'vuex'
import { loginRequest, signupRequest } from '@/utils/api'

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
    user: JSON.parse(localStorage.getItem('myAppUser')) || null,
    cart: [],


  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
  },
  mutations: {
    AUTH_SUCCESS(state, { token, user }) {
      state.token = token;
      state.user = user;
    },
    incrementItem(state, productId) {
      const item = state.cart.find(i => i.id === productId);
      if (item) item.quantity++;
    },
    decrementItem(state, productId) {
      const item = state.cart.find(i => i.id === productId);
      if (item) item.quantity--;
    },
    AUTH_ERROR(state) {
      state.token = '';
      state.user = null;
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
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
  },
  actions: {
    AUTH_REQUEST({ commit }, credentials) {
      return loginRequest(credentials)
          .then(({ token, user }) => {
            commit('AUTH_SUCCESS', { token, user });
            localStorage.setItem('myAppToken', token);
          })
          .catch(error => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            throw error;
          });
    },
    REGISTER_REQUEST({ commit }, userData) {
      return signupRequest(userData)
          .then(({ token, user }) => {
            commit('AUTH_SUCCESS', { token, user })
            localStorage.setItem('myAppToken', token)
          })
          .catch(error => {
            commit('AUTH_ERROR')
            localStorage.removeItem('myAppToken')
            throw error
          })
    },
    logout({ commit }) {
      commit('AUTH_ERROR');
      localStorage.removeItem('myAppToken');
    }
  }
});
