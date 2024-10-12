type Props = {
  text: string
}

export function QuotedMessage({ text }: Props) {
  return <div className="flex-1 flex bg-slate-800 flex-grow min-h-full items-center justify-center rounded-md p-8">
    <blockquote className="flex gap-4 text-xl text-white lg:text-3xl">
      <svg className="w-6 h-6 text-slate-400 dark:text-slate-600 mb-4 shrink-0 lg:w-8 lg:h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
      </svg>
      <p>
        {text}
      </p>
    </blockquote>
  </div>
}
