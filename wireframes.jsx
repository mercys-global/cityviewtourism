// City View Tourism — Wireframes
// Low-fi sketchy exploration of hero layouts + full landing page structure.

const { useState } = React;

/* ─────────── shared bits ─────────── */

const Nav = ({ scale = 1 }) => (
  <div className="nav" style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: `${100/scale}%` }}>
    <div className="navlogo">
      <div className="blob" />
      <span>CityView</span>
    </div>
    <div className="navitems">
      <span>Packages ▾</span>
      <span>Destinations ▾</span>
      <span>Visa</span>
      <span>Group Tours</span>
      <span>Blog</span>
    </div>
    <div className="navcta">
      <span style={{fontFamily:'Kalam', fontSize:14}}>Sign in</span>
      <span className="pill" style={{fontSize:14}}>Get a quote →</span>
    </div>
  </div>
);

const Frame = ({ children, w=1280, h=820, label }) => (
  <div className="wf" style={{ width: w, height: h, position:'relative', overflow:'hidden' }}>
    {children}
    {label ? <div className="scribble" style={{position:'absolute', bottom:8, left:14, fontSize:14}}>{label}</div> : null}
  </div>
);

const Annotation = ({ x, y, children, rotate=-4, color="#e84a4a" }) => (
  <div style={{ position:'absolute', left:x, top:y, color, fontFamily:'Caveat', fontWeight:600, fontSize:18, transform:`rotate(${rotate}deg)`, pointerEvents:'none', whiteSpace:'nowrap' }}>{children}</div>
);

const ArrowSquiggle = ({ x, y, w=80, h=40, flip=false }) => (
  <svg style={{position:'absolute', left:x, top:y, transform: flip?'scaleX(-1)':''}} width={w} height={h} viewBox="0 0 80 40" fill="none">
    <path d="M2 30 Q 20 5, 40 22 T 75 14" stroke="#e84a4a" strokeWidth="1.5" fill="none" />
    <path d="M70 8 L78 14 L70 20" stroke="#e84a4a" strokeWidth="1.5" fill="none" />
  </svg>
);

/* ─────────── HERO VARIATIONS ─────────── */

// V1 — Closest to reference: text left, big media card right, overlapping news card
const HeroV1 = () => (
  <Frame label="V1 · Reference match — text left, media card right, overlapping news">
    <Nav />
    <div style={{padding:'40px 56px', position:'relative'}}>
      <div className="row gap-8">
        <div className="col gap-6" style={{flex:'1 1 50%'}}>
          <div className="h1pen">
            Embark on a journey<br/>
            of <span className="underline-wave">discovery</span> with<br/>
            CityView.
          </div>
          <div style={{fontFamily:'Kalam', fontSize:16, color:'#444', maxWidth:440}}>
            Curated holiday packages across Asia & Europe — built for Indian and Dubai travelers.
          </div>
          <div className="row gap-3">
            <span className="pill accent-fill" style={{fontSize:16, padding:'10px 22px'}}>Explore packages →</span>
            <span className="pill" style={{fontSize:16, padding:'10px 22px'}}>▶ Watch reel</span>
          </div>
          {/* overlapping news card */}
          <div className="stroke p-4 col gap-2" style={{background:'#fff', width:420, marginTop:24, position:'relative'}}>
            <div className="row gap-3">
              <div className="ph" style={{width:80, height:80, flex:'0 0 80px'}}>img</div>
              <div className="col gap-2" style={{flex:1}}>
                <div style={{fontFamily:'Kalam', fontWeight:700, fontSize:14, lineHeight:1.3}}>
                  Bali Monsoon Magic — 6N/7D from ₹54,999 · launches 15 June
                </div>
                <div className="small">21 May 2026</div>
              </div>
            </div>
            <span className="pill accent-fill" style={{alignSelf:'flex-start', fontSize:13, padding:'5px 14px', marginTop:4}}>View more</span>
          </div>
        </div>
        <div style={{flex:'1 1 50%', position:'relative', minHeight:520}}>
          {/* stacked cards */}
          <div className="stroke" style={{position:'absolute', right:60, top:30, width:380, height:480, background:'#cdf3ef', transform:'rotate(-3deg)'}} />
          <div className="stroke" style={{position:'absolute', right:30, top:10, width:380, height:480, background:'#dde6ff', transform:'rotate(3deg)'}} />
          <div className="stroke p-4 col" style={{position:'absolute', right:0, top:0, width:440, height:500, background:'#fff'}}>
            <div className="between" style={{marginBottom:8}}>
              <div className="pen" style={{fontSize:20}}>Explore Bali ✈</div>
              <span style={{fontSize:18}}>✕</span>
            </div>
            <div className="ph video" style={{flex:1, position:'relative'}}>
              <span style={{fontSize:42, color:'#1d1d1d'}}>▶</span>
            </div>
            <div className="row gap-3" style={{marginTop:10, alignItems:'center'}}>
              <span>⏮</span>
              <div className="h-line" style={{flex:1}} />
              <span>⏭</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Annotation x={560} y={130} rotate={-3}>headline w/ painted accent</Annotation>
    <ArrowSquiggle x={500} y={150} />
    <Annotation x={760} y={70} rotate={-2}>auto-rotating reel of destinations</Annotation>
    <ArrowSquiggle x={930} y={90} />
    <Annotation x={20} y={560} rotate={-4}>news/offers card slot — admin editable</Annotation>
    <ArrowSquiggle x={170} y={580} />
  </Frame>
);

