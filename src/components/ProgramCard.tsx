type ProgramCardProps = {
  image: string
  title: string
  description: string
}

export default function ProgramCard({
  image,
  title,
  description,
}: ProgramCardProps) {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#d9e1dd] bg-white shadow-[0_2px_8px_rgba(10,34,28,0.05)]">
      <img
        src={image}
        alt={title}
        className="h-[120px] w-full object-cover"
      />

      <div className="flex min-h-[112px] items-center justify-between gap-4 px-4 py-4">
        <div>
          <h3 className="text-[20px] font-bold leading-[1.12] text-[#173e4e]">
            {title}
          </h3>

          <p className="mt-1 text-[16px] leading-[1.2] text-[#57707b]">
            {description}
          </p>
        </div>

        <a
          href="#oferta"
          aria-label={`Ver programa ${title}`}
          className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[#11895c] text-[22px] leading-none text-white transition hover:brightness-105"
        >
          →
        </a>
      </div>
    </article>
  )
}