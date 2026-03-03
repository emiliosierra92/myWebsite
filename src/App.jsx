import { useState } from 'react'
import './App.css'
import logo from './assets/images/logo.png' // adjust the extension if needed
import dolphins from './assets/images/dolphins.png'
import miami from './assets/images/miami.png'
import beach from './assets/images/beach.webp'
import card from './assets/images/card.png'

function AccordionItem({ title, isOpen, onClick, children, bgImage }) {
  const contentStyle = bgImage
    ? { backgroundImage: `url(${bgImage})` }
    : undefined

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onClick}>
        <span>{title}</span>
        <span className="indicator">{isOpen ? '−' : '+'}</span>
      </div>
      <div
        className={`accordion-content ${isOpen ? 'open' : ''}`}
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  )
}

function App() {
  const [openSection, setOpenSection] = useState(null)
  const [openImage, setOpenImage] = useState(null)

  const toggleSection = (name) => {
    setOpenSection(openSection === name ? null : name)
  }

  return (
    <div className="app">
      <div className="topdiv">
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Portfolio</a>
          <a href="#">Blog</a>
        </nav>

        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <h1>EmilioSierra.com</h1>
        </div>

        <button className="contact-button">Contact Me</button>
      </div>

      <div className="accordion">
        <AccordionItem
          title="About Emilio"
          isOpen={openSection === 'about'}
          onClick={() => toggleSection('about')}
          bgImage={dolphins}
        >
          <p>
            I'm Emilio. Miami.. Days: accessibility at Hard Rock Stadium. Wheelchairs. ADA seats. Super Bowls. Beyoncé tours. F1. Crowds move. I move them. Inclusive surfaces. Bilingual. Empathetic enough. Nights: HTML, CSS, JavaScript. Photoshop. Access and tech. That's it.
          </p>
        </AccordionItem>

        <AccordionItem
          title="Services"
          isOpen={openSection === 'services'}
          onClick={() => toggleSection('services')}
          bgImage={miami}
        >
          <p>
            <strong>Web Development & Digital Accessibility</strong><br/>
            Development of responsive websites using HTML, CSS, and JavaScript. Emphasis on performance, quality assurance, debugging, and WCAG-compliant accessibility.
            <br/><br/>
            <strong>Graphic Design & Visual Content Creation</strong><br/>
            Image editing and creation in Photoshop. Services include retouching, manipulation, optimization, and production of branded or event-specific visuals.
            <br/><br/>
            <strong>Videography & Broadcast Media Production</strong><br/>
            Event videography, live streaming setup, camera operation, and post-production. Includes audio/video editing for sports, concerts, festivals, or promotional material.
          </p>
        </AccordionItem>
      </div>

      {/* carousel section */}
      <div className="carousel">
        {[miami, dolphins, beach, card].map((src, idx) => (
          <img
            key={idx}
            src={src}
            className="carousel-img"
            onClick={() => setOpenImage(src)}
            alt={`carousel-${idx}`}
          />
        ))}
      </div>

      <div className="pitch">
        <p>
          “Even in challenging times — whether markets shift or news headlines change — your brand deserves clarity, confidence, and creative impact. I build websites and visuals that don’t just survive uncertainty — they stand out, grow trust, and open doors.” -Emilio Sierra
        </p>
      </div>

      <div className="footer">
        <nav className="social-links">
          <a href="https://www.linkedin.com/in/emiliosierra/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/reydehonduras/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.youtube.com/@VAMPIRE6KING9" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://www.twitch.tv/vampire6king9" target="_blank" rel="noopener noreferrer">Twitch</a>
          <a href="https://www.paypal.com/donate/?hosted_button_id=JUB8DGZM5F7EG" target="_blank" rel="noopener noreferrer">PayPal</a>
        </nav>
      </div>

      {openImage && (
        <div className="lightbox" onClick={() => setOpenImage(null)}>
          <img src={openImage} className="lightbox-img" alt="enlarged" />
        </div>
      )}
    </div>
  )
}

export default App
