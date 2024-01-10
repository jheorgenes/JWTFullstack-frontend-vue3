<template>
  <h2>Login</h2>
  <template v-if="!auth.isAuthenticated">
    <form @submit.prevent="login">
      <input type="text" placeholder="Seu email" v-model="user.email">
      <input type="password" placeholder="Sua Senha" v-model="user.password">
      <button type="submit">Login</button>
    </form>
  </template>
  <template v-else>
    Logen id
  </template>
</template>

<script setup>
import http from '@/services/http.js';
import { reactive } from 'vue';
import { useAuth } from '@/stores/auth.js';

const auth = useAuth();

const user = reactive({
  email: 'jheorgenes@gmail.com',
  password: '123456789'
})

async function login() {
  try {
    const { data } = await http.post('/auth', user);
    console.log(data);
    auth.setToken(data.token);
    auth.setUser(data.user);
  } catch (error) {
    console.log(error?.response?.data);
  }
}

</script>
