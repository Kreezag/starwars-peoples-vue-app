<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate color="black"></v-progress-linear>
    <v-container>
      <v-timeline v-if="data">
        <v-timeline-item
          fill-dot
          left
          small
          :color="data.eye_color || 'black'"
        >
          <v-card>
            <v-card-title
              :style="[
                { backgroundColor: data.eye_color ? data.eye_color : 'black' },
              ]"
            >
              <h2 class="display-1" style="color: #fff">
                {{ data.name }}
              </h2>
            </v-card-title>
            <v-container class="font-weight-bold">
              <v-row>
                <v-col cols="12" md="10"> Gender: {{ data.gender }} </v-col>
                <v-col cols="12" md="10">
                  Birth year: {{ data.birth_year }}
                </v-col>
                <v-col cols="12" md="10">
                  Skin color: {{ data.skin_color }}
                </v-col>
                <v-col cols="12" md="10">
                  Hair color: {{ data.hair_color }}
                </v-col>
                <v-col cols="12" md="10">
                  Eye color: {{ data.eye_color }}
                </v-col>
                <v-col cols="12" md="10"> Height: {{ data.height }} </v-col>
                <v-col cols="12" md="10"> Mass: {{ data.mass }} </v-col>
                <v-col cols="12" md="10">
                  Species:
                  <span v-if="data.species.length" v-for="specie in data.species">
                    <div>{{specie.name}}</div>
                  </span>
                  <span v-if="!data.starships.length">-</span>
                </v-col>
                <v-col cols="12" md="10">
                  Starships:
                  <span v-if="data.starships.length" v-for="starship in data.starships">
                    <div>{{starship.name}}</div>
                  </span>
                  <span v-if="!data.starships.length">-</span>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item fill-dot right small :color="data.eye_color || 'black'">
          <v-card>
            <v-card-title
              :style="[
                { backgroundColor: data.eye_color ? data.eye_color : 'black' },
              ]"
            >
              <h2 class="display-1" style="color: #fff">
                HomeWorld
              </h2>
            </v-card-title>
            <v-container class="font-weight-bold">
              <v-row>
                <v-col cols="12" md="10">
                  Name: {{ data.homeworld.name }}
                </v-col>
                <v-col cols="12" md="10">
                  Climate: {{ data.homeworld.climate }}
                </v-col>
                <v-col cols="12" md="10">
                  Terrain: {{ data.homeworld.terrain }}
                </v-col>
                <v-col cols="12" md="10">
                  Population: {{ data.homeworld.population }}
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item fill-dot left small :color="data.eye_color || 'black'">
          <v-card>
            <v-card-title
              :style="[
                { backgroundColor: data.eye_color ? data.eye_color : 'black' },
              ]"
            >
              <h2 class="display-1" style="color: #fff">
                Films
              </h2>
            </v-card-title>
            <v-container>
              <v-row v-for="film in data.films">
                <v-col cols="12" md="10">
                  <div class="font-weight-bold">Name: {{ film.title }}</div>
                  <br />
                  Opening: {{ film.opening_crawl }}
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </div>
</template>

<script lang="ts">
import { getPeopleData } from '@/services/apiService';

export default {
  data() {
    return {
      data: null,
      loading: false,
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
