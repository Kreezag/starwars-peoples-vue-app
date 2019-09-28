<template>
  <h2>Hello i am people {{ $route.params.id }}!</h2>
</template>


<script lang="ts">
  import { getPeopleData } from '@/services/apiService';


  export default {
    data() {
      return {
        data: {},
        loading: false
      };
    },
    created: function() {
      const self: any = this;

      self.loading = true;

      getPeopleData(self.$route.params.id).then(data => {
        self.data = data;
        self.loading = false;
      });

    },
  };
</script>
