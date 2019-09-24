<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:item="{ ...props }">
      <tr>
        <td class="text-start">{{ props.item.name }}</td>
        <td class="text-start">{{ props.item.birth }}</td>
        <td class="text-start">{{ props.item.gender }}</td>
        <td class="text-start">{{ props.item.height }}</td>
        <td class="text-start">{{ props.item.mass }}</td>
        <td class="text-start">
          <router-link :to="{ path: `about/${props.item.more}` }">{{
            props.item.more
          }}</router-link>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>



<script lang="ts">
const apiURL = 'https://swapi.co/api/people/';

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
      items: [
        {
          name: 'Frozen Yogurt',
          birth: 158,
          gender: 6.0,
          height: 24,
          mass: 4.0,
          more: '1',
        },
        {
          name: 'Ice cream sandwich',
          birth: 159,
          gender: 6.0,
          height: 24,
          mass: 4.0,
          more: '2',
        },
      ],
    };
  },
  methods: {
    fetchData: function(page) {
      const requestUrl = new URL(apiURL);

      if (page) {
        requestUrl.searchParams.set('page', page);
      }

      const request = new Request(String(requestUrl), { method: 'GET' });

      return fetch(request)
        .then(response => response.json())
        .then(result => ({
          totalCount: result.count,
          items: result.results,
        }));
    },
  },
  created: function() {
    this.fetchData(1);
  },
};
</script>
