<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
import { getPeoples } from '@/services/apiService';

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
      loading: null,
    };
  },
  created: function() {
    const prepareItemWithId = (item: any) => ({
      ...item,
      id: String(item.url).replace(/[^0-9]*/g, ''),
    });

    this.loading = true;

    getPeoples()
      .then(({ data }) => {
        this.loading = false;

        this.items = data.map(prepareItemWithId);
      })
      .catch(({ error }) => {
        this.error = error;
      });
  },
};
</script>
