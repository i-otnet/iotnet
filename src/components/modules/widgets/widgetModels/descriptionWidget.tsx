'use client'

import React from 'react'

interface DescriptionWidgetProps {
  title?: string
  description?: string
}

// headings (#, ##, ###), unordered lists (- ), paragraphs and line breaks, bold and italic.
function parseInlineFormatting(text: string): React.ReactNode[] {
  // Split by **bold** or *italic* tokens while preserving text parts
  const nodes: React.ReactNode[] = []
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    if (match[2]) {
      // bold
      nodes.push(<strong key={`b-${key++}`}>{match[2]}</strong>)
    } else if (match[3]) {
      // italic
      nodes.push(<em key={`i-${key++}`}>{match[3]}</em>)
    }
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return nodes
}

function simpleMarkdownToReact(md: string = ''): React.ReactNode[] {
  const lines = md.split(/\r?\n/)
  const out: React.ReactNode[] = []
  let listBuffer: React.ReactNode[] | null = null
  let idx = 0

  const flushList = () => {
    if (listBuffer && listBuffer.length) {
      out.push(
        <ul key={`ul-${idx++}`} className="ml-4 list-disc space-y-1">
          {listBuffer.map((li, i) => (
            <li key={`li-${i}`}>{li}</li>
          ))}
        </ul>
      )
      listBuffer = null
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (line.startsWith('### ')) {
      flushList()
      out.push(
        <h4 key={`h4-${idx++}`} className="text-sm font-semibold mb-1">
          {line.slice(4)}
        </h4>
      )
      continue
    }
    if (line.startsWith('## ')) {
      flushList()
      out.push(
        <h3 key={`h3-${idx++}`} className="text-sm font-semibold mb-1">
          {line.slice(3)}
        </h3>
      )
      continue
    }
    if (line.startsWith('# ')) {
      flushList()
      out.push(
        <h2 key={`h2-${idx++}`} className="text-base font-bold mb-1">
          {line.slice(2)}
        </h2>
      )
      continue
    }
    if (line.startsWith('- ')) {
      if (!listBuffer) listBuffer = []
      listBuffer.push(<>{parseInlineFormatting(line.slice(2))}</>)
      continue
    }

    if (line === '') {
      // blank line -> paragraph separator
      flushList()
      out.push(<div key={`br-${idx++}`} className="my-2" />)
      continue
    }

    flushList()
    out.push(
      <p key={`p-${idx++}`} className="text-sm leading-relaxed">
        {parseInlineFormatting(line)}
      </p>
    )
  }

  flushList()
  return out
}

export default function DescriptionWidget({
  title,
  description,
}: DescriptionWidgetProps) {
  return (
    <div className="prose max-w-full text-sm">
      {title && <h4 className="text-base font-semibold mb-2">{title}</h4>}
      <div className="text-sm text-muted-foreground">
        {simpleMarkdownToReact(description)}
      </div>
    </div>
  )
}
