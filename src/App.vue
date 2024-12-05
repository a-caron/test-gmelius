<script setup lang="ts">

  import { storeToRefs } from 'pinia'
  import { useBirdStore } from '../stores/bird.ts'

  const { fetchBirds } = useBirdStore()
  const { toggleBirdShortSounds, birdIsFetching, birdList } = storeToRefs(useBirdStore())

  fetchBirds()

  // backlog : Integrate a small player in the datatable
  // backlog : UI
</script>

<template>
  <v-app>
    <v-container>
      <v-switch
        v-model="toggleBirdShortSounds"
        label="Only short recordings (less than 30 sec.)"
      />
      <v-data-table
        :loading="birdIsFetching"
        :items="birdList"
        items-per-page="10"
      />
    </v-container>
  </v-app>
</template>