import { ref } from 'vue';
import axios from 'axios';
import z from 'zod';

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
});

const userSchema = z.object({
    nom: z.string(),
    prenom: z.string(),
    email: z.string(),
    telephone: z.string(),
    role: z.string()
});

export const useUser = () => {
    const user = ref(null);
    const loading = ref(false);

    // Fonction pour récupérer l'utilisateur par son ID
    const fetchUser = async (userId) => {
        loading.value = true;
        try {
            const response = await instance.get(`users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.data) {
                console.error('Aucune donnée utilisateur trouvée');
                return;
            }
            user.value = userSchema.parse(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        } finally {
            loading.value = false;
        }
    };

    // Fonction pour mettre à jour l'utilisateur par son ID
    const updateUser = async (userId, updatedUser) => {
        loading.value = true;
        try {
            const validatedData = userSchema.parse(updatedUser);
            const response = await axios.put(`users/${userId}`, validatedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            user.value = userSchema.parse(response.data);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        } finally {
            loading.value = false;
        }
    };

    return {
        user,
        loading,
        fetchUser,
        updateUser,
    };
};