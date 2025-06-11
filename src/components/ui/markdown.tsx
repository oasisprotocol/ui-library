import { FC, MouseEventHandler } from 'react'
import Markdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { JSX } from 'react/jsx-runtime'
import IntrinsicElements = JSX.IntrinsicElements

const md = Symbol('md')

/**
 * Markdown text
 *
 * This is basically just normal string with Markdown code.
 * We are defining a type in order to avoid accidentally
 * passing Markdown to a component that accepts string and is
 * not equipped to handle markdown.
 *
 * So use this type to mark strings that can hold Markdown.
 * Just use "as string" if you need the actual value.
 */
export type MarkdownCode = string | typeof md

const renderComponents: Components = {
  // Always set up links so that they open on a new tab
  a: ({ children, href }) => {
    const handleClick: MouseEventHandler = event => event.stopPropagation()

    return (
      <a href={href} target={'_blank'} onClick={handleClick}>
        {children}
      </a>
    )
  },
}

export type TagName = keyof IntrinsicElements

type MarkdownBlockProps = {
  code: MarkdownCode | undefined
  mainTag?: TagName
}

/**
 * A component to render markdown
 */
export const MarkdownBlock: FC<MarkdownBlockProps> = ({ code, mainTag }) => {
  if (!code) return undefined
  return (
    <Markdown components={{ ...renderComponents, ...(mainTag ? { p: mainTag } : {}) }}>
      {code as string}
    </Markdown>
  )
}

export const renderMarkdown = (markdown: MarkdownCode | undefined, tagName: TagName = 'span') => (
  <MarkdownBlock code={markdown} mainTag={tagName} />
)
