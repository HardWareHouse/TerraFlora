<template>
    <nav class="flex justify-center px-4 py-2 mb-4 cursor-pointer">
        <ul class="flex space-x-4">
            <template v-for="tab in tabs" :key="tab.id">
                <li>
                    <a
                        :class="tabClass(tab.id)"
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
    } else {
        selectTab(tab);
    }
};

const tabs = [
    { id: 'resources', icon: 'bi-gear-fill', label: 'Gestion des Ressources' },
    { id: 'products', icon: 'bi bi-box-seam-fill', label: 'Gestion des Produits' },
    { id: 'statistics', icon: 'bi-bar-chart-line-fill', label: 'Statistiques' },
    { id: 'contacts', icon: 'bi-people-fill', label: 'Contacts' },
    { id: 'others', icon: 'bi-three-dots', label: 'Autres' },
    { id: 'logout', icon: 'bi-box-arrow-right', label: 'Déconnexion' },
];

const tabClass = (tab) => {
    return {
        'py-2 px-4 flex items-center rounded hover:bg-red-600 transition-colors': true,
        'bg-red-600 text-white': activeTab.value === tab,
        'text-gray-700': activeTab.value !== tab,
    };
};

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

nav ul {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

nav a {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: color 0.3s;
    color: #000;
}

nav a.active {
    background-color: #dc2626;
    color: #fff;
}

nav a i {
    margin-right: 0.5rem;
}

@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>
