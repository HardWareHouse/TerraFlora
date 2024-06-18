import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        lastActivity: null,
    }),
    getters: {
        cartTotal: (state) => state.items.reduce((acc, item) => acc + item.prix * item.quantity, 0),
        cartItemCount: (state) => state.items.length,
    },
    actions: {
        addToCart(product, quantity = 1) {
            const existingProduct = this.items.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                this.items.push({ ...product, quantity });
            }
            this.updateLastActivity();
            this.saveCartToLocalStorage();
        },
        updateQuantity(productId, quantity) {
            const product = this.items.find(item => item.id === productId);
            if (product) {
                product.quantity = quantity;
                if (product.quantity <= 0) {
                    this.removeItem(productId);
                }
            }
            this.updateLastActivity();
            this.saveCartToLocalStorage();
        },
        removeItem(productId) {
            this.items = this.items.filter(item => item.id !== productId);
            this.updateLastActivity();
            this.saveCartToLocalStorage();
        },
        clearCart() {
            this.items = [];
            this.updateLastActivity();
            this.saveCartToLocalStorage();
        },
        loadCartFromLocalStorage() {
            const cartData = JSON.parse(localStorage.getItem('cart'));
            if (cartData) {
                this.items = cartData.items;
                this.lastActivity = new Date(cartData.lastActivity);
                this.checkInactivity();
            }
        },
        saveCartToLocalStorage() {
            const cartData = {
                items: this.items,
                lastActivity: this.lastActivity
            };
            localStorage.setItem('cart', JSON.stringify(cartData));
        },
        updateLastActivity() {
            this.lastActivity = new Date();
        },
        checkInactivity() {
            const currentTime = new Date();
            const timeDifference = (currentTime - new Date(this.lastActivity)) / (1000 * 60);
            if (timeDifference > 15) {
                this.clearCart();
                localStorage.removeItem('cart');
            }
        }
    }
});
