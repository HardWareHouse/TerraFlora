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
});

export const useInvoice = () => {
    const invoices = ref([]);
    const invoice = ref(null);
    const loading = ref(false);
    
    const fetchInvoices = async () => {
        loading.value = true;
        try {
            const response = await instance.get(`invoices/`);
    
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
    
    // A modifier pour correspondre à la structure de la facture
    const createInvoice = async (newInvoice) => {
        loading.value = true;
        try {
        const validatedData = invoiceSchema.parse(newInvoice);
        if (!validatedData) {
            console.error('Données de facture invalides');
            return;
        }
        const response = await instance.post('invoices', validatedData);
        if (!response.data) {
            console.error('Aucune donnée facture trouvée');
            return;
        }

        invoices.value = [...invoices.value, invoiceSchema.parse(response.data)];
        } catch (error) {
            console.error('Error creating invoice:', error);
        } finally {
            loading.value = false;
        }
    };
    
    const updateInvoice = async (updatedInvoice) => {
        loading.value = true;
        try {
        const validatedData = invoiceSchema.parse(updatedInvoice);
        if (!validatedData) {
            console.error('Données de facture invalides');
            return;
        }
        const response = await instance.put(`invoices/${validatedData.id}`);
        if (!response.data) {
            console.error('Aucune donnée facture trouvée');
            return;
        }
        const index = invoices.value.findIndex((invoice) => invoice.id === response.data.id);
        invoices.value[index] = invoiceSchema.parse(response.data);
        }
        catch (error) {
            console.error('Error updating invoice:', error);
        } finally {
            loading.value = false;
        }
    };

    return { 
        invoices, 
        invoice, 
        loading, 
        fetchInvoices, 
        createInvoice, 
        updateInvoice 
    };
}

