<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="10"
    :loading="loading"
    class="elevation-1"
  >
    <template v-slot:item="{ ...props }">
      <tr>
        <td class="text-start">{{ props.item.name }}</td>
        <td class="text-start">{{ props.item.birth_year }}</td>
        <td class="text-start">{{ props.item.gender }}</td>
        <td class="text-start">{{ props.item.height }}</td>
        <td class="text-start">{{ props.item.mass }}</td>
        <td class="text-start">
          <router-link
            :to="{ name: 'aboutCharacter', params: { id: props.item.id } }"
            >{{ props.item.id }}</router-link
          >
        </td>
      </tr>
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
        { text: 'Birth', value: 'birth' },
        { text: 'Gender', value: 'gender' },
        { text: 'Height', value: 'height' },
        { text: 'Mass', value: 'mass' },
        { text: 'more', value: 'more' },
      ],
      items: [],
      error: null
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
