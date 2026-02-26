
<template>
  <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>Email</label>
    <input type="email" required v-model="email" />
    <label>Password</label>
    <input type="password" required v-model="password" />
    <hr />
    <button type="submit">Login</button>
  </form>
  <p>Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link></p>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('AUTH_REQUEST', userData)
          .then(() => this.$router.push("/"))
          .catch(error => {
            console.error('Ошибка входа:', error);
            alert('Неверный email или пароль');
          });
    },
  },
};
</script>
