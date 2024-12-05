<script setup lang="ts">

  import { storeToRefs } from 'pinia'
  import { useBirdStore } from '../stores/bird.ts'

  const { birdList } = storeToRefs(useBirdStore())

  // to do : display data in vuetify data-table
  // to do : add pagination
  // to do : add tests (cypress ?)
  // backlog : Add a filter on the sound file length if is smaller that 30 seconds or bigger with a switch
  // backlog : Integrate a small player in the datatable
  // backlog : UI
</script>

<template>
  <div v-for="recording in birdList">
    {{ recording.en }}
  </div>
</template>

<style scoped>

</style>