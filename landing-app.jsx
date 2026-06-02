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
        @media (max-width: 980px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .detail-grid .card[style*="sticky"] { position: static !important; }
        }
        @media (max-width: 720px) {
          .detail-grid [style*="repeat(2"] { grid-template-columns: 1fr !important; }
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
