import { ref } from 'vue';
import instance from '../axios';
import z from 'zod';

const userSchema = z.object({
    id: z.string(),
    nom: z.string(),
    prenom: z.string(),
    email: z.string(),
    telephone: z.string(),
    wantsMailNewProduct: z.boolean(),
    wantsMailRestockProduct: z.boolean(),
    wantsMailChangingPrice: z.boolean(),
    wantsMailNewsletter: z.boolean(),
});

const adminUserSchema = userSchema.extend({
    role: z.string(),
});

const updateUserSchema = userSchema.omit({
    wantsMailNewProduct: true,
    wantsMailRestockProduct: true,
    wantsMailChangingPrice: true,
    wantsMailNewsletter: true,
}).extend({
    currentPassword: z.string().min(1, "Mot de passe actuel est requis"),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});


export const useUser = () => {
    const user = ref(null);
    const users = ref([]);
    const loading = ref(false);

    // Fonction pour récupérer l'utilisateur par son ID
    const fetchUser = async (userId) => {
        loading.value = true;
        try {
            const response = await instance.get(`users/${userId}`);
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

    // Fonction pour récupérer tous les utilisateurs
    const fetchUsers = async () => {
        loading.value = true;
        try {
            const response = await instance.get(`users`);
            if (!response.data) {
                console.error('Aucune donnée utilisateur trouvée');
                return;
            }

            if (Array.isArray(response.data)) {
                users.value = response.data.map((user) => adminUserSchema.parse(user));
            } else {
                console.error('Réponse invalide: les données de user sont invalides');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
        } finally {
            loading.value = false;
        }
    };

    // Fonction pour mettre à jour l'utilisateur par son ID
    const updateUser = async (updatedUser) => {
        loading.value = true;
        try {
            const validatedData = updateUserSchema.parse(updatedUser);
            
            // Préparez les données à envoyer, en excluant les champs de mot de passe si non fournis
            const dataToUpdate = {
                nom: validatedData.nom,
                prenom: validatedData.prenom,
                email: validatedData.email,
                telephone: validatedData.telephone,
                password: validatedData.currentPassword,
            };

            if (validatedData.newPassword) {
                dataToUpdate.newPassword = validatedData.newPassword;
                dataToUpdate.confirmPassword = validatedData.confirmPassword;
            }

            const response = await instance.put(`users/${validatedData.id}`, dataToUpdate);
            if (!response.data) {
                console.error('Aucune donnée utilisateur trouvée');
                return;
            }
            else if (response.data.error) {
                console.error('Erreur lors de la mise à jour de l\'utilisateur:', response.data.error);
                return;
            }
            
            user.value = userSchema.parse(response.data);
            return true;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        } finally {
            loading.value = false;
        }
    };

    // Fonction pour supprimer l'utilisateur par son ID
    const deleteUser = async (userId) => {
        loading.value = true;
        try {
            console.log('userId:', userId);
            const response = await instance.delete(`users/${userId}`);
            if (!response.data) {
                console.error('Aucune donnée utilisateur trouvée');
                return;
            }
            else if (response.data.error) {
                console.error('Erreur lors de la suppression de l\'utilisateur:', response.data.error);
                return;
            }
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        } finally {
            loading.value = false;
        }
    };
    
    const isPasswordValid = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers &&
            hasSpecialChar
        );
    };

    const isEmailAddressValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return {
        user,
        users,
        loading,
        fetchUser,
        fetchUsers,
        updateUser,
        deleteUser,
        isPasswordValid,
        isEmailAddressValid,
    };
};
