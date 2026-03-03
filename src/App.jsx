import { useEffect, useState } from 'react'
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

function App() {
  const [openSection, setOpenSection] = useState(null)
  const [openImage, setOpenImage] = useState(null)
  const [showEmail, setShowEmail] = useState(false)

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

  return (
    <div className="site-shell">
      <main className="app" aria-label="Emilio Sierra portfolio">
        <header className="topdiv">
          <nav className="nav" aria-label="Primary navigation">
            <a href="#">Home</a>
            <a href="#">Portfolio</a>
            <a href="#">Blog</a>
          </nav>

          <div className="logo-container">
            <img src={logo} alt="Emilio Sierra logo" className="logo" />
            <h1>EmilioSierra.com</h1>
          </div>

          <button
            className="contact-button"
            type="button"
            onClick={() => setShowEmail((current) => !current)}
          >
            {showEmail ? 'emiliosierra@aol.com' : 'Contact Me'}
          </button>
        </header>

        <div className="contentdiv">
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

          <footer className="footer">
            <nav className="social-links" aria-label="Social links">
              <a
                href="https://www.linkedin.com/in/emiliosierra/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/reydehonduras/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@VAMPIRE6KING9"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
              <a
                href="https://www.twitch.tv/vampire6king9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitch
              </a>
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=JUB8DGZM5F7EG"
                target="_blank"
                rel="noopener noreferrer"
              >
                PayPal
              </a>
            </nav>
          </footer>
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
