// City View — landing page sections (Nav, Hero, Search, Destinations, Packages, Why, Modes, Deals, Testimonials, Guides, Newsletter, Footer)

const { useState, useEffect, useRef } = React;
const fmt = (n) => '₹' + n.toLocaleString('en-IN');

/* ───────────────── ROUTING ─────────────────
   Lightweight hash router so every card opens a rich detail page,
   the browser back button works, and links are shareable.            */
const go = (path) => {
  const p = String(path).replace(/^#/, '').replace(/^\/+/, '');
  window.location.hash = '#/' + p;
};

// WhatsApp enquiry — replace WHATSAPP_NUMBER with CityView's real WhatsApp
// business number (country code + number, digits only, no + or spaces).
const WHATSAPP_NUMBER = '919876543210';
const openWhatsApp = (message) => {
  const text = encodeURIComponent(message || "Hi CityView! I'd like help planning a trip.");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
};
const parseHash = () => {
  const h = (window.location.hash || '').replace(/^#\/?/, '');
  const [type, ...rest] = h.split('/');
  return { type: type || 'home', slug: decodeURIComponent(rest.join('/') || '') };
};
function useHashRoute() {
  const [route, setRoute] = useState(parseHash());
  useEffect(() => {
    const on = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
const findBySlug = (list, slug) => list.find((x) => x.slug === slug);

/* ───────────────── NAV ───────────────── */

function NavMenu({ label, open, onOpen, onClose, children, width = 560 }) {
  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        onClick={() => (open ? onClose() : onOpen())}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: 'transparent', border: 0, cursor: 'pointer',
          font: 'inherit', fontSize: 15, fontWeight: 600,
          color: open ? 'var(--cv-navy)' : 'var(--cv-ink-2)',
          padding: '8px 2px', whiteSpace: 'nowrap',
        }}
      >
        {label}
        <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'inline-flex' }}>
          <ChevDown size={15} />
        </span>
      </button>
      <div
        style={{
          position: 'absolute', top: 'calc(100% + 14px)', left: '50%',
          transform: open ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(8px)',
          width, maxWidth: '92vw',
          background: '#fff', borderRadius: 20,
          boxShadow: '0 24px 60px rgba(10,18,56,0.18), 0 4px 12px rgba(10,18,56,0.08)',
          border: '1px solid var(--cv-line)',
          padding: 18, zIndex: 60,
          opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden',
          transition: 'opacity .2s ease, transform .2s ease, visibility .2s',
        }}
      >
        <span style={{ position: 'absolute', top: -7, left: '50%', width: 14, height: 14, background: '#fff', borderLeft: '1px solid var(--cv-line)', borderTop: '1px solid var(--cv-line)', transform: 'translateX(-50%) rotate(45deg)' }} />
        {children}
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null); // 'packages' | 'destinations' | null
  const [menuOpen, setMenuOpen] = useState(false); // mobile hamburger
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const simpleLinks = [
    { label: 'Visa',        to: 'guide/schengen-visa-guide' },
    { label: 'Group tours', to: 'destination/turkey' },
    { label: 'Blog',        to: 'guides' },
    { label: 'About',       to: 'about' },
  ];

  const mobileLinks = [
    { label: 'Packages',     to: 'packages' },
    { label: 'Destinations', to: 'destinations' },
    ...simpleLinks,
    { label: 'Sign in',      to: 'signin' },
  ];

  return (
    <nav className={"nav " + (scrolled ? 'scrolled' : '')}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, padding: '16px 32px' }}>
        <a href="#/" onClick={(e) => { e.preventDefault(); go(''); }} className="logo-wrap" style={{ flex: '0 0 auto' }}>
          <BrandLockup height={40} />
        </a>

        <div className="hidden-mob" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <NavMenu label="Packages" width={600} open={open === 'packages'} onOpen={() => setOpen('packages')} onClose={() => setOpen(null)}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {PACKAGES.map((p) => (
                <a key={p.slug} href={'#/package/' + p.slug}
                   onClick={(e) => { e.preventDefault(); setOpen(null); go('package/' + p.slug); }}
                   style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 10, borderRadius: 14, transition: 'background .15s' }}
                   onMouseOver={(e) => e.currentTarget.style.background = '#f4f6ff'}
                   onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, flex: '0 0 52px', backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div className="col">
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--cv-ink)' }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--cv-muted)' }}>{p.nights} · from {fmt(p.price)}</div>
                  </div>
                </a>
              ))}
            </div>
          </NavMenu>

          <NavMenu label="Destinations" width={620} open={open === 'destinations'} onOpen={() => setOpen('destinations')} onClose={() => setOpen(null)}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {DESTINATIONS.map((d) => (
                <a key={d.slug} href={'#/destination/' + d.slug}
                   onClick={(e) => { e.preventDefault(); setOpen(null); go('destination/' + d.slug); }}
                   style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3', display: 'block' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${d.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform .4s' }}
                       onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                       onMouseOut={(e) => e.currentTarget.style.transform = 'none'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(7,9,51,0.8))' }} />
                  <div style={{ position: 'absolute', left: 10, bottom: 8, color: '#fff' }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{d.name}</div>
                    <div style={{ fontSize: 11, opacity: 0.85 }}>{fmt(d.from)}</div>
                  </div>
                </a>
              ))}
            </div>
            <a href="#/destinations" onClick={(e) => { e.preventDefault(); setOpen(null); go('destinations'); }}
               style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 13, fontWeight: 700, color: 'var(--cv-navy)' }}>
              View all destinations <ArrowR size={14} />
            </a>
          </NavMenu>

          {simpleLinks.map((it) => (
            <a key={it.label} href={'#/' + it.to}
               onClick={(e) => { e.preventDefault(); go(it.to); }}
               style={{ fontSize: 15, fontWeight: 600, color: 'var(--cv-ink-2)', whiteSpace: 'nowrap', padding: '8px 2px' }}>
              {it.label}
            </a>
          ))}
        </div>

        <div className="row gap-3" style={{ alignItems: 'center', flex: '0 0 auto' }}>
          <a href="#/signin" onClick={(e) => { e.preventDefault(); go('signin'); }} className="hidden-mob" style={{ fontWeight: 600, fontSize: 14 }}>Sign in</a>
          <button className="btn btn-primary btn-sm nav-cta" onClick={() => go('quote')}><PlaneIcon size={16} /> Get a quote</button>
          <button className="nav-burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <path d="M6 6 L18 18 M18 6 L6 18" />
                : <g><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></g>}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-mobile-panel" style={{ borderTop: '1px solid var(--cv-line)', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(14px)' }}>
          <div className="container col" style={{ padding: '10px 20px 18px' }}>
            <button className="btn btn-primary" onClick={() => { setMenuOpen(false); go('quote'); }} style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>
              <PlaneIcon size={16} /> Get a quote
            </button>
            {mobileLinks.map((it) => (
              <a key={it.label} href={'#/' + it.to}
                 onClick={(e) => { e.preventDefault(); setMenuOpen(false); go(it.to); }}
                 style={{ padding: '13px 4px', fontSize: 16, fontWeight: 600, color: 'var(--cv-ink-2)', borderBottom: '1px solid var(--cv-line)' }}>
                {it.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ───────────────── HERO ───────────────── */

function HeroReelCard({ item, idx, current, videoRef, playing, muted, progress, onToggle, onPrev, onNext, onSeek, onToggleMute, onTimeUpdate, onEnded, onLoaded, onPlayEvt, onPauseEvt }) {
  const isActive = idx === current;
  const dist = Math.abs(idx - current);
  // Non-active cards fan up-and-right behind the active one — one calm stack.
  const z = 10 - dist;
  const tx = dist * 18;
  const ty = dist * -12;
  const rot = dist * 2.6;
  const sc = 1 - dist * 0.05;
  const op = dist > 2 ? 0 : 1;

  // ── BACKGROUND CARD ──────────────────────────────────────────────
  // A clean, brand-tinted poster surface with no controls or text, so the
  // card peeking behind reads as a calm "next up" tile (like the reference).
  if (!isActive) {
    return (
      <div className="stack-card" style={{
        transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sc})`,
        zIndex: z, opacity: op, pointerEvents: 'none', background: '#0a1056',
      }}>
        <div className="img-fallback" style={{ position:'absolute', inset:0, backgroundImage:`url(${item.poster})`, backgroundSize:'cover', backgroundPosition:'center' }} />
        {/* brand teal veil + soft top sheen so it always looks cohesive */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(150deg, rgba(30,200,227,0.72) 0%, rgba(24,224,196,0.74) 100%)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(255,255,255,0.18), transparent 40%)' }} />
      </div>
    );
  }

  // ── ACTIVE CARD ──────────────────────────────────────────────────
  return (
    <div className="stack-card" style={{
      transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
      zIndex: z, opacity: 1, pointerEvents: 'auto', background: '#0a1056',
    }}>
      <video
        key={item.video}
        ref={videoRef}
        src={item.video}
        poster={item.poster}
        autoPlay
        muted={muted}
        playsInline
        preload="auto"
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onLoadedData={onLoaded}
        onPlay={onPlayEvt}
        onPause={onPauseEvt}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* legibility gradient */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(7,9,51,0.4) 0%, transparent 28%, transparent 55%, rgba(7,9,51,0.7) 100%)', pointerEvents:'none' }} />
      {/* big tap-to-play layer */}
      <button onClick={onToggle} aria-label={playing ? 'Pause' : 'Play'}
        style={{ position:'absolute', top:54, left:0, right:0, bottom:120, background:'transparent', border:0, cursor:'pointer' }}>
        {!playing && (
          <span style={{ width:64, height:64, borderRadius:'50%', background:'rgba(255,255,255,0.92)', color:'var(--cv-navy)', display:'grid', placeItems:'center', margin:'0 auto', boxShadow:'0 10px 28px rgba(0,0,0,0.3)' }}>
            <Play size={26}/>
          </span>
        )}
      </button>
      {/* top chrome */}
      <div style={{ position:'absolute', top:18, left:20, right:20, display:'flex', alignItems:'center', justifyContent:'space-between', color:'#fff' }}>
        <a href={'#/destination/' + item.slug} onClick={(e)=>{ e.preventDefault(); go('destination/' + item.slug); }}
           style={{ display:'flex', alignItems:'center', gap:8, fontWeight:600, fontSize:15, color:'#fff', background:'rgba(7,9,51,0.28)', backdropFilter:'blur(6px)', padding:'7px 13px', borderRadius:999 }}>
          Explore {item.city.split(' · ')[0]} <PlaneIcon size={16} />
        </a>
        <button onClick={onToggleMute} aria-label={muted ? 'Unmute' : 'Mute'}
          style={{ width:34, height:34, borderRadius:'50%', background:'rgba(7,9,51,0.28)', backdropFilter:'blur(6px)', border:0, color:'#fff', display:'grid', placeItems:'center', cursor:'pointer' }}>
          {muted ? <VolumeOff size={16}/> : <VolumeOn size={16}/>}
        </button>
      </div>
      {/* bottom controls */}
      <div style={{ position:'absolute', bottom:22, left:20, right:20, color:'#fff' }}>
        <div className="between" style={{ marginBottom:7 }}>
          <div style={{ fontSize:13, opacity:0.85 }}>{item.tagline}</div>
          <div style={{ fontSize:11, opacity:0.7, display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background: playing ? 'var(--cv-teal)' : 'rgba(255,255,255,0.6)' }}/>
            {playing ? 'Now playing' : 'Paused'}
          </div>
        </div>
        <div onClick={onSeek}
          style={{ height:5, borderRadius:99, background:'rgba(255,255,255,0.25)', overflow:'hidden', marginBottom:14, cursor:'pointer' }}>
          <div style={{ width: (progress*100) + '%', height:'100%', background:'#fff' }} />
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:18 }}>
          <button onClick={onPrev} aria-label="Previous" style={{ background:'rgba(255,255,255,0.16)', border:0, color:'#fff', width:34, height:34, borderRadius:'50%', display:'grid', placeItems:'center', cursor:'pointer' }}><SkipBack size={14}/></button>
          <button onClick={onToggle} aria-label={playing ? 'Pause' : 'Play'} style={{ background:'#fff', border:0, color:'var(--cv-navy)', width:54, height:54, borderRadius:'50%', display:'grid', placeItems:'center', boxShadow:'0 8px 20px rgba(0,0,0,0.2)', cursor:'pointer' }}>{playing ? <Pause size={20}/> : <Play size={20}/>}</button>
          <button onClick={onNext} aria-label="Next" style={{ background:'rgba(255,255,255,0.16)', border:0, color:'#fff', width:34, height:34, borderRadius:'50%', display:'grid', placeItems:'center', cursor:'pointer' }}><SkipFwd size={14}/></button>
        </div>
      </div>
    </div>
  );
}

function Hero({ headline = 'discovery', showNewsCard = true, showBgGlow = true }) {
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const next = () => { setProgress(0); setCur((c) => (c + 1) % HERO_REEL.length); };
  const prev = () => { setProgress(0); setCur((c) => (c - 1 + HERO_REEL.length) % HERO_REEL.length); };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().then(() => setPlaying(true)).catch(() => {}); }
    else { v.pause(); setPlaying(false); }
  };
  const toggleMute = () => {
    const v = videoRef.current;
    const m = !muted;
    setMuted(m);
    if (v) v.muted = m;
  };
  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration) setProgress(v.currentTime / v.duration);
  };
  const onSeek = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    v.currentTime = ratio * v.duration;
    setProgress(ratio);
  };
  const onLoaded = () => {
    const v = videoRef.current;
    if (v && playing) v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };
  const onPlayEvt = () => setPlaying(true);
  const onPauseEvt = () => setPlaying(false);

  // Pricing sticker tracks the active reel card (matches the destination on screen)
  const activeReel = HERO_REEL[cur];
  const activeDest = findBySlug(DESTINATIONS, activeReel.slug) || {};
  const stickerPrice = activeDest.from || 39999;
  const stickerNights = (activeDest.nights || '4N/5D').split('/')[0];
  const stickerName = activeDest.name || activeReel.city.split(' · ')[0];
  return (
    <section style={{ background: showBgGlow ? 'var(--cv-grad-hero)' : 'linear-gradient(180deg, #f6f8ff 0%, #ffffff 100%)', paddingTop: 56, paddingBottom: 120, overflow:'hidden', position:'relative' }}>
      {/* subtle decorative dots */}
      <svg className="hero-blob" style={{ top: 80, right: '46%', opacity: 0.5 }} width="120" height="60" viewBox="0 0 120 60" fill="none">
        <path d="M2 30 Q 30 5, 60 30 T 118 30" stroke="#1ec8e3" strokeWidth="1.5" strokeDasharray="2 4" fill="none" />
      </svg>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(0,520px)', gap: 48, alignItems:'center' }}>
          {/* LEFT */}
          <div className="col gap-6">
            <div className="chip" style={{ alignSelf:'flex-start', background:'#eef1f6', borderColor:'var(--cv-line)', color:'var(--cv-ink-2)' }}>
              <Sparkles size={14} style={{ color:'var(--cv-cyan)' }}/> Curated holiday packages · Asia + Europe
            </div>
            <h1 style={{ whiteSpace: 'nowrap' }}>
              Everything<br/>
              for your trip,<br/>
              <span className="serif grad-text" style={{ fontStyle:'italic' }}>in one place.</span>
            </h1>
            <p style={{ fontSize: 18, maxWidth: 520 }}>
              Hand-crafted holidays for travelers across India & the Gulf. Flights, hotels, visas, transfers — we handle every detail. You just pack the bag.
            </p>
            <div className="row gap-3" style={{ flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => go('packages')}><span>Explore packages</span><ArrowR size={16}/></button>
              <button className="btn btn-ghost" onClick={toggle}>{playing ? <Pause size={14}/> : <Play size={14}/>} {playing ? 'Pause the reel' : 'Watch the reel'}</button>
            </div>
            {/* trust strip */}
            <div className="row gap-6" style={{ alignItems:'center', marginTop: 8, flexWrap:'wrap' }}>
              <div className="row gap-3" style={{ alignItems:'center' }}>
                <div style={{ display:'flex' }}>
                  {[0,1,2,3,4].map(i => (
                    <div key={i} style={{
                      width: 32, height: 32, borderRadius: '50%',
                      backgroundImage: `url(${U(['1494790108377-be9c29b29330','1507003211169-0a1dd7228f2d','1438761681033-6461ffad8d80','1535713875002-d1d0cf377fde','1500648767791-00dcc994a43e'][i], 100)})`,
                      backgroundSize:'cover', border:'2px solid #fff',
                      marginLeft: i ? -10 : 0,
                    }} />
                  ))}
                </div>
                <div className="col">
                  <div style={{ display:'flex', alignItems:'center', gap:4, color:'var(--cv-amber)', fontSize:14 }}>
                    {[0,1,2,3,4].map(i => <Star key={i} size={14}/>)}
                    <span style={{ color:'var(--cv-ink)', marginLeft:6, fontWeight:700 }}>4.9</span>
                  </div>
                  <div style={{ fontSize:13, color:'var(--cv-muted)' }}>12,000+ travelers · 50+ destinations</div>
                </div>
              </div>
            </div>
            {/* News card */}
            {showNewsCard && (
            <div className="card" style={{ marginTop: 18, padding: 18, maxWidth: 480, position:'relative', overflow:'visible' }}>
              <div className="chip chip-rose" style={{ position:'absolute', top:-12, left:18 }}>
                <span className="pulse-dot"/> Just launched
              </div>
              <div className="row gap-4" style={{ alignItems:'center' }}>
                <div style={{ width:84, height:84, borderRadius:14, backgroundImage:`url(${U('1604999333679-b86d54738315', 200)}), url(${U('1537996194471-e657df975ab4', 200)})`, backgroundSize:'cover', backgroundPosition:'center', flex:'0 0 84px' }} />
                <div className="col gap-2" style={{ flex:1 }}>
                  <div style={{ fontWeight: 700, color:'var(--cv-ink)', lineHeight:1.3 }}>
                    Bali Monsoon Magic — 6N/7D from <span className="grad-text">{fmt(54999)}</span>
                  </div>
                  <div style={{ fontSize: 13, color:'var(--cv-muted)' }}>Bookings open 15 June · limited departures</div>
                  <div className="row gap-3" style={{ alignItems:'center', marginTop: 4 }}>
                    <a href="#/package/bali-beach-ubud-escape" onClick={(e)=>{ e.preventDefault(); go('package/bali-beach-ubud-escape'); }} style={{ fontSize:13, fontWeight:700, color:'var(--cv-navy)', display:'inline-flex', alignItems:'center', gap:4 }}>View itinerary <ArrowUR size={12}/></a>
                    <span style={{ fontSize:12, color:'var(--cv-muted)' }}>21 May 2026</span>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* RIGHT — card stack */}
          <div style={{ position:'relative', height: 580 }}>
            <div className="stack" style={{ width: '100%', height: '100%' }}>
              {HERO_REEL.map((item, i) => (
                <HeroReelCard
                  key={i} item={item} idx={i} current={cur}
                  videoRef={videoRef} playing={playing} muted={muted} progress={progress}
                  onToggle={toggle} onPrev={prev} onNext={next} onSeek={onSeek}
                  onToggleMute={toggleMute} onTimeUpdate={onTimeUpdate} onEnded={next} onLoaded={onLoaded}
                  onPlayEvt={onPlayEvt} onPauseEvt={onPauseEvt}
                />
              ))}
            </div>
            {/* floating amber sticker — tracks the active card's destination & price */}
            <div style={{ position:'absolute', top: -8, right: -16, background:'#fff3d6', color:'#7a5300', padding:'14px 16px', borderRadius: 18, transform:'rotate(6deg)', boxShadow:'0 10px 24px rgba(0,0,0,0.1)', zIndex:20, fontWeight:700, textAlign:'center', minWidth: 116 }}>
              <div style={{ fontSize:11, opacity:0.7 }}>from</div>
              <div style={{ fontSize:22 }}>{fmt(stickerPrice)}</div>
              <div style={{ fontSize:11, opacity:0.7 }}>all-in · {stickerNights} {stickerName}</div>
            </div>
            {/* destination pill */}
            <div style={{ position:'absolute', bottom: -10, left: -12, background:'#fff', padding:'10px 14px', borderRadius: 999, boxShadow:'var(--shadow)', display:'flex', alignItems:'center', gap:8, zIndex:20 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--cv-teal)' }}/>
              <span style={{ fontSize:13, fontWeight:600, color:'var(--cv-ink-2)' }}>{HERO_REEL[cur].city}</span>
            </div>
          </div>
        </div>

        {/* dots */}
        <div className="row gap-2" style={{ marginTop: 28, justifyContent: 'center' }}>
          {HERO_REEL.map((_, i) => (
            <button key={i} onClick={() => setCur(i)} style={{
              width: i === cur ? 28 : 8, height: 8, borderRadius: 99,
              background: i === cur ? 'var(--cv-navy)' : 'rgba(10,18,56,0.2)',
              border: 0, transition: 'all .25s',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── SEARCH BAR ───────────────── */

function SearchBar() {
  const [mode, setMode] = useState('honeymoon');
  return (
    <section style={{ padding: '0 0 64px 0', marginTop: -72, position:'relative', zIndex: 5 }}>
      <div className="container">
        <div className="searchbar" style={{ padding: 12 }}>
          {/* mode tabs */}
          <div style={{ padding: '6px 6px 14px 6px', borderBottom: '1px solid var(--cv-line)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
            <div className="row gap-1" style={{ flexWrap:'wrap' }}>
              {MODES.map(m => {
                const M = window[m.icon];
                return (
                  <button key={m.id} onClick={() => setMode(m.id)} className="tab" style={{
                    background: mode === m.id ? 'var(--cv-navy)' : 'transparent',
                    color: mode === m.id ? '#fff' : 'var(--cv-muted)',
                    display:'inline-flex', gap:6, alignItems:'center',
                  }}>
                    <M size={14}/> {m.label}
                  </button>
                );
              })}
            </div>
            <div style={{ fontSize:13, color:'var(--cv-muted)', display:'flex', alignItems:'center', gap:8 }}>
              <Sparkles size={14}/> 3 expert planners online now
            </div>
          </div>

          <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr auto', gap: 14, alignItems:'center' }}>
            <Field icon={<PinIcon size={18}/>}      label="Destination" value="Bali, Indonesia" sub="Asia · most-loved"/>
            <Field icon={<CalIcon size={18}/>}      label="Dates"       value="Jul 18 – Jul 24" sub="6 nights"/>
            <Field icon={<UsersIcon size={18}/>}    label="Travelers"   value="2 adults" sub="No kids"/>
            <Field icon={<Card size={18}/>}         label="Budget"      value="₹50K – ₹80K" sub="per person"/>
            <button className="btn btn-primary" style={{ height: 56, padding: '0 24px' }}>
              <SearchIcon size={16}/> Find packages
            </button>
          </div>
          {/* quick filters */}
          <div className="row gap-2" style={{ padding: '4px 16px 14px', flexWrap:'wrap', alignItems:'center' }}>
            <span style={{ fontSize:13, color:'var(--cv-muted)', marginRight:4 }}>Popular:</span>
            {['Bali 5N','Dubai weekend','Thailand twin city','Singapore family','Swiss honeymoon','Maldives villa','Turkey + balloon'].map(t => (
              <button key={t} className="chip" style={{ cursor:'pointer' }}>{t}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ icon, label, value, sub }) {
  return (
    <div className="row gap-3" style={{ alignItems:'center', padding:'8px 12px', borderRadius:14, cursor:'pointer', transition:'background .15s' }} onMouseOver={e=>e.currentTarget.style.background='#f4f6ff'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
      <div style={{ color:'var(--cv-navy)' }}>{icon}</div>
      <div className="col">
        <div style={{ fontSize:11, fontWeight:700, color:'var(--cv-muted)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</div>
        <div style={{ fontSize:15, fontWeight:700, color:'var(--cv-ink)', lineHeight:1.2 }}>{value}</div>
        <div style={{ fontSize:12, color:'var(--cv-muted)' }}>{sub}</div>
      </div>
    </div>
  );
}

/* ───────────────── TRUST MARQUEE ───────────────── */

function TrustMarquee() {
  return (
    <section style={{ padding: '32px 0 8px', background:'#fff' }}>
      <div className="container" style={{ textAlign:'center' }}>
        <div style={{ fontSize: 13, color: 'var(--cv-muted)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom: 24 }}>
          Trusted by travelers · partnered with the best
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...TRUST_LOGOS, ...TRUST_LOGOS].map((t, i) => (
              <div key={i} style={{ fontFamily:'Plus Jakarta Sans', fontSize: 22, fontWeight: 700, color:'#aab4d6', letterSpacing:'-0.02em', whiteSpace:'nowrap' }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── DESTINATIONS ───────────────── */

function Destinations() {
  const [filter, setFilter] = useState('All');
  const tabs = ['All', 'Asia', 'Europe'];
  const filtered = filter === 'All' ? DESTINATIONS : DESTINATIONS.filter(d => d.region === filter);
  return (
    <section>
      <div className="container">
        <div className="between" style={{ flexWrap:'wrap', gap:16, marginBottom: 36 }}>
          <div className="col gap-3">
            <span className="eyebrow"><span className="dot"/> Featured destinations</span>
            <h2>Where do you want to wake up<br/><span className="serif grad-text">tomorrow</span>?</h2>
          </div>
          <div className="col gap-3" style={{ alignItems:'flex-end' }}>
            <div className="tabs">
              {tabs.map(t => (
                <button key={t} className={"tab " + (t===filter ? 'active' : '')} onClick={() => setFilter(t)}>{t}</button>
              ))}
            </div>
            <a href="#/destinations" onClick={(e)=>{ e.preventDefault(); go('destinations'); }} style={{ fontSize:14, fontWeight:600, color:'var(--cv-navy)', display:'inline-flex', alignItems:'center', gap:6 }}>
              View all 50+ destinations <ArrowR size={14}/>
            </a>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 22 }}>
          {filtered.slice(0, 8).map((d, i) => (
            <DestCard key={d.name} d={d} big={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestCard({ d, big }) {
  return (
    <a href={'#/destination/' + d.slug} onClick={(e)=>{ e.preventDefault(); go('destination/' + d.slug); }} className="dest-card card-hover" style={{ aspectRatio: big ? '4/5' : '4/5' }}>
      <div className="dest-img" style={{ backgroundImage: `url(${d.img})` }}/>
      <div className="dest-overlay"/>
      <div className="dest-tag">
        <span className="chip" style={{ background:'rgba(255,255,255,0.95)', backdropFilter:'blur(6px)', border:0 }}>
          <span style={{ width:6, height:6, background:'var(--cv-teal)', borderRadius:'50%' }}/> {d.tag}
        </span>
      </div>
      <div className="dest-body">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing:'-0.02em' }}>{d.name}</div>
            <div style={{ fontSize: 13, opacity:0.85, marginTop: 2 }}>{d.country} · {d.packages} packages</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize: 11, opacity: 0.8 }}>from</div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{fmt(d.from)}</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>{d.nights}</div>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ───────────────── PACKAGES ───────────────── */

function Packages() {
  return (
    <section style={{ background: 'linear-gradient(180deg, #fff 0%, var(--cv-sky-2) 100%)' }}>
      <div className="container">
        <div className="between" style={{ marginBottom: 36, flexWrap:'wrap', gap:16 }}>
          <div className="col gap-3">
            <span className="eyebrow"><span className="dot"/> Trending packages</span>
            <h2>Picked, priced & packed —<br/>so you don't have to.</h2>
          </div>
          <p style={{ maxWidth: 360 }}>Every package below includes flights, hotels, visa, transfers and at least 3 curated experiences. Cancellable till 14 days before.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 24 }}>
          {PACKAGES.slice(0, 6).map(p => <PackCard key={p.title} p={p}/>)}
        </div>
      </div>
    </section>
  );
}

function PackCard({ p }) {
  return (
    <article className="pack-card card-hover" onClick={() => go('package/' + p.slug)} style={{ cursor: 'pointer' }}>
      <div className="pack-img" style={{ backgroundImage: `url(${p.img}), url(${p.fallbackImg||''})` }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 50%, rgba(7,9,51,0.5) 100%)' }}/>
        <span className="chip chip-mint" style={{ position:'absolute', top:14, left:14, background:'rgba(255,255,255,0.95)', color:'var(--cv-ink-2)' }}>
          <Sparkles size={12}/> {p.badge}
        </span>
        <div style={{ position:'absolute', bottom:14, left:14, color:'#fff', display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600 }}>
          <PinIcon size={14}/> {p.place}
        </div>
        <div style={{ position:'absolute', top:14, right:14, background:'rgba(255,255,255,0.95)', borderRadius:999, padding:'5px 10px', fontSize:12, fontWeight:700, display:'inline-flex', alignItems:'center', gap:4 }}>
          <Star size={12} style={{ color: 'var(--cv-amber)' }}/> {p.rating}
        </div>
      </div>
      <div style={{ padding: 22 }}>
        <div className="between" style={{ marginBottom: 10 }}>
          <h3 style={{ fontSize: 19 }}>{p.title}</h3>
        </div>
        <div className="row gap-2" style={{ flexWrap:'wrap', marginBottom: 14 }}>
          {p.cities.map(c => <span key={c} className="chip" style={{ fontSize:12, padding:'4px 10px' }}>{c}</span>)}
        </div>
        <div className="col gap-2" style={{ borderTop:'1px dashed var(--cv-line)', paddingTop: 14, marginBottom: 14 }}>
          {p.inclusions.slice(0, 4).map(inc => (
            <div key={inc} className="row gap-2" style={{ alignItems:'center', fontSize:13, color:'var(--cv-ink-2)' }}>
              <Check size={14} style={{ color:'var(--cv-teal)' }}/> {inc}
            </div>
          ))}
        </div>
        <div className="between" style={{ alignItems:'flex-end' }}>
          <div className="col">
            <div style={{ fontSize:12, color:'var(--cv-muted)' }}>{p.nights} · from</div>
            <div className="row gap-2" style={{ alignItems:'baseline' }}>
              <div style={{ fontSize:24, fontWeight:800, color:'var(--cv-ink)' }}>{fmt(p.price)}</div>
              <div style={{ fontSize:13, color:'var(--cv-muted)', textDecoration:'line-through' }}>{fmt(p.strike)}</div>
            </div>
            <div style={{ fontSize:11, color:'var(--cv-muted)' }}>per person · {p.reviews} reviews</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={(e)=>{ e.stopPropagation(); go('package/' + p.slug); }}>View <ArrowR size={14}/></button>
        </div>
      </div>
    </article>
  );
}

/* ───────────────── WHY ───────────────── */

function Why() {
  const items = [
    { icon: 'Stamp',   t: 'Visa, handled.',         d: 'We file, follow up, and track approvals. Family visas, group visas, Schengen — covered.', color:'#e7eeff', tint:'#163b8a' },
    { icon: 'Card',    t: 'Pay in easy EMIs',       d: '0%-interest EMIs on packages over ₹50K. Card or NetBanking. Pay 25% to confirm.',           color:'#c6f4ec', tint:'#0e544a' },
    { icon: 'Phone',   t: '24×7 on-trip help',      d: 'Real humans on WhatsApp in IST + GST timezones. Average reply time: under 4 minutes.',     color:'#fff3d6', tint:'#7a5300' },
    { icon: 'Shield',  t: 'Travel-protected',       d: 'Trip insurance bundled by default. Refund-protect available for monsoon & medical risk.',   color:'#ffe3e7', tint:'#8a1735' },
  ];
  return (
    <section>
      <div className="container">
        <div className="col gap-3" style={{ alignItems:'center', textAlign:'center', marginBottom: 48 }}>
          <span className="eyebrow"><span className="dot"/> Why CityView</span>
          <h2 style={{ maxWidth: 720 }}>Premium isn't a price tag.<br/><span className="serif grad-text">It's how we look after you.</span></h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 18 }}>
          {items.map(it => {
            const I = window[it.icon];
            return (
              <div key={it.t} className="card card-hover" style={{ padding: 28 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: it.color, color: it.tint, display:'grid', placeItems:'center', marginBottom: 18 }}>
                  <I size={24}/>
                </div>
                <h3 style={{ fontSize: 19, marginBottom: 8 }}>{it.t}</h3>
                <p style={{ fontSize: 14 }}>{it.d}</p>
              </div>
            );
          })}
        </div>

        {/* Stats strip */}
        <div className="card" style={{ marginTop: 40, padding: 36, background:'var(--cv-navy)', color:'#fff', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 24, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', right: -60, top: -60, width: 240, height: 240, borderRadius:'50%', background: 'radial-gradient(circle, rgba(30,200,227,0.35), transparent 70%)' }}/>
          <div style={{ position:'absolute', left: -40, bottom: -40, width: 200, height: 200, borderRadius:'50%', background: 'radial-gradient(circle, rgba(24,224,196,0.25), transparent 70%)' }}/>
          {[
            ['12,000+', 'travelers since 2015'],
            ['50+',     'destinations curated'],
            ['4.9',     'average rating'],
            ['98%',     'visa approval rate'],
          ].map(([n,l],i) => (
            <div key={i} className="col gap-1" style={{ position:'relative' }}>
              <div style={{ fontSize: 44, fontWeight: 800, letterSpacing:'-0.03em' }} className="grad-text">{n}</div>
              <div style={{ fontSize: 14, color:'#c6cffa' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── DEALS STRIP ───────────────── */

function Deals() {
  return (
    <section style={{ background:'#fff' }}>
      <div className="container">
        <div className="between" style={{ marginBottom: 28, flexWrap:'wrap', gap:16 }}>
          <div className="col gap-3">
            <span className="eyebrow"><span className="dot"/> Limited deals</span>
            <h2>Save now, travel soon.</h2>
          </div>
          <p style={{ maxWidth: 320 }}>Curated discounts that expire when the seats fill up. Refresh weekly.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 18 }}>
          {DEALS.map(d => (
            <div key={d.title} className="card card-hover" style={{ padding:22, background:d.bg, borderRadius:18 }}>
              <div className="between" style={{ marginBottom:18 }}>
                <span style={{ fontSize:12, fontWeight:700, background:'rgba(255,255,255,0.6)', padding:'4px 10px', borderRadius:99, color:d.accent }}>{d.tag}</span>
                <span style={{ fontSize:11, color:d.accent, opacity:0.7 }}>ends {d.expires}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color:'var(--cv-ink)', letterSpacing:'-0.02em' }}>{d.title}</div>
              <div style={{ fontSize: 14, color:'var(--cv-ink-2)', marginTop: 4, marginBottom: 20 }}>{d.sub}</div>
              <a href={'#/' + d.to} onClick={(e)=>{ e.preventDefault(); go(d.to); }} style={{ fontWeight:700, color: d.accent, display:'inline-flex', alignItems:'center', gap:6, fontSize:14 }}>
                Grab the deal <ArrowR size={14}/>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── TESTIMONIALS ───────────────── */

function Testimonials() {
  return (
    <section style={{ background: 'var(--cv-sky-2)' }}>
      <div className="container">
        <div className="col gap-3" style={{ alignItems:'center', textAlign:'center', marginBottom: 40 }}>
          <span className="eyebrow"><span className="dot"/> Traveler stories</span>
          <h2>People talk. We listen,<br/><span className="serif grad-text">and then plan harder.</span></h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 22 }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="card" style={{ padding: 32, position:'relative' }}>
              <Quote size={28} style={{ color:'var(--cv-cyan)', opacity:0.4, position:'absolute', top: 20, right: 22 }}/>
              <div className="row gap-1" style={{ color:'var(--cv-amber)', marginBottom: 14 }}>
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16}/>)}
              </div>
              <p style={{ fontSize: 17, color:'var(--cv-ink-2)', lineHeight: 1.55, marginBottom: 22 }}>{t.quote}</p>
              <div className="row gap-3" style={{ alignItems:'center' }}>
                <div style={{ width:48, height:48, borderRadius:'50%', backgroundImage:`url(${t.avatar})`, backgroundSize:'cover', flex:'0 0 48px', backgroundColor:'var(--cv-sky)' }}/>
                <div className="col">
                  <div style={{ fontWeight:700, color:'var(--cv-ink)' }}>{t.name}</div>
                  <div style={{ fontSize:13, color:'var(--cv-muted)' }}>{t.where}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── GUIDES ───────────────── */

function Guides() {
  return (
    <section>
      <div className="container">
        <div className="between" style={{ marginBottom: 36, flexWrap:'wrap', gap:16 }}>
          <div className="col gap-3">
            <span className="eyebrow"><span className="dot"/> Guides & journal</span>
            <h2>Read before you fly.</h2>
          </div>
          <a href="#/guides" onClick={(e)=>{ e.preventDefault(); go('guides'); }} className="btn btn-ghost btn-sm">All articles <ArrowR size={14}/></a>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gap: 22 }}>
          {GUIDES.slice(0, 3).map((g, i) => (
            <article key={g.title} className="card card-hover" style={{ overflow:'hidden', cursor:'pointer' }} onClick={() => go('guide/' + g.slug)}>
              <div style={{ aspectRatio: i === 0 ? '4/3' : '4/3', backgroundImage:`url(${g.img})`, backgroundSize:'cover', backgroundPosition:'center', position:'relative' }}>
                <span className="chip" style={{ position:'absolute', top:14, left:14, background:'rgba(255,255,255,0.95)' }}>{g.tag}</span>
              </div>
              <div style={{ padding: 22 }}>
                <h3 style={{ fontSize: i === 0 ? 22 : 18, marginBottom: 10 }}>{g.title}</h3>
                <div className="between">
                  <span style={{ fontSize:13, color:'var(--cv-muted)' }}>{g.read} read</span>
                  <a href={'#/guide/' + g.slug} onClick={(e)=>{ e.preventDefault(); e.stopPropagation(); go('guide/' + g.slug); }} style={{ fontSize:13, fontWeight:700, color:'var(--cv-navy)', display:'inline-flex', alignItems:'center', gap:4 }}>Read <ArrowUR size={12}/></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── NEWSLETTER CTA ───────────────── */

function Newsletter() {
  return (
    <section style={{ padding: '64px 0 96px' }}>
      <div className="container">
        <div className="card" style={{ padding: 56, background:'var(--cv-navy)', color:'#fff', position:'relative', overflow:'hidden', borderRadius: 32 }}>
          <div style={{ position:'absolute', right: -100, top: -100, width: 360, height: 360, borderRadius:'50%', background:'radial-gradient(circle, rgba(30,200,227,0.5), transparent 65%)' }}/>
          <div style={{ position:'absolute', right: 100, bottom: -120, width: 240, height: 240, borderRadius:'50%', background:'radial-gradient(circle, rgba(24,224,196,0.4), transparent 65%)' }}/>
          <div style={{ position:'relative', display:'grid', gridTemplateColumns:'1.3fr 1fr', gap: 40, alignItems:'center' }}>
            <div className="col gap-4">
              <span className="chip" style={{ alignSelf:'flex-start', background:'rgba(255,255,255,0.1)', color:'#fff', border:'1px solid rgba(255,255,255,0.2)' }}>
                <span className="pulse-dot" style={{ background:'var(--cv-teal)' }}/> Monthly drop
              </span>
              <h2 style={{ color:'#fff', fontSize: 'clamp(28px, 3.4vw, 44px)' }}>
                Get the next destination launch <span className="serif" style={{ color:'var(--cv-teal)' }}>before everyone else</span>.
              </h2>
              <p style={{ color:'#c6cffa', fontSize: 16, maxWidth: 480 }}>One thoughtful email a month — new packages, early-bird discounts, visa updates, and one playlist for the runway.</p>
            </div>
            <div className="col gap-3">
              <div style={{ background:'#fff', borderRadius: 999, padding: 6, display:'flex', alignItems:'center', gap: 6 }}>
                <input type="email" placeholder="you@example.com" style={{ flex:1, border:0, outline:0, padding:'14px 18px', fontSize:15, fontFamily:'inherit', color:'var(--cv-ink)', background:'transparent' }}/>
                <button className="btn btn-primary" style={{ background:'var(--cv-grad-bird)', color:'var(--cv-navy-deep)' }}>Subscribe <ArrowR size={14}/></button>
              </div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.6)' }}>No spam. Unsubscribe anytime. We never share your email.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── FOOTER ───────────────── */

function Footer() {
  const cols = [
    { h: 'Packages',    items: ['Bali', 'Dubai', 'Thailand', 'Singapore', 'Maldives', 'Switzerland', 'Turkey', 'All destinations'] },
    { h: 'Company',     items: ['About us', 'Careers', 'Press', 'Partners', 'Contact', 'Reviews'] },
    { h: 'Help',        items: ['Visa info', 'Refund policy', 'FAQs', 'Trip insurance', 'Talk to expert', 'Group quote'] },
  ];
  return (
    <footer className="footer">
      <div className="container" style={{ padding: '72px 32px 32px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 56 }}>
          <div className="col gap-5">
            <div className="logo-wrap">
              <BrandLockup height={40} dark />
            </div>
            <p style={{ color:'#aab4d6', fontSize: 14, maxWidth: 320 }}>
              Holiday packages, visa & group tours. Serving travelers from India and the Gulf since 2015. Registered with IATA & TAAI.
            </p>
            <div className="col gap-2">
              <div style={{ fontSize:13, color:'#aab4d6', display:'flex', alignItems:'center', gap:8 }}><Phone size={14}/> +91 22 4040 5050 · +971 4 808 0000</div>
              <div style={{ fontSize:13, color:'#aab4d6', display:'flex', alignItems:'center', gap:8 }}><PinIcon size={14}/> Mumbai · Bengaluru · Dubai · online everywhere</div>
            </div>
            <div className="row gap-2">
              {['IG','FB','YT','WA','LI'].map(s => (
                <a key={s} href="#" style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', display:'grid', placeItems:'center', color:'#fff', fontSize:12, fontWeight:700 }}>{s}</a>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.h}>
              <h4>{col.h}</h4>
              <div className="col gap-3">
                {col.items.map(i => {
                  if (col.h === 'Packages') {
                    const to = i === 'All destinations' ? 'destinations'
                      : (findBySlug(DESTINATIONS, slugify(i)) ? 'destination/' + slugify(i) : 'destinations');
                    return <a key={i} href={'#/' + to} onClick={(e)=>{ e.preventDefault(); go(to); }}>{i}</a>;
                  }
                  return <a key={i} href="#" onClick={(e)=>e.preventDefault()}>{i}</a>;
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop: 28, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:14, fontSize:13, color:'#7c87b5' }}>
          <div>© 2026 CityView Tourism Pvt Ltd. All rights reserved.</div>
          <div className="row gap-5">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a><a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   DETAIL PAGES — rich, on-brand pages reached via the hash router.
   ═════════════════════════════════════════════════════════════════════ */

const photoId = (url) => { const m = /photo-([^?]+)/.exec(url || ''); return m ? m[1] : null; };
// Build a 5-image gallery anchored on the item's own hero photo, then rotating
// through the verified pool so every detail page looks varied and never broken.
const galleryFor = (url, w = 1200) => {
  const id = photoId(url);
  let start = GALLERY_POOL.indexOf(id);
  if (start < 0) start = 0;
  const ids = [];
  for (let k = 0; k < 5; k++) ids.push(GALLERY_POOL[(start + k) % GALLERY_POOL.length]);
  return ids.map((x) => U(x, w));
};

/* ── Shared chrome ── */

function Breadcrumb({ trail }) {
  return (
    <div className="row gap-2" style={{ alignItems: 'center', flexWrap: 'wrap', fontSize: 13, color: 'var(--cv-muted)', marginBottom: 18 }}>
      {trail.map((t, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {t.to !== undefined
            ? <a href={'#/' + t.to} onClick={(e) => { e.preventDefault(); go(t.to); }} style={{ color: 'var(--cv-navy)', fontWeight: 600 }}>{t.label}</a>
            : <span style={{ color: 'var(--cv-ink-2)' }}>{t.label}</span>}
          {i < trail.length - 1 && <ChevR size={13} />}
        </span>
      ))}
    </div>
  );
}

function BackBar() {
  return (
    <button onClick={() => { if (window.history.length > 1) window.history.back(); else go(''); }}
      className="btn btn-ghost btn-sm" style={{ marginBottom: 18 }}>
      <ArrowL size={16} /> Back
    </button>
  );
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(6,9,51,0.92)', zIndex: 200, display: 'grid', placeItems: 'center', padding: 24 }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 22, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 0, color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Close size={20} /></button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} style={{ position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 0, color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><ArrowL size={22} /></button>
      <img src={images[index]} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '82vh', borderRadius: 16, boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }} />
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} style={{ position: 'absolute', right: 22, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 0, color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><ArrowR size={22} /></button>
      <div style={{ position: 'absolute', bottom: 22, color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{index + 1} / {images.length}</div>
    </div>
  );
}

function Gallery({ images }) {
  const [main, setMain] = useState(0);
  const [box, setBox] = useState(false);
  return (
    <div className="col gap-3">
      <div onClick={() => setBox(true)} style={{ position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden', aspectRatio: '16/10', cursor: 'zoom-in', boxShadow: 'var(--shadow)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${images[main]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(7,9,51,0.4)', backdropFilter: 'blur(6px)', color: '#fff', borderRadius: 999, padding: '7px 13px', fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Expand size={14} /> View gallery
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {images.map((im, i) => (
          <button key={i} onClick={() => setMain(i)} style={{ padding: 0, border: i === main ? '2px solid var(--cv-navy)' : '2px solid transparent', borderRadius: 12, overflow: 'hidden', aspectRatio: '1/1', cursor: 'pointer' }}>
            <div style={{ width: '100%', height: '100%', backgroundImage: `url(${im})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </button>
        ))}
      </div>
      {box && <Lightbox images={images} index={main} onClose={() => setBox(false)}
        onPrev={() => setMain((m) => (m - 1 + images.length) % images.length)}
        onNext={() => setMain((m) => (m + 1) % images.length)} />}
    </div>
  );
}

function FactRow({ icon, label, value }) {
  const I = icon;
  return (
    <div className="row gap-3" style={{ alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--cv-line)' }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--cv-sky)', color: 'var(--cv-navy)', display: 'grid', placeItems: 'center', flex: '0 0 38px' }}><I size={18} /></div>
      <div className="col">
        <div style={{ fontSize: 12, color: 'var(--cv-muted)', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--cv-ink)' }}>{value}</div>
      </div>
    </div>
  );
}

function BookingCard({ price, strike, nights, rating, reviews, label = 'Get a quote' }) {
  return (
    <div className="card" style={{ padding: 24, position: 'sticky', top: 92 }}>
      <div className="between" style={{ alignItems: 'flex-start', marginBottom: 14 }}>
        <div className="col">
          <div style={{ fontSize: 12, color: 'var(--cv-muted)' }}>{nights} · from</div>
          <div className="row gap-2" style={{ alignItems: 'baseline' }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--cv-ink)' }}>{fmt(price)}</div>
            {strike && <div style={{ fontSize: 15, color: 'var(--cv-muted)', textDecoration: 'line-through' }}>{fmt(strike)}</div>}
          </div>
          <div style={{ fontSize: 12, color: 'var(--cv-muted)' }}>per person · twin sharing</div>
        </div>
        {rating && (
          <div className="chip chip-mint" style={{ fontWeight: 700 }}>
            <Star size={13} /> {rating}{reviews ? ` · ${reviews}` : ''}
          </div>
        )}
      </div>
      <div className="col gap-2" style={{ marginBottom: 16 }}>
        <div className="row gap-2" style={{ alignItems: 'center', fontSize: 13, color: 'var(--cv-ink-2)' }}><Check size={15} style={{ color: 'var(--cv-teal)' }} /> Free date changes up to 14 days out</div>
        <div className="row gap-2" style={{ alignItems: 'center', fontSize: 13, color: 'var(--cv-ink-2)' }}><Check size={15} style={{ color: 'var(--cv-teal)' }} /> 0% EMI from ₹4,999/mo</div>
        <div className="row gap-2" style={{ alignItems: 'center', fontSize: 13, color: 'var(--cv-ink-2)' }}><Check size={15} style={{ color: 'var(--cv-teal)' }} /> Pay just 25% to confirm</div>
      </div>
      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }} onClick={() => go('quote')}>
        <PlaneIcon size={16} /> {label}
      </button>
      <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={() => openWhatsApp("Hi CityView! I'd like to talk to a planner about a trip.")}>
        <Whatsapp size={16} /> Chat on WhatsApp
      </button>
      <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--cv-muted)', marginTop: 12 }}>3 expert planners online now · replies in &lt; 4 min</div>
    </div>
  );
}

