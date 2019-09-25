<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="10"
    :loading="loading"
    class="elevation-1"
  >
    <template v-slot:item.more="{ item }">
      <router-link :to="{ name: 'aboutCharacter', params: { id: item.id } }">
        {{ item.id }}
      </router-link>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { getPeoples } from '../services/apiService.js';

export default {
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Birth', value: 'birth_year' },
        { text: 'Gender', value: 'gender' },
        { text: 'Height', value: 'height' },
        { text: 'Mass', value: 'mass' },
        { text: 'more', value: 'more' },
      ],
      items: [],
      error: null,
    };
  },
  computed: {
    loading: function() {
      return this.items.length === 0;
    },
  },
  created: function() {
    const prepareItemWithId = (item: any) => ({
      ...item,
      id: String(item.url).replace(/[^0-9]*/g, ''),
    });

    getPeoples(null, null)
      .then(({ data }) => (this.items = data.map(prepareItemWithId)))
      .catch(({ error }) => {
        this.error = error;
      });
  },
};
</script>
