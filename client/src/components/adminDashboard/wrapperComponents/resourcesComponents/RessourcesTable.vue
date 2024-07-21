<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden mb-8">
    <div class="px-6 py-4">
      <div class="mb-4">
        <label for="resourceSelect" class="block text-xl font-bold text-gray-700">Choisissez une ressource</label>
        <select v-model="localSelectedResource" @change="emitResourceChange" id="resourceSelect" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mt-3">
          <option v-for="resource in availableResources" :key="resource" :value="resource">{{ resource }}</option>
        </select>
      </div>
      <table class="min-w-full bg-white">
        <thead>
          <tr class="w-full bg-gray-200">
            <th v-for="key in resourceKeys" :key="key" class="text-left py-2 px-4">{{ key }}</th>
            <th class="text-left py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resource in resources" :key="resource.id" class="border-b border-gray-200">
            <td v-for="key in resourceKeys" :key="key" class="py-2 px-4">{{ resource[key] }}</td>
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
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    availableResources: {
      type: Array,
      required: true,
    },
    resourcesData: {
      type: Object,
      required: true,
    },
    selectedResource: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localSelectedResource: this.selectedResource,
    };
  },
  computed: {
    resources() {
      return this.resourcesData[this.localSelectedResource] || [];
    },
    resourceKeys() {
      return this.resources.length > 0 ? Object.keys(this.resources[0]) : [];
    },
  },
  methods: {
    editResource(resource) {
      this.$emit('edit', resource);
    },
    deleteResource(id) {
      this.$emit('delete', id);
    },
    emitResourceChange() {
      this.$emit('resourceChange', this.localSelectedResource);
    },
  },
  watch: {
    selectedResource(newVal) {
      this.localSelectedResource = newVal;
    },
  },
};
</script>
