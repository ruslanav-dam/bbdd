export default function InfoBox({ type = 'info', title, children }) {
  return (
    <div className={`info-box ${type}`}>
      {title && <div className="info-box-title">{title}</div>}
      {children}
    </div>
  )
}
