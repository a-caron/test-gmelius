<script setup lang="ts">

  import { useSound } from '@vueuse/sound'

  const props = defineProps<{
    url: string | null
  }>()

  const { play, stop, isPlaying } = useSound(props.url)
</script>

<template>
  <v-btn
    v-if="isPlaying"
    icon="mdi-stop"
    @click="stop"
    size="x-small"
    variant="tonal"
    color="error"
  />
  <v-btn
    v-else
    icon="mdi-play"
    @click="play"
    size="x-small"
    variant="tonal"
    color="primary"
  />
</template>