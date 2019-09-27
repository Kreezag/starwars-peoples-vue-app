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

interface PeopleItem {
  url: string;
}

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
    let self: any = this;

    const prepareItemWithId = (item: PeopleItem) => ({
      ...item,
      id: String(item.url).replace(/[^0-9]*/g, ''),
    });

    self.loading = true;

    console.log('start fetch');

    getPeoples()
      .then(({ data }: any) => {
        self.loading = false;

        console.log('data', data);

        self.items = data.map(prepareItemWithId);
      })
      .catch(({ error }: any) => {
        self.error = error;
      });
  },
};
</script>
