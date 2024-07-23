import { ref } from 'vue';
import instance from '../axios';
import z from 'zod';

const invoiceSchema = z.object({
    id: z.string().optional(),
    numero: z.string().min(1).max(255),
    statutPaiement: z.string().min(1).max(255),
    dateFacturation: z.string(),
    total: z.number(),
    datePaiementDue: z.string().nullable(),
    invoiceUrl: z.string().optional(),
});

export const useInvoice = () => {
    const invoices = ref([]);
    const invoice = ref(null);
    const loading = ref(false);
    
    const fetchInvoices = async () => {
        loading.value = true;
        try {
            const response = await instance.get(`invoices`);
    
            if (!response.data) {
                console.error('Aucune donnée facture trouvée');
                return;
            }

            if (Array.isArray(response.data)) {
                invoices.value = response.data.map((invoice) => invoiceSchema.parse(invoice));
            } else {
                console.error('Réponse invalide: les données de facture sont invalides');
            }

        } catch (error) {
            console.error('Error fetching invoices:', error);
        } finally {
            loading.value = false;
        }
    };
    
    const updateInvoice = async (invoiceId, updatedInvoice) => {
        console.log(id);
    };

    // Doit être modifié pour correspondre à la structure de contact
    const deleteInvoice = async (invoiceId) => {
        console.log(id);
    }

    return { 
        invoices, 
        invoice, 
        loading, 
        fetchInvoices, 
        deleteInvoice
    };
}

