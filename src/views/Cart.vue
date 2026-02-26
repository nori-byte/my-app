<template>
  <div class="cart">
    <h2>Корзина</h2>
    <div v-if="cart.length === 0" class="empty-cart">
      Корзина пуста
    </div>

    <template v-else>
      <ul class="cart-list">
        <li v-for="item in cart" :key="item.id" class="cart-item">
          <div class="item-info">
            {{ item.name }} — {{ item.price }} ₽
            <span class="item-quantity">Количество: {{ item.quantity }}</span>
          </div>
          <div class="item-actions">
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">−</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
            <button class="remove-btn" @click="removeItem(item)">Удалить</button>
          </div>
        </li>
      </ul>

      <div class="cart-footer">
        <div class="total-price">Общая цена: {{ totalPrice }} ₽</div>
        <button class="order-btn" @click="placeOrder">Оформить заказ</button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
  },
  created() {
    this.$store.dispatch('FETCH_CART');
  },
  methods: {
    increaseQuantity(item) {
      this.$store.dispatch('INCREMENT_ITEM', item)
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.$store.dispatch('DECREMENT_ITEM', item)
      }
    },
    removeItem(item) {
      this.$store.dispatch('REMOVE_FROM_CART', item)
    },
    placeOrder() {
      this.$store.dispatch('ORDER_REQUEST')
          .then(() => {
            this.$router.push('/orders');
          })
          .catch(error => {
            alert('Не удалось оформить заказ. Попробуйте позже.');
          });
    }
  }
}
</script>

<style scoped>
.cart {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.empty-cart {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 50px;
}

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: #e1f2ff;
}

.item-info {
  flex: 2;
}

.item-quantity {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-top: 4px;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid #7acad2;
  color: #7acad2;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-controls button:hover:not(:disabled) {
  background: #7acad2;
  color: white;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls span {
  min-width: 30px;
  text-align: center;
  font-weight: 500;
}

.remove-btn {
  background: #da867e;
  height: 40px;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

}

.remove-btn:hover {
  background: #d77267;
}

.cart-footer {
  margin-top: 30px;
  text-align: right;
  padding: 20px;
  background: #e1f2ff;
  border-radius: 8px;
}

.total-price {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #7acad2;
}

.order-btn {
  background: #7acad2;
  height: 40px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s;
}

.order-btn:hover {
  background: #7acad2;
}
</style>