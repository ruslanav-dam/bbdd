export default function PageHeader({ tag, title, subtitle }) {
  return (
    <header className="page-header">
      <span className="module-tag">{tag}</span>
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </header>
  )
}