function SectionHead({ eyebrow, title }) {
  return (
    <div className="col gap-2" style={{ marginBottom: 18 }}>
      {eyebrow && <span className="eyebrow"><span className="dot" /> {eyebrow}</span>}
      <h2 style={{ fontSize: 28 }}>{title}</h2>
    </div>
  );
}

/* ── Destination detail ── */

function DestinationDetail({ slug }) {
  const d = findBySlug(DESTINATIONS, slug);
  if (!d) return <NotFound what="destination" />;
  const gallery = galleryFor(d.img);
  const relatedPkgs = PACKAGES.filter((p) => p.dest === d.slug);
  const otherDest = DESTINATIONS.filter((x) => x.slug !== d.slug).slice(0, 4);
  return (
    <main>
      {/* hero banner */}
      <section style={{ padding: 0, position: 'relative', height: 'min(56vh, 520px)', minHeight: 380, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${U(photoId(d.img), 1600)})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,9,51,0.25) 0%, transparent 35%, rgba(7,9,51,0.78) 100%)' }} />
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 30 }}>
          <div><button onClick={() => go('')} className="btn btn-ghost btn-sm"><ArrowL size={16} /> Back to home</button></div>
          <div className="col gap-3" style={{ color: '#fff' }}>
            <span className="chip chip-mint" style={{ alignSelf: 'flex-start' }}><Sparkles size={13} /> {d.tag}</span>
            <h1 style={{ color: '#fff', fontSize: 'clamp(36px, 5vw, 60px)' }}>{d.name}</h1>
            <div className="row gap-4" style={{ flexWrap: 'wrap', alignItems: 'center', fontSize: 15 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><PinIcon size={16} /> {d.country}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Suitcase size={16} /> {d.packages} packages</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Tag size={16} /> from {fmt(d.from)}</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 48 }}>
        <div className="container">
          <Breadcrumb trail={[{ label: 'Home', to: '' }, { label: 'Destinations', to: 'destinations' }, { label: d.name }]} />
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 40, alignItems: 'start' }} className="detail-grid">
            <div className="col gap-8">
              <div>
                <SectionHead eyebrow="Overview" title={`Why ${d.name}`} />
                <p style={{ fontSize: 17, lineHeight: 1.7 }}>{d.overview}</p>
              </div>

              <Gallery images={gallery} />

              <div>
                <SectionHead eyebrow="Don't miss" title="Top experiences" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {d.highlights.map((h, i) => (
                    <div key={i} className="row gap-3" style={{ alignItems: 'center', padding: 16, background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--cv-grad-bird)', color: 'var(--cv-navy-deep)', display: 'grid', placeItems: 'center', fontWeight: 800, flex: '0 0 30px' }}>{i + 1}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--cv-ink-2)' }}>{h}</div>
                    </div>
                  ))}
                </div>
              </div>

              {relatedPkgs.length > 0 && (
                <div>
                  <SectionHead eyebrow="Ready to book" title={`${d.name} packages`} />
                  <div style={{ display: 'grid', gridTemplateColumns: relatedPkgs.length > 1 ? 'repeat(2, 1fr)' : '1fr', gap: 20 }}>
                    {relatedPkgs.map((p) => <PackCard key={p.slug} p={p} />)}
                  </div>
                </div>
              )}
            </div>

            {/* sidebar */}
            <div className="col gap-4">
              <BookingCard price={d.from} nights={d.nights} label="Plan my trip" />
              <div className="card" style={{ padding: 22 }}>
                <h3 style={{ fontSize: 16, marginBottom: 6 }}>Good to know</h3>
                <FactRow icon={Sun} label="Best time to visit" value={d.bestTime} />
                <FactRow icon={PlaneIcon} label="Flight time" value={d.flight} />
                <FactRow icon={Stamp} label="Visa" value={d.visa} />
                <FactRow icon={Calendar2} label="Suggested length" value={d.nights} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* more destinations */}
      <section style={{ background: 'var(--cv-sky-2)' }}>
        <div className="container">
          <SectionHead eyebrow="Keep exploring" title="More destinations" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {otherDest.map((x) => <DestCard key={x.slug} d={x} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Package detail ── */

function PackageDetail({ slug }) {
  const p = findBySlug(PACKAGES, slug);
  if (!p) return <NotFound what="package" />;
  const gallery = galleryFor(p.img);
  const dest = DESTINATIONS.find((x) => x.slug === p.dest);
  const save = p.strike - p.price;
  return (
    <main>
      <section style={{ paddingTop: 32, paddingBottom: 0 }}>
        <div className="container">
          <Breadcrumb trail={[{ label: 'Home', to: '' }, { label: 'Packages', to: 'packages' }, { label: p.title }]} />
          <div className="between" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
            <div className="col gap-3" style={{ maxWidth: 640 }}>
              <span className="chip chip-mint" style={{ alignSelf: 'flex-start' }}><Sparkles size={13} /> {p.badge}</span>
              <h1 style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}>{p.title}</h1>
              <div className="row gap-4" style={{ flexWrap: 'wrap', alignItems: 'center', fontSize: 14, color: 'var(--cv-muted)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><PinIcon size={15} /> {p.place}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Clock size={15} /> {p.nights}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--cv-amber)' }}><Star size={15} /> <b style={{ color: 'var(--cv-ink)' }}>{p.rating}</b> ({p.reviews})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 40, alignItems: 'start' }} className="detail-grid">
            <div className="col gap-8">
              <Gallery images={gallery} />

              <div className="row gap-2" style={{ flexWrap: 'wrap' }}>
                {p.cities.map((c) => <span key={c} className="chip"><PinIcon size={13} /> {c}</span>)}
              </div>

              <div>
                <SectionHead eyebrow="The trip" title="Overview" />
                <p style={{ fontSize: 17, lineHeight: 1.7 }}>{p.overview}</p>
              </div>

              <div>
                <SectionHead eyebrow="Day by day" title="Your itinerary" />
                <div className="col">
                  {p.itinerary.map((day, i) => (
                    <div key={i} className="row gap-4" style={{ alignItems: 'flex-start' }}>
                      <div className="col" style={{ alignItems: 'center', flex: '0 0 44px' }}>
                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--cv-navy)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 13, lineHeight: 1.1, textAlign: 'center' }}>D{i + 1}</div>
                        {i < p.itinerary.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 26, background: 'var(--cv-line)', margin: '6px 0' }} />}
                      </div>
                      <div className="col gap-1" style={{ paddingBottom: 22 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--cv-ink)' }}>{day[0]}</div>
                        <div style={{ fontSize: 14, color: 'var(--cv-muted)', lineHeight: 1.6 }}>{day[1]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHead eyebrow="Included" title="What's in the price" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {p.inclusions.map((inc) => (
                    <div key={inc} className="row gap-2" style={{ alignItems: 'center', padding: 14, background: '#fff', borderRadius: 12, boxShadow: 'var(--shadow-sm)', fontSize: 14, fontWeight: 600, color: 'var(--cv-ink-2)' }}>
                      <Check size={16} style={{ color: 'var(--cv-teal)' }} /> {inc}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* sidebar */}
            <div className="col gap-4">
              <BookingCard price={p.price} strike={p.strike} nights={p.nights} rating={p.rating} reviews={p.reviews} label="Book this trip" />
              {save > 0 && (
                <div className="card" style={{ padding: 18, background: 'var(--cv-mint)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', color: '#0e544a', display: 'grid', placeItems: 'center', flex: '0 0 38px' }}><Tag size={18} /></div>
                  <div style={{ fontSize: 14, color: '#0e544a', fontWeight: 700 }}>You save {fmt(save)} on this departure</div>
                </div>
              )}
              {dest && (
                <a href={'#/destination/' + dest.slug} onClick={(e) => { e.preventDefault(); go('destination/' + dest.slug); }} className="card card-hover" style={{ overflow: 'hidden', display: 'block' }}>
                  <div style={{ aspectRatio: '16/9', backgroundImage: `url(${dest.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ padding: 16 }}>
                    <div style={{ fontSize: 12, color: 'var(--cv-muted)' }}>Destination guide</div>
                    <div className="between"><div style={{ fontSize: 16, fontWeight: 700, color: 'var(--cv-ink)' }}>Explore {dest.name}</div><ArrowR size={16} /></div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cv-sky-2)' }}>
        <div className="container">
          <SectionHead eyebrow="You may also like" title="Other trending packages" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {PACKAGES.filter((x) => x.slug !== p.slug).slice(0, 3).map((x) => <PackCard key={x.slug} p={x} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Guide / article detail ── */

function GuideDetail({ slug }) {
  const g = findBySlug(GUIDES, slug);
  if (!g) return <NotFound what="article" />;
  const more = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 3);
  return (
    <main>
      <section style={{ paddingTop: 32 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <Breadcrumb trail={[{ label: 'Home', to: '' }, { label: 'Guides', to: 'guides' }, { label: g.tag }]} />
          <span className="chip chip-sky" style={{ marginBottom: 14 }}>{g.tag}</span>
          <h1 style={{ fontSize: 'clamp(30px, 4vw, 46px)', marginBottom: 16 }}>{g.title}</h1>
          <div className="row gap-3" style={{ alignItems: 'center', color: 'var(--cv-muted)', fontSize: 14, marginBottom: 26 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Clock size={15} /> {g.read} read</span>
            <span>·</span>
            <span>By the CityView travel desk</span>
          </div>
          <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', aspectRatio: '16/9', marginBottom: 30, boxShadow: 'var(--shadow)' }}>
            <div style={{ width: '100%', height: '100%', backgroundImage: `url(${U(photoId(g.img), 1400)})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </div>
          <div className="col gap-5">
            <p style={{ fontSize: 19, lineHeight: 1.7, color: 'var(--cv-ink-2)', fontWeight: 500 }}>{g.excerpt}</p>
            {g.body.map((para, i) => (
              <p key={i} style={{ fontSize: 17, lineHeight: 1.8 }}>{para}</p>
            ))}
          </div>
          <div className="card" style={{ marginTop: 36, padding: 28, background: 'var(--cv-navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div className="col gap-1">
              <div style={{ fontSize: 18, fontWeight: 700 }}>Want us to handle the planning?</div>
              <div style={{ color: '#c6cffa', fontSize: 14 }}>Visas, flights, hotels — sorted by real humans.</div>
            </div>
            <button className="btn" style={{ background: 'var(--cv-grad-bird)', color: 'var(--cv-navy-deep)' }} onClick={() => go('quote')}>Get a quote <ArrowR size={15} /></button>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cv-sky-2)' }}>
        <div className="container">
          <SectionHead eyebrow="Read next" title="More guides" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {more.map((x) => (
              <article key={x.slug} className="card card-hover" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => go('guide/' + x.slug)}>
                <div style={{ aspectRatio: '4/3', backgroundImage: `url(${x.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <span className="chip" style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.95)' }}>{x.tag}</span>
                </div>
                <div style={{ padding: 22 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>{x.title}</h3>
                  <span style={{ fontSize: 13, color: 'var(--cv-muted)' }}>{x.read} read</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── List pages ── */

function ListHero({ eyebrow, title, sub }) {
  return (
    <section style={{ background: 'var(--cv-grad-hero)', paddingTop: 48, paddingBottom: 40 }}>
      <div className="container">
        <button onClick={() => go('')} className="btn btn-ghost btn-sm" style={{ marginBottom: 18 }}><ArrowL size={16} /> Back to home</button>
        <span className="eyebrow"><span className="dot" /> {eyebrow}</span>
        <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 56px)', margin: '12px 0 10px' }}>{title}</h1>
        <p style={{ fontSize: 18, maxWidth: 620 }}>{sub}</p>
      </div>
    </section>
  );
}

function DestinationsList() {
  const [filter, setFilter] = useState('All');
  const tabs = ['All', 'Asia', 'Europe'];
  const list = filter === 'All' ? DESTINATIONS : DESTINATIONS.filter((d) => d.region === filter);
  return (
    <main>
      <ListHero eyebrow="Destinations" title="Every place we love to send you" sub="Hand-picked destinations across Asia and Europe — each with curated packages, visas handled and on-trip support." />
      <section style={{ paddingTop: 36 }}>
        <div className="container">
          <div className="tabs" style={{ marginBottom: 28 }}>
            {tabs.map((t) => <button key={t} className={'tab ' + (t === filter ? 'active' : '')} onClick={() => setFilter(t)}>{t}</button>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
            {list.map((d) => <DestCard key={d.slug} d={d} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

function PackagesList() {
  return (
    <main>
      <ListHero eyebrow="Packages" title="Picked, priced & packed" sub="Every package includes flights, hotels, visa, transfers and curated experiences. Cancellable till 14 days before departure." />
      <section style={{ paddingTop: 36 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {PACKAGES.map((p) => <PackCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

function GuidesList() {
  return (
    <main>
      <ListHero eyebrow="Guides & journal" title="Read before you fly" sub="Honest, practical travel guides from our planners — visas, timing, itineraries and the things most travellers wish they knew sooner." />
      <section style={{ paddingTop: 36 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {GUIDES.map((g) => (
              <article key={g.slug} className="card card-hover" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => go('guide/' + g.slug)}>
                <div style={{ aspectRatio: '4/3', backgroundImage: `url(${g.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <span className="chip" style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.95)' }}>{g.tag}</span>
                </div>
                <div style={{ padding: 22 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{g.title}</h3>
                  <p style={{ fontSize: 14, marginBottom: 12 }}>{g.excerpt}</p>
                  <div className="between">
                    <span style={{ fontSize: 13, color: 'var(--cv-muted)' }}>{g.read} read</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--cv-navy)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>Read <ArrowUR size={12} /></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Quote / contact page ── */

function QuotePage() {
  const [sent, setSent] = useState(false);
  return (
    <main>
      <section style={{ background: 'var(--cv-grad-hero)', paddingTop: 48 }}>
        <div className="container">
          <button onClick={() => go('')} className="btn btn-ghost btn-sm" style={{ marginBottom: 18 }}><ArrowL size={16} /> Back to home</button>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 420px', gap: 48, alignItems: 'start' }} className="detail-grid">
            <div className="col gap-5">
              <span className="eyebrow"><span className="dot" /> Get a quote</span>
              <h1 style={{ fontSize: 'clamp(32px, 4.4vw, 52px)' }}>Tell us your dream trip.<br /><span className="serif grad-text">We'll price it in hours.</span></h1>
              <p style={{ fontSize: 18, maxWidth: 520 }}>Share a few details and one of our planners will build a custom itinerary with flights, hotels, visas and experiences — no obligation, no spam.</p>
              <div className="col gap-3" style={{ marginTop: 8 }}>
                {[['Visa, handled', Stamp], ['0% EMI options', Card], ['24×7 on-trip help', Phone], ['98% visa approval', Shield]].map(([t, I], i) => (
                  <div key={i} className="row gap-3" style={{ alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fff', color: 'var(--cv-navy)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-sm)' }}>{React.createElement(I, { size: 18 })}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--cv-ink-2)' }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 28 }}>
              {sent ? (
                <div className="col gap-3" style={{ alignItems: 'center', textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcf8e8', color: '#1d9b54', display: 'grid', placeItems: 'center' }}><Whatsapp size={32} /></div>
                  <h3>Opening WhatsApp…</h3>
                  <p style={{ fontSize: 14 }}>We've opened a WhatsApp chat with your trip details — just hit send and a CityView planner will reply shortly.</p>
                  <div className="row gap-3" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button className="btn" style={{ background: '#25D366', color: '#fff' }} onClick={() => openWhatsApp()}><Whatsapp size={16} /> Reopen WhatsApp</button>
                    <button className="btn btn-ghost" onClick={() => go('')}>Back to home</button>
                  </div>
                </div>
              ) : (
                <form
                  className="col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = e.currentTarget;
                    const v = (n) => (f.elements[n] && f.elements[n].value || '').trim();
                    const msg = "Hi CityView! I'd like a holiday quote.\n\n"
                      + `• Name: ${v('name')}\n`
                      + `• Email: ${v('email')}\n`
                      + `• Destination: ${v('destination')}\n`
                      + `• Travellers: ${v('travellers')}\n`
                      + `• Approx dates: ${v('dates')}`;
                    openWhatsApp(msg);
                    setSent(true);
                  }}
                >
                  <h3 style={{ fontSize: 20 }}>Plan my holiday</h3>
                  <QField name="name" label="Full name" placeholder="Your name" />
                  <QField name="email" label="Email" type="email" placeholder="you@example.com" />
                  <QField name="destination" label="Destination" placeholder="e.g. Bali, Dubai, Switzerland" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <QField name="travellers" label="Travellers" placeholder="2 adults" />
                    <QField name="dates" label="Approx dates" placeholder="Jul 2026" />
                  </div>
                  <button type="submit" className="btn" style={{ background: '#25D366', color: '#fff', justifyContent: 'center', boxShadow: '0 8px 20px rgba(37,211,102,0.3)' }}>
                    <Whatsapp size={18} /> Request my quote on WhatsApp
                  </button>
                  <div style={{ fontSize: 12, color: 'var(--cv-muted)', textAlign: 'center' }}>Your enquiry opens in WhatsApp — quick replies, no spam.</div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function QField({ label, type = 'text', placeholder, name }) {
  return (
    <label className="col gap-2" style={{ minWidth: 0 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--cv-ink-2)' }}>{label}</span>
      <input type={type} required placeholder={placeholder} name={name}
        style={{ width: '100%', boxSizing: 'border-box', padding: '13px 16px', borderRadius: 12, border: '1.5px solid var(--cv-line)', fontSize: 15, fontFamily: 'inherit', color: 'var(--cv-ink)', outline: 'none', background: '#fff' }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--cv-cyan)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--cv-line)'} />
    </label>
  );
}

/* ── Simple/info pages ── */

function InfoPage({ title, body }) {
  return (
    <main>
      <ListHero eyebrow="CityView" title={title} sub={body} />
      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <button onClick={() => go('quote')} className="btn btn-primary">Get a quote <ArrowR size={15} /></button>
        </div>
      </section>
    </main>
  );
}

function NotFound({ what = 'page' }) {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 120, textAlign: 'center' }}>
      <div className="container col gap-4" style={{ alignItems: 'center' }}>
        <CityViewLogo size={64} />
        <h1 style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}>We couldn't find that {what}.</h1>
        <p style={{ fontSize: 17, maxWidth: 440 }}>The link may be old or the {what} may have moved. Let's get you back on track.</p>
        <div className="row gap-3" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => go('')}>Back to home <ArrowR size={15} /></button>
          <button className="btn btn-ghost" onClick={() => go('destinations')}>Browse destinations</button>
        </div>
      </div>
    </section>
  );
}

/* ── Router: chooses what to render under the persistent Nav/Footer ── */

function RouteView({ route }) {
  switch (route.type) {
    case 'destination':  return <DestinationDetail slug={route.slug} />;
    case 'package':      return <PackageDetail slug={route.slug} />;
    case 'guide':        return <GuideDetail slug={route.slug} />;
    case 'destinations': return <DestinationsList />;
    case 'packages':     return <PackagesList />;
    case 'guides':       return <GuidesList />;
    case 'quote':        return <QuotePage />;
    case 'signin':       return <InfoPage title="Sign in" body="Member accounts are coming soon. For now, your planner keeps everything in one place — just get a quote to start." />;
    case 'about':        return <InfoPage title="About CityView" body="Holiday packages, visa & group tours for travellers from India and the Gulf since 2015. Registered with IATA & TAAI." />;
    default:             return <NotFound />;
  }
}

Object.assign(window, {
  Nav, Hero, SearchBar, TrustMarquee, Destinations, Packages, Why, Deals, Testimonials, Guides, Newsletter, Footer,
  DestinationDetail, PackageDetail, GuideDetail, DestinationsList, PackagesList, GuidesList, QuotePage, InfoPage, NotFound,
  RouteView, useHashRoute, go,
});
