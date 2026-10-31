import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import { Music2, Volume2, VolumeX, Heart, Home, Image, Mail, Mic2, Gift, ArrowLeft, ArrowRight, Play, Pause, Camera, Sparkles, LockKeyhole } from 'lucide-react'
import './style.css'

const pages = ['code', 'countdown', 'memories', 'chapters', 'letter', 'voice', 'surprise']
const navItems = [
  ['memories', 'Memories', Image], ['letter', 'Letter', Mail],
  ['voice', 'Voice', Mic2], ['surprise', 'Surprise', Gift]
]
const photos = [
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85'
]

function App() {
  const [page, setPage] = useState('code')
  const [unlocked, setUnlocked] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [music, setMusic] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [answer, setAnswer] = useState('')
  const [chapter, setChapter] = useState(0)

  const go = (p) => { setPage(p); document.getElementById(p)?.scrollIntoView({behavior:'smooth', block:'start'}) }
  const submitCode = (e) => { e.preventDefault(); if (code.trim() === '14321') { setError(false); setUnlocked(true); setPage('countdown'); setTimeout(() => document.getElementById('countdown')?.scrollIntoView({behavior:'smooth'}), 120) } else setError(true) }
  const startStory = () => go('memories')

  return <main className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <div className="petal petal-a">✿</div><div className="petal petal-b">✧</div><div className="petal petal-c">❀</div>
    {unlocked && <header className="topbar">
      <button className="brand-mark" onClick={() => go('chapters')} aria-label="Home"><Heart size={17}/></button>
      <nav>{navItems.map(([id,label,Icon]) => <button key={id} className={page===id?'active':''} onClick={()=>go(id)}><Icon size={13}/><span>{label}</span></button>)}</nav>
      <button className="music-toggle" onClick={()=>setMusic(!music)} aria-label="Toggle music">{music?<Volume2 size={17}/>:<Music2 size={17}/>}</button>
    </header>}

    <AnimatePresence mode="wait">
      {!unlocked && <Screen key="code" id="code"><section className="gate-screen">
        <div className="gate-copy">
          <p className="eyebrow">A STORY MADE JUST FOR YOU</p>
          <h1>A little<br/><em>Letter for you</em></h1>
          <div className="ornament">— ❦ —</div>
          <p className="subtitle">Someone has prepared<br/>a little story just for you.</p>
          <form className="code-form" onSubmit={submitCode}>
            <label htmlFor="secret">Enter the secret code</label>
            <div className="code-inputs"><input id="secret" value={code} onChange={e=>{setCode(e.target.value);setError(false)}} placeholder="•••••" maxLength="5" inputMode="numeric" /></div>
            {error && <small className="error">That isn't quite the right key. Try again, sweetheart.</small>}
            <button className="primary-btn" type="submit">Open My Letter <ArrowRight size={16}/></button>
          </form>
          <span className="tiny-note"><LockKeyhole size={11}/> A little secret between us</span>
        </div>
      </section></Screen>}

      {unlocked && <Screen key="countdown" id="countdown"><section className="countdown-screen">
        <div className="envelope-scene">
          <div className="butterfly">🦋</div>
          <div className="envelope"><div className="envelope-flap"/><div className="letter-preview"><span>Are you ready?</span><small>Our story is about to begin...</small></div><div className="seal">♥</div></div>
          <div className="countdown-numbers"><span>3</span><span>2</span><span>1</span></div>
        </div>
        <p className="eyebrow">A MOMENT JUST FOR US</p><h2>Take a deep breath, my love.</h2>
        <button className="primary-btn" onClick={startStory}>Begin our story <ArrowRight size={16}/></button>
      </section></Screen>}

      {unlocked && <Screen key="memories" id="memories"><section className="content-page memories-page">
        <div className="section-heading"><p className="eyebrow">A MOVIE OF US</p><h2>Our <em>Memories</em></h2><p>Every little moment has become my favourite story.</p></div>
        <div className="memory-layout">
          <div className="film-card"><div className="film-top">✦ OUR LITTLE FILM ✦</div><div className="film-image" style={{backgroundImage:`url(${photos[0]})`}}><button className="play-button" onClick={()=>setPlaying(!playing)}>{playing?<Pause/>:<Play fill="currentColor"/>}</button><span className="film-caption">A thousand little moments, one beautiful us.</span></div><div className="film-controls"><span>{playing?'PLAYING':'00:24'}</span><div className="progress"><i/></div><span>01:48</span></div></div>
          <div className="polaroids"><figure className="polaroid tilt-left"><img src={photos[1]}/><figcaption>the little things ♡</figcaption></figure><figure className="polaroid tilt-right"><img src={photos[2]}/><figcaption>my favourite person</figcaption></figure><div className="quote-card">“Every moment with you feels like a beautiful dream.”</div></div>
        </div>
        <button className="text-link" onClick={()=>go('chapters')}>Continue our story <ArrowRight size={15}/></button>
      </section></Screen>}

      {unlocked && <Screen key="chapters" id="chapters"><section className="content-page chapters-page">
        <div className="section-heading"><p className="eyebrow">A GARDEN OF LITTLE THINGS</p><h2>Our Little <em>Chapters</em></h2><p>Click a little flower to open our memories.</p></div>
        <div className="chapter-grid">
          {[
            [Camera,'01','Our Memories','The moments I keep close.','memories'],
            [Mail,'02','A Letter for You','A few words from my heart.','letter'],
            [Mic2,'03','A Voice from My Heart','Something I want you to hear.','voice'],
            [Gift,'04','One Last Surprise','A question just for you.','surprise']
          ].map(([Icon,num,title,desc,target])=><button className="chapter-card" key={num} onClick={()=>go(target)}><span className="chapter-flower">✿</span><span className="chapter-icon"><Icon size={23}/></span><small>CHAPTER {num}</small><strong>{title}</strong><p>{desc}</p><span className="card-arrow">↗</span></button>)}
        </div>
        <div className="chapter-footer">made with love, just for you <Heart size={12} fill="currentColor"/></div>
      </section></Screen>}

      {unlocked && <Screen key="letter" id="letter"><section className="letter-page">
        <div className="paper">
          <div className="paper-flower">❀</div><p className="eyebrow">A LETTER FROM MY HEART</p>
          <h2>My dearest,</h2>
          <p>There are so many things I want to tell you, but sometimes words feel too small. Thank you for being here, for every laugh, every little moment, and every memory we keep making.</p>
          <p>You make ordinary days feel a little more magical. I hope you always remember how special you are and how grateful I am to have you in my life.</p>
          <p>Whatever chapters are waiting for us, I hope we keep choosing kindness, laughter, and each other.</p>
          <p className="signoff">With all my love, <span>♥</span></p>
          <div className="wax-seal">A</div>
        </div>
        <button className="text-link" onClick={()=>go('voice')}>There's something I want you to hear <ArrowRight size={15}/></button>
      </section></Screen>}

      {unlocked && <Screen key="voice" id="voice"><section className="voice-page">
        <div className="voice-card">
          <p className="eyebrow">A LITTLE VOICE, JUST FOR YOU</p><h2>A Voice<br/><em>from My Heart</em></h2>
          <div className="cassette"><div className="cassette-label"><span>FOR YOU, ALWAYS</span><div className="cassette-reels"><i/><i/></div><small>side A · a little love note</small></div><div className="cassette-bottom">♡ &nbsp; PLAY ME &nbsp; ♡</div></div>
          <div className="audio-controls"><span>00:00</span><div className="audio-track"><i/></div><span>01:24</span></div>
          <button className="round-play" onClick={()=>setPlaying(!playing)}>{playing?<Pause size={19}/>:<Play size={19} fill="currentColor"/>}</button>
          <p className="voice-hint">{playing?'A little message is playing…':'Press play and listen to my heart.'}</p>
        </div>
      </section></Screen>}

      {unlocked && <Screen key="surprise" id="surprise"><section className="surprise-page">
        <p className="eyebrow">THERE IS ONE LAST THING I WANT TO ASK YOU...</p><h2>One Last <em>Surprise</em></h2>
        <div className="ring-box"><div className="ring-glow"/><div className="ring">◇</div><div className="ring-stone">✦</div></div>
        <h3>Will you be my forever?</h3>
        {answer ? <div className="answer-message">{answer==='yes'?'You just made my whole world sparkle. ♡':'That’s okay. I’ll always treasure our story. ♡'}</div> : <div className="answer-buttons"><button className="primary-btn" onClick={()=>setAnswer('yes')}>Yes, Forever ♡</button><button className="soft-btn" onClick={()=>setAnswer('time')}>I need more time</button></div>}
        <button className="text-link back-link" onClick={()=>go('chapters')}><ArrowLeft size={14}/> Back to our chapters</button>
      </section></Screen>}
    </AnimatePresence>
    {unlocked && <footer className="site-footer"><span>✦</span> A LITTLE LETTER FOR YOU <span>✦</span></footer>}
  </main>
}

function Screen({children,id}) {
  return <motion.div id={id} className="screen" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.45,ease:'easeOut'}}>{children}</motion.div>
}

createRoot(document.getElementById('root')).render(<App/>)