// V2 — Centered hero with full-bleed media bg + floating search card
const HeroV2 = () => (
  <Frame label="V2 · Centered hero, big bg, floating search">
    <Nav />
    <div style={{position:'relative', padding:'0', height:'calc(100% - 60px)'}}>
      <div className="ph" style={{position:'absolute', inset:24, fontSize:32}}>full-bleed destination photo</div>
      <div style={{position:'absolute', inset:24, background:'rgba(255,255,255,0.55)'}} />
      <div className="center col" style={{position:'relative', height:'100%', textAlign:'center', padding:'40px 60px'}}>
        <div className="scribble" style={{fontSize:18, color:'#2553e6', marginTop:60}}>— holiday packages —</div>
        <div className="h1pen" style={{fontSize:64, marginTop:8}}>
          The world is closer<br/>than you think.
        </div>
        <div style={{fontFamily:'Kalam', fontSize:18, color:'#333', marginTop:14, maxWidth:520}}>
          Thailand · Bali · Dubai · Singapore · Europe — all from one trusted partner.
        </div>
        {/* search card */}
        <div className="stroke-2 p-4 row gap-3" style={{background:'#fff', marginTop:32, width:780, alignItems:'flex-end'}}>
          {['From','To','Travelers','Dates'].map((f,i)=>(
            <div key={i} className="col gap-2" style={{flex:1}}>
              <div className="small">{f}</div>
              <div className="stroke p-3" style={{height:42}} />
            </div>
          ))}
          <span className="pill accent-fill" style={{padding:'12px 20px'}}>Search ✈</span>
        </div>
        <div className="row gap-4" style={{marginTop:18}}>
          <span className="small">Popular:</span>
          {['Bali 5N','Dubai 4N','Bangkok+Phuket','Singapore+KL','Switzerland'].map(t=>(
            <span key={t} className="pill" style={{fontSize:12, padding:'4px 10px'}}>{t}</span>
          ))}
        </div>
      </div>
    </div>
    <Annotation x={60} y={120} rotate={-3}>hero rotates 4–5 destination photos</Annotation>
    <Annotation x={920} y={580} rotate={4}>quick filter chips</Annotation>
    <ArrowSquiggle x={840} y={600} flip />
  </Frame>
);

// V3 — Split: text left, mosaic of destination polaroids right
const HeroV3 = () => (
  <Frame label="V3 · Polaroid mosaic — sells destinations directly">
    <Nav />
    <div className="row gap-6" style={{padding:'48px 56px', height:'calc(100% - 60px)'}}>
      <div className="col gap-5" style={{flex:'1 1 48%'}}>
        <div className="pill" style={{alignSelf:'flex-start', fontSize:13}}>★ 12,000+ happy travelers</div>
        <div className="h1pen">
          Holiday<br/>
          like you mean it.
        </div>
        <div style={{fontFamily:'Kalam', fontSize:16, color:'#444', maxWidth:420}}>
          Hand-picked packages — visas, hotels, transfers, experiences. We sort everything; you just pack.
        </div>
        <div className="row gap-3">
          <span className="pill accent-fill" style={{fontSize:15, padding:'10px 20px'}}>Browse packages</span>
          <span className="pill" style={{fontSize:15, padding:'10px 20px'}}>Talk to expert</span>
        </div>
        <div className="row gap-6" style={{marginTop:8}}>
          <div><div className="num" style={{fontSize:26}}>50+</div><div className="small">Destinations</div></div>
          <div><div className="num" style={{fontSize:26}}>4.9★</div><div className="small">Avg rating</div></div>
          <div><div className="num" style={{fontSize:26}}>24/7</div><div className="small">On-trip support</div></div>
        </div>
      </div>
      <div style={{flex:'1 1 52%', position:'relative'}}>
        {[
          {label:'Bali', x:0, y:0, r:-6, bg:'#cdf3ef'},
          {label:'Dubai', x:200, y:40, r:4, bg:'#fff2a8'},
          {label:'Thailand', x:80, y:230, r:-3, bg:'#ffd9e0'},
          {label:'Singapore', x:300, y:260, r:6, bg:'#dde6ff'},
          {label:'Swiss', x:420, y:90, r:-4, bg:'#e8e0ff'},
        ].map((c,i)=>(
          <div key={i} className="stroke p-3 col" style={{position:'absolute', left:c.x, top:c.y, width:180, height:200, background:'#fff', transform:`rotate(${c.r}deg)`, boxShadow:'4px 6px 0 rgba(0,0,0,0.08)'}}>
            <div style={{background:c.bg, flex:1, border:'1.5px solid #1d1d1d'}} />
            <div className="pen" style={{textAlign:'center', marginTop:8, fontSize:20}}>{c.label}</div>
          </div>
        ))}
      </div>
    </div>
    <Annotation x={830} y={20} rotate={-3}>polaroids shuffle on hover</Annotation>
    <ArrowSquiggle x={920} y={50} />
  </Frame>
);

// V4 — Editorial / magazine: huge type, tiny media inset
const HeroV4 = () => (
  <Frame label="V4 · Editorial — big type, small inset">
    <Nav />
    <div style={{padding:'40px 56px', position:'relative', height:'calc(100% - 60px)'}}>
      <div className="row between" style={{marginBottom:30}}>
        <div className="scribble" style={{fontSize:18, color:'#2553e6'}}>issue n°06 — summer ’26</div>
        <div className="scribble" style={{fontSize:16, color:'#6b6b6b'}}>Mumbai · Dubai · online</div>
      </div>
      <div style={{fontFamily:'Caveat', fontWeight:700, fontSize:140, lineHeight:0.95, letterSpacing:-3}}>
        Far,<br/>
        but <span className="underline-wave">closer</span><br/>
        than ever.
      </div>
      <div className="row between" style={{marginTop:30}}>
        <div style={{fontFamily:'Kalam', fontSize:16, color:'#444', maxWidth:440}}>
          CityView Tourism crafts holidays across Asia & Europe — for families, couples, and slow-travel seekers from India & the Gulf.
        </div>
        <div className="row gap-3" style={{alignItems:'flex-end'}}>
          <div className="ph" style={{width:160, height:120, position:'relative'}}>video</div>
          <div className="col gap-2" style={{maxWidth:160}}>
            <div className="pen" style={{fontSize:20}}>Bali 6N/7D</div>
            <div className="small">from ₹54,999 — launches 15 June</div>
            <span className="pill" style={{fontSize:12, alignSelf:'flex-start'}}>Read →</span>
          </div>
        </div>
      </div>
    </div>
    <Annotation x={60} y={130} rotate={-3}>type-driven; trust comes from confidence</Annotation>
    <ArrowSquiggle x={50} y={150} flip />
  </Frame>
);

// V5 — Tab-switcher hero (different mode for each package type)
const HeroV5 = () => (
  <Frame label="V5 · Mode switcher — Honeymoon / Family / Group / Solo">
    <Nav />
    <div style={{padding:'30px 56px', position:'relative'}}>
      <div className="row gap-2">
        {['Honeymoon','Family','Group tour','Solo','Visa only'].map((t,i)=>(
          <div key={t} className={'pill ' + (i===1?'fill':'')} style={{fontSize:14}}>{t}</div>
        ))}
      </div>
      <div className="row gap-6" style={{marginTop:24}}>
        <div className="col gap-4" style={{flex:'1 1 55%'}}>
          <div className="h1pen">
            Family holidays,<br/>
            done <span className="underline-wave">stress-free</span>.
          </div>
          <div style={{fontFamily:'Kalam', fontSize:16, color:'#444', maxWidth:480}}>
            Kid-friendly hotels, easy flights, no-fuss visas, on-trip helpline. Pick a route and we plan the rest.
          </div>
          {/* in-line search */}
          <div className="stroke-2 p-3 row gap-3" style={{background:'#fff', alignItems:'center', width:'fit-content'}}>
            <div className="col gap-1" style={{width:140}}><div className="small">Going to</div><div style={{fontFamily:'Kalam', fontWeight:700}}>Bali</div></div>
            <div className="h-line" style={{width:1, height:32, background:'#1d1d1d'}} />
            <div className="col gap-1" style={{width:120}}><div className="small">When</div><div style={{fontFamily:'Kalam'}}>Jul ’26</div></div>
            <div className="h-line" style={{width:1, height:32, background:'#1d1d1d'}} />
            <div className="col gap-1" style={{width:100}}><div className="small">Pax</div><div style={{fontFamily:'Kalam'}}>2A 1C</div></div>
            <span className="pill accent-fill" style={{padding:'10px 18px', marginLeft:8}}>Find →</span>
          </div>
          <div className="row gap-3" style={{marginTop:10}}>
            <div className="ph" style={{width:60, height:60}}>✓</div>
            <div className="col gap-1"><div style={{fontFamily:'Kalam', fontWeight:700, fontSize:14}}>1,400+ family trips planned</div><div className="small">Verified reviews from Mumbai, Dubai, Bengaluru</div></div>
          </div>
        </div>
        <div style={{flex:'1 1 45%', position:'relative'}}>
          <div className="ph" style={{width:'100%', height:380}}>family-on-beach photo</div>
          {/* floating price tag */}
          <div className="stroke-2 p-3" style={{position:'absolute', top:-12, right:-12, background:'#fff2a8', transform:'rotate(6deg)', width:140}}>
            <div className="small">from</div>
            <div className="pen" style={{fontSize:26}}>₹54,999</div>
            <div className="small">all-in · 5N/6D</div>
          </div>
        </div>
      </div>
    </div>
    <Annotation x={60} y={100} rotate={-3}>switch mode → headline + content change</Annotation>
    <ArrowSquiggle x={20} y={110} flip />
  </Frame>
);

/* ─────────── FULL PAGE LAYOUT ─────────── */

const Section = ({title, height=160, children, accent}) => (
  <div className="col gap-3" style={{padding:'24px 56px', borderBottom:'1.5px dashed #c9c4b8', background: accent || 'transparent'}}>
    <div className="row between" style={{alignItems:'baseline'}}>
      <div className="h3pen">{title}</div>
      <div className="scribble" style={{fontSize:14}}>section · admin can reorder ⇅</div>
    </div>
    <div style={{minHeight:height}}>{children}</div>
  </div>
);

const FullPage = () => (
  <Frame w={1280} h={3100} label="Full landing page · scroll structure">
    <Nav />
    {/* HERO (compressed V1) */}
    <Section title="1 · Hero" height={420}>
      <div className="row gap-6">
        <div className="col gap-3" style={{flex:'1 1 55%'}}>
          <div className="h2pen">Embark on a journey of <span className="underline-wave">discovery</span></div>
          <div style={{fontFamily:'Kalam', fontSize:14, color:'#444', maxWidth:420}}>Hand-crafted holiday packages — Asia & Europe.</div>
          <div className="row gap-2"><span className="pill accent-fill" style={{fontSize:13}}>Explore →</span><span className="pill" style={{fontSize:13}}>▶ Watch</span></div>
          <div className="stroke p-3 row gap-2" style={{background:'#fff', width:380, marginTop:14}}>
            <div className="ph" style={{width:60, height:60}}>img</div>
            <div className="col"><div style={{fontFamily:'Kalam', fontWeight:700, fontSize:13}}>Latest: Bali Monsoon Magic launches Jun 15</div><div className="small">21 May 2026</div></div>
          </div>
        </div>
        <div style={{flex:'1 1 45%', position:'relative', minHeight:340}}>
          <div className="ph video" style={{position:'absolute', inset:0, height:340}}><span style={{fontSize:36}}>▶</span></div>
        </div>
      </div>
    </Section>

    {/* SEARCH */}
    <Section title="2 · Trip search / package finder" height={120} accent="#f6f3ea">
      <div className="stroke-2 p-3 row gap-3" style={{background:'#fff', alignItems:'flex-end'}}>
        {['From','Destination','Travelers','Dates','Budget'].map(f=>(
          <div key={f} className="col gap-1" style={{flex:1}}><div className="small">{f}</div><div className="stroke p-2" style={{height:36}}/></div>
        ))}
        <span className="pill accent-fill" style={{padding:'10px 20px'}}>Find packages →</span>
      </div>
      <div className="row gap-2" style={{marginTop:10}}>
        <span className="small">Quick picks:</span>
        {['Bali','Dubai','Thailand','Singapore','Maldives','Swiss','UK','Turkey'].map(t=><span key={t} className="pill" style={{fontSize:12, padding:'4px 10px'}}>{t}</span>)}
      </div>
    </Section>

    {/* FEATURED DESTINATIONS */}
    <Section title="3 · Featured destinations" height={300}>
      <div className="scribble" style={{fontSize:14, marginBottom:8}}>2-row grid · 4 across · admin can pin / reorder</div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14}}>
        {['Bali','Dubai','Thailand','Singapore','Malaysia','Switzerland','Maldives','Turkey'].map(d=>(
          <div key={d} className="stroke col" style={{background:'#fff'}}>
            <div className="ph" style={{height:110}}>{d}</div>
            <div className="p-3 col gap-1">
              <div style={{fontFamily:'Kalam', fontWeight:700}}>{d}</div>
              <div className="small">from ₹49,999 · 5N/6D</div>
              <div className="row between" style={{marginTop:4}}>
                <span className="small">12 packages</span><span className="scribble accent" style={{fontSize:14}}>Explore →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* TRENDING PACKAGES */}
    <Section title="4 · Trending holiday packages" height={260} accent="#f6f3ea">
      <div className="scribble" style={{fontSize:14, marginBottom:8}}>horizontal scroll · large cards with itinerary preview</div>
      <div className="row gap-4">
        {[1,2,3].map(i=>(
          <div key={i} className="stroke col" style={{flex:1, background:'#fff'}}>
            <div className="ph" style={{height:140}}>package {i} cover</div>
            <div className="p-4 col gap-2">
              <div className="row between"><div style={{fontFamily:'Kalam', fontWeight:700, fontSize:16}}>Bali Beach Escape</div><div className="pen accent" style={{fontSize:20}}>₹54,999</div></div>
              <div className="small">5N/6D · flights + hotel + visa + 3 tours</div>
              <div className="row gap-2" style={{marginTop:4}}>
                {['Hotel','Flight','Visa','Tours'].map(t=><span key={t} className="pill" style={{fontSize:11, padding:'3px 8px'}}>{t}</span>)}
              </div>
              <span className="pill accent-fill" style={{alignSelf:'flex-start', fontSize:13, padding:'6px 14px', marginTop:4}}>View itinerary →</span>
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* WHY US */}
    <Section title="5 · Why CityView" height={180}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14}}>
        {[
          ['🛂','Visa handled','We file & follow up — no agent runs'],
          ['💳','Pay in EMIs','0%-interest options for ₹50k+ packages'],
          ['📞','24×7 on-trip','Real humans in IST + GST timezones'],
          ['🛡','Trip insurance','Bundled by default · waivable']
        ].map(([i,t,d])=>(
          <div key={t} className="stroke p-4 col gap-2" style={{background:'#fff'}}>
            <div style={{fontSize:28}}>{i}</div>
            <div style={{fontFamily:'Kalam', fontWeight:700}}>{t}</div>
            <div className="small">{d}</div>
          </div>
        ))}
      </div>
    </Section>

    {/* DEALS STRIP */}
    <Section title="6 · Limited deals · ribbon" height={120} accent="#fff2a8">
      <div className="scribble" style={{fontSize:14, marginBottom:8}}>marquee or grid · admin schedules start/end dates</div>
      <div className="row gap-3">
        {['Dubai 4N flat ₹39,999','Bali Honeymoon –20%','Singapore+KL combo','Swiss 8N early bird'].map(t=>(
          <div key={t} className="stroke p-3" style={{background:'#fff', flex:1, fontFamily:'Kalam'}}>{t} <span className="scribble accent" style={{float:'right'}}>Grab →</span></div>
        ))}
      </div>
    </Section>

    {/* TESTIMONIALS */}
    <Section title="7 · Traveler stories" height={220}>
      <div className="row gap-4">
        {[1,2,3].map(i=>(
          <div key={i} className="stroke p-4 col gap-3" style={{flex:1, background:'#fff'}}>
            <div className="row gap-2"><span className="star">★★★★★</span></div>
            <div style={{fontFamily:'Kalam', fontSize:14, color:'#222'}}>“Their Bali plan was on point — even the driver in Ubud was lovely. We didn’t lift a finger.”</div>
            <div className="row gap-2" style={{alignItems:'center', marginTop:6}}>
              <div className="ph" style={{width:36, height:36, borderRadius:'50%'}}/>
              <div className="col"><div style={{fontFamily:'Kalam', fontWeight:700, fontSize:13}}>Priya & Arjun</div><div className="small">Mumbai · Bali 6N/7D</div></div>
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* BLOG / GUIDES */}
    <Section title="8 · Guides & blog" height={200} accent="#f6f3ea">
      <div className="row gap-4">
        {['Best time to visit Bali','Dubai on a long weekend','Schengen visa — Indian passport guide','Asia vs Europe: where to go first?'].map(t=>(
          <div key={t} className="stroke col" style={{flex:1, background:'#fff'}}>
            <div className="ph" style={{height:90}}>img</div>
            <div className="p-3"><div style={{fontFamily:'Kalam', fontWeight:700, fontSize:14, lineHeight:1.3}}>{t}</div><div className="small" style={{marginTop:4}}>4 min read</div></div>
          </div>
        ))}
      </div>
    </Section>

    {/* NEWSLETTER */}
    <Section title="9 · Newsletter / lead capture" height={120}>
      <div className="stroke-2 p-5 row between" style={{background:'#dde6ff', alignItems:'center'}}>
        <div className="col gap-2">
          <div className="h3pen">Get the next drop in your inbox.</div>
          <div className="small">Monthly · package launches, seasonal deals, visa updates.</div>
        </div>
        <div className="row gap-2">
          <div className="stroke-2 p-3" style={{background:'#fff', width:280}}>your@email.com</div>
          <span className="pill accent-fill" style={{padding:'12px 20px'}}>Subscribe</span>
        </div>
      </div>
    </Section>

    {/* FOOTER */}
    <Section title="10 · Footer" height={200}>
      <div className="row gap-8" style={{alignItems:'flex-start'}}>
        <div className="col gap-2" style={{flex:'1 1 30%'}}>
          <div className="navlogo"><div className="blob"/><span>CityView Tourism</span></div>
          <div className="small">Holiday packages, visa, group tours — serving travelers across India & the Gulf since 2015.</div>
          <div className="row gap-2" style={{marginTop:6}}>
            {['IG','FB','YT','WA'].map(s=><div key={s} className="pill" style={{fontSize:12, padding:'3px 10px'}}>{s}</div>)}
          </div>
        </div>
        {[
          ['Packages',['Bali','Dubai','Thailand','Singapore','Maldives']],
          ['Company',['About','Careers','Press','Contact','Reviews']],
          ['Help',['Visa info','Refunds','FAQs','Insurance','Talk to expert']],
        ].map(([h,items])=>(
          <div key={h} className="col gap-2" style={{flex:'1 1 18%'}}>
            <div style={{fontFamily:'Kalam', fontWeight:700}}>{h}</div>
            {items.map(i=><div key={i} className="small">{i}</div>)}
          </div>
        ))}
      </div>
    </Section>
  </Frame>
);

/* ─────────── CANVAS ─────────── */

function App() {
  return (
    <DesignCanvas>
      <DCSection id="heroes" title="Hero variations" subtitle="The section you referenced — 5 different takes">
        <DCArtboard id="h1" label="V1 · Reference match" width={1280} height={820}><HeroV1/></DCArtboard>
        <DCArtboard id="h2" label="V2 · Big bg + search" width={1280} height={820}><HeroV2/></DCArtboard>
        <DCArtboard id="h3" label="V3 · Polaroid mosaic" width={1280} height={820}><HeroV3/></DCArtboard>
        <DCArtboard id="h4" label="V4 · Editorial" width={1280} height={820}><HeroV4/></DCArtboard>
        <DCArtboard id="h5" label="V5 · Mode switcher" width={1280} height={820}><HeroV5/></DCArtboard>
      </DCSection>
      <DCSection id="full" title="Full page layout" subtitle="Modular sections — admin-controllable order">
        <DCArtboard id="full" label="Landing page · scroll structure" width={1280} height={3100}><FullPage/></DCArtboard>
      </DCSection>
      <DCPostIt top={80} left={60} rotate={-3}>
        Pick a hero direction →{"\n"}I'll build the hi-fi landing using it.{"\n"}V1 matches your reference closest.
      </DCPostIt>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
