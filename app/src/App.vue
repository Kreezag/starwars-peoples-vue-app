<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title
        class="headline text-uppercase d-block"
        style="width: 100%"
      >
        <div>
          <span to="/">STARWARS Characters</span>
          <span v-if="$route.name === 'about'"
            >character №: {{ $route.params.id }}</span
          >

          <router-link class="float-right text-lowercase" to="/"
            >Home</router-link
          >
        </div>
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
            <router-link to="/about/1">About</router-link>
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
  components: {},
  data: () => ({
    //
  }),
});
</script>
