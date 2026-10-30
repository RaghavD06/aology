import { useEffect, useRef, useState } from 'react'
import { photo, notes, reminders, apologies, opening, apology, ending } from './content'
import './App.css'

function Flower({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 160 240" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.2"><path d="M79 237C100 174 57 128 82 59M82 169C125 166 137 137 137 137C101 129 87 150 82 169ZM81 201C42 190 27 160 27 160C67 159 79 182 81 201ZM78 115C38 105 27 77 27 77C62 76 80 98 78 115Z"/><path d="M82 62C29 77 34 35 64 43C28 12 69 0 82 34C94-2 129 20 102 43C141 38 132 78 97 64C112 100 67 102 82 62Z"/><circle cx="88" cy="50" r="10"/></g></svg>
}
function App() {
  const [opened, setOpened] = useState(false)
  const [letter, setLetter] = useState<string[] | null>(null)
  const [hug, setHug] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (letter) dialog.current?.showModal() }, [letter])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return <>
    <a className="skip" href="#begin">Skip to the letter</a>
    <header><a className="wordmark" href="#">for you, Mom<span> ♡</span></a><span className="header-note">A LITTLE LETTER. A LOT OF LOVE.</span><a className="header-link" href="#memory">Our little memory ↗</a></header>
    <main>
      <section className="hero" id="begin">
        <div className="hero-top"><span className="eyebrow">FROM YOUR LITTLE BOY, WITH LOVE</span><span className="tiny-star">✧</span></div>
        <h1>To the woman who has<br/> loved me through <em>everything.</em></h1>
        <p className="hero-sub">There's something I should have told you a little more often.</p>
        <div className={`envelope-scene ${opened ? 'is-open' : ''}`}>
          <span className="handwritten envelope-aside">a little piece<br/>of my heart ↘</span>
          <button className="envelope" aria-expanded={opened} aria-controls="opening-letter" onClick={() => setOpened(!opened)} aria-label={opened ? 'Close my letter to Mom' : 'Open my letter to Mom'}><span className="letter-peek">Hi Mom,</span><span className="envelope-flap"/><span className="envelope-front"/><span className="seal">♡</span><span className="envelope-label">For my favourite person.</span></button>
          <Flower className="hero-flower"/>
        </div>
        <p className="tap-hint">{opened ? 'A few words, just for you' : 'TAP THE SEAL TO OPEN YOUR LETTER'}</p>
        <div id="opening-letter" className="opening-letter" hidden={!opened}><span className="handwritten">Hi Mom,</span>{opening.map(p => <p key={p}>{p}</p>)}<a className="pill" href="#notes">There's more I want to tell you <span>↓</span></a></div>
        <div className="hero-bottom"><span>A KEEPSAKE, JUST FOR YOU</span><span>made with all my heart ♡</span><a href="#notes" aria-label="Continue to the notes">↓</a></div>
      </section>
      <section className="notes-section section" id="notes"><div className="section-heading reveal"><span className="eyebrow">01 / THE LITTLE THINGS, THE EVERYTHING</span><h2>If I could tell you<br/><em>a thousand things...</em></h2><p>I'd start with these. A little note for every feeling I forget to say out loud.</p><span className="handwritten small-script">Pick a note. There's love inside.</span></div><div className="notes-grid">{notes.map(([title, body], i) => <button className={`note note-${i % 4} reveal`} key={title} onClick={() => setLetter([title, body])}><span className="note-number">{String(i + 1).padStart(2, '0')}</span><span className="note-title">{title}</span><span className="note-bottom">OPEN THIS LITTLE THOUGHT <span>↗</span></span></button>)}</div></section>
      <section className="unsaid section"><Flower className="unsaid-flower"/><div className="section-heading reveal"><span className="eyebrow">02 / THE WORDS I OWE YOU</span><h2>Things I never<br/><em>say enough.</em></h2></div><div className="apology-lines">{apologies.map(p => <p className="reveal" key={p}>{p}</p>)}</div><div className="unsaid-ending reveal"><p>But Mom, please never mistake my occasional immaturity for a lack of love.</p><p className="handwritten">I might not always get things right,<br/>but loving you will never be something I get wrong.</p></div></section>
      <section className="memory section" id="memory"><div className="memory-photo reveal"><span className="tape"/><figure className="polaroid"><img src={photo} alt="A childhood photograph of me sitting with my mom" width="487" height="865" loading="lazy"/><figcaption className="handwritten">My whole world, in one photograph. ♡</figcaption></figure><span className="memory-date">SOME THINGS NEVER CHANGE.</span></div><div className="memory-copy reveal"><span className="eyebrow">03 / BEFORE I GREW SO TALL</span><h2>Look how<br/><em>little I was...</em></h2><p>Somewhere along the way, I grew taller, got busier, started having opinions about everything, and probably became a little harder to handle.</p><p>But do you know what?</p><h3 className="handwritten">I'm still that little boy.</h3><p>The little boy who needed you to hold his hand, who looked for you whenever something went wrong, who felt like the entire world was okay when you were around.</p><p>I might not ask you to hold me anymore, but a part of me will always need my mom.</p><blockquote>No matter how old I get, I'll always be your little boy. And I'll always be grateful that I get to be your son.</blockquote></div></section>
      <section className="reminders section"><div className="section-heading reveal"><span className="eyebrow">04 / KEEP THESE CLOSE</span><h2>Little reminders,<br/><em>whenever you need them.</em></h2><p>Six letters. For the days when you need a little extra love.</p></div><div className="reminder-grid">{reminders.map(([title, body], i) => <button className="reminder reveal" key={title} onClick={() => setLetter([`Open when ${title}.`, body])}><span className="mini-heart">♡</span><span className="eyebrow">OPEN WHEN</span><span className="reminder-title">{title}</span><span className="reminder-number">LETTER No. 0{i + 1} ↗</span></button>)}</div></section>
      <section className="from-heart section"><div className="section-heading reveal"><span className="eyebrow">05 / NO EXCUSES. JUST MY HEART.</span><h2>One thing I want<br/><em>you to know...</em></h2></div><article className="personal-letter reveal"><span className="handwritten">Mom,</span>{apology.map(p => <p key={p}>{p}</p>)}<p className="handwritten signature">Your little boy ♡</p></article></section>
      <section className="finale section"><span className="floating-heart heart-one" aria-hidden="true">♡</span><span className="floating-heart heart-two" aria-hidden="true">♡</span><span className="eyebrow reveal">06 / ALWAYS. IN EVERY WAY.</span><figure className="final-photo reveal"><img src={photo} alt="Mom and me, a memory to keep forever" width="487" height="865" loading="lazy"/></figure><div className="ending-lines">{ending.map(p => <p className="reveal" key={p}>{p}</p>)}</div><p className="always reveal">I will <em>always</em> be your little boy.</p><h2 className="reveal">Thank you for<br/>being my <em>Mom.</em></h2><p className="handwritten reveal">I love you endlessly. ♡</p><p className="forever">Forever your little boy.</p><button className={`pill hug-button ${hug ? 'hugged' : ''}`} onClick={() => setHug(!hug)} aria-pressed={hug}> {hug ? 'Another little hug? ♡' : 'One last hug? ♡'}</button><div className="hug-message" role="status">{hug && <><span className="hug-heart" aria-hidden="true">♡</span><p>If I could, I'd give you the biggest hug in the world right now.</p></>}</div></section>
    </main><footer><a className="wordmark" href="#">for you, Mom ♡</a><span>WITH LOVE, TODAY & ALWAYS.</span><a href="#begin">Read it all again ↑</a></footer>
    <dialog aria-labelledby="letter-title" ref={dialog} onClose={() => setLetter(null)} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close() }}><button className="close-dialog" onClick={() => dialog.current?.close()} aria-label="Close letter">×</button>{letter && <><span className="eyebrow">A LITTLE PIECE OF MY HEART</span><h2 id="letter-title">{letter[0]}</h2><p>{letter[1]}</p><span className="handwritten">With love, your little boy ♡</span></>}</dialog>
  </>
}
export default App

