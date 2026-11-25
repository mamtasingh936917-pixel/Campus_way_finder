import { useEffect, useMemo, useState, type ReactNode } from 'react'

type Screen = 'welcome' | 'home' | 'floors' | 'labs' | 'rules' | 'help'
type SpaceFilter = 'all' | 'labs' | 'classes'
type UserType = 'Student / Faculty' | 'Visitor'
type IconName = 'home' | 'floors' | 'labs' | 'rules' | 'help' | 'moon' | 'sun' | 'arrow' | 'search' | 'pin' | 'chevron' | 'water' | 'clock' | 'phone' | 'mail'

const screens: { id: Screen; label: string; eyebrow: string }[] = [
  { id: 'welcome', label: 'Welcome', eyebrow: 'Start here' },
  { id: 'home', label: 'Home', eyebrow: 'Choose a block' },
  { id: 'floors', label: 'Floor Guide', eyebrow: 'Inside Block 34' },
  { id: 'labs', label: 'Labs & Classes', eyebrow: 'Find a room' },
  { id: 'rules', label: 'Campus Rules', eyebrow: 'Know before you go' },
  { id: 'help', label: 'Help & Contact', eyebrow: 'Get assistance' },
]

const navItems = screens.slice(1).map((item) => ({
  ...item,
  label: item.id === 'floors' ? 'Floors' : item.id === 'labs' ? 'Labs' : item.id === 'rules' ? 'Rules' : item.id === 'help' ? 'Help' : 'Home',
}))

const floors = [
  { number: 6, use: 'Classrooms', rooms: '601–612', detail: 'Lecture rooms & seminar hall' },
  { number: 5, use: 'Classrooms', rooms: '501–514', detail: 'Lecture rooms & faculty bay' },
  { number: 4, use: 'Classrooms', rooms: '401–416', detail: 'Lecture rooms & tutorial rooms' },
  { number: 3, use: 'Computer Labs', rooms: '301–308', detail: 'Labs 301–306 • Room 304' },
  { number: 2, use: 'Science Labs', rooms: '201–209', detail: 'Physics & electronics labs' },
  { number: 1, use: 'Labs & Services', rooms: '101–112', detail: 'Labs, reception & water point' },
]

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></>,
    floors: <><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="m4 12 8 4 8-4" /><path d="m4 17 8 4 8-4" /></>,
    labs: <><path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3" /><path d="M7 14h10" /><path d="M8 3h8" /></>,
    rules: <><path d="M6 3h12v18H6z" /><path d="m9 8 1.3 1.3L13 6.5" /><path d="M14 9h2" /><path d="m9 14 1.3 1.3L13 12.5" /><path d="M14 15h2" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.7 9a2.4 2.4 0 1 1 3.1 2.3c-.8.3-.8.9-.8 1.7" /><path d="M12 17h.01" /></>,
    moon: <path d="M20.5 14.5A8 8 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    chevron: <path d="m9 6 6 6-6 6" />,
    water: <path d="M12 3S6 10 6 15a6 6 0 0 0 12 0c0-5-6-12-6-12Z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    phone: <path d="M8 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-3l-4-1-2 3c-4-1.5-7.5-5-9-9l3-2-1-4Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function ThemeButton({ dark, onClick }: { dark: boolean; onClick: () => void }) {
  return <button className="icon-button" onClick={onClick} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}><Icon name={dark ? 'sun' : 'moon'} /></button>
}

