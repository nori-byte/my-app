
<template>
  <div class="list-of-products">
    <h2>Список товаров</h2>
    <div class="products-container">
      <Product
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart(product)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Product from '@/components/product.vue';

export default {
  components: { Product },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['FETCH_PRODUCTS', 'ADD_TO_CART']),
    addToCart(product) {
      this.ADD_TO_CART(product)
          .then(() => alert('Товар добавлен'))
          .catch(() => alert('Ошибка'));
    }
  },
  created() {
    this.FETCH_PRODUCTS();
  }
};
</script>

<style scoped>
button {
  width: 100px;
  height: 20px;
  border-radius: 10px;
  color: #2c3e50;
}
</style>