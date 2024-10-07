export default function CardContainer({ children, className }) {
  return (
    <div className={`bg-body rounded shadow-sm ${className}`}>{children}</div>
  )
}
