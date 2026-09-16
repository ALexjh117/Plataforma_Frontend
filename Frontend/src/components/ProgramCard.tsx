type ProgramCardProps = {
  image: string
  title: string
  description: string
  href?: string
}

export default function ProgramCard({ image, title, description, href = '#programa' }: ProgramCardProps) {
  return (
    <article className="program-card">
      <img src={image} alt={title} className="program-card__image" />
      <div className="program-card__body">
        <div className="program-card__text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <a href={href} className="program-card__action" aria-label={`Ver programa ${title}`}>
          →
        </a>
      </div>
    </article>
  )
}
