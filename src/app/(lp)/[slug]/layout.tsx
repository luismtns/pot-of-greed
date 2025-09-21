import { ReactNode } from 'react'

export default function LpLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='pt-br'>
      <body>{children}</body>
    </html>
  )
}
