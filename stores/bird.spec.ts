import { describe, beforeEach, it, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBirdStore } from './bird'

describe('Bird Store', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Initial state', () => {

    const store = useBirdStore()

    expect(store.birdIsFetching).toBe(false)
    expect(store.birdError).toBeNull()
    expect(store.birdList).toEqual([])
  })

  it('Fetch success', async () => {

    const store = useBirdStore()

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          recordings: [
            {
              id: '1',
              gen: 'Grus',
              sp: 'grus',
              en: 'Common Crane',
              rec: 'John',
              cnt: 'France',
              loc: 'Paris',
              type: 'song',
              length: '50',
              time: '10:00',
              date: '2023-01-01'
            }
          ]
        })
      })
    ) as unknown as typeof fetch

    await store.fetchBirds()
    expect(store.birdList).toHaveLength(1)
    expect(store.birdList[0].englishName).toBe('Common Crane')
    expect(store.birdError).toBeNull()
    expect(store.birdIsFetching).toBe(false)
  })

  it('Fetch error', async () => {

    const store = useBirdStore()
    global.fetch = vi.fn(() => Promise.reject('API Error'))

    await store.fetchBirds()
    expect(store.birdError).toBe('API Error')
    expect(store.birdIsFetching).toBe(false)
  })
})