import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { PickedRecording, Recording, Response } from '../src/types.ts'

export const useBirdStore = defineStore('bird', () => {

  const shortSounds = ref(false)

  const isFetching = ref(false)
  const error = ref<string | null | unknown>(null)
  const list = ref<PickedRecording[]>([])

  const filteredList = computed(() => {
    if (!shortSounds.value) return list.value
    else return list.value.filter(recording => {
      const [min, sec] = recording.duration.split(':')
      if (min === '0' && Number(sec) < 30) return recording
    })
  })

  async function fetchData() {

    isFetching.value = true
    error.value = null

    try {
      const response = await fetch('https://xeno-canto.org/api/2/recordings?query=gen:Grus+stage:juvenile+cnt:France')
      if (!response.ok) error.value = `HTTP error, status: ${response.status}`
      const data: Response<Recording> = await response.json()
      list.value = remapRecordings(data.recordings)
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      isFetching.value = false
    }
  }

  function remapRecordings(data:Recording[]) {
    return data.map(recording => {
      return {
        id: recording.id,
        sound: generateSoundUrl(recording),
        genericName: recording.gen,
        specificName: recording.sp,
        englishName: recording.en,
        recordBy: recording.rec,
        country: recording.cnt,
        location: recording.loc,
        type: recording.type,
        duration: recording.length,
        capturedAt: recording.time,
        date: recording.date
      }
    })
  }

  function generateSoundUrl(recording:Recording) {

    const identifier = getIdentifier()

    if (!identifier || !recording['file-name']) return null

    const baseUrl = 'https://xeno-canto.org/sounds/uploaded/'
    return `${baseUrl}${identifier}/${recording['file-name']}`

    function getIdentifier() {
      const smallUrl = recording.sono.small
      const match = smallUrl.match(/uploaded\/(.*?)\//)
      return match ? match [1] : null
    }
  }

  return {
    toggleBirdShortSounds: shortSounds,
    birdIsFetching: isFetching,
    birdError: error,
    birdList: filteredList,
    fetchBirds: fetchData
  }
})