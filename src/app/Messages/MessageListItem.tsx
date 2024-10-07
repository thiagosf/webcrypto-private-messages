import { Message } from '@/models'

type Props = {
  message: Message
}

export function MessageListItem({ message }: Props) {
  return (
    <div className="p-4 rounded-lg bg-slate-100 flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-xs">
        <div>uuid: {message.uuid}</div>
        <div>from: {message.senderUuid}</div>
        <div>to: {message.receiverUuid}</div>
        <div>{message.createdAt?.toISOString()}</div>
      </div>
      <div className="">
        <div className="break-words font-semibold">
          {message.senderEncryptedMessage}
        </div>
      </div>
    </div>
  )
}
