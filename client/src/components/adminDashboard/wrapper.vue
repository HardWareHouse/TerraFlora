<template>
    <nav class="flex flex-wrap items-center justify-center px-4 py-2 mb-4 cursor-pointer bg-gradient-to-r from-pink-400 to-green-500 text-black">
        <ul class="flex flex-wrap space-x-4">
            <template v-for="tab in tabs" :key="tab.id">
                <li>
                    <a
                        :class="`flex items-center px-4 py-2 text-sm font-semibold transition-transform transform ${activeTab === tab.id ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`"
                        @click="handleTabClick(tab.id)"
                    >
                        <i :class="`bi ${tab.icon} mr-2`"></i> {{ tab.label }}
                    </a>
                </li>
            </template>
        </ul>
    </nav>
    <div class="bg-white shadow-md rounded-lg p-4">
        <transition name="fade" mode="out-in">
            <component :is="activeTabComponent" />
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../pinia/auth.js';

const activeTab = ref('resources');
const authStore = useAuthStore();
const router = useRouter();

const selectTab = (tab) => {
    activeTab.value = tab;
};

const handleTabClick = (tab) => {
    if (tab === 'logout') {
        logout();
    } else if (tab === 'products') {
        redirectToManageProductsPage();
    } else if (tab === 'refund') {
        router.push('/stripe');
    } 
    else {
        selectTab(tab);
    }
};

const tabs = [
    { id: 'resources', icon: 'bi-gear-fill', label: 'Gestion des Ressources' },
    { id: 'products', icon: 'bi bi-box-seam-fill', label: 'Gestion des Produits' },
    { id: 'refund', icon: 'bi-arrow-return-left', label: 'Gestion des Remboursements'},
    { id: 'statistics', icon: 'bi-bar-chart-line-fill', label: 'Statistiques' },
    { id: 'contacts', icon: 'bi-people-fill', label: 'Contacts' },
    { id: 'others', icon: 'bi-three-dots', label: 'Autres' },
    { id: 'logout', icon: 'bi-box-arrow-right', label: 'Déconnexion' },
];

const components = {
    resources: defineAsyncComponent(() => import('./wrapperComponents/resourcesCrud.vue')),
    statistics: defineAsyncComponent(() => import('./wrapperComponents/statistical.vue')),
    contacts: defineAsyncComponent(() => import('./wrapperComponents/contacts.vue')),
    others: defineAsyncComponent(() => import('./wrapperComponents/others.vue')),
};

const activeTabComponent = computed(() => {
    return components[activeTab.value];
});

const logout = async () => {
    await authStore.logout();

    if (!authStore.token) {
        router.push('/');
    }
};

const redirectToManageProductsPage = () => {
    router.push('/manage-products');
};

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
