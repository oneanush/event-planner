import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Instagram, Menu, X } from 'lucide-react'
import { brand, copy, imageUrl, navigation, portfolio, process, services, testimonials, type PortfolioItem } from './data/siteConfig'

const filters = ['All', 'Weddings', 'Birthdays', 'Corporate', 'Soirées'] as const
type Filter = typeof filters[number]

function App() {
  const [activeService, setActiveService] = useState(services[0])
  const [filter, setFilter] = useState<Filter>('All')
  const [selectedEvent, setSelectedEvent] = useState<PortfolioItem | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [storyIndex, setStoryIndex] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', type: '', guests: '', date: '', notes: '' })
  const formRef = useRef<HTMLElement>(null)
  const visiblePortfolio = useMemo(() => filter === 'All' ? portfolio : portfolio.filter(item => item.category === filter), [filter])

  useEffect(() => {
    let scrollInstance: { destroy?: () => void } | undefined
    const media = window.matchMedia('(max-width: 760px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const configureAndMount = () => {
      const act = document.querySelector<HTMLElement>('#portfolio')
      const rail = document.querySelector<HTMLElement>('#portfolio-rail')
      const processAct = document.querySelector<HTMLElement>('.process-section')
      const staticScroll = media.matches || reducedMotion.matches
      if (act && rail) {
        if (staticScroll) {
          act.setAttribute('data-sc-act', 'flow')
          act.removeAttribute('data-sc-span')
          rail.removeAttribute('data-sc-pan')
        } else {
          act.setAttribute('data-sc-act', 'pan')
          act.setAttribute('data-sc-span', '4.4')
          rail.setAttribute('data-sc-pan', '0.04')
        }
      }
      if (processAct) {
        processAct.setAttribute('data-sc-act', staticScroll ? 'flow' : 'pin')
        if (staticScroll) processAct.removeAttribute('data-sc-span')
        else processAct.setAttribute('data-sc-span', '3')
        document.querySelectorAll<HTMLElement>('.process-step').forEach((step, index) => {
          const cues = ['0 0.27 0 0.04', '0.23 0.52 0.04 0.04', '0.48 0.77 0.04 0.04', '0.73 1 0.04 0']
          if (staticScroll) step.removeAttribute('data-sc-cue')
          else step.setAttribute('data-sc-cue', cues[index])
        })
      }
      if (scrollInstance?.destroy) scrollInstance.destroy()
      scrollInstance = window.ScrollCraft?.mount(document.body)
    }
    configureAndMount()
    media.addEventListener('change', configureAndMount)
    reducedMotion.addEventListener('change', configureAndMount)
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    }), { threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))
    const onScroll = () => document.documentElement.style.setProperty('--page-scroll', `${window.scrollY}px`)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { observer.disconnect(); media.removeEventListener('change', configureAndMount); reducedMotion.removeEventListener('change', configureAndMount); window.removeEventListener('scroll', onScroll); scrollInstance?.destroy?.() }
  }, [])

  useEffect(() => {
    if (!selectedEvent) return
    const previousFocus = document.activeElement as HTMLElement | null
    const dialog = document.querySelector<HTMLElement>('.event-modal')
    const firstControl = dialog?.querySelector<HTMLElement>('.modal-close')
    firstControl?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedEvent(null)
      if (event.key === 'Tab' && dialog) {
        const controls = [...dialog.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(el => !el.hasAttribute('disabled'))
        if (controls.length && event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls[controls.length - 1]?.focus() }
        else if (controls.length && !event.shiftKey && document.activeElement === controls[controls.length - 1]) { event.preventDefault(); controls[0].focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.classList.add('dialog-open')
    return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('dialog-open'); previousFocus?.focus() }
  }, [selectedEvent])

  const selectEventForInquiry = (item: PortfolioItem) => {
    const notes = `Inspired by “${item.title}” — ${item.theme}. `
    const eventType = item.category === 'Weddings' ? 'Wedding' : item.category === 'Birthdays' ? 'Birthday' : item.category === 'Corporate' ? 'Corporate gala' : 'Private soirée'
    setForm(current => ({ ...current, type: eventType, notes }))
    setSelectedEvent(null)
    window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 70)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true) }
  const story = testimonials[storyIndex]

  return <>
    <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
      <a className="wordmark" href="#home" aria-label={`${brand.name}, home`}><span className="wordmark-symbol">✳</span><span>{brand.name}<small>EVENTS · NEW YORK</small></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <a className="header-cta" href="#inquire">Inquire now <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={16} /></a>)}<a href="#inquire" onClick={() => setMenuOpen(false)}>Inquire now <ArrowUpRight size={16} /></a></nav>}
    </header>

    <main>
      <section className="hero" id="home" data-sc-act="flow">
        <img className="hero-photo" data-sc-parallax="-0.08" src={imageUrl('photo-1519741497674-611481863552', 2200)} alt="An intimate garden celebration dressed with pale flowers and warm candlelight" fetchPriority="high" />
        <div className="hero-scrim" />
        <img className="hero-detail" data-sc-parallax="0.11" src={imageUrl('photo-1511795409834-ef04bbd61622', 650)} alt="A close detail of a thoughtfully set celebration table" />
        <div className="hero-copy" data-sc-parallax="0.025">
          <span className="hero-kicker"><i /> {copy.heroEyebrow}</span>
          <h1>{copy.heroTitle.split(' ')[0]}<br />{copy.heroTitle.split(' ').slice(1).join(' ')}<span>.</span></h1>
          <p>{copy.heroDescription}</p>
          <a className="round-link" href="#services" aria-label="Discover our services"><ArrowDown size={18} /></a>
        </div>
        <div className="hero-caption"><span>AN ATELIER FOR GATHERING</span><span>01 — 04</span></div>
        <span className="hero-side-note">MADE OF MOMENTS, MEANT TO LAST</span>
      </section>

      <section className="intro section-shell" data-reveal>
        <p className="eyebrow">{copy.introEyebrow}</p>
        <div className="intro-copy"><h2>{copy.introTitleFirst}<br /><em>{copy.introTitleSecond}</em></h2><div className="intro-aside"><span className="rule" /><p>{copy.introBody}</p><a className="text-link" href="#approach">Meet the atelier <ArrowRight size={15} /></a></div></div>
        <span className="intro-stamp">A.L. <i>✳</i></span>
      </section>

      <section className="services section-shell" id="services">
        <div className="section-heading" data-reveal><div><p className="eyebrow">{copy.servicesEyebrow}</p><h2>{copy.servicesTitleFirst}<br /><em>{copy.servicesTitleSecond}</em></h2></div><p className="section-note">{copy.servicesBody}</p></div>
        <div className="services-layout">
          <div className="service-list" role="tablist" aria-label="Event services">{services.map((service, index) => <button key={service.id} className={`service-item ${activeService.id === service.id ? 'active' : ''}`} role="tab" aria-selected={activeService.id === service.id} onMouseEnter={() => setActiveService(service)} onFocus={() => setActiveService(service)} onClick={() => setActiveService(service)}><span className="service-index">0{index + 1}</span><span className="service-title">{service.title}</span><ArrowUpRight className="service-arrow" size={18} /></button>)}</div>
          <div className="service-preview" role="tabpanel" key={activeService.id}><img src={imageUrl(activeService.image, 1200)} alt={activeService.alt} loading="lazy" /><div className="service-preview-overlay"><div><p>{activeService.deliverables}</p><h3>{activeService.subtitle}</h3></div><span>0{services.findIndex(s => s.id === activeService.id) + 1} / 04</span></div><div className="image-wash" /></div>
        </div>
      </section>

      <section className="process-section" id="approach" data-sc-act="pin" data-sc-span="3" data-sc-drift="#f0ebe1">
        <div className="process-stage" data-sc-stage>
          <div className="process-image-wrap"><img src={imageUrl('photo-1519167758481-83f550bb49b3', 1600)} alt="A candlelit dinner setting, ready for guests to arrive" loading="lazy" /><span className="process-image-caption">THE BEAUTY IS IN THE DETAILS</span></div>
          <div className="process-content"><p className="eyebrow">{copy.processEyebrow}</p><h2>{copy.processTitleFirst}<br /><em>{copy.processTitleSecond}</em></h2><div className="process-steps">{process.map(step => <article className="process-step" key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p><small>{step.note}</small></div></article>)}</div><div className="process-progress" aria-hidden="true"><span /><span /><span /><span /></div></div>
        </div>
      </section>

      <section className="portfolio-section section-shell" id="portfolio" data-sc-act="pan" data-sc-span="4.4">
        <div className="section-heading portfolio-heading" data-reveal><div><p className="eyebrow">{copy.portfolioEyebrow}</p><h2>{copy.portfolioTitleFirst}<br /><em>{copy.portfolioTitleSecond}</em></h2></div><p className="section-note">{copy.portfolioBody}</p></div>
        <div className="portfolio-filters" role="group" aria-label="Filter portfolio by event type">{filters.map(value => <button key={value} className={filter === value ? 'selected' : ''} onClick={() => setFilter(value)} aria-pressed={filter === value}>{value}</button>)}</div>
        <div className="portfolio-rail" id="portfolio-rail" data-sc-pan="0.04">{visiblePortfolio.map((item, index) => <button className={`portfolio-card ${item.size}`} key={item.id} onClick={() => setSelectedEvent(item)} aria-label={`View ${item.title}, ${item.category}`} data-reveal><span className="portfolio-image"><img src={imageUrl(item.image, 900)} alt={item.alt} loading="lazy" /><i><ArrowUpRight size={20} /></i></span><span className="portfolio-caption"><span><small>{item.category} · {item.location.split(',')[0]}</small><strong>{item.title}</strong></span><span className="card-number">0{index + 1}</span></span></button>)}</div>
        <p className="portfolio-hint"><span>DRAG THE STORY SIDEWAYS</span><span>SCROLL TO WANDER <ArrowDown size={13} /></span></p>
      </section>

      <section className="stories-section section-shell" id="stories">
        <div className="stories-top" data-reveal><p className="eyebrow">{copy.storiesEyebrow}</p><span>IN THEIR OWN WORDS</span></div>
        <div className="story-layout" key={story.name}><div className="story-photo"><img src={imageUrl(story.image, 1000)} alt={story.alt} loading="lazy"/><span>THE DAY, AS IT FELT</span></div><div className="story-quote"><span className="quote-mark">“</span><blockquote>{story.quote}</blockquote><div className="story-byline"><span><strong>{story.name}</strong><small>{story.event}</small></span><span className="story-controls"><button onClick={() => setStoryIndex((storyIndex + testimonials.length - 1) % testimonials.length)} aria-label="Previous client story"><ChevronLeft size={17} /></button><button onClick={() => setStoryIndex((storyIndex + 1) % testimonials.length)} aria-label="Next client story"><ChevronRight size={17} /></button></span></div></div></div>
        <div className="story-index"><span>0{storyIndex + 1}</span><i /><span>0{testimonials.length}</span></div>
      </section>

      <section className="inquiry-section" id="inquire" ref={formRef}>
        <div className="inquiry-image"><img src={imageUrl('photo-1464366400600-7168b8af9bc3', 1600)} alt="An elegant table set for a candlelit celebration" loading="lazy" /><div><span>LET'S MAKE A MEMORY</span><span>{brand.location}</span></div></div>
        <div className="inquiry-content"><p className="eyebrow">{copy.inquiryEyebrow}</p><h2>{copy.inquiryTitleFirst}<br /><em>{copy.inquiryTitleSecond}</em><br />{copy.inquiryTitleThird}</h2>
          {submitted ? <div className="success-panel" role="status"><span className="success-icon"><Check size={20} /></span><h3>Thank you, {form.name.split(' ')[0]}.</h3><p>Your note is ready for our studio. We’ll be in touch soon to hear all about it.</p><button className="text-link" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', type: '', guests: '', date: '', notes: '' }) }}>Write another note <ArrowRight size={15} /></button></div> : <form className="inquiry-form" onSubmit={handleSubmit}>
            {form.notes.startsWith('Inspired by') && <p className="inspired-note">A little inspiration is coming with you: {form.notes.split('—')[0].replace('Inspired by ', '')}</p>}
            <label>Your name<input required minLength={2} autoComplete="name" placeholder="How should we address you?" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
            <label>Email address<input required type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
            <div className="form-row"><label>What are we celebrating?<select required value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option value="" disabled>Choose an occasion</option><option>Wedding</option><option>Birthday</option><option>Private soirée</option><option>Corporate gala</option><option>Something else</option></select></label><label>Estimated guests<input type="number" min="1" max="10000" placeholder="A little or a lot" value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} /></label></div>
            <label>When are you dreaming of?<input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></label>
            <label>A little about your vision<textarea rows={3} placeholder="The feeling, the place, the little things you love…" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></label>
            <button className="submit-button" type="submit">{copy.inquirySubmit} <ArrowUpRight size={17} /></button><small className="form-note">No pressure, just a thoughtful first hello.</small>
          </form>}
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="footer-top"><div className="footer-brand"><a className="footer-wordmark" href="#home">{brand.name}<span>✳</span></a><p>{brand.descriptor}<br />{copy.footerNote}</p><a href={`mailto:${brand.email}`} className="footer-email">{brand.email} <ArrowUpRight size={14} /></a></div><div className="footer-links"><div><span>FIND YOUR WAY</span><a href="#services">Services</a><a href="#portfolio">Portfolio</a><a href="#approach">Our approach</a><a href="#stories">Kind words</a></div><div><span>THE ATELIER</span><p>{brand.location}</p><p>By appointment,<br />Monday — Friday</p><a href={brand.instagram} target="_blank" rel="noreferrer" className="social-link"><Instagram size={15} /> Instagram <ArrowUpRight size={13} /></a></div><form className="newsletter" onSubmit={e => { e.preventDefault(); setNewsletter(true) }}><label htmlFor="newsletter-email">A NOTE FROM THE ATELIER</label><p>Occasional inspiration, delivered softly.</p><div><input id="newsletter-email" type="email" required placeholder="Your email address" /><button aria-label="Subscribe to studio notes"><ArrowRight size={17} /></button></div>{newsletter && <small className="newsletter-success">You’re on the list. Speak soon.</small>}</form></div></div>
      <div className="footer-bottom"><span>© 2026 ATELIER LUMIÈRE EVENTS</span><span>THOUGHTFULLY MADE, HERE & EVERYWHERE</span><a href="#home">BACK TO THE BEGINNING ↑</a></div>
    </footer>

    {selectedEvent && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedEvent(null)}><section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedEvent(null)} aria-label="Close event details"><X size={19} /></button><img src={imageUrl(selectedEvent.image, 1400)} alt={selectedEvent.alt} /><div className="modal-copy"><p className="eyebrow">{selectedEvent.category} · {selectedEvent.location}</p><h2 id="modal-title">{selectedEvent.title}</h2><div className="event-facts"><span><small>THE FEELING</small>{selectedEvent.theme}</span><span><small>GATHERED</small>{selectedEvent.guests}</span></div><button className="submit-button" onClick={() => selectEventForInquiry(selectedEvent)}>Plan something like this <ArrowUpRight size={17} /></button><p className="modal-note">Take this little spark with you to the inquiry.</p></div></section></div>}
  </>
}

declare global { interface Window { ScrollCraft?: { mount: (root: HTMLElement) => { destroy: () => void } } } }
export default App
