<template>
  <div class="test">
    <h1>This is an test page</h1>
    <TestSlot>Parent text</TestSlot>
    <TestSlot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TestSlot from '@/components/TestSlot.vue';

export default Vue.extend({
  components: {
    TestSlot,
  },
});
</script>
