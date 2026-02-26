<template>
  <div class="register-container">
    <form class="register-form" @submit.prevent="register">
      <h2>Регистрация</h2>

      <div class="form-group">
        <label>ФИО</label>
        <input
            type="text"
            v-model="fio"
            required
            placeholder="Иванов Иван Иванович"
            @input="clearError('fio')"
            :class="{ 'error': errors.fio }"
        />
        <div class="error-message" v-if="errors.fio">{{ errors.fio[0] }}</div>
      </div>

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
        <div class="error-message" v-if="errors.email">{{ errors.email[0] }}</div>
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
        <div class="error-message" v-if="errors.password">{{ errors.password[0] }}</div>
      </div>

      <div v-if="generalError" class="general-error">{{ generalError }}</div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
      </button>

      <p class="login-link">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
      <p><router-link to="/"> На главную</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fio: '',
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
    register() {
      this.loading = true;
      this.errors = {};
      this.generalError = '';

      const fioValue = this.fio.trim();
      if (!fioValue) {
        this.errors.fio = ['ФИО обязательно'];
      } else if (fioValue.length < 3) {
        this.errors.fio = ['ФИО должно содержать не менее 3 символов'];
      } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(fioValue)) {
        this.errors.fio = ['ФИО может содержать только буквы, пробелы и дефисы'];
      } else if (fioValue.split(/\s+/).length < 2) {
        this.errors.fio = ['Введите имя и фамилию'];
      }
      if (!this.email) {
        this.errors.email = ['Email обязателен'];
      } else if (!/^\S+@\S+\.\S+$/.test(this.email)) {
        this.errors.email = ['Введите корректный email'];
      }
      if (!this.password) {
        this.errors.password = ['Пароль обязателен'];
      } else if (this.password.length < 6) {
        this.errors.password = ['Пароль должен быть не менее 6 символов'];
      }

      if (Object.keys(this.errors).length > 0) {
        this.loading = false;
        return;
      }

      const userData = {
        fio: this.fio,
        email: this.email,
        password: this.password
      };

      this.$store.dispatch('REGISTER_REQUEST', userData)
          .then(() => {
            this.$router.push('/login');
          })
          .catch(error => {
            console.error('Ошибка регистрации:', error);
            if (error.data && error.data.error) {
              const apiError = error.data.error;
              if (apiError.code === 422 && apiError.errors) {
                this.errors = apiError.errors;
              } else {
                this.generalError = apiError.message || 'Ошибка регистрации';
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
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
a {
  text-decoration: none;
  color:#7acad2;
}
.register-form {
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
  box-shadow: 0 0 0 2px rgba(137, 231, 226, 0.2);
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
.login-link {
  text-align: center;
  margin-top: 1rem;
}
</style>