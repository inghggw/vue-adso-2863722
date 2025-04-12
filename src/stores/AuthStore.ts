import router from '@/router';
import AuthService from '@/services/AuthService';
import { defineStore } from 'pinia'
//import { router } from '@/router'

export const authSetStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'), //toDo:Se puede reventar al proteger las rutas por el NULL porque no es un JSON string válido
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(userData: { email: string, password: string }): Promise<boolean>{
      debugger
      const auth = new AuthService
        const login = await auth.login(userData.email, userData.password)
    debugger
      if (login.ok && login.token) {
        const token = login.token
        //Actualizar
        this.token = token

        //Almacenar
        localStorage.setItem('token', token)
 
        router.push('/dashboard')
        return true
      }

      return false
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
