<template>
    <tr class="border-b border-gray-200">
      <td class="py-2 px-4">{{ resource.id }}</td>
      <td class="py-2 px-4">{{ resource.name }}</td>
      <td class="py-2 px-4">{{ resource.createdAt }}</td>
      <td class="py-2 px-4 flex items-center space-x-2">
        <button @click="editResource(resource)" class="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          <i class="bi bi-pencil-square mr-2"></i>
          <span class="hidden md:inline">Modifier</span>
        </button>
        <button @click="deleteResource(resource.id)" class="inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
          <i class="bi bi-trash3 mr-2"></i>
          <span class="hidden md:inline">Supprimer</span>
        </button>
      </td>
    </tr>
  </template>
  
  <script>
  export default {
    props: {
      resource: {
        type: Object,
        required: true
      }
    },
    methods: {
      editResource(resource) {
        this.$emit('edit', resource);
      },
      deleteResource(id) {
        this.$emit('delete', id);
      }
    }
  };
  </script>
  