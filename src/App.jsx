import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import './App.css'
import logo from './assets/images/logo.png'
import dolphins from './assets/images/dolphins.png'
import miami from './assets/images/miami.png'
import beach from './assets/images/beach.webp'
import card from './assets/images/card.png'
import mermaid from './assets/images/mermaid.png'
import shark from './assets/images/shark.jpeg'
import xmas from './assets/images/xmas.png'

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
  { src: xmas, alt: 'Christmas themed image' },
  { src: mermaid, alt: 'Mermaid illustration' },
  { src: shark, alt: 'Shark image' },
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
    image: mermaid,
    imageAlt: 'Preview of demo site 4',
    summary:
      'Nunc congue eros sed magna faucibus fermentum. Duis ultrices, ligula non lobortis elementum, turpis lacus congue justo, a vehicula nisl magna id metus.',
  },
  {
    id: 'demo-site-5',
    title: 'Demo Site 5',
    image: shark,
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

const demoOneNavLinks = ['About us', 'Menu', 'Specials', 'La Piccola', 'Find Us']

const demoOneFeatureCards = [
  {
    title: 'Lunch 11:00 am to 3:00 pm',
    subtitle: 'Take out - Dinner',
    cta: 'VIEW MENU',
    image: xmas,
  },
  {
    title: 'Sunday Brunch',
    subtitle: 'Fresh bakery and coffee',
    cta: 'VIEW MENU',
    image: card,
  },
]

const demoOneInfoTiles = [
  {
    title: 'Discover a hidden',
    heading: 'Gem of Miami',
    subheading: 'ITALIAN CUISINE',
    cta: 'MORE INFO',
  },
  {
    title: 'Discover our',
    heading: 'Special Offers',
    subheading: 'Seasonal family deals',
    cta: 'VIEW OFFERS',
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
      <article className="blog-post blog-launch-post">
        <div className="blog-post-content">
          <h2 className="blog-launch-title">EmilioSierra.com is Born.</h2>
          <img src={card} alt="Mock blog post visual" className="blog-post-image" />
          <div className="blog-post-text">
            <p>
              As of today, Tuesday, March 3, 2026, my website has officially launched and is live. Thank you, everyone!
            </p>
            <p>
              Special thanks to my coding Instructor Angela Yu for sharpening my
              skills, and thanks to my best friend Christian Valdes for talking
              me into taking her course on Udemy.com.{' '}
              <a
                href="https://www.linkedin.com/in/angela-yu1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                #AngelaYuThankYou
              </a>
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}

function DemoSiteOnePage() {
  return (
    <section className="demo-one" aria-label="Demo Site 1 restaurant template">
      <header className="demo-one-topbar">
        <p>KENDALL</p>
        <a href="tel:+13052715441">(305) 271 - 5441</a>
      </header>

      <nav className="demo-one-nav" aria-label="Restaurant section navigation">
        {demoOneNavLinks.map((item) => (
          <a key={item} href="#menu">
            {item}
          </a>
        ))}
      </nav>

      <article className="demo-one-hero">
        <img src={miami} alt="Restaurant front mood shot" className="demo-one-hero-image" />
        <div className="demo-one-hero-copy">
          <p className="demo-one-hero-kicker">Welcome to</p>
          <h2>DI PAPA&apos;S</h2>
          <p>
            Since opening our doors in 1997 at the same location, we&apos;ve
            prided ourselves in keeping the Italian tradition and family
            atmosphere alive and well.
          </p>
          <p>
            Di Papa&apos;s remains an icon today and still sets the standard for
            the best pizza, New York style in Kendall, Miami.
          </p>
        </div>
      </article>

      <section id="menu" className="demo-one-feature-grid" aria-label="Menu highlights">
        {demoOneFeatureCards.map((item) => (
          <article key={item.title} className="demo-one-feature-card">
            <img src={item.image} alt={`${item.title} feature`} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <a href="#menu">{item.cta}</a>
            </div>
          </article>
        ))}
      </section>

      <section className="demo-one-info-tiles" aria-label="Restaurant offers">
        {demoOneInfoTiles.map((item) => (
          <article key={item.heading} className="demo-one-info-tile">
            <p>{item.title}</p>
            <h3>{item.heading}</h3>
            <h4>{item.subheading}</h4>
            <a href="#offers">{item.cta}</a>
          </article>
        ))}
      </section>

      <section id="offers" className="demo-one-bottom-grid" aria-label="Hours and contact">
        <article className="demo-one-hours">
          <h3>Business Hours</h3>
          <p>Sunday to Thursday</p>
          <strong>6 am to 10 pm</strong>
          <p>Fridays and Saturdays</p>
          <strong>6 am to 10 pm</strong>
        </article>
        <article className="demo-one-careers">
          <h3>Work with us</h3>
          <p>Join our team!</p>
          <a href="#offers">Send Resume</a>
        </article>
        <article className="demo-one-contact">
          <h3>OUR LOCATION</h3>
          <p>9877 N Kendall Dr, Miami, FL 33176</p>
          <h3>PHONE NUMBER</h3>
          <p>(305) 271 - 5441</p>
          <h3>E-MAIL</h3>
          <p>dipapasitalian@gmail.com</p>
        </article>
      </section>
    </section>
  )
}

function PortfolioDemoPage() {
  const { demoId } = useParams()
  const demo = portfolioDemos.find((item) => item.id === demoId)

  if (!demo) {
    return <Navigate to="/" replace />
  }

  if (demoId === 'demo-site-1') {
    return <DemoSiteOnePage />
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
