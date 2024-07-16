// Fichier composable useContact.js
import { ref } from 'vue';
import instance from '../axios';
import z from 'zod';

const contactSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  subject: z.string().min(1, "Le sujet est requis").max(50, "Le sujet ne doit pas dépasser 50 caractères"),
  message: z.string().min(1, "Le message est requis").max(300, "Le message ne doit pas dépasser 300 caractères"),
  email: z.string(),
});

const contactUpdateSchema = contactSchema.extend({
    userId: z.string().optional(),
});

export const useContact = () => {
  const contact = ref(null);
  const loading = ref(false);

  // Fonction pour envoyer un message de contact
  const sendContactMessage = async (contactData) => {
    loading.value = true;
    try {
      const validatedData = contactSchema.parse(contactData);
      if (!isEmailAddressValid(validatedData.email)) {
        throw new Error('L\'adresse email est invalide');
      }

      const response = await instance.post('contacts', validatedData);
      contact.value = response.data;
      return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message de contact:', error);
        throw error;
    } finally {
      loading.value = false;
    }
  };

  const isEmailAddressValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return {
    contact,
    loading,
    sendContactMessage,
    isEmailAddressValid,
  };
};
