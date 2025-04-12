<template>
    <button @click="handlerLogOut">Cerrar sesion</button>


    
</template>

<script setup lang="ts">
    import { authSetStore } from '@/stores/AuthStore';
    
    const AuthStore = authSetStore()
    const handlerLogOut = () => {
        AuthStore.logout()
    }

</script>

<style>

</style>