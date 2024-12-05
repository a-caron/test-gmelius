import { defineStore } from 'pinia'
import { ref } from 'vue'

type Response<T> = {
  numRecordings: string
  numSpecies: string
  page: number
  numPages: number
  recordings: T[]
}

type Recording = {
  id: string
  gen: string
  sp: string
  ssp: string
  group: string
  en: string
  rec: string
  cnt: string
  loc: string
  lat: number | null
  lng: number | null
  alt: string
  type: string
  sex: string
  stage: string
  method: string
  url: string
  file: string
  'file-name': string
  sono: {
    small: string
    med: string
    large: string
    full: string
  }
  osci: {
    small: string
    med: string
    large: string
  },
  lic: string
  q: string
  length: string
  time: string
  date: string
  uploaded: string
  also: string[]
  rmk: string
  'bird-seen': string
  'animal-seen': string
  'playback-used': string
  temp: string
  regnr: string
  auto: string
  dvc: string
  mic: string
  smp: string
}

export const useBirdStore = defineStore('bird', () => {

  const isFetching = ref(false)
  const error = ref<string | null | unknown>(null)
  const list = ref<Recording[] | null>(null)

  fetchBirds()

  async function fetchBirds() {

    isFetching.value = true
    error.value = null

    try {
      const response = await fetch('https://xeno-canto.org/api/2/recordings?query=gen:Grus+stage:juvenile+cnt:France')
      if (!response.ok) error.value = `HTTP error, status: ${response.status}`
      const data: Response<Recording> = await response.json()
      list.value = data.recordings
    } catch (e) {
      error.value = error
    } finally {
      isFetching.value = false
    }
  }

  return {
    birdIsFetching: isFetching,
    birdError: error,
    birdList: list
  }
})