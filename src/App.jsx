import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import './App.css'
import logo from './assets/images/logo.png'
import dolphins from './assets/images/dolphins.png'
import miami from './assets/images/miami.png'
import beach from './assets/images/beach.webp'
import card from './assets/images/card.png'

const accordionSections = [
  {
    id: 'about',
    title: 'About Emilio',
    bgImage: dolphins,
    content: (
      <p>
        I&apos;m Emilio. Miami. Days: accessibility at Hard Rock Stadium.
        Wheelchairs. ADA seats. Super Bowls. Beyonce tours. F1. Crowds move. I
        move them. Inclusive surfaces. Bilingual. Empathetic enough. Nights:
        HTML, CSS, JavaScript. Photoshop. Access and tech. That&apos;s it.
      </p>
    ),
  },
  {
    id: 'services',
    title: 'Services',
    bgImage: miami,
    content: (
      <p>
        <strong>Web Development &amp; Digital Accessibility</strong>
        <br />
        Development of responsive websites using HTML, CSS, and JavaScript.
        Emphasis on performance, quality assurance, debugging, and
        WCAG-compliant accessibility.
        <br />
        <br />
        <strong>Graphic Design &amp; Visual Content Creation</strong>
        <br />
        Image editing and creation in Photoshop. Services include retouching,
        manipulation, optimization, and production of branded or event-specific
        visuals.
        <br />
        <br />
        <strong>Videography &amp; Broadcast Media Production</strong>
        <br />
        Event videography, live streaming setup, camera operation, and
        post-production. Includes audio/video editing for sports, concerts,
        festivals, or promotional material.
      </p>
    ),
  },
]

const carouselImages = [
  { src: miami, alt: 'Miami skyline' },
  { src: dolphins, alt: 'Dolphins image' },
  { src: beach, alt: 'Beach scene' },
  { src: card, alt: 'Business card design' },
]

const portfolioLinks = [
  { id: 'demo-site-1', label: 'Demo Site 1', to: '/portfolio/demo-site-1' },
  { id: 'demo-site-2', label: 'Demo Site 2', to: '/portfolio/demo-site-2' },
  { id: 'demo-site-3', label: 'Demo Site 3', to: '/portfolio/demo-site-3' },
  { id: 'demo-site-4', label: 'Demo Site 4', to: '/portfolio/demo-site-4' },
  { id: 'demo-site-5', label: 'Demo Site 5', to: '/portfolio/demo-site-5' },
]

const portfolioDemos = [
  {
    id: 'demo-site-1',
    title: 'Demo Site 1',
    image: miami,
    imageAlt: 'Preview of demo site 1',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat sem sit amet orci dictum, in faucibus felis vulputate.',
  },
  {
    id: 'demo-site-2',
    title: 'Demo Site 2',
    image: dolphins,
    imageAlt: 'Preview of demo site 2',
    summary:
      'Integer iaculis risus et mi luctus, vel aliquet justo malesuada. Suspendisse potenti. Sed tempus nisi non sem volutpat ultrices.',
  },
  {
    id: 'demo-site-3',
    title: 'Demo Site 3',
    image: beach,
    imageAlt: 'Preview of demo site 3',
    summary:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec vitae nisi at lorem porttitor dignissim.',
  },
  {
    id: 'demo-site-4',
    title: 'Demo Site 4',
    image: card,
    imageAlt: 'Preview of demo site 4',
    summary:
      'Nunc congue eros sed magna faucibus fermentum. Duis ultrices, ligula non lobortis elementum, turpis lacus congue justo, a vehicula nisl magna id metus.',
  },
  {
    id: 'demo-site-5',
    title: 'Demo Site 5',
    image: miami,
    imageAlt: 'Preview of demo site 5',
    summary:
      'Curabitur non aliquam massa. Nulla facilisi. Proin sit amet nisl ac risus mattis pharetra non non eros.',
  },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/emiliosierra/' },
  { label: 'Instagram', href: 'https://www.instagram.com/reydehonduras/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@VAMPIRE6KING9' },
  { label: 'Twitch', href: 'https://www.twitch.tv/vampire6king9' },
  {
    label: 'PayPal',
    href: 'https://www.paypal.com/donate/?hosted_button_id=JUB8DGZM5F7EG',
  },
]

function AccordionItem({ id, title, isOpen, onToggle, children, bgImage }) {
  const contentId = `${id}-content`
  const buttonId = `${id}-trigger`

  return (
    <article className="accordion-item">
      <h2 className="accordion-heading">
        <button
          id={buttonId}
          className="accordion-trigger"
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <span>{title}</span>
          <span className="indicator" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h2>
      <div
        id={contentId}
        className={`accordion-content${isOpen ? ' open' : ''}`}
        role="region"
        aria-labelledby={buttonId}
        style={bgImage ? { '--accordion-bg-image': `url(${bgImage})` } : undefined}
      >
        <div className="accordion-content-inner">{children}</div>
      </div>
    </article>
  )
}

