import User from '../models/User.js'; // Asegúrate de reemplazar esto con la ruta correcta a tu modelo de Usuario

async function getUserPassword(username) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user.password;
}

export default getUserPassword;