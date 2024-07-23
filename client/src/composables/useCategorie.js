import { ref } from 'vue';
import instance from '../axios';
import z from 'zod';

const produitSchema = z.object({
    _id: z.string(),
    nom: z.string(),
    description: z.string(),
    prix: z.string(),
});

const categorieSchema = z.object({
    id: z.string().optional(),
    nom: z.string().min(1).max(50),
    description: z.string().min(1).max(255),
    produits: z.array(produitSchema).optional(),
});

export const useCategorie = () => {
    const categorie = ref(null);
    const categories = ref([]);
    const loading = ref(false);

    const fetchCategorie = async () => {
        loading.value = true;
        try {
            const response = await instance.get(`categories/`);
            if (!response.data) {
                console.error('Aucune donnée catégorie trouvée');
                return;
            }

            categorie.value = categorieSchema.parse(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération de la catégorie:', error);
        } finally {
            loading.value = false;
        }
    };

    const fetchCategories = async () => {
        loading.value = true;
        try {
            const response = await instance.get('categories');
            if (!response.data) {
                console.error('Aucune donnée catégorie trouvée');
                return;
            }

            if (Array.isArray(response.data)) {
                categories.value = response.data.map((categorie) => categorieSchema.parse(categorie));
            } else {
                console.error('Réponse invalide: les données de catégorie sont invalides');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
        } finally {
            loading.value = false;
        }
    };

    // Doit être modifié pour correspondre à la structure de contact
    const deleteCategorie = async (id) => {
        loading.value = true;
        try {
            const response = await instance.delete(`categories/${id}`);
            if (!response.data) {
                console.error('Catégorie non trouvée');
                return;
            }

            categories.value = categories.value.filter((categorie) => categorie.id !== id);
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie:', error);
        } finally {
            loading.value = false;
        }
    };

    // Doit être modifié pour correspondre à la structure de contact
    const updateCategorie = async (updatedCategorie) => {
        loading.value = true;
        try {
            const validatedData = categorieSchema.parse(updatedCategorie);
            if (!validatedData) {
                console.error('Données de catégorie invalides');
                return;
            }
            const response = await instance.put(`categories/${validatedData.id}`);
            if (!response.data) {
                console.error('Aucune donnée catégorie trouvée');
                return;
            }
            const index = categories.value.findIndex((categorie) => categorie.id === response.data.id);
            categories.value[index] = categorieSchema.parse(response.data);
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour de la catégorie:', error);
        } finally {
            loading.value = false;
        }
    };  
    

    return { 
        categorie, 
        categories, 
        loading, 
        fetchCategorie, 
        fetchCategories,
        updateCategorie,
        deleteCategorie
    };
}
