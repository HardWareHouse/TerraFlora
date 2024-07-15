<template>
    <!-- <nav class="flex justify-center bg-white shadow-md rounded-lg px-4 py-2 mb-4 cursor-pointer"> -->
    <nav class="flex justify-center px-4 py-2 mb-4 cursor-pointer">
        <ul class="flex space-x-4">
            <li v-for="tab in tabs" :key="tab.id">
                <a :class="tabClass(tab.id)" @click.prevent="selectTab(tab.id)">
                    <i :class="`bi ${tab.icon} mr-2`"></i> {{ tab.label }}
                </a>
            </li>
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

const activeTab = ref('resources');

const selectTab = (tab) => {
    activeTab.value = tab;
};

const tabs = [
    { id: 'resources', icon: 'bi-gear-fill', label: 'Gestion des Ressources' },
    { id: 'statistics', icon: 'bi-bar-chart-line-fill', label: 'Statistiques' },
    { id: 'contacts', icon: 'bi-people-fill', label: 'Contacts' },
    { id: 'others', icon: 'bi-three-dots', label: 'Autres' },
];

const tabClass = (tab) => {
    return {
        'py-2 px-4 flex items-center rounded hover:bg-gray-200 transition-colors': true,
        'bg-red-600 text-white': activeTab.value === tab,
        'text-gray-700': activeTab.value !== tab,
    };
};

const components = {
    resources: defineAsyncComponent(() => import('./wrapperComponents/resourcesCrud.vue')),
    statistics: defineAsyncComponent(() => import('./wrapperComponents/adminPanel.vue')),
    contacts: defineAsyncComponent(() => import('./wrapperComponents/contacts.vue')),
    others: defineAsyncComponent(() => import('./wrapperComponents/others.vue')),
};

const activeTabComponent = computed(() => {
    return components[activeTab.value];
});
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
    @apply flex items-center py-2 px-4 rounded transition-colors;
    color: #000;
}

nav a.active {
    @apply bg-red-600 text-white;
}

nav a i {
    @apply mr-2;
}

@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>
