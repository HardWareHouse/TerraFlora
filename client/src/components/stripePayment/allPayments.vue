<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Recent Balance Transactions</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-left border-b">
            <th class="p-4">Amount</th>
            <th class="p-4">Customer</th>
            <th class="p-4">Description</th>
            <th class="p-4">Status</th>
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
              <span
                v-if="transaction.refunded === false"
                class="text-green-500"
              >
                {{ capitalize(transaction.status) }}
              </span>
              <span v-if="transaction.refunded === true" class="text-red-500">
                Refunded
              </span>
            </td>
            <td class="p-4">
              <a :href="transaction.receipt_url" download
                ><i class="bi bi-eye"></i
              ></a>
              <button
                v-if="transaction.refunded === false"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                @click="issueRefund(transaction.id)"
              >
                Refund
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Generate Payment Link</h1>
    <div class="overflow-x-auto">
      <form @submit.prevent="handleSubmit">
        <table class="min-w-full bg-white border rounded-lg">
          <thead>
            <tr class="bg-gray-100 text-left border-b">
              <th class="p-4">Price</th>
              <th class="p-4">Product</th>
              <th class="p-4">Quantity</th>
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
            Generate Payment Link
          </button>
        </div>
      </form>
    </div>
    <div v-if="paymentLink" class="mt-4">
      <h2 class="text-xl font-bold">Payment Link</h2>
      <a :href="paymentLink" target="_blank" class="text-blue-500 underline">
        {{ paymentLink }}
      </a>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "AllPayments",
  setup() {
    const balanceTransactions = ref([]);

    const fetchBalanceTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/stripe/transactions"
        );
        balanceTransactions.value = response.data.data;
      } catch (error) {
        console.error("Error fetching balance transactions:", error);
      }
    };

    const issueRefund = async (transactionId) => {
      try {
        const refundResponse = await axios.post(
          "http://localhost:8000/stripe/refund",
          { transactionId }
        );
        console.log("Refund successful:", refundResponse);
        await fetchBalanceTransactions(); // Fetch the updated transactions
      } catch (error) {
        console.error("Error issuing refund:", error);
      }
    };

    const products = ref([]);
    const paymentLink = ref(""); // Add a reactive variable for the payment link
    const selectedProducts = ref({});

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/product/");
        products.value = response.data;
        products.value.forEach((product) => {
          selectedProducts.value[product.priceId] = 0; // Initialize all products with quantity 1
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const handleSubmit = async () => {
      const lineItems = Object.entries(selectedProducts.value)
        .filter(([_, quantity]) => quantity > 0) // Exclude products with quantity 0
        .map(([price, quantity]) => ({ price, quantity }));

      try {
        const response = await axios.post(
          "http://localhost:8000/stripe/payment-link",
          {
            lineItems,
          }
        );
        paymentLink.value = response.data.url; // Update the reactive variable with the generated link
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
      paymentLink, // Return the reactive variable
      selectedProducts,
      handleSubmit,
    };
  },
};
</script>
