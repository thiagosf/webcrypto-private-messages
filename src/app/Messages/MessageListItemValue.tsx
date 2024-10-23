type Props = {
  label: string,
  value: string | undefined,
  isSelected?: boolean,
  onValueClick?: (value: string | undefined) => void
}

export function MessageListItemValue({ label, value, isSelected, onValueClick }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-right w-16">{label}:</div>
      <div
        className={`
          px-1 rounded-sm
          ${onValueClick ? 'cursor-pointer hover:underline' : ''}
          ${isSelected ? 'bg-slate-700 text-slate-300' : ''}
        `}
        onClick={() => onValueClick?.(value)}
      >{value}</div>
    </div>
  )
}
