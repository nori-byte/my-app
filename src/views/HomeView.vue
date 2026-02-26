<template>
  <p>Welcome</p>
    <template v-if="!isAuthenticated">
     <p>Войдите в аккаунт или зарегистрируйтесь, чтобы получить доступ к возможностям нашего сайта</p>
      <router-link to="/login">Вход</router-link><br>
      <router-link to="/register">Регистрация</router-link>
    </template>
    <template v-else>
      <p>Купите товары по очень оргомной скидке</p>
      <p><router-link to="/catalog">К товарам</router-link></p>
    </template>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  name: 'HomeView'

}
</script>
<style>
a {
  text-decoration: none;
  color: #7acad2;
}
body {
  font-size:20px;
}
button {
  border-radius: 10px;
  color: #7acad2;
  background: white;
  width: 100px;
  height: 40px;
  font-size: 14px;
}
</style>
