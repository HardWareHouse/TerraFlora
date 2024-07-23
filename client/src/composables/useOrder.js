import { ref } from 'vue';
import instance from '../axios';
import z from 'zod';

const orderSchema = z.object({
    id: z.string().optional(),
    numero: z.string().min(1).max(255),
    statut: z.string().min(1).max(255),
    dateCommande: z.string(),
    total: z.number(),
    trackingNumber: z.string().nullable(),
});

export const useOrder = () => {
    const orders = ref([]);
    const order = ref(null);
    const loading = ref(false);
    
    const fetchOrders = async () => {
        loading.value = true;
        try {
            const response = await instance.get(`orders`);
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

    const fetchOrderById = async (orderId) => {
        loading.value = true;
        try {
            const response = await instance.get(`/orders/${orderId}`);
    
            if (!response.data) {
                console.error('Aucune donnée commande trouvée');
                return;
            }
            order.value = orderSchema.parse(response.data);
    
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            loading.value = false;
        }
    };
    
    // A modifier pour correspondre à la structure de la commande
    const updateOrder = async (orderId, updatedOrder) => {
        console.log(orderId);
    };
    
    // A modifier pour correspondre à la structure de la commande
    const deleteOrder = async (orderId) => {
        console.log(orderId);
    };
    
    return {
        order,
        orders,
        loading,
        fetchOrders,
        fetchOrderById,
        deleteOrder,
    };
    };