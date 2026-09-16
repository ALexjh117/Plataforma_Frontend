type CategoryIcon = 'training' | 'education' | 'innovation' | 'territory'

type CategoryCardProps = {
  title: string
  description: string
  icon: CategoryIcon
  last?: boolean
}

function CategoryIcon({ type }: { type: CategoryIcon }) {
  const common = {
    width: 34,
    height: 34,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  }

  if (type === 'training') {
    return (
      <svg {...common} aria-hidden="true">
        <path
          d="M4 12.5C4 7.5 7.2 5 12 5C16.8 5 20 7.5 20 12.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7 15C8.3 17 10 18 12 18C14 18 15.7 17 17 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M3 12H7M17 12H21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 12C9 13.657 10.343 15 12 15C13.657 15 15 13.657 15 12C15 10.343 13.657 9 12 9C10.343 9 9 10.343 9 12Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (type === 'education') {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M6 20C6.7 16.8 8.7 15 12 15C15.3 15 17.3 16.8 18 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4 20H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (type === 'innovation') {
    return (
      <svg {...common} aria-hidden="true">
        <path
          d="M8.5 10.5C8.5 8.3 10.1 6.5 12 6.5C13.9 6.5 15.5 8.3 15.5 10.5C15.5 12.1 14.8 13.1 13.8 14C13.2 14.5 13 15 13 16H11C11 15 10.8 14.5 10.2 14C9.2 13.1 8.5 12.1 8.5 10.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M10 19H14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 2V4M4.9 4.9L6.3 6.3M2 12H4M18 6.3L19.4 4.9M20 12H22"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg {...common} aria-hidden="true">
      <path
        d="M3 21V9H10V21M10 13H15V21M15 5H21V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 12H7M6 15H7M12 16H13M12 19H13M18 9H19M18 12H19M18 15H19M18 18H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function CategoryCard({
  title,
  description,
  icon,
  last = false,
}: CategoryCardProps) {
  return (
    <article
      className={[
        'flex min-h-[118px] items-center gap-4 px-7 py-5',
        !last ? 'border-b border-[#dbe4df] md:border-b-0 md:border-r' : '',
      ].join(' ')}
    >
      <div className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-full bg-[#eff8f2] text-[#007a4f]">
        <CategoryIcon type={icon} />
      </div>

      <div className="flex flex-col">
        <strong className="text-[18px] leading-[1.25] font-bold text-[#173e4e]">
          {title}
        </strong>

        <span className="text-[18px] leading-[1.25] text-[#173e4e]">
          {description}
        </span>
      </div>
    </article>
  )
}