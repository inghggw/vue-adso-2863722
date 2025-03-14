<script setup lang="ts">
import { authSetStore } from '../services/AuthStore';
import { ref } from 'vue';

const authStore = authSetStore()
const username = ref('')
const password = ref('')

const handlerLogin = ()=> {
  console.log(password.value)
if(!username.value || !password.value){
  alert('todos los campos son necesarios.')
  return
}


}
</script>

<template>
<input placeholder="correo"  v-model="username">

<input placeholder="contraseña" v-model="password">

<button @click="handlerLogin">
  inciar sesion
</button>
</template>

<style>

</style>
