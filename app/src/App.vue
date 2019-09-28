<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>STARWARS Characters</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container>

        <router-view />
        <v-layout text-center wrap>
          <div id="nav">
            <router-link to="/">Home</router-link>
            /
            <router-link to="/test">Test</router-link>
            /
            <router-link to="/about/0">About</router-link>
          </div>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
});
</script>
