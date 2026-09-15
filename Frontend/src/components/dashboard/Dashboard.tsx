import './Dashboard.css'
import Header from '../Header'
import Hero from '../Hero'
import CategoryCard from '../CategoryCard'
import ProgramCard from '../ProgramCard'
import { assets } from '../../assets/images'

type Category = { icon: string; title: string; description: string }
type Program = { title: string; description: string; image: string }

const categories: Category[] = [
  { icon: '♥', title: 'Formación', description: 'Técnica y Tecnológica' },
  { icon: '◌', title: 'Educación', description: 'para el Trabajo' },
  { icon: '⚡', title: 'Innovación', description: 'y Emprendimiento' },
  { icon: '▣', title: 'Presencia en', description: 'todo el territorio' },
]

const programs: Program[] = [
  { title: 'Café', description: 'Formación técnica', image: assets.programs.coffee },
  { title: 'Chocolate', description: 'y afines', image: assets.programs.chocolate },
  { title: 'Gestión Ambiental', description: 'y Sostenibilidad', image: assets.programs.environmental },
  { title: 'Tecnologías de la', description: 'Información', image: assets.programs.technology },
]

function Categories() {
  return (
    <section className="categories" aria-label="Áreas del SENA">
      {categories.map((category) => (
        <CategoryCard
          key={category.title}
          icon={category.icon}
          title={category.title}
          description={category.description}
        />
      ))}
    </section>
  )
}

function Programs() {
  return (
    <section className="programs" id="oferta">
      <h2>Nuestros programas destacados</h2>
      <div className="program-grid">
        {programs.map((program) => (
          <ProgramCard
            key={program.title}
            image={program.image}
            title={program.title}
            description={program.description}
            href="#oferta"
          />
        ))}
      </div>
    </section>
  )
}

export default function Dashboard() {
  return (
    <main className="dashboard">
      <Header />
      <Hero
        title={
          <>
            El SENA
            <br />
            forma personas,
            <br />
            <span className="hero-highlight">transforma vidas</span>
          </>
        }
        description="Somos una entidad del Estado que ofrece formación profesional gratuita y de calidad para el trabajo, la formación y el desarrollo del país."
        primaryCtaText="Conoce nuestra oferta"
      />
      <Categories />
      <Programs />
    </main>
  )
}
