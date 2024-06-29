import { ref } from 'vue';
import axios from 'axios';
import z from 'zod';

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
});

const addressSchema = z.object({
  rue: z.string(),
  numero: z.string(),
  ville: z.string(),
  codePostal: z.string(),
}).omit({ id: true, adresse: true });

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
      address.value = addressSchema.parse(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'adresse:', error);
    } finally {
      loading.value = false;
    }
  };

  // Fonction pour mettre à jour l'adresse par son ID
  const updateAddress = async (addressId, updatedAddress) => {
    loading.value = true;
    try {
      const validatedData = addressSchema.parse(updatedAddress);
      const response = await axios.put(`adress/${addressId}`, validatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
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
    updateAddress,
  };
};
