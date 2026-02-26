<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <template v-if="!isAuthenticated">
      <router-link to="/login">Вход</router-link> |
      <router-link to="/register">Регистрация</router-link>
    </template>
    <template v-else>
      <span>Привет, {{ currentUser?.fio || currentUser?.email || 'Пользователь' }}</span>
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
    userEmail() {
      return this.currentUser?.email || 'Пользователь'
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
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
