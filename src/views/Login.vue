
<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="login">
      <h2>Вход</h2>
      <div class="form-group">
        <label>Email</label>
        <input type="email" required v-model="email" />
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input type="password" required v-model="password" />
        <div class="button_1">
          <button type="submit">Вход</button></div>
        <p>Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link></p>
        <button @click="$router.push('/')"> Назад</button>
      </div>
    </form>
  </div>
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
<style scoped>
a {
  color: #42b983;
  text-decoration: none
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}
h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}
.form-group input:focus {
  outline: none;
  border-color: #42b983;
}
button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover:not(:disabled) {
  background-color: #3aa876;
}
button:disabled {
  background-color: #a5d6b8;
  cursor: not-allowed;
}
.error {
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
}
.button_1 {
  padding-top: 8px;
}
</style>
