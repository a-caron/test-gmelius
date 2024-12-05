import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBirdStore = defineStore('bird', () => {

  const birds = ref('hello from store')

  return {
    birds
  }
})