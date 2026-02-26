<!--<template>-->
<!--  <div class="list-of-products">-->
<!--    <h2>Список товаров</h2>-->
<!--    <div class="products-container">-->
<!--      <Product-->
<!--          v-for="product in products"-->
<!--          :key="product.id"-->
<!--          :product="product"-->
<!--          @add-to-cart="addToCart(product)"/>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import Product from '@/components/product.vue';-->

<!--export default {-->
<!--  components: { Product },-->
<!--  data() {-->
<!--    return {-->
<!--      products: [-->
<!--        {id: 1, name: 'Товар 1', description: 'Описание товара 1', price: 1000},-->
<!--        {id: 2, name: 'Товар 2', description: 'Описание товара 2', price: 1500}-->
<!--      ]-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    addToCart(product) {-->
<!--      this.$store.dispatch('ADD_TO_CART', product)-->
<!--          .then(() => alert('Товар добавлен'))-->
<!--          .catch(err => alert('Ошибка добавления'));-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
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