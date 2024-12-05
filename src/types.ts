export type Response<T> = {
  numRecordings: string
  numSpecies: string
  page: number
  numPages: number
  recordings: T[]
}

export type Recording = {
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

type RenameKeys<T, M extends Record<keyof T, string>> = {
  [K in keyof T as M[K]]: T[K]
}

export type PickedRecording = RenameKeys<
  Pick<Recording, 'id' | 'gen' | 'sp' | 'en' | 'rec' | 'cnt' | 'loc' | 'type' | 'length' | 'time' | 'date'>,
  {
    id: 'id'
    gen: 'genericName'
    sp: 'specificName'
    en: 'englishName'
    rec: 'recordBy'
    cnt: 'country'
    loc: 'location'
    type: 'type'
    length: 'duration'
    time: 'capturedAt'
    date: 'date'
  }
>