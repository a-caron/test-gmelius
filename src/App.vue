<script setup lang="ts">

  import { storeToRefs } from 'pinia'
  import { useBirdStore } from '../stores/bird.ts'

  const { fetchBirds } = useBirdStore()
  const { birdIsFetching, birdList } = storeToRefs(useBirdStore())

  fetchBirds()

  // in progress : add tests
  // backlog : Add a filter on the sound file length if is smaller that 30 seconds or bigger with a switch
  // backlog : Integrate a small player in the datatable
  // backlog : UI
</script>

<template>
  <v-app>
    <v-container>
      <v-data-table
        :loading="birdIsFetching"
        :items="birdList"
        items-per-page="10"
      />
    </v-container>
  </v-app>
</template>