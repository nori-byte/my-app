<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <template v-if="!isAuthenticated">
      <router-link to="/login">Вход</router-link> |
      <router-link to="/register">Регистрация</router-link>
    </template>
    <template v-else>
      <router-link to="/catalog">Каталог</router-link> |
      <router-link to="/cart">Корзинка</router-link> |
      <router-link to="/orders">Оформленные заказы</router-link> |
      <button @click="logout">Выйти</button>
    </template>
  </nav>
  <router-view/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    userFio() {
      return this.currentUser?.fio || 'Пользователь'
    }
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      await this.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 20px;
  background: #9ebcd5;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: none;
}

</style>
