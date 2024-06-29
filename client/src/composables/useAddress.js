import { ref } from 'vue';
import axios from 'axios';
import z from 'zod';

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
});

const addressSchema = z.object({
  id: z.string().optional(),
  adresse: z.string(),
  rue: z.string(),
  numero: z.string(),
  ville: z.string(),
  codePostal: z.string(),
});

export const useAddress = () => {
  const address = ref(null);
  const loading = ref(false);

  // Fonction pour récupérer l'adresse par l'ID de l'utilisateur
  const fetchAddressByUserId = async (userId) => {
    loading.value = true;
    try {
      const response = await instance.get(`address/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.data) {
        console.error('Aucune donnée adresse trouvée');
        return;
      }
      
      address.value = addressSchema.parse(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'adresse:', error);
    } finally {
      loading.value = false;
    }
  };

  // Fonction pour créer une adresse
  const createAddress = async (userId, newAddress) => {
    loading.value = true;
    try {
      const validatedData = addressSchema.parse(newAddress);
      if (!validatedData) {
        console.error('Les données de l\'adresse ne sont pas valides');
        return;
      }

      validatedData.userId = userId;
      const response = await instance.post('address', validatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.data) {
        console.error('Aucune donnée adresse trouvée');
        return;
      }

      address.value = addressSchema.parse(response.data);
    } catch (error) {
      console.error('Erreur lors de la création de l\'adresse:', error);
    } finally {
      loading.value = false;
    }
  };

  // Fonction pour mettre à jour l'adresse par son ID
  const updateAddress = async (addressId, updatedAddress) => {
    loading.value = true;
    try {
      const validatedData = addressSchema.parse(updatedAddress);
      if (!validatedData) {
        console.error('Les données de l\'adresse ne sont pas valides');
        return;
      }

      const response = await instance.put(`address/${addressId}`, validatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.data) {
        console.error('Aucune donnée adresse trouvée');
        return;
      }
      
      address.value = addressSchema.parse(response.data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'adresse:', error);
    } finally {
      loading.value = false;
    }
  };

  return {
    address,
    loading,
    fetchAddressByUserId,
    createAddress,
    updateAddress,
  };
};
