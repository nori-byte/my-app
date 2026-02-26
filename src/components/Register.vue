<template>
  <div class="register-container">
    <form class="register-form" @submit.prevent="register">
      <h2>Регистрация</h2>

      <div class="form-group">
        <label>ФИО</label>
        <input type="text" v-model="fio" required placeholder="Иванов Иван Иванович" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required placeholder="admin@admin.ru" />
      </div>

      <div class="form-group">
        <label>Пароль</label>
        <input type="password" v-model="password" required placeholder="******" />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
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
      error: ''
    }
  },
  methods: {
//     register() {
//       this.loading = true
//       this.error = ''
//       const userData = {
//         fio: this.fio,
//         email: this.email,
//         password: this.password
//       }
//       this.$store.dispatch('REGISTER_REQUEST', userData)
//           .then(() => {
//             // После успешной регистрации сразу входим или переходим на страницу входа
//             this.$router.push('/login')
//           })
//           .catch(error => {
//             this.error = error.message || 'Ошибка регистрации'
//             console.error(error)
//           })
//           .finally(() => {
//             this.loading = false
//           })
//     }
//   }
// }
    register() {
      this.loading = true;
      this.error = '';
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
            console.error('Полная ошибка:', error);
            let errorMessage = 'Ошибка регистрации';

            // Пытаемся извлечь сообщения из разных форматов ответа
            if (error.data) {
              if (error.data.error && error.data.error.errors) {
                // формат { error: { errors: { поле: ["сообщение"] } } }
                const errors = error.data.error.errors;
                const messages = [];
                for (let field in errors) {
                  messages.push(`${field}: ${errors[field].join(', ')}`);
                }
                errorMessage = messages.join('; ');
              } else if (error.data.errors) {
                // если errors массив или объект
                if (Array.isArray(error.data.errors)) {
                  errorMessage = error.data.errors.join('; ');
                } else if (typeof error.data.errors === 'object') {
                  const messages = [];
                  for (let field in error.data.errors) {
                    messages.push(`${field}: ${error.data.errors[field].join(', ')}`);
                  }
                  errorMessage = messages.join('; ');
                }
              } else if (error.data.message) {
                errorMessage = error.data.message;
              }
            } else if (error.message) {
              errorMessage = error.message;
            }

            this.error = errorMessage;
          })
          .finally(() => {
            this.loading = false;
          });
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
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
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  padding: 0.75rem;
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
</style>
