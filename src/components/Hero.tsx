export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[510px] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/img/imageninicio.jpg')",
      }}
    >
      {/* Degradado más suave para que se vea claramente la chica */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#003b29]/88 via-[#003b29]/42 to-transparent" />

      <div className="relative z-10 flex min-h-[510px] items-center px-[78px] py-12">
        <div className="max-w-[570px]">
          <h1 className="text-[50px] font-extrabold leading-[1.02] tracking-[-2px] text-white lg:text-[58px]">
            El SENA
            <br />
            forma personas,
            <br />
            <span className="inline-block rounded-[9px] bg-[#079447] px-2 py-0.5">
              transforma vidas
            </span>
          </h1>

          <p className="mt-5 max-w-[555px] text-[20px] leading-[1.38] text-white">
            Somos una entidad del Estado que ofrece formación profesional
            gratuita y de calidad para el trabajo, la formación y el desarrollo
            del país.
          </p>

          <a
            href="#oferta"
            className="mt-6 inline-flex h-[60px] items-center rounded-[14px] bg-[#ff9811] px-8 text-[20px] font-bold text-white shadow-md transition hover:brightness-105"
          >
            <span>Conoce nuestra oferta</span>
            <span className="ml-4 text-[28px] leading-none">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
