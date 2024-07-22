import { defineStore } from 'pinia';
import instance from '../axios.js';
import { useAuthStore } from './../pinia/auth.js'; 

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        cartId: null,
        userId: null,
    }),
    getters: {
        cartTotal: (state) => state.items.reduce((acc, item) => acc + parseFloat(item.prix) * item.quantity, 0),
                cartItemCount: (state) => state.items.length,
    },
    actions: {
        async fetchUserCart() {
            const authStore = useAuthStore();
            authStore.getUseriD().then(userId => {
              if (userId) {
                instance.get(`cart/${userId}`).then(response => {
                  if (response.data && response.data.id) {
                    this.cartId = response.data.id;
                    this.items = response.data.Produits.map(item => ({
                      ...item,
                    }));
                    console.log(this.items);
                    console.log('Cart ID:', this.cartId);
                    console.log('Cart Items:', response.data.Produits);
                  }
                });
              }
            });
          },
        async addToCart(product, quantity = 1) {
            const authStore = useAuthStore();
            this.userId = await authStore.getUseriD();

            if (product.stock <= 0) {
                alert('Ce produit est en rupture de stock');
                return;
            }

            if (!this.cartId) {
                // Créer un nouveau panier s'il n'existe pas
                try {
                    const response = await instance.post('cart', {
                        userId: this.userId,
                        produits: [product.id],
                    });
                    this.cartId = response.data.id;
                    this.items = response.data.produits.map(item => ({
                        ...item,
                        quantity: item.Panier_Produits.quantity
                    }));
                } catch (error) {
                    console.error('Error creating cart:', error);
                    return;
                }
            } else {
                // Mettre à jour le panier existant
                try {
                    const response = await instance.put(`cart/${this.cartId}`, {
                        userId: this.userId,
                        produits: [product.id],
                    });
                    console.log(response.data);
                } catch (error) {
                    console.error('Error updating cart:', error);
                    return;
                }
            }
            const existingProduct = this.items.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                this.items.push({ ...product, quantity });
            }
        },
        updateQuantity(productId, quantity) {
            const product = this.items.find(item => item.id === productId);
            if (product) {
                product.quantity = quantity;
                if (product.quantity <= 0) {
                    this.removeItem(productId);
                }
            }
        },
        async removeItem(productId) {
            const authStore = useAuthStore();
            this.userId = await authStore.getUseriD();
            try {
                await instance.delete(`cart/${this.userId}/product/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${useAuthStore().token}`,
                    },
                });
                this.items = this.items.filter(item => item.id !== productId);
            } catch (error) {
                console.error('Error removing product from cart:', error);
            }
        },
        clearCart() {
            this.items = [];
            this.cartId = null;
        },
        async subtractStock() {
            try {
                const response = await instance.post('product/subtract-stock', {
                    items: this.items
                });
                console.log('Stock updated successfully:', response.data);
            } catch (error) {
                console.error('Error updating stock:', error);
            }
        }
    }
});
