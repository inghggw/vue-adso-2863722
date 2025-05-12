const API_BASE_URL = 'http://localhost:3333/usuarios';

export const fetchUsers = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token no disponible');

  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Error al obtener usuarios');

  return await response.json();
};

interface UserData {
  nombre: string;
  correo: string;
  password: string;
}

export const createUser = async (userData: UserData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) throw new Error('Error al crear usuario');
  return await response.json();
};

export const updateUser = async (userId: number, userData: Partial<UserData>) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/usuarios/${userId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) throw new Error('Error al actualizar usuario');
  return await response.json();
};

export const deleteUser = async (userId: number) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/usuarios/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!response.ok) throw new Error('Error al eliminar usuario');
  return await response.json();
};
