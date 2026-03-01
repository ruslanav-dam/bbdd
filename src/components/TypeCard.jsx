export default function TypeCard({ name, tag, rangeLabels, children }) {
  return (
    <div className="type-card">
      <div className="type-card-header">
        <span className="type-name">{name}</span>
        {tag && <span className="type-tag">{tag}</span>}
      </div>
      {rangeLabels && (
        <div className="range-visual">
          <div className="range-labels">
            {rangeLabels.map((label, i) => <span key={i}>{label}</span>)}
          </div>
          <div className="range-bar" />
        </div>
      )}
      {children}
    </div>
  )
}
