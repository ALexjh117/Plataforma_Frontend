type CategoryCardProps = {
  icon: string
  title: string
  description: string
}

export default function CategoryCard({ icon, title, description }: CategoryCardProps) {
  return (
    <article className="category-card">
      <span className="category-card__icon" aria-hidden="true">{icon}</span>
      <div className="category-card__content">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </article>
  )
}
