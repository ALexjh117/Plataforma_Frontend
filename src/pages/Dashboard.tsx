import Button from '../components/Button'
import Header from '../components/Header'
import CategoryCard from '../components/CategoryCard'
import ProgramCard from '../components/ProgramCard'

const categories = [
  {
    title: 'Formación',
    description: 'Técnica y Tecnológica',
    icon: 'training',
  },
  {
    title: 'Educación',
    description: 'para el Trabajo',
    icon: 'education',
  },
  {
    title: 'Innovación',
    description: 'y Emprendimiento',
    icon: 'innovation',
  },
  {
    title: 'Presencia en',
    description: 'todo el territorio',
    icon: 'territory',
  },
] as const

const programs = [
  {
    title: 'Café',
    description: 'Formación técnica',
    image: '/img/programa-cafe.jpg',
  },
  {
    title: 'Chocolate',
    description: 'y afines',
    image: '/img/programa-chocolate.jpg',
  },
  {
    title: 'Gestión Ambiental',
    description: 'y Sostenibilidad',
    image: '/img/programa-ambiental.jpg',
  },
  {
    title: 'Tecnologías de la',
    description: 'Información',
    image: '/img/programa-tecnologia.jpg',
  },
]

function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[510px] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/img/imageninicio.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#003b29] via-[#00452f]/90 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[510px] max-w-[1400px] items-center px-8 py-12 lg:px-[78px]">
        <div className="max-w-[570px]">
          <h1 className="text-[52px] font-extrabold leading-[1.02] tracking-[-2px] text-white md:text-[58px]">
            El SENA
            <br />
            forma personas,
            <br />
            <span className="inline-block rounded-[10px] bg-[#079447] px-2 py-0.5">
              transforma vidas
            </span>
          </h1>

          <p className="mt-5 max-w-[560px] text-[20px] leading-[1.38] text-white/95">
            Somos una entidad del Estado que ofrece formación profesional
            gratuita y de calidad para el trabajo, la formación y el desarrollo
            del país.
          </p>

          <Button
            as="a"
            href="#oferta"
            className="mt-6 inline-flex h-[60px] items-center rounded-[14px] bg-[#ff9811] px-8 text-[20px] font-bold text-white shadow-lg transition hover:brightness-105"
          >
            Conoce nuestra oferta
            <span className="ml-3 text-[28px] leading-none">→</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section className="relative z-20 mx-auto -mt-8 max-w-[1325px] px-4 md:px-0">
      <div className="grid overflow-hidden rounded-[20px] border border-[#dfe7e2] bg-white shadow-[0_5px_20px_rgba(0,0,0,0.08)] md:grid-cols-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            description={category.description}
            icon={category.icon}
            last={index === categories.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

function Programs() {
  return (
    <section
      id="oferta"
      className="mx-auto max-w-[1325px] px-4 pb-14 pt-8 md:px-0"
    >
      <h2 className="mb-5 text-[28px] font-bold tracking-[-0.5px] text-[#0a4b43]">
        Nuestros programas destacados
      </h2>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {programs.map((program) => (
          <ProgramCard
            key={program.title}
            title={program.title}
            description={program.description}
            image={program.image}
          />
        ))}
      </div>
    </section>
  )
}

export default function Dashboard() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <Hero />
      <Categories />
      <Programs />
    </main>
  )
}