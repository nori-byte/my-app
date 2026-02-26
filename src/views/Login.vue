<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="login">
      <h2>Вход</h2>

      <div class="form-group">
        <label>Email</label>
        <input
            type="email"
            v-model="email"
            required
            placeholder="email@example.com"
            @input="clearError('email')"
            :class="{ 'error': errors.email }"
        />
        <div class="error-message" v-if="errors.email">
          {{ errors.email[0] }}
        </div>
      </div>

      <div class="form-group">
        <label>Пароль</label>
        <input
            type="password"
            v-model="password"
            required
            @input="clearError('password')"
            :class="{ 'error': errors.password }"
        />
        <div class="error-message" v-if="errors.password">
          {{ errors.password[0] }}
        </div>
      </div>

      <!-- Общая ошибка (например, 401) -->
      <div v-if="generalError" class="general-error">
        {{ generalError }}
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Вход...' : 'Войти' }}
      </button>

      <p class="register-link">
        Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link></p>
      <p><router-link to="/"> На главную</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      errors: {},
      generalError: ''
    };
  },
  methods: {
    clearError(field) {
      if (this.errors[field]) {
        delete this.errors[field];
      }
    },
    login() {
      this.loading = true;
      this.errors = {};
      this.generalError = '';

      if (!this.email) {
        this.errors.email = ['Email обязателен'];
      }
      if (!this.password) {
        this.errors.password = ['Пароль обязателен'];
      }
      if (Object.keys(this.errors).length > 0) {
        this.loading = false;
        return;
      }

      const userData = {
        email: this.email,
        password: this.password
      };

      this.$store.dispatch('AUTH_REQUEST', userData)
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            console.error('Ошибка входа:', error);
            if (error.data && error.data.error) {
              const apiError = error.data.error;
              if (apiError.code === 422 && apiError.errors) {
                this.errors = apiError.errors;
              } else if (apiError.code === 401) {
                this.generalError = apiError.message || 'Неверный email или пароль';
              } else {
                this.generalError = apiError.message || 'Ошибка входа';
              }
            } else {
              this.generalError = 'Ошибка соединения с сервером';
            }
          })
          .finally(() => {
            this.loading = false;
          });
    }
  }
};
</script>

<style scoped>
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
a {
  text-decoration: none;
  color:#7acad2;
}
.form-group {
  margin-bottom: 1rem;
  text-align: left;
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
  border-color: #7acad2;
  box-shadow: 0 0 0 2px rgba(66,185,131,0.2);
}
input.error {
  border-color: #e74c3c;
  background-color: #fff3f3;
}
.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 4px;
}
.general-error {
  color: #e74c3c;
  margin: 10px 0;
  text-align: center;
}
button {
  width: 100%;
  padding: 0.75rem;
  background-color: #7acad2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover:not(:disabled) {
  background-color: #7acad2;
}
button:disabled {
  background-color: #7acad2;
  cursor: not-allowed;
}
.register-link {
  text-align: center;
  margin-top: 1rem;
}
</style>