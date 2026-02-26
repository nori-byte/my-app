<template>
  <div class="list-of-products">
    <h2>Список товаров</h2>
    <div class="products-container">
      <Product
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import Product from '@/components/product.vue';
import Cart from '@/views/Cart.vue'

export default {
  components: {
    Product,
    Cart
  },
  data() {
    return {
      products: [
        {id: 1, name: 'Товар 1', description: 'Описание товара 1', price: 1000},
        {id: 2, name: 'Товар 2', description: 'Описание товара 2', price: 1500}
      ],
      cart: []
    };
  },
  methods: {
    addToCart() {
      this.$store.dispatch('ADD_TO_CART', this.product)
          .then(() => alert('Товар добавлен'))
          .catch(err => alert('Ошибка'));
    }
  }
}
</script>