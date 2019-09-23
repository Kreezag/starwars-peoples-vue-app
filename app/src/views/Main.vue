<template>
  <v-layout text-center wrap>
    <v-flex xs-8 mb-8>
      <TableCharacters />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import TableCharacters from '../components/TableCharacters.vue';

export default Vue.extend({
  components: {
    TableCharacters,
  },
});
</script>
