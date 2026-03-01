import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'

SyntaxHighlighter.registerLanguage('sql', sql)

const sqlTheme = {
  'pre[class*="language-"]': { background: 'transparent', margin: 0, padding: 0 },
  'code[class*="language-"]': {
    color: '#f0f0f5',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.9rem',
    lineHeight: '1.8',
    textShadow: 'none',
  },
  comment:     { color: '#546e7a', fontStyle: 'italic' },
  prolog:      { color: '#546e7a' },
  doctype:     { color: '#546e7a' },
  cdata:       { color: '#546e7a' },
  punctuation: { color: '#89ddff' },
  keyword:     { color: '#c792ea' },
  operator:    { color: '#89ddff' },
  builtin:     { color: '#82aaff' },
  function:    { color: '#82aaff' },
  string:      { color: '#c3e88d' },
  char:        { color: '#c3e88d' },
  number:      { color: '#f78c6c' },
  boolean:     { color: '#f78c6c' },
  'class-name':{ color: '#ffcb6b' },
  constant:    { color: '#f78c6c' },
  variable:    { color: '#f0f0f5' },
  tag:         { color: '#f78c6c' },
  'attr-name': { color: '#82aaff' },
  'attr-value':{ color: '#c3e88d' },
  property:    { color: '#82aaff' },
  selector:    { color: '#c3e88d' },
  important:   { color: '#c792ea', fontWeight: 'bold' },
  namespace:   { opacity: 0.7 },
  symbol:      { color: '#f78c6c' },
  regex:       { color: '#f78c6c' },
  inserted:    { color: '#c3e88d' },
  deleted:     { color: '#f78c6c' },
}

export default function CodeBlock({ label, code }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-label">{label}</span>
        <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
          {copied ? 'Copiat!' : 'Copiar'}
        </button>
      </div>
      <div className="code-content">
        <SyntaxHighlighter
          language="sql"
          style={sqlTheme}
          PreTag="div"
          customStyle={{ background: 'transparent', padding: 0, margin: 0 }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
