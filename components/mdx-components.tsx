import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  a: ({ children, className, ...rest }: any) => (
    <a {...rest} className={['text-blue-600', 'underline', className].filter(Boolean).join(' ')}>
      {children}
    </a>
  ),
  img: ({ alt, ...rest }: any) => <img {...rest} alt={alt ?? ''} />,
  wrapper: ({ className, ...rest }: any) => (
    <div {...rest} className={['prose', 'max-w-none', className].filter(Boolean).join(' ')} />
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}

export default components
