type Props = {
  href: string,
  target?: '_blank',
  children: React.ReactNode
}

export function Link({
  href,
  target,
  children
}: Props) {
  return (
    <a
      href={href}
      className="border-b-2 text-highlight-500 border-current hover:text-highlight-300"
      target={target}
    >{children}</a>
  )
}
