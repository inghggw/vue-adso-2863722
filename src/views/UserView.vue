<template>
  <v-container class="py-5">
    <!-- Formulario de Usuario -->
    <v-card class="mb-5" outlined>
      <v-card-title class="text-h5 text-center">Formulario de Usuario</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Nombre"
                v-model="user.nombre"
                required
                outline
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Apellido"
                v-model="user.apellido"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Email"
                v-model="user.correo"
                type="email"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Número de Celular"
                v-model="user.celular"
                type="tel"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="primary" @click="saveUser">Crear</v-btn>
        <v-btn color="secondary" @click="assignRoleToUser(user)">Asignar rol</v-btn>
        <v-btn color="error" @click="clearForm">Limpiar</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Tabla de Usuarios -->
    <v-card outlined>
      <v-card-title class="text-h6">Lista de Usuarios</v-card-title>
      <v-data-table
        :headers="[
          { title: 'ID', value: 'id' },
          { title: 'Nombre', value: 'nombre' },
          { title: 'Apellido', value: 'apellido' },
          { title: 'Correo', value: 'correo' },
          { title: 'Celular', value: 'celular' },
          { title: 'Rol', value: 'role' },
          { title: 'Acciones', value: 'actions', sortable: false },
        ]"
        :items="users"
        item-value="id"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <v-menu>
            <template #activator="{ props }">
              <v-btn v-bind="props" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="editUser(item)">
                <v-list-item-title>Actualizar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="item.id !== undefined && deleteUser(item.id)">
                <v-list-item-title>Eliminar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="assignRoleToUser(item)">
                <v-list-item-title>Asignar Rol</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <!-- Snackbar de Feedback -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
      <template #actions>
        <v-btn text @click="snackbar.show = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { VForm } from 'vuetify/components';

interface User {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  role?: string;
}

const form = ref<VForm | null>(null);
const valid = ref(false);
const user = ref<User>({
  nombre: '',
  apellido: '',
  correo: '',
  celular: '',
});
const users = ref<User[]>([]);
const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
});
const isEditing = ref(false);
const apiUrl = 'http://localhost:3333/usuarios'; // Cambia esto por la URL de tu API

// Obtener el token del almacenamiento local
const token = localStorage.getItem('token');
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

// Mostrar mensajes en el snackbar
function showSnackbar(message: string, color: string) {
  snackbar.value.message = message;
  snackbar.value.color = color;
  snackbar.value.show = true;
}

// Cargar usuarios desde el backend
async function fetchUsers() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers,
    });
    if (!response.ok) throw new Error('Error al cargar los usuarios');
    users.value = await response.json();
  } catch (error) {
    console.error(error);
    showSnackbar('Error al cargar los usuarios', 'error');
  }
}

// Guardar usuario en el backend
async function saveUser() {
  if (valid.value) {
    try {
      if (isEditing.value && user.value.id !== undefined) {
        // Actualizar usuario
        const response = await fetch(`${apiUrl}/${user.value.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(user.value),
        });
        if (!response.ok) throw new Error('Error al actualizar el usuario');
        showSnackbar('Usuario actualizado con éxito', 'success');
      } else {
        // Crear usuario
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(user.value),
        });
        if (!response.ok) throw new Error('Error al crear el usuario');
        const newUser = await response.json();
        users.value.push(newUser);
        showSnackbar('Usuario creado con éxito', 'success');
      }
      clearForm();
      fetchUsers(); // Recargar la lista de usuarios
    } catch (error) {
      console.error(error);
      showSnackbar('Error al guardar el usuario', 'error');
    }
  } else {
    showSnackbar('Por favor, completa todos los campos correctamente.', 'error');
  }
}

// Eliminar usuario en el backend
async function deleteUser(id: number) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Error al eliminar el usuario');
    users.value = users.value.filter((user) => user.id !== id);
    showSnackbar('Usuario eliminado con éxito', 'info');
  } catch (error) {
    console.error(error);
    showSnackbar('Error al eliminar el usuario', 'error');
  }
}

// Asignar rol (simulado)
function assignRoleToUser(selectedUser: User) {
  console.log('Asignar rol a:', selectedUser);
  showSnackbar(`Rol asignado a ${selectedUser.nombre} (simulado)`, 'info');
}

// Limpiar el formulario
function clearForm() {
  user.value = { nombre: '', apellido: '', correo: '', celular: '' };
  isEditing.value = false;
  form.value?.resetValidation();
}

// Editar usuario
function editUser(selectedUser: User) {
  user.value = { ...selectedUser };
  isEditing.value = true;
}

// Cargar usuarios al montar el componente
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.v-card {
  border: 2px solid #1976d2 !important;
}

.v-card-title {
  font-weight: bold;
}

.v-btn {
  margin-left: 0.5rem;
}
</style>
