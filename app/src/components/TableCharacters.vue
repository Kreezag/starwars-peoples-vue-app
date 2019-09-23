<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<!--<th>Name</th>-->
<!--<th>Birth Year</th>-->
<!--<th>Gender</th>-->
<!--<th>Height</th>-->
<!--<th>Mass</th>-->
<!--<th>more</th>-->

<script lang="ts">
import Vue from 'vue';
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
      desserts: [
        {
          name: 'Frozen Yogurt',
          birth: 158,
          gender: 6.0,
          height: 24,
          mass: 4.0,
          more: '1%',
        },
        {
          name: 'Ice cream sandwich',
            birth: 159,
            gender: 6.0,
            height: 24,
            mass: 4.0,
            more: '1%',
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
