<script setup lang="ts">

  import { useSound } from '@vueuse/sound'

  const props = defineProps<{
    url: string | null
  }>()

  const { play } = useSound(props.url)
</script>

<template>
  <v-btn
    icon="mdi-play"
    @click="play"
    size="x-small"
    variant="tonal"
    color="primary"
  />
</template>