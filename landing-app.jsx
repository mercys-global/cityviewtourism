// City View — main app with Tweaks panel

const { useEffect } = React;

function App() {
  const [t, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "accentPalette": "cyanTeal",
    "headline": "discovery",
    "cardStyle": "rounded",
    "showNewsCard": true,
    "showBgGlow": true
  }/*EDITMODE-END*/);

  const palettes = {
    cyanTeal: { cyan:'#1ec8e3', teal:'#18e0c4', mint:'#c6f4ec', navy:'#0a1056' },
    sapphire: { cyan:'#5b8dff', teal:'#7a6bff', mint:'#dde6ff', navy:'#0a1450' },
    sunset:   { cyan:'#ff7a5b', teal:'#ffb454', mint:'#ffe7d0', navy:'#3b0a4d' },
    forest:   { cyan:'#3fd17a', teal:'#16a085', mint:'#d3f3df', navy:'#0a3a2e' },
  };

  // Apply palette → CSS vars
  useEffect(() => {
    const p = palettes[t.accentPalette] || palettes.cyanTeal;
    const root = document.documentElement;
    root.style.setProperty('--cv-cyan', p.cyan);
    root.style.setProperty('--cv-teal', p.teal);
    root.style.setProperty('--cv-mint', p.mint);
    root.style.setProperty('--cv-navy', p.navy);
    root.style.setProperty('--cv-grad-bird', `linear-gradient(120deg, ${p.cyan} 0%, ${p.teal} 100%)`);
  }, [t.accentPalette]);

  useEffect(() => {
    const r = { rounded: 22, sharp: 8, glassy: 28 }[t.cardStyle] || 22;
    document.documentElement.style.setProperty('--r-lg', r + 'px');
  }, [t.cardStyle]);

  const route = useHashRoute();
  const isHome = route.type === 'home';

  return (
    <div style={{ position: 'relative' }}>
      <style>{`
        /* ============ Responsive layout ============ */

        /* Detail / list two-column (content + sticky sidebar) → single column */
        @media (max-width: 980px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .detail-grid .card[style*="sticky"] { position: static !important; }
        }

        /* Tablet & below */
        @media (max-width: 900px) {
          /* Hero + any sidebar layout (content + fixed rail) → single column.
             The browser normalises minmax(0,..) to minmax(0px,..) in the style
             attribute, so match on the stable "minmax(0" prefix. */
          [style*="minmax(0"] { grid-template-columns: 1fr !important; }
          h1[style*="nowrap"] { white-space: normal !important; }
          /* Search bar: stack the four fields + button */
          [style*="1.2fr 1fr 1fr 1fr auto"] { grid-template-columns: 1fr !important; }
          /* Newsletter: copy over form */
          [style*="1.3fr 1fr"] { grid-template-columns: 1fr !important; }
          /* Guides (1.4fr 1fr 1fr) + footer (1.4fr 1fr 1fr 1fr) → two up */
          [style*="1.4fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
          /* Destination / feature / deal / stat grids 3–5 up → two up */
          [style*="repeat(3"], [style*="repeat(4"], [style*="repeat(5"] { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Phones */
        @media (max-width: 600px) {
          [style*="repeat(2"], [style*="repeat(3"], [style*="repeat(4"], [style*="repeat(5"] { grid-template-columns: 1fr !important; }
          [style*="1.4fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          /* Shrink the hero media so it isn't a tall empty band */
          [style*="height: 580px"] { height: 440px !important; }
          /* Tighten the big newsletter CTA card */
          [style*="padding: 56px"] { padding: 28px !important; }
        }

        /* ============ Mobile nav ============ */
        .nav-burger { display: none; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 12px; border: 1px solid var(--cv-line); background: #fff; color: var(--cv-ink); flex: 0 0 auto; }
        .nav-mobile-panel { display: none; }
        @media (max-width: 860px) {
          .nav-burger { display: inline-flex; }
          .nav-mobile-panel { display: block; }
          /* The desktop nav links carry an inline display:flex, which beats the
             template's .hidden-mob rule — force them hidden on mobile. */
          .hidden-mob { display: none !important; }
          /* Fit logo + CTA + burger on a phone: shrink the lockup, tighten the bar */
          .nav .logo-wrap img { height: 28px !important; }
          .nav > .container { padding-left: 16px !important; padding-right: 16px !important; gap: 12px !important; }
        }
        /* Small phones: trim the CTA + burger so nothing spills past the edge */
        @media (max-width: 480px) {
          .nav .btn-primary.btn-sm { padding: 8px 12px !important; font-size: 12px !important; }
          .nav-burger { width: 38px !important; height: 38px !important; }
          .nav > .container { gap: 8px !important; }
        }
        /* Very small phones: the bar can't hold the CTA too — it lives in the menu */
        @media (max-width: 359px) {
          .nav-cta { display: none !important; }
        }
      `}</style>
      <Nav/>
      {isHome ? (
        <React.Fragment>
          <Hero headline={t.headline} showNewsCard={t.showNewsCard} showBgGlow={t.showBgGlow}/>
          <SearchBar/>
          <TrustMarquee/>
          <Destinations/>
          <Packages/>
          <Why/>
          <Deals/>
          <Testimonials/>
          <Guides/>
          <Newsletter/>
        </React.Fragment>
      ) : (
        <RouteView route={route}/>
      )}
      <Footer/>
      {isHome && (
      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette">
          <TweakSelect
            label="Accent"
            value={t.accentPalette}
            onChange={(v) => setTweak('accentPalette', v)}
            options={[
              { value: 'cyanTeal', label: 'Cyan + Teal (default)' },
              { value: 'sapphire', label: 'Sapphire' },
              { value: 'sunset',   label: 'Sunset' },
              { value: 'forest',   label: 'Forest' },
            ]}
          />
          <TweakColor
            label="Quick swap"
            value={[palettes[t.accentPalette].cyan, palettes[t.accentPalette].teal, palettes[t.accentPalette].navy]}
            onChange={(v) => {
              // find palette whose first color matches
              const match = Object.entries(palettes).find(([_, p]) => p.cyan.toLowerCase() === v[0].toLowerCase());
              if (match) setTweak('accentPalette', match[0]);
            }}
            options={Object.entries(palettes).map(([_, p]) => [p.cyan, p.teal, p.navy])}
          />
        </TweakSection>
        <TweakSection label="Hero">
          <TweakText
            label="Accent word"
            value={t.headline}
            onChange={(v) => setTweak('headline', v)}
          />
          <TweakToggle
            label="News card"
            value={t.showNewsCard}
            onChange={(v) => setTweak('showNewsCard', v)}
          />
          <TweakToggle
            label="Background glow"
            value={t.showBgGlow}
            onChange={(v) => setTweak('showBgGlow', v)}
          />
        </TweakSection>
        <TweakSection label="Style">
          <TweakRadio
            label="Card corners"
            value={t.cardStyle}
            onChange={(v) => setTweak('cardStyle', v)}
            options={[
              { value: 'sharp',   label: 'Sharp' },
              { value: 'rounded', label: 'Rounded' },
              { value: 'glassy',  label: 'Pillowy' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
