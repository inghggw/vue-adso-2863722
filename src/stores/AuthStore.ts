import router from '@/router';
import AuthService from '@/services/AuthService';
import { defineStore } from 'pinia'
//import { router } from '@/router'

export const authSetStore = defineStore('auth', {
  state: () => ({
    user: (() => {
      try {
        const userData = localStorage.getItem('user')
        return userData ? JSON.parse(userData) : null
      } catch (error) {
        console.error('Error parsing user from localStorage:', error)
        return null
      }
    })(),

    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(userData: { email: string, password: string }): Promise<boolean | undefined>{

      const auth = new AuthService
        const login = await auth.login(userData.email, userData.password)

      if(login.errors?.[0]){
        /*login.JSON({"message": "credenciales invalidas"})*/
        alert(login.errors[0].message)
      } else {
        const token = login.token
        //Actualizar
        this.token = token

        //Almacenar
        localStorage.setItem('token', token)

        router.push('/dashboard')
        return true
      }

      return false; // Return false if login fails or no return path is reached



    },

    logout() {
      //restablece
      this.user = null
      this.token = null

      //elimina
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      router.push('/login')

    },
  },
})
