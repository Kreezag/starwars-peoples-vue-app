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
      items: [],
    };
  },
  methods: {
    fetchData: function(page: number) {
      const requestUrl = new URL(apiURL);

      if (page) {
        requestUrl.searchParams.set('page', String(page));
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
    const prepareItemWithId = (item: any) => ({
      ...item,
      id: String(item.url).substring(
        item.url.lastIndexOf('/') - 1,
        item.url.lastIndexOf('/'),
      ),
    });

    this.fetchData(1).then(
      ({ items }) => (this.items = items.map(prepareItemWithId)),
    );
  },
};
</script>
