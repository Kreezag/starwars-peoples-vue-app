<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CharacterInfo></CharacterInfo>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue';
  import CharacterInfo from '../components/CharacterInfo.vue';

  export default Vue.extend({
    components: {
      CharacterInfo,
    },
  });
</script>
