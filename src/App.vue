<script setup lang="ts">

  import { onMounted } from 'vue'
  import { useBirdStore } from '../stores/bird.ts'
  import { storeToRefs } from 'pinia'
  import sound from './components/sound.vue'

  const { fetchBirds } = useBirdStore()
  const { toggleBirdShortSounds, birdIsFetching, birdList } = storeToRefs(useBirdStore())

  onMounted(() => fetchBirds())
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
        items-per-page="10">

        <template #item.sound="{ item }">
          <sound
            v-if="item.sound"
            :url="item.sound"
          />
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>