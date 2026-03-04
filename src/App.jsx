import { useEffect, useRef, useState } from 'react'
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
  { label: 'Demo Site 1', href: 'https://example.com/demo-site-1' },
  { label: 'Demo Site 2', href: 'https://example.com/demo-site-2' },
  { label: 'Demo Site 3', href: 'https://example.com/demo-site-3' },
  { label: 'Demo Site 4', href: 'https://example.com/demo-site-4' },
  { label: 'Demo Site 5', href: 'https://example.com/demo-site-5' },
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
  currentPage,
  isPortfolioOpen,
  onPortfolioToggle,
  onNavigate,
  portfolioMenuRef,
  showEmail,
  onContactToggle,
}) {
  return (
    <header className="topdiv">
      <nav className="nav" aria-label="Primary navigation">
        <button
          className={`nav-link-button${currentPage === 'home' ? ' active' : ''}`}
          type="button"
          onClick={() => onNavigate('home')}
        >
          Home
        </button>
        <div className="nav-dropdown" ref={portfolioMenuRef}>
          <button
            className="nav-link-button"
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
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <button
          className={`nav-link-button${currentPage === 'blog' ? ' active' : ''}`}
          type="button"
          onClick={() => onNavigate('blog')}
        >
          Blog
        </button>
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

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [openSection, setOpenSection] = useState(null)
  const [openImage, setOpenImage] = useState(null)
  const [showEmail, setShowEmail] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const portfolioMenuRef = useRef(null)

  const toggleSection = (name) => {
    setOpenSection(openSection === name ? null : name)
  }

  const navigateToPage = (page) => {
    setCurrentPage(page)
    setIsPortfolioOpen(false)
    setOpenImage(null)
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
          currentPage={currentPage}
          isPortfolioOpen={isPortfolioOpen}
          onPortfolioToggle={() => setIsPortfolioOpen((current) => !current)}
          onNavigate={navigateToPage}
          portfolioMenuRef={portfolioMenuRef}
          showEmail={showEmail}
          onContactToggle={() => setShowEmail((current) => !current)}
        />

        <div className="contentdiv">
          {currentPage === 'home' && (
            <>
              <section className="accordion" aria-label="About and services">
                {accordionSections.map((section) => (
                  <AccordionItem
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    isOpen={openSection === section.id}
                    onToggle={() => toggleSection(section.id)}
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
                    onClick={() => setOpenImage(image.src)}
                    aria-label={`Open image ${idx + 1}: ${image.alt}`}
                  >
                    <img src={image.src} className="carousel-img" alt={image.alt} />
                  </button>
                ))}
              </section>

              <section className="pitch" aria-label="Brand statement">
                <p>
                  Even in challenging times, whether markets shift or headlines
                  change, your brand deserves clarity, confidence, and creative
                  impact. I build websites and visuals that do not just survive
                  uncertainty. They stand out, grow trust, and open doors.
                </p>
                <p className="pitch-signature">- Emilio Sierra</p>
              </section>
            </>
          )}

          {currentPage === 'blog' && (
            <section className="blog" aria-label="Blog posts">
              <article className="blog-post">
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
                <div className="blog-post-content">
                  <img src={card} alt="Mock blog post visual" className="blog-post-image" />
                  <div className="blog-post-text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec viverra sem in facilisis gravida. Nullam dictum eros
                      nec mauris posuere, vel suscipit lorem fringilla.
                    </p>
                    <p>
                      Phasellus hendrerit malesuada magna, in posuere lectus
                      pulvinar non. Integer pretium, mi sed convallis faucibus,
                      justo lorem scelerisque risus, vitae feugiat arcu sem in
                      est.
                    </p>
                    <p>
                      Curabitur varius iaculis sem, sit amet gravida felis
                      luctus a. Praesent at neque quis dui pulvinar viverra nec
                      et risus.
                    </p>
                  </div>
                </div>
              </article>
            </section>
          )}

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
