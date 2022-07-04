import { fromWord } from '../src/index'

describe('fromWord', () => {
  it('exists', () => {
    expect(fromWord).toBeDefined()
  })

  describe('คำ', () => {
    it('extracts to ค + ำ', () => {
      const kum = fromWord('คำ')

      expect(kum.head).toEqual('ค')
      expect(kum.vowel).toEqual('อำ')
    })
  })

  describe('ไหน', () => {
    it('extracts to หน + ไอ', () => {
      const kum = fromWord('ไหน')

      expect(kum.head).toEqual('หน')
      expect(kum.vowel).toEqual('ไอ')
    })
  })

  // describe('ไทย', () => {
  //   it('extracts to ท + ไอ + ย', () => {
  //     const kum = fromWord('ไทย');

  //     expect(kum.head).toEqual('ท');
  //     expect(kum.vowel).toEqual('ไอ');
  //     expect(kum.tail).toEqual('ย');
  //   });
  // });

  describe('หมุด', () => {
    it('extracts to หม + อุ + ด', () => {
      const kum = fromWord('หมุด')

      expect(kum.head).toEqual('หม')
      expect(kum.vowel).toEqual('อุ')
      expect(kum.tail).toEqual('ด')
    })
  })

  describe('กละ', () => {
    it('extracts to กล + ะ', () => {
      const kum = fromWord('กละ')

      expect(kum.head).toEqual('กล')
      expect(kum.vowel).toEqual('อะ')
      expect(kum.tail).toEqual(null)
    })
  })

  describe('สบาย', () => {
    it('extracts to สบ + า + ย', () => {
      const kum = fromWord('สบาย')

      expect(kum.head).toEqual('สบ')
      expect(kum.vowel).toEqual('อา')
      expect(kum.tail).toEqual('ย')
    })
  })
})
