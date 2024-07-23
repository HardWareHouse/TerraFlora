<template>
  <!-- Balance Transactions Table -->
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Tous les paiements</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-left border-b">
            <th class="p-4">Montant</th>
            <th class="p-4">Client</th>
            <th class="p-4">Description</th>
            <th class="p-4">Statut</th>
            <th class="p-4">Date</th>
            <th class="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in balanceTransactions"
            :key="transaction.id"
            class="border-b"
          >
            <td class="p-4">{{ (transaction.amount / 100).toFixed(2) }} €</td>
            <td class="p-4">{{ transaction.billing_details.name }}</td>
            <td class="p-4">{{ transaction.description }}</td>
            <td class="p-4">
              <span v-if="!transaction.refunded" class="text-green-500">
                Réussi
              </span>
              <span v-if="transaction.refunded" class="text-orange-500">
                Remboursé
              </span>
              <span
                v-if="!transaction.refunded && !transaction.paid"
                class="text-red-500"
              >
                Echoué
              </span>
            </td>
            <td class="p-4">{{ formatTimestamp(transaction.created) }}</td>
            <td class="p-4 flex items-center">
              <a :href="transaction.receipt_url" download>
                <i class="bi bi-eye"></i>
              </a>
              <ConfirmationModal
                v-if="!transaction.refunded"
                :onConfirm="() => issueRefund(transaction.id)"
                buttonClass="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-5"
                confirmationMessage="Êtes-vous sûr de vouloir rembourser cette transaction ?"
              >
                Rembourser
              </ConfirmationModal>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 flex items-center justify-center space-x-2">
      <button
        :disabled="!hasPrevPage"
        @click="prevPage"
        :class="{
          'bg-gray-500 hover:bg-gray-600': hasPrevPage,
          'bg-gray-400': !hasPrevPage,
        }"
        class="text-white font-bold py-2 px-4 rounded"
      >
        &laquo; Précédant
      </button>
      <button
        :disabled="!hasNextPage"
        @click="nextPage"
        :class="{
          'bg-blue-500 hover:bg-blue-600': hasNextPage,
          'bg-gray-400': !hasNextPage,
        }"
        class="text-white font-bold py-2 px-4 rounded"
      >
        Suivant &raquo;
      </button>
    </div>
  </div>

  <!-- Payment Link Generator Form -->
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Générer un lien de paiement</h1>
    <div class="overflow-x-auto">
      <form @submit.prevent="handleSubmit">
        <table class="min-w-full bg-white border rounded-lg">
          <thead>
            <tr class="bg-gray-100 text-left border-b">
              <th class="p-4">Prix</th>
              <th class="p-4">Produit</th>
              <th class="p-4">Quantité</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" class="border-b">
              <td class="p-4">{{ product.prix }} €</td>
              <td class="p-4">{{ product.nom }}</td>
              <td class="p-4">
                <input
                  type="number"
                  v-model.number="selectedProducts[product.priceId]"
                  min="0"
                  class="w-full p-2 border rounded"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Générer
          </button>
        </div>
      </form>
    </div>
    <div v-if="paymentLink" class="mt-4">
      <h2 class="text-xl font-bold">Lien de paiement :</h2>
      <a :href="paymentLink" target="_blank" class="text-blue-500 underline">
        {{ paymentLink }}
      </a>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import ConfirmationModal from "./confirmationModal.vue"; // Import your modal component
export default {
  name: "AllPayments",
  components: {
    ConfirmationModal,
  },
  setup() {
    const balanceTransactions = ref([]);
    const limit = ref(10);
    const startingAfter = ref(null);
    const endingBefore = ref(null);
    const hasNextPage = ref(false);
    const hasPrevPage = ref(false);
    const currentPage = ref(1);
    const selectedTransactionId = ref(null); // Track selected transaction for refund

    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    };

    const fetchBalanceTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/stripe/transactions?limit=${limit.value}&starting_after=${startingAfter.value || ""}&ending_before=${endingBefore.value || ""}`
        );
        balanceTransactions.value = response.data.data;
        hasNextPage.value = response.data.has_more;
        hasPrevPage.value = currentPage.value > 1;
      } catch (error) {
        console.error("Error fetching balance transactions:", error);
      }
    };

    const nextPage = () => {
      if (hasNextPage.value) {
        startingAfter.value =
          balanceTransactions.value[balanceTransactions.value.length - 1].id;
        endingBefore.value = null;
        currentPage.value += 1;
        fetchBalanceTransactions();
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        endingBefore.value = balanceTransactions.value[0].id;
        startingAfter.value = null;
        currentPage.value -= 1;
        fetchBalanceTransactions();
      }
    };

    const issueRefund = async (transactionId) => {
      try {
        const refundResponse = await axios.post(
          "http://localhost:8000/stripe/refund",
          { transactionId }
        );
        console.log("Refund successful:", refundResponse);
        await fetchBalanceTransactions();
      } catch (error) {
        console.error("Error issuing refund:", error);
      }
    };

    const products = ref([]);
    const paymentLink = ref("");
    const selectedProducts = ref({});

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/product/");
        products.value = response.data;
        products.value.forEach((product) => {
          selectedProducts.value[product.priceId] = 0;
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const handleSubmit = async () => {
      const lineItems = Object.entries(selectedProducts.value)
        .filter(([_, quantity]) => quantity > 0)
        .map(([price, quantity]) => ({ price, quantity }));

      try {
        const response = await axios.post(
          "http://localhost:8000/stripe/payment-link",
          { lineItems }
        );
        paymentLink.value = response.data.url;
        console.log(paymentLink.value);
      } catch (error) {
        console.error("Error creating payment link:", error);
      }
    };

    const capitalize = (value) => {
      if (!value) return "";
      return value.charAt(0).toUpperCase() + value.slice(1);
    };

    onMounted(() => {
      fetchBalanceTransactions();
      fetchProducts();
    });

    return {
      balanceTransactions,
      issueRefund,
      capitalize,
      products,
      paymentLink,
      selectedProducts,
      handleSubmit,
      formatTimestamp,
      nextPage,
      prevPage,
      hasNextPage,
      hasPrevPage,
      selectedTransactionId,
    };
  },
};
</script>
