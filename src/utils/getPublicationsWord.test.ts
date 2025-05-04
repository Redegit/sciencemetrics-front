import { getPublicationsWord } from './getPublicationsWord'

describe('getPublicationsWord', () => {
  it('возвращает "публикация" для 1', () => {
    expect(getPublicationsWord(1)).toBe('публикация')
  })

  it('возвращает "публикации" для 2, 3, 4', () => {
    expect(getPublicationsWord(2)).toBe('публикации')
    expect(getPublicationsWord(3)).toBe('публикации')
    expect(getPublicationsWord(4)).toBe('публикации')
  })

  it('возвращает "публикаций" для 5 и более', () => {
    expect(getPublicationsWord(5)).toBe('публикаций')
    expect(getPublicationsWord(11)).toBe('публикаций')
    expect(getPublicationsWord(100)).toBe('публикаций')
  })

  it('корректно работает с числами, заканчивающимися на 1, кроме 11', () => {
    expect(getPublicationsWord(21)).toBe('публикация')
    expect(getPublicationsWord(31)).toBe('публикация')
    expect(getPublicationsWord(111)).toBe('публикаций')
    expect(getPublicationsWord(121)).toBe('публикация')
  })

  it('корректно работает с числами, заканчивающимися на 2-4, кроме 12-14', () => {
    expect(getPublicationsWord(22)).toBe('публикации')
    expect(getPublicationsWord(23)).toBe('публикации')
    expect(getPublicationsWord(24)).toBe('публикации')
    expect(getPublicationsWord(12)).toBe('публикаций')
    expect(getPublicationsWord(13)).toBe('публикаций')
    expect(getPublicationsWord(14)).toBe('публикаций')
  })
})
