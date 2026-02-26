<template>
  <div class="orders">
    <h2>Мои заказы</h2>
    <button class="back-btn" @click="$router.push('/')">← Назад</button>
    <div v-if="loading" class="loading">Загрузка заказов...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && !error && orders.length === 0" class="empty">
      У вас пока нет заказов.
    </div>
    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <span class="order-id">Заказ №{{ order.id }}</span>
          <span class="order-price">Сумма: {{ order.order_price }} ₽</span>
        </div>
        <div class="order-products">
          Товары (ID): {{ order.products.join(', ') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrders } from '@/utils/api';

export default {
  name: 'OrdersView',
  data() {
    return {
      orders: [],
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      this.loading = true;
      this.error = null;
      try {
        const data = await getOrders();
        this.orders = data;
      } catch (err) {
        console.error('Ошибка загрузки заказов:', err);
        this.error = 'Не удалось загрузить заказы. Попробуйте позже.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.orders {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.back-btn {
  background: none;
  border: 1px solid #42b983;
  color: #42b983;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 1rem;
}

.back-btn:hover {
  background: #42b983;
  color: white;
}

.loading,
.error,
.empty {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #e74c3c;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: bold;
}

.order-id {
  color: #42b983;
}

.order-price {
  color: #2c3e50;
}

.order-products {
  color: #666;
  font-size: 0.9rem;
  border-top: 1px solid #eee;
  padding-top: 10px;
}
</style>