
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
.list-of-products {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  justify-content: center;
}

.product-item {
  background: white;
  border: 1px solid #7acad2;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}


.product-item h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.product-item p {
  margin: 5px 0;
  color: #666;
  line-height: 1.5;
}

.product-item .price {
  font-weight: bold;
  color: #7acad2;
  font-size: 1.2rem;
  margin: 10px 0;
}

.product-item button {
  background-color: #42abb9;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: auto;
}

</style>