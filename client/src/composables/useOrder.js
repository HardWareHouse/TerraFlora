import { ref } from 'vue';
import axios from 'axios';
import z from 'zod';

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
});

const orderSchema = z.object({
    id: z.string().optional(),
    numero: z.string().min(1).max(255),
    statut: z.string().min(1).max(255),
    dateCommande: z.string(),
    total: z.number(),
    dateLivraisonPrevue: z.string().nullable(),
    dateLivraisonFinale: z.string().nullable(),
});

export const useOrder = () => {
    const orders = ref([]);
    const order = ref(null);
    const loading = ref(false);
    
    const fetchOrderByUserId = async (userId) => {
        loading.value = true;
        try {
            if (!userId) {
                console.error('Aucun identifiant utilisateur fourni, impossible de récupérer les commandes');
                return;
            }
            const response = await instance.get(`orders/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            if (!response.data) {
                console.error('Aucune donnée commande trouvée');
                return;
            }

            if (Array.isArray(response.data)) {
                orders.value = response.data.map((order) => orderSchema.parse(order));
            } else {
                console.error('Réponse invalide: les données de commande sont invalides');
            }

        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            loading.value = false;
        }
    };
    
    // A modifier pour correspondre à la structure de la commande
    const createOrder = async (newOrder) => {
        loading.value = true;
        try {
        const validatedData = orderSchema.parse(newOrder);
        if (!validatedData) {
            console.error('Invalid order data');
            return;
        }
    
        const response = await instance.post('order', validatedData, {
            headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            },
        });
        console.log(response.data);
        } catch (error) {
        console.error('Error creating order:', error);
        } finally {
        loading.value = false;
        }
    };
    
    // A modifier pour correspondre à la structure de la commande
    const updateOrder = async (orderId, updatedOrder) => {
        loading.value = true;
        try {
        const validatedData = orderSchema.parse(updatedOrder);
        if (!validatedData) {
            console.error('Invalid order data');
            return;
        }
    
        const response = await instance.put(`order/${orderId}`, validatedData, {
            headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            },
        });
        console.log(response.data);
        } catch (error) {
        console.error('Error updating order:', error);
        } finally {
        loading.value = false;
        }
    };
    
    // A modifier pour correspondre à la structure de la commande
    const deleteOrder = async (orderId) => {
        loading.value = true;
        try {
        const response = await instance.delete(`order/${orderId}`, {
            headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            },
        });
        console.log(response.data);
        } catch (error) {
        console.error('Error deleting order:', error);
        } finally {
        loading.value = false;
        }
    };
    
    return {
        order,
        orders,
        loading,
        fetchOrderByUserId,
        createOrder,
        updateOrder,
        deleteOrder,
    };
    };