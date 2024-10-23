type Props = {
  name: 'remove'
}

const EMOJI_ICONS = {
  remove: 'ⓧ'
}

export function Icon({ name }: Props) {
  return (
    <div>{EMOJI_ICONS[name] ?? name}</div>
  )
}
