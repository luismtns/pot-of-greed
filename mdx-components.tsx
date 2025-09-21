import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  a: (props: any) => <a {...props} className='text-blue-600 underline' />,
  img: (props: any) => <img {...props} alt={props.alt ?? ''} />,
  wrapper: (props: any) => <div {...props} className={'prose max-w-none ' + (props.className ?? '')} />,
}

export function useMDXComponents(): MDXComponents {
  return components
}

export default components
