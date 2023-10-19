import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const Subscription = (props) => (
 <tr>
   <td>{props.subscription.email}</td>
   <td><button onClick={() => props.openModal(props.subscription._id)}>Eliminar</button></td>
 </tr>
);

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/suscribirme');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    // Aquí debes verificar la contraseña antes de eliminar la suscripción
    try {
      const response = await fetch(`http://localhost:5050/api/admin/verifyPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const { isPasswordCorrect } = await response.json();
  
      if (isPasswordCorrect) {
        // Si la contraseña es correcta, procede con la eliminación
        const deleteResponse = await fetch(`http://localhost:5050/api/suscribirme/${idToDelete}`, { method: 'DELETE' });
        if (!deleteResponse.ok) {
          throw new Error(`HTTP error! status: ${deleteResponse.status}`);
        }
        fetchSubscriptions(); // Refetch the subscriptions after one is deleted
        setModalIsOpen(false); // Close the modal
      } else {
        // Si la contraseña no es correcta, muestra un mensaje de error
        alert('Contraseña incorrecta');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (id) => {
    setIdToDelete(id);
    setModalIsOpen(true);
  };

  return (
    <div>
      <h3>Lista de suscripciones</h3>
      <table className="table table-striped" style={{ marginTop: 40 }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <Subscription subscription={subscription} key={subscription._id} openModal={openModal} />
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIsOpen}>
        <h2>Confirmar eliminación</h2>
        <p>Por favor, introduce tu contraseña para confirmar la eliminación:</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleDelete}>Confirmar</button>
        <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
      </Modal>
    </div>
  );
};

export default SubscriptionList;
