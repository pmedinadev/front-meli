const Button = ({ type = 'submit', className, disabled, children, ...props }) => (
  <button type={type} className={`${className}`} disabled={disabled} {...props}>
    {children}
  </button>
)

export default Button