function SiteHeader({
  isPortfolioOpen,
  onPortfolioToggle,
  onPortfolioClose,
  onPrimaryNavigate,
  portfolioMenuRef,
  showEmail,
  onContactToggle,
}) {
  const location = useLocation()
  const isPortfolioRoute = location.pathname.startsWith('/portfolio')

  return (
    <header className="topdiv">
      <nav className="nav" aria-label="Primary navigation">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link-button${isActive ? ' active' : ''}`}
          end
          onClick={onPrimaryNavigate}
        >
          Home
        </NavLink>
        <div className="nav-dropdown" ref={portfolioMenuRef}>
          <button
            className={`nav-link-button${isPortfolioRoute ? ' active' : ''}`}
            type="button"
            aria-haspopup="menu"
            aria-expanded={isPortfolioOpen}
            onClick={onPortfolioToggle}
          >
            Portfolio
          </button>
          <div
            className={`portfolio-dropdown${isPortfolioOpen ? ' open' : ''}`}
            role="menu"
            aria-label="Portfolio demo links"
          >
            {portfolioLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                role="menuitem"
                onClick={() => {
                  onPrimaryNavigate()
                  onPortfolioClose()
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <NavLink
          to="/blog"
          className={({ isActive }) => `nav-link-button${isActive ? ' active' : ''}`}
          onClick={onPrimaryNavigate}
        >
          Blog
        </NavLink>
      </nav>

      <div className="logo-container">
        <img src={logo} alt="Emilio Sierra logo" className="logo" />
        <h1>EmilioSierra.com</h1>
      </div>

      <button className="contact-button" type="button" onClick={onContactToggle}>
        {showEmail ? 'emiliosierra@aol.com' : 'Contact Me'}
      </button>
    </header>
  )
}

function SocialFooter() {
  return (
    <footer className="footer">
      <nav className="social-links" aria-label="Social links">
        {socialLinks.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}

function HomePage({ openSection, onToggleSection, onOpenImage }) {
  return (
    <>
      <section className="accordion" aria-label="About and services">
        {accordionSections.map((section) => (
          <AccordionItem
            key={section.id}
            id={section.id}
            title={section.title}
            isOpen={openSection === section.id}
            onToggle={() => onToggleSection(section.id)}
            bgImage={section.bgImage}
          >
            {section.content}
          </AccordionItem>
        ))}
      </section>

      <section className="carousel" aria-label="Portfolio images">
        {carouselImages.map((image, idx) => (
          <button
            key={image.alt}
            className="carousel-card"
            type="button"
            onClick={() => onOpenImage(image.src)}
            aria-label={`Open image ${idx + 1}: ${image.alt}`}
          >
            <img src={image.src} className="carousel-img" alt={image.alt} />
          </button>
        ))}
      </section>

      <section className="pitch" aria-label="Brand statement">
        <p>
          Even in challenging times, whether markets shift or headlines change,
          your brand deserves clarity, confidence, and creative impact. I build
          websites and visuals that do not just survive uncertainty. They stand
          out, grow trust, and open doors.
        </p>
        <p className="pitch-signature">- Emilio Sierra</p>
      </section>
    </>
  )
}

function BlogPage() {
  return (
    <section className="blog" aria-label="Blog posts">
      <article className="blog-post">
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
        <div className="blog-post-content">
          <img src={card} alt="Mock blog post visual" className="blog-post-image" />
          <div className="blog-post-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              viverra sem in facilisis gravida. Nullam dictum eros nec mauris
              posuere, vel suscipit lorem fringilla.
            </p>
            <p>
              Phasellus hendrerit malesuada magna, in posuere lectus pulvinar
              non. Integer pretium, mi sed convallis faucibus, justo lorem
              scelerisque risus, vitae feugiat arcu sem in est.
            </p>
            <p>
              Curabitur varius iaculis sem, sit amet gravida felis luctus a.
              Praesent at neque quis dui pulvinar viverra nec et risus.
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}

function PortfolioDemoPage() {
  const { demoId } = useParams()
  const demo = portfolioDemos.find((item) => item.id === demoId)

  if (!demo) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="blog" aria-label="Portfolio demo details">
      <article className="blog-post">
        <h2>{demo.title}</h2>
        <div className="blog-post-content">
          <img src={demo.image} alt={demo.imageAlt} className="blog-post-image" />
          <div className="blog-post-text">
            <p>{demo.summary}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              tempor dapibus turpis, ut pretium sem molestie nec. Aliquam erat
              volutpat.
            </p>
            <p>
              Donec interdum, odio non dictum sollicitudin, est orci egestas
              mauris, vel interdum arcu quam in velit.
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}

function App() {
  const [openSection, setOpenSection] = useState(null)
  const [openImage, setOpenImage] = useState(null)
  const [showEmail, setShowEmail] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const portfolioMenuRef = useRef(null)

  const toggleSection = (name) => {
    setOpenSection(openSection === name ? null : name)
  }

  useEffect(() => {
    if (!openImage) {
      return undefined
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenImage(null)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openImage])

  useEffect(() => {
    const onClickOutside = (event) => {
      if (
        isPortfolioOpen &&
        portfolioMenuRef.current &&
        !portfolioMenuRef.current.contains(event.target)
      ) {
        setIsPortfolioOpen(false)
      }
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsPortfolioOpen(false)
      }
    }

    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isPortfolioOpen])

  return (
    <div className="site-shell">
      <main className="app" aria-label="Emilio Sierra portfolio">
        <SiteHeader
          isPortfolioOpen={isPortfolioOpen}
          onPortfolioToggle={() => setIsPortfolioOpen((current) => !current)}
          onPortfolioClose={() => setIsPortfolioOpen(false)}
          onPrimaryNavigate={() => {
            setIsPortfolioOpen(false)
            setOpenImage(null)
          }}
          portfolioMenuRef={portfolioMenuRef}
          showEmail={showEmail}
          onContactToggle={() => setShowEmail((current) => !current)}
        />

        <div className="contentdiv">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  openSection={openSection}
                  onToggleSection={toggleSection}
                  onOpenImage={setOpenImage}
                />
              }
            />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/portfolio" element={<Navigate to="/portfolio/demo-site-1" replace />} />
            <Route path="/portfolio/:demoId" element={<PortfolioDemoPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <SocialFooter />
        </div>
      </main>

      {openImage && (
        <div
          className="lightbox"
          onClick={() => setOpenImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded portfolio image"
        >
          <img
            src={openImage}
            className="lightbox-img"
            alt="Expanded portfolio preview"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default App
