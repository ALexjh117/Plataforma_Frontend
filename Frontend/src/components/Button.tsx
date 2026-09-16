import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type SharedProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'header'
  icon?: ReactNode
  className?: string
}

type ButtonProps = SharedProps &
  (
    | ({ as?: 'button'; type?: 'button' | 'submit' | 'reset' } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: 'a'; href: string; type?: never } & AnchorHTMLAttributes<HTMLAnchorElement>)
  )

export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', icon, className = '', ...rest } = props
  const classes = `sena-button sena-button--${variant} ${className}`.trim()

  if (props.as === 'a') {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a href={href ?? '#'} className={classes} {...anchorProps}>
        {icon ? <span className="sena-button__icon" aria-hidden="true">{icon}</span> : null}
        <span>{children}</span>
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>

  return (
    <button type={type} className={classes} {...buttonProps}>
      {icon ? <span className="sena-button__icon" aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </button>
  )
}
