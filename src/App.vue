<script setup lang="ts">

  // in progress : pinia store

  import { storeToRefs } from 'pinia'
  import { useBirdStore } from '../stores/bird.ts'

  const { birds } = storeToRefs(useBirdStore())

  // to do : fetch data
  // to do : display data in vuetify data-table
  // to do : add pagination
  // to do : add tests (cypress ?)
  // backlog : Add a filter on the sound file length if is smaller that 30 seconds or bigger with a switch
  // backlog : Integrate a small player in the datatable
</script>

<template>
  {{ birds }}
</template>

<style scoped>

</style>