export default function CardContainer({ children, className }) {
  return <div className={`rounded shadow-sm ${className}`}>{children}</div>
}
