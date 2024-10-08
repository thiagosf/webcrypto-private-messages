export function hexToEmoji(hex: string): string {
  const codePoint = parseInt(hex, 16)

  return String.fromCodePoint(codePoint)
}

export function textToEmojis(text: string): string {
  return hexToEmojiSequence(text)
}

const hexToEmojiMap: { [key: string]: string } = {
  '0': '😀', '1': '😂', '2': '😍', '3': '😎', '4': '😜', '5': '😡',
  '6': '😱', '7': '😴', '8': '🤓', '9': '🤔', 'a': '👻', 'b': '👽',
  'c': '💩', 'd': '👾', 'e': '🎃', 'f': '🤖'
}

export function hexToEmojiSequence(hexString: string): string {
  return hexString.split('').map(char => {
    const lowerChar = char.toLowerCase()

    return hexToEmojiMap[lowerChar] || ''
  }).join('')
}

const emojiToHexMap: { [key: string]: string } = Object
  .entries(hexToEmojiMap)
  .reduce((acc, [hex, emoji]) => {
    acc[emoji] = hex

    return acc
  }, {} as { [key: string]: string })

export function emojiSequenceToHex(emojiString: string): string {
  return emojiString.split('').map(emoji => {
    return emojiToHexMap[emoji] || ''
  }).join('')
}
