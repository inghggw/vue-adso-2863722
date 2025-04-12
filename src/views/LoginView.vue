<script setup lang="ts">
import { authSetStore } from '../stores/AuthStore'
import { ref } from 'vue'

const authStore = authSetStore()
const email = ref('')
const password = ref('')

const handlerLogin = () => {
  if (!email.value || !password.value) {
    alert('todos los campos son necesarios.')
    return
  } else {
    authStore.login({
      email: email.value,
      password: password.value,
    })
  }
} 
</script>

<template>
  <input placeholder="correo" v-model="email" />

  <input placeholder="contraseña" v-model="password" />

  <button @click="handlerLogin">inciar sesion</button>
</template>

<style></style>
