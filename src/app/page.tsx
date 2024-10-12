'use client'

import { Link } from '@/app/components'
import { MessageList } from '@/app/Messages'

export default function Home() {
  return (
    <div className="m-10 flex gap-10">
      <div className="shrink-0 w-64">
        <h1 className="font-extrabold">web crypto api</h1>
        <p>private messages</p>
        <hr className="border border-slate-700 my-6" />
        <div className="flex flex-col gap-4">
          <p>It&apos;s a <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank">Web Crypto API</Link> experiment to encrypt/decrypt messages using public and private keys.</p>
          <p>Only the author and the receiver of the message can read it.</p>
        </div>
      </div>
      <div className="grow">
        <MessageList />
      </div>
    </div>
  )
}
