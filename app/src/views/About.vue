<template>
  <div class="about">
    <CharacterInfo />
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
