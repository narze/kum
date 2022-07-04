export interface Kum {
  head: string
  vowel: string | null
  tail: string | null
}

// TODOS
// - ร หัน: กรรม
// - สระเอีย
// - ไม้หันอากาศ
// - Special words
// - etc.

export class Kum {
  constructor(word: string) {
    const graphemes = word.split('')
    this.head = ''
    this.tail = ''

    let char
    let ptr = 0
    let mode

    while ((char = graphemes[ptr])) {
      if (char.match(/[เแโใไ]/)) {
        // Front vowels
        this.vowel = char + 'อ'
      } else if (char.match(/[ิีึืั]/) || char.match(/[ุู]/)) {
        // Top / Bottom vowels
        mode = 'tail'
        if (this.tail.length) {
          // Empty tail
          this.head += this.tail
          this.tail = ''
        }
        this.vowel = 'อ' + char
      } else if (char.match(/[ะาำ]/)) {
        // Back vowels
        mode = 'tail'
        if (this.tail.length) {
          // Empty tail
          this.head += this.tail
          this.tail = ''
        }
        this.vowel = 'อ' + char
      } else if (char.match(/[ก-ฮ]/)) {
        if (mode == 'tail') {
          this.tail += char
        } else {
          const h = this.head.slice(-1)

          if (!h) {
            this.head += char
          } else if (isKuab(`${h}${char}`) || isNum(`${h}${char}`)) {
            // อักษรนำ / ควบกล้ำ

            this.head += char
          } else {
            this.tail += char
          }
        }
      }
      // }

      // Terminate

      if (char.match(/[ะำ]/)) {
        break
      }

      ptr++
    }
    // Head
    // this.head = word.match(/[ก-ฮ]+/)![0];
    if (!this.tail) {
      this.tail = null
    }
  }
}

export const fromWord = (word: string): Kum => {
  return new Kum(word)
}

function isKuab(chars: string): boolean {
  if (chars[1].match(/[รลว]/)) {
    return true
  }

  if (chars.match(/(ทร|ทย)/)) {
    return true
  }

  return false
}

function isNum(chars: string): boolean {
  if (chars[0] == 'ห' && chars[1].match(/[ยรลวงญณนม]/)) {
    return true
  }

  if (chars == 'อย') {
    return true
  }

  return false
}
