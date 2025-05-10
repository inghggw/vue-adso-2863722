<template>
  <v-container class="user-form">
    <v-card>
      <v-card-title class="text-h5 text-center">Formulario de Usuario</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            label="Nombre"
            v-model="user.firstName"
            required
            outlined
          ></v-text-field>
          <v-text-field
            label="Apellido"
            v-model="user.lastName"
            required
            outlined
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="user.email"
            type="email"
            required
            outlined
          ></v-text-field>
          <v-text-field
            label="Número de Celular"
            v-model="user.phone"
            type="tel"
            required
            outlined
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveUser">Guardar</v-btn>
        <v-btn color="success" @click="assignRole">Asignar Rol</v-btn>
        <v-btn color="error" @click="clearForm">Limpiar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  
    <!-- Tabla de usuarios -->
    <v-card class="mt-5">
      <v-card-title class="text-h6">Lista de Usuarios</v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        item-value="id"
        class="elevation-1"
      >
        <template #item.actions="{ item }">
          <v-menu>
            <template #activator="{ props }">
              <v-btn v-bind="props" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="editUser(item)">
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteUser(item.id)">
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

</template>

<script>
export default {
  data() {
    return {
      valid: false,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'firstName' },
        { text: 'Apellido', value: 'lastName' },
        { text: 'Correo', value: 'email' },
        { text: 'Celular', value: 'phone' },
        { text: 'Rol', value: 'role' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      users: [
        { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan@example.com', phone: '1234567890', role: 'Admin' },
        { id: 2, firstName: 'Ana', lastName: 'Gómez', email: 'ana@example.com', phone: '0987654321', role: 'Usuario' }
      ]
    };
  },
  methods: {
    saveUser() {
      if (this.valid) {
        console.log('Usuario guardado:', this.user);
        alert('Usuario guardado correctamente');
        this.users.push({ ...this.user, id: this.users.length + 1, role: 'Sin asignar' });
        this.clearForm();
      } else {
        alert('Por favor, completa todos los campos correctamente.');
      }
    },
    assignRole() {
      console.log('Rol asignado a:', this.user);
      alert('Rol asignado correctamente');
    },
    clearForm() {
      this.user = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      };
      this.$refs.form.resetValidation();
    },
    editUser(user) {
      console.log('Editar usuario:', user);
      alert(`Editar usuario: ${user.firstName} ${user.lastName}`);
    },
    deleteUser(id) {
      this.users = this.users.filter(user => user.id !== id);
      alert('Usuario eliminado correctamente');
    },
    assignRoleToUser(user) {
      console.log('Asignar rol a:', user);
      alert(`Rol asignado a: ${user.firstName} ${user.lastName}`);
    }
  }
};
</script>