function BottomNav({ current, navigate }: { current: Screen; navigate: (screen: Screen) => void }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navItems.map((item) => (
        <button key={item.id} className={current === item.id ? 'active' : ''} onClick={() => navigate(item.id)}>
          <Icon name={item.id as IconName} size={19} /><span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

function BackHome({ navigate }: { navigate: (screen: Screen) => void }) {
  return <button className="back-home" onClick={() => navigate('home')}>Back to Home <Icon name="arrow" size={19} /></button>
}

function ScreenHeader({ kicker, title, dark, toggleTheme }: { kicker: string; title: string; dark: boolean; toggleTheme: () => void }) {
  return <header className="screen-header"><div><span>{kicker}</span><h1>{title}</h1></div><ThemeButton dark={dark} onClick={toggleTheme} /></header>
}

function Welcome({ choose, dark, toggleTheme }: { choose: (type: UserType) => void; dark: boolean; toggleTheme: () => void }) {
  return (
    <section className="welcome-screen">
      <img src="/lpu-campus.png" alt="LPU campus building" />
      <div className="welcome-overlay" />
      <div className="welcome-theme"><ThemeButton dark={dark} onClick={toggleTheme} /></div>
      <div className="welcome-content">
        <div className="brand-mark">LPU <span>WAYFINDER</span></div>
        <div className="welcome-copy"><p>Campus navigation made simple</p><h1>Welcome<br />to LPU</h1><span>Where would you like to begin?</span></div>
        <div className="welcome-actions">
          <button onClick={() => choose('Student / Faculty')}><span><strong>Student / Faculty</strong><small>I study or work here</small></span><Icon name="arrow" /></button>
          <button onClick={() => choose('Visitor')}><span><strong>Visitor</strong><small>Parent, guest or delivery</small></span><Icon name="arrow" /></button>
        </div>
      </div>
    </section>
  )
}

function Home({ userType, changeType, navigate, dark, toggleTheme }: { userType: UserType; changeType: () => void; navigate: (s: Screen) => void; dark: boolean; toggleTheme: () => void }) {
  const [selected, setSelected] = useState(34)
  const summary = selected === 34
    ? '6 floors. Labs on floors 1 to 3, classrooms on floors 4 to 6.'
    : selected === 33
      ? 'This is a lab block. Its room details have not been added yet.'
      : 'This block has no labs. Its room details have not been added yet.'

  return (
    <section className="app-screen">
      <div className="hero-banner">
        <img src="/lpu-campus.png" alt="LPU campus" />
        <div className="hero-shade" />
        <div className="hero-top"><div className="mini-logo">LPU</div><ThemeButton dark={dark} onClick={toggleTheme} /></div>
        <div className="hero-title"><span>Campus guide</span><strong>Find your way,<br />without the guesswork.</strong></div>
      </div>
      <main className="screen-body home-body">
        <div className="user-row"><span>{userType}</span><button onClick={changeType}>Change user type</button></div>
        <h1>Select a building</h1>
        <p className="lede">Choose your block to see floors, labs and classrooms.</p>
        <div className="building-grid">
          {Array.from({ length: 10 }, (_, index) => index + 25).map((block) => (
            <button key={block} onClick={() => setSelected(block)} className={selected === block ? 'selected' : ''}>
              <span>BLOCK</span><strong>{block}</strong>{block >= 33 && <em>LABS</em>}
            </button>
          ))}
        </div>
        <div className="summary-card">
          <div className="summary-icon"><Icon name="pin" /></div>
          <div><span>Your selection</span><h2>Block {selected}</h2><p>{summary}</p></div>
          <button disabled={selected !== 34} onClick={() => selected === 34 && navigate('floors')}>
            {selected === 34 ? `Open Block ${selected}` : `Block ${selected} details coming soon`}
            <Icon name="arrow" size={18} />
          </button>
        </div>
        {userType === 'Visitor' && <button className="visitor-card" onClick={() => navigate('help')}><span><small>VISITOR GUIDE</small><strong>Visiting? Three ways to find your block</strong></span><Icon name="chevron" /></button>}
      </main>
    </section>
  )
}

function FloorGuide({ navigate, openSpaces, dark, toggleTheme }: { navigate: (s: Screen) => void; openSpaces: (filter: SpaceFilter) => void; dark: boolean; toggleTheme: () => void }) {
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState<number | null>(null)
  const [searchedTerm, setSearchedTerm] = useState<string | null>(null)

  function runSearch(value = query) {
    const term = value.trim().toLowerCase()
    if (!term) {
      setHighlight(null)
      setSearchedTerm(null)
      return
    }
    let floor: number | null = null
    if (/^[1-6]\d{2}$/.test(term)) floor = Number(term[0])
    else if (term.includes('seminar')) floor = 6
    else if (term.includes('faculty') || term.includes('lecture')) floor = 5
    else if (term.includes('class') || term.includes('tutorial')) floor = 4
    else if (term.includes('computing') || term.includes('lab')) floor = 3
    else if (term.includes('physics') || term.includes('electronics') || term.includes('science')) floor = 2
    else if (term.includes('water') || term.includes('reception')) floor = 1
    setHighlight(floor)
    setSearchedTerm(value.trim())
    if (floor) setTimeout(() => document.getElementById(`floor-${floor}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 20)
  }

  return (
    <section className="app-screen">
      <main className="screen-body">
        <ScreenHeader kicker="Floor guide" title="Inside Block 34" dark={dark} toggleTheme={toggleTheme} />
        <p className="lede">Find a room, lab or facility by floor.</p>
        <div className="search-box"><Icon name="search" /><input aria-label="Search rooms" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && runSearch()} placeholder="Room number, lab, class or water" /><button onClick={() => runSearch()}>Find</button></div>
        <div className="chips">{['304', 'Labs', 'Classes', 'Water'].map((chip) => <button key={chip} onClick={() => { setQuery(chip); runSearch(chip) }}>{chip}</button>)}</div>
        {highlight && <div className="result-note">Best match: Floor {highlight}</div>}
        {searchedTerm && !highlight && <div className="result-note">No matching floor found for “{searchedTerm}”.</div>}
        <div className="floor-stack">
          {floors.map((floor) => (
            <article id={`floor-${floor.number}`} className={highlight === floor.number ? 'floor-card highlight' : 'floor-card'} key={floor.number}>
              <div className="floor-number"><span>F</span>{floor.number}</div>
              <div className="floor-info"><span>{floor.use}</span><h2>{floor.rooms}</h2><p>{floor.detail}</p></div>
              <button aria-label={`View floor ${floor.number}`} onClick={() => openSpaces(floor.number <= 3 ? 'labs' : 'classes')}><Icon name="chevron" /></button>
            </article>
          ))}
        </div>
        <BackHome navigate={navigate} />
      </main>
    </section>
  )
}

function Labs({ navigate, filter, setFilter, dark, toggleTheme }: { navigate: (s: Screen) => void; filter: SpaceFilter; setFilter: (f: SpaceFilter) => void; dark: boolean; toggleTheme: () => void }) {
  const spaces: { room: string; name: string; meta: string; status: string; type: Exclude<SpaceFilter, 'all'> }[] = [
    { room: '304', name: 'Advanced Computing Lab', meta: 'Floor 3 • 42 systems', status: 'Open now', type: 'labs' },
    { room: '302', name: 'Programming Lab', meta: 'Floor 3 • 36 systems', status: 'Class in session', type: 'labs' },
    { room: '208', name: 'Electronics Lab', meta: 'Floor 2 • East wing', status: 'Open now', type: 'labs' },
    { room: '105', name: 'Project Lab', meta: 'Floor 1 • Near reception', status: 'Closes at 6 PM', type: 'labs' },
    { room: '601', name: 'Seminar Hall', meta: 'Floor 6 • 120 seats', status: 'Available', type: 'classes' },
    { room: '504', name: 'Lecture Room 504', meta: 'Floor 5 • Near faculty bay', status: 'Class in session', type: 'classes' },
    { room: '402', name: 'Tutorial Room 402', meta: 'Floor 4 • West wing', status: 'Open now', type: 'classes' },
  ]
  const visibleSpaces = filter === 'all' ? spaces : spaces.filter((space) => space.type === filter)
  const filterTabs: { id: SpaceFilter; label: string }[] = [
    { id: 'all', label: 'All spaces' },
    { id: 'labs', label: 'Labs' },
    { id: 'classes', label: 'Classes' },
  ]

  return (
    <section className="app-screen">
      <div className="labs-banner"><img src="/lpu-campus.png" alt="LPU campus building" /><div className="hero-shade" /><div className="hero-top"><div className="mini-logo">LPU</div><ThemeButton dark={dark} onClick={toggleTheme} /></div><div><span>Block 34 directory</span><h1>Labs & Classes</h1></div></div>
      <main className="screen-body labs-body">
        <p className="lede">Popular learning spaces in Block 34.</p>
        <div className="filter-row">
          {filterTabs.map((tab) => (
            <button key={tab.id} className={filter === tab.id ? 'active' : ''} onClick={() => setFilter(tab.id)}>{tab.label}</button>
          ))}
        </div>
        <div className="space-list">{visibleSpaces.map((space) => <article className="space-card" key={space.room}><div className="room-badge">{space.room}</div><div><h2>{space.name}</h2><p>{space.meta}</p><span>{space.status}</span></div></article>)}</div>
        <div className="direction-card"><Icon name="pin" /><div><strong>How rooms are numbered</strong><p>The first digit is the floor. Room 304 is on Floor 3.</p></div></div>
        <BackHome navigate={navigate} />
      </main>
    </section>
  )
}

function Rules({ navigate, dark, toggleTheme }: { navigate: (s: Screen) => void; dark: boolean; toggleTheme: () => void }) {
  const rules = [
    ['01', 'Carry your LPU ID', 'Keep your university ID visible while inside academic blocks.'],
    ['02', 'Keep corridors clear', 'Use designated waiting areas between classes and avoid blocking stairways.'],
    ['03', 'Labs need permission', 'Enter laboratories only during your assigned slot or with faculty approval.'],
    ['04', 'Respect quiet zones', 'Keep calls and conversations low near classrooms, labs and the library.'],
    ['05', 'Use marked exits', 'Follow green exit signs and staff instructions during an emergency.'],
  ]
  return <section className="app-screen"><main className="screen-body"><ScreenHeader kicker="Campus etiquette" title="Rules & Safety" dark={dark} toggleTheme={toggleTheme} /><p className="lede">A few essentials for a safe, welcoming campus.</p><div className="rules-list">{rules.map(([num, title, copy]) => <article key={num}><span>{num}</span><div><h2>{title}</h2><p>{copy}</p></div></article>)}</div><div className="emergency-card"><small>IN AN EMERGENCY</small><strong>Call Campus Security</strong><a href="tel:01824517555">01824 517 555 <Icon name="phone" /></a></div><BackHome navigate={navigate} /></main></section>
}

function Help({ navigate, dark, toggleTheme }: { navigate: (s: Screen) => void; dark: boolean; toggleTheme: () => void }) {
  const ways = [
    { n: '1', title: 'Ask at the main gate', copy: 'Share the department or person you are visiting. Security will direct you.' },
    { n: '2', title: 'Use block signboards', copy: 'Large green signs along the main campus roads show block ranges.' },
    { n: '3', title: 'Call the help desk', copy: 'The campus team can guide you from your current landmark.' },
  ]
  return <section className="app-screen"><main className="screen-body"><ScreenHeader kicker="We’re here to help" title="Help & Contact" dark={dark} toggleTheme={toggleTheme} /><p className="lede">Three easy ways to reach the right place.</p><div className="help-ways">{ways.map((way) => <article key={way.n}><span>{way.n}</span><div><h2>{way.title}</h2><p>{way.copy}</p></div></article>)}</div><h3 className="section-label">QUICK CONTACTS</h3><div className="contact-list"><a href="tel:01824517555"><span><Icon name="phone" /></span><div><small>Campus help desk</small><strong>01824 517 555</strong></div><Icon name="chevron" /></a><a href="mailto:info@lpu.co.in"><span><Icon name="mail" /></span><div><small>Email support</small><strong>info@lpu.co.in</strong></div><Icon name="chevron" /></a></div><div className="hours"><Icon name="clock" /><div><strong>Help desk hours</strong><p>Monday–Saturday, 8:00 AM–8:00 PM</p></div></div><BackHome navigate={navigate} /></main></section>
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [spaceFilter, setSpaceFilter] = useState<SpaceFilter>('all')
  const [userType, setUserType] = useState<UserType>(() => (localStorage.getItem('lpu-user-type') as UserType) || 'Student / Faculty')
  const [dark, setDark] = useState(() => localStorage.getItem('lpu-theme') === 'dark')

  useEffect(() => {
    localStorage.setItem('lpu-theme', dark ? 'dark' : 'light')
  }, [dark])

  const props = useMemo(() => ({ navigate: setScreen, dark, toggleTheme: () => setDark((value) => !value) }), [dark])
  function choose(type: UserType) {
    setUserType(type)
    localStorage.setItem('lpu-user-type', type)
    setScreen('home')
  }
  function openSpaces(filter: SpaceFilter) {
    setSpaceFilter(filter)
    setScreen('labs')
  }
  const content = screen === 'welcome' ? <Welcome choose={choose} dark={dark} toggleTheme={props.toggleTheme} />
    : screen === 'home' ? <Home {...props} userType={userType} changeType={() => setScreen('welcome')} />
      : screen === 'floors' ? <FloorGuide {...props} openSpaces={openSpaces} />
        : screen === 'labs' ? <Labs {...props} filter={spaceFilter} setFilter={setSpaceFilter} />
          : screen === 'rules' ? <Rules {...props} />
            : <Help {...props} />

  return (
    <div className={dark ? 'prototype dark' : 'prototype'}>
      <aside className="screen-picker">
        <div className="picker-brand"><span>LPU</span><div><strong>Campus Wayfinder</strong><small>Interactive prototype</small></div></div>
        <div className="picker-label">SCREENS</div>
        <div className="picker-list">{screens.map((item, index) => <button key={item.id} className={screen === item.id ? 'active' : ''} onClick={() => setScreen(item.id)}><span>0{index + 1}</span><div><strong>{item.label}</strong><small>{item.eyebrow}</small></div><Icon name="chevron" size={17} /></button>)}</div>
        <div className="picker-tip"><Icon name="help" /><span><strong>Prototype tip</strong><small>Use this list to jump between screens.</small></span></div>
      </aside>
      <div className="phone-shell">
        <div className="phone-speaker" />
        <div className="phone-viewport">
          {content}
          {screen !== 'welcome' && <BottomNav current={screen} navigate={setScreen} />}
        </div>
      </div>
    </div>
  )
}
