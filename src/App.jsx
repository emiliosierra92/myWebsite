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
import pk from './assets/images/pk.png'
import luckybird from './assets/images/luckybird.png'
import pizzakingVideo from './assets/media/pizzaking.mp4'

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
      'Restaurant brand site with video hero, menu grid, and real location map for instant credibility.',
  },
  {
    id: 'demo-site-2',
    title: 'Demo Site 2',
    image: dolphins,
    imageAlt: 'Preview of demo site 2',
    summary:
      'Product-style landing with bold hero, content-rich layout, and media cards for quick scan.',
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

const portfolioPreview = portfolioDemos.filter(
  (demo) => demo.id === 'demo-site-1' || demo.id === 'demo-site-2',
)

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
      <section className="portfolio-preview" aria-label="Portfolio preview section">
        <header className="portfolio-preview-header">
          <p className="portfolio-preview-kicker">Portfolio Preview Section</p>
          <h2>Visual proof in the first 10 seconds.</h2>
          <p>
            Two live demos, two different design directions. Click a preview to open the full
            experience.
          </p>
        </header>

        <div className="portfolio-preview-grid">
          {portfolioPreview.map((demo) => (
            <Link key={demo.id} to={`/portfolio/${demo.id}`} className="portfolio-preview-card">
              <div className="portfolio-preview-media">
                <img src={demo.image} alt={demo.imageAlt} />
                <span className="portfolio-preview-tag">{demo.title}</span>
              </div>
              <div className="portfolio-preview-body">
                <h3>{demo.title}</h3>
                <p>{demo.summary}</p>
                <span className="portfolio-preview-cta">View full demo</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
    <section className="demo-one-layout" aria-label="Demo Site 1 layout scaffold">
      <section id="topdiv" className="demo-one-block demo-one-topdiv">
        <img src={pk} alt="PK logo" className="demo-one-top-logo" />
        <nav className="demo-one-nav" aria-label="Demo Site 1 navigation">
          <a href="#about-us">About us</a>
          <a href="#menu">Menu</a>
          <a href="#specialoffers">Specials</a>
          <a href="#brunch">Cafe</a>
          <a href="#geolocation">Find us</a>
        </nav>
        <a href="tel:+13053053005">(305) 305 - 3005</a>
      </section>

      <section id="covervideo" className="demo-one-block demo-one-covervideo">
        <video
          className="demo-one-cover-media"
          src={pizzakingVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="demo-one-cover-overlay">
          <p>Welcome to</p>
          <h2>Pizza King</h2>
        </div>
      </section>

      <section id="about-us" className="demo-one-block demo-one-about">
        <h2>about us</h2>
        <p>
          Since opening our doors in this neighborhood, our family-style Italian
          kitchen has focused on fresh ingredients, warm service, and classic
          recipes with a modern Miami vibe.
        </p>
      </section>

      <section id="lunch-time" className="demo-one-block demo-one-split">
        <article className="demo-one-panel">
          <h2>lunch time</h2>
          <p>Monday to Friday</p>
          <p>11:00 AM - 3:00 PM</p>
          <p>
            Fast lunch combos with pizza slices, pasta bowls, salads, and soft
            drinks included.
          </p>
          <a href="#menu">View lunch menu</a>
        </article>
        <article id="brunch" className="demo-one-panel">
          <h2>brunch</h2>
          <p>Sunday only</p>
          <p>9:00 AM - 2:00 PM</p>
          <p>
            Brunch favorites including baked eggs, breakfast pizza, pastries,
            coffee, and fresh juices.
          </p>
          <a href="#menu">View brunch menu</a>
        </article>
      </section>

      <section id="menu" className="demo-one-block demo-one-menu">
        <h2>menu</h2>
        <div className="demo-one-menu-grid">
          <article>
            <h3>regular menu</h3>
            <h4>pizza options</h4>
            <ul>
              <li>Margherita Pizza</li>
              <li>Pepperoni Pizza</li>
              <li>Meat Lovers Pizza</li>
              <li>BBQ Chicken Pizza</li>
              <li>Hawaiian Pizza</li>
              <li>Veggie Supreme Pizza</li>
              <li>White Spinach Pizza</li>
            </ul>
          </article>
          <article>
            <h3>regular menu</h3>
            <h4>pasta options</h4>
            <ul>
              <li>Spaghetti Bolognese</li>
              <li>Fettuccine Alfredo</li>
              <li>Penne Vodka</li>
              <li>Baked Ziti</li>
              <li>Lasagna Classica</li>
              <li>Seafood Linguine</li>
              <li>Pesto Chicken Penne</li>
            </ul>
          </article>
          <article>
            <h3>sunday brunch menu</h3>
            <ul>
              <li>Breakfast Pizza (eggs, bacon, mozzarella)</li>
              <li>Ricotta Pancakes</li>
              <li>Eggs Florentine</li>
              <li>Chicken & Waffles</li>
              <li>French Toast with berries</li>
              <li>Cappuccino or fresh orange juice</li>
            </ul>
          </article>
          <article>
            <h3>lunch menu</h3>
            <ul>
              <li>2-Slice Pizza Combo + Drink</li>
              <li>Chicken Caesar Wrap + Fries</li>
              <li>Pasta Bowl of the Day + Garlic Bread</li>
              <li>Grilled Chicken Panini + Soup</li>
              <li>Garden Salad + Soup + Drink</li>
            </ul>
          </article>
          <article>
            <h3>dinner menu</h3>
            <ul>
              <li>Chicken Parmesan with spaghetti</li>
              <li>Shrimp Scampi Linguine</li>
              <li>Steak & Mushroom Alfredo</li>
              <li>Baked Ravioli with meat sauce</li>
              <li>Family Pizza + Pasta Dinner Combo</li>
            </ul>
          </article>
          <article>
            <h3>house specials</h3>
            <ul>
              <li>Family Combo A (Large Pizza + Pasta)</li>
              <li>Family Combo B (2 Large Pizzas + Wings)</li>
              <li>Chef&apos;s Weekly Feature</li>
              <li>Kids Meal Bundle</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="specialoffers" className="demo-one-block demo-one-specials">
        <article>
          <h2>special offers</h2>
          <p>Planning a birthday, office event, or family celebration?</p>
          <p>
            Ask about our Party Package options for larger groups, including
            trays, combo bundles, and reserved seating support.
          </p>
          <a href="#contactbar">Ask about party packages</a>
        </article>
        <article id="business" className="demo-one-business-card">
          <div>
            <h2>business</h2>
            <p>Sunday to Thursday: 6:00 AM - 10:00 PM</p>
            <p>Friday and Saturday: 6:00 AM - 11:00 PM</p>
          </div>
          <div>
            <h2>careers</h2>
            <p>Do you wanna work for us? We&apos;re hiring.</p>
            <p>Send your resume and availability to join our team.</p>
            <a href="mailto:jobs@pizzaking.com">Apply now</a>
          </div>
        </article>
      </section>

      <section id="contactbar" className="demo-one-block demo-one-contactbar">
        <div className="demo-one-contact-social">
          <a href="#contactbar">Facebook</a>
          <a href="#contactbar">Instagram</a>
          <a href="#contactbar">TikTok</a>
        </div>
        <div className="demo-one-contact-columns">
          <article>
            <h3>Our Location</h3>
            <p>1234 Sample Avenue, Miami, FL 33176</p>
          </article>
          <article>
            <h3>Our Phone Number</h3>
            <p>(305) 305 - 3005</p>
          </article>
          <article>
            <h3>Our Email</h3>
            <p>hello@pizzaking.com</p>
          </article>
        </div>
      </section>

      <section id="geolocation" className="demo-one-block demo-one-geolocation">
        <iframe
          className="demo-one-map-widget"
          title="Pizza King location map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-80.3666%2C25.6660%2C-80.3110%2C25.7030&layer=mapnik&marker=25.6845%2C-80.3388"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section id="footer" className="demo-one-block demo-one-footer">
        <p>Come Eat Pizza with The Pizza Kings!</p>
        <small>© EmilioSierra.com 2026</small>
      </section>
    </section>
  )
}

function DemoSiteTwoPage() {
  const luckyBirdVideos = [
    {
      id: 'video-1',
      title: 'Lucky Bird Morning Chirps',
      href: 'https://www.youtube.com/@VAMPIRE6KING9',
    },
    {
      id: 'video-2',
      title: 'Cockatiel Training Basics',
      href: 'https://www.youtube.com/results?search_query=cockatiel+training+basics',
    },
    {
      id: 'video-3',
      title: 'Lucky Bird Singing Session',
      href: 'https://www.youtube.com/results?search_query=lucky+bird+cockatiel+sings',
    },
    {
      id: 'video-4',
      title: 'Cockatiel Care Routine',
      href: 'https://www.youtube.com/results?search_query=cockatiel+care+routine',
    },
  ]

  return (
    <section className="demo-two-layout" aria-label="Demo Site 2 layout scaffold">
      <section id="topdiv" className="demo-two-topdiv">
        <Link to="/" className="demo-two-home-button">
          Home
        </Link>

        <div className="demo-two-brand-block">
          <img src={luckybird} alt="Lucky Bird hero image" className="demo-two-hero-image" />
        </div>

        <a href="#shop" className="demo-two-shop-link" aria-label="Shop now">
          <span>Shop Now</span>
          <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="demo-two-bag-icon">
            <path d="M8 8V7a4 4 0 1 1 8 0v1h2.1a1 1 0 0 1 1 .89l1.2 11A1 1 0 0 1 19.31 21H4.69a1 1 0 0 1-.99-1.11l1.2-11a1 1 0 0 1 1-.89H8Zm2 0h4V7a2 2 0 1 0-4 0v1Zm-2 4a1 1 0 0 0 0 2h.01a1 1 0 0 0 0-2H8Zm8 0a1 1 0 0 0 0 2h.01a1 1 0 0 0 0-2H16Z" />
          </svg>
        </a>
      </section>

      <section className="demo-two-contentdiv" aria-label="Cockatiel info and videos">
        <aside className="demo-two-video-column">
          <h2>Lucky Bird YouTube Videos</h2>
          <div className="demo-two-video-list">
            {luckyBirdVideos.map((video) => (
              <a
                key={video.id}
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-two-video-card"
              >
                <img src={luckybird} alt={`${video.title} thumbnail`} className="demo-two-video-thumb" />
                <span>{video.title}</span>
              </a>
            ))}
          </div>
        </aside>

        <article className="demo-two-infodump">
          <h2>Cockatiel Infodump</h2>
          <p>
            Cockatiels are small parrots known for social personalities, expressive crest
            feathers, and whistling ability. Most thrive on daily interaction and should not
            be left isolated for long periods.
          </p>
          <p>
            A solid cockatiel setup starts with a wide cage, natural wood perches of varied
            diameters, safe chew toys, and at least 10 to 12 hours of sleep in a dark, quiet
            space. Diet should center on quality pellets, supplemented with leafy greens,
            vegetables, and a measured amount of seed.
          </p>
          <p>
            Cockatiels communicate through posture and sound. Crest up often means alert or
            curious, while a flattened crest can signal stress. Gentle, consistent handling and
            short training sessions with rewards help build trust and reduce fear behaviors.
          </p>
          <p>
            Common health priorities include clean air quality, regular nail and beak checks,
            and routine avian-vet visits. Avoid nonstick pan fumes, smoke, aerosol sprays, and
            scented candles around birds, since their respiratory systems are highly sensitive.
          </p>
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

  if (demoId === 'demo-site-2') {
    return <DemoSiteTwoPage />
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
  const location = useLocation()
  const isDemoSiteOne = location.pathname === '/portfolio/demo-site-1'
  const isDemoSiteTwo = location.pathname === '/portfolio/demo-site-2'
  const isBlankSlateDemo = isDemoSiteTwo
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
    <div
      className={`site-shell${isDemoSiteOne ? ' site-shell-demo-one' : ''}${isDemoSiteTwo ? ' site-shell-demo-two' : ''}`}
    >
      <main
        className={`app${isDemoSiteOne ? ' app-demo-one' : ''}${isDemoSiteTwo ? ' app-demo-two' : ''}`}
        aria-label="Emilio Sierra portfolio"
      >
        {!isDemoSiteOne && !isBlankSlateDemo && (
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
        )}

        {isBlankSlateDemo ? (
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
        ) : (
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

            {!isDemoSiteOne && <SocialFooter />}
          </div>
        )}
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
