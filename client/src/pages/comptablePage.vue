<template>
    <BreadcrumbsComptable />
    <Dashboard />
    <WidgetContainer />
</template>

<script setup>    
import BreadcrumbsComptable from '../components/comptable/BreadcrumbsComptable.vue'
import Dashboard from '../components/comptable/statisticalComponents/dashboard.vue';
import WidgetContainer from '../components/comptable/statisticalComponents/widgetContainer.vue';
</script>