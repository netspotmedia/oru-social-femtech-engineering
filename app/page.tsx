'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  HeartPulse,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

const categories = [
  { label: 'Menstrual health', count: '12 resources', icon: HeartPulse, tone: 'rose' },
  { label: 'Pregnancy & maternal wellbeing', count: '8 resources', icon: Sparkles, tone: 'peach' },
  { label: 'Fertility & IVF', count: '6 resources', icon: CheckCircle2, tone: 'sage' },
  { label: 'Mental wellbeing', count: '9 resources', icon: ShieldCheck, tone: 'lavender' },
]

const resources = [
  {
    title: 'Understanding your menstrual cycle',
    category: 'Menstrual health',
    summary: 'A clear, supportive guide to cycle changes, common symptoms and when to ask for help.',
    readTime: '6 min read',
    reviewed: 'Reviewed 12 Sep 2026',
    tag: 'Featured guide',
  },
  {
    title: 'A gentle guide to preparing for pregnancy',
    category: 'Fertility & IVF',
    summary: 'Practical information to help you prepare questions and make informed next-step choices.',
    readTime: '8 min read',
    reviewed: 'Reviewed 08 Aug 2026',
    tag: 'Planning ahead',
  },
  {
    title: 'Caring for your wellbeing after birth',
    category: 'Pregnancy & maternal wellbeing',
    summary: 'Learn about emotional and physical changes in the postpartum period, with trusted pathways to care.',
    readTime: '7 min read',
    reviewed: 'Reviewed 22 Jul 2026',
    tag: 'New parent support',
  },
]

export default function Page() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All topics')
  const [menuOpen, setMenuOpen] = useState(false)

  const filteredResources = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    return resources.filter((resource) => {
      const matchesCategory = activeCategory === 'All topics' || resource.category === activeCategory
      const matchesQuery = !normalized || `${resource.title} ${resource.summary} ${resource.category}`.toLowerCase().includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#24312d]">
      <div className="border-b border-[#e3e9e4] bg-[#eef6f1] px-4 py-2.5 text-center text-xs font-medium tracking-wide text-[#466157]">
        This portal shares general health education, not diagnosis or treatment. Always seek qualified professional care for personal concerns.
      </div>

      <header className="border-b border-[#e7ebe7] bg-[#fbfaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="ORU Social home">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#d76e68] text-lg font-semibold text-white shadow-sm">O</span>
            <span>
              <span className="block text-[15px] font-semibold tracking-tight text-[#24312d]">ORU Social</span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-[#7c8982]">Women&apos;s health</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#62716a] md:flex" aria-label="Primary navigation">
            <a className="text-[#24312d]" href="#explore">Explore topics</a>
            <a className="transition-colors hover:text-[#24312d]" href="#resources">Resources</a>
            <a className="transition-colors hover:text-[#24312d]" href="#about">About this portal</a>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl p-2 text-[#50625a] md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <button className="hidden rounded-full border border-[#d9e2dc] bg-white px-4 py-2 text-sm font-semibold text-[#496157] shadow-sm transition hover:border-[#b8ccc0] md:block">Sign in</button>
        </div>
        {menuOpen && <nav className="border-t border-[#e7ebe7] px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm font-medium text-[#50625a]"><a href="#explore">Explore topics</a><a href="#resources">Resources</a><a href="#about">About this portal</a></div></nav>}
      </header>

      <section id="top" className="relative overflow-hidden bg-[#f5efe8]">
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#e8c6ba]/35 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-[#d9eadf]/55 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e4d9d0] bg-white/65 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#8b625a]"><span className="h-1.5 w-1.5 rounded-full bg-[#d76e68]" /> A trusted starting point</div>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#263530] sm:text-5xl lg:text-[4.25rem]">Health information that meets you where you are.</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#64716b]">Explore thoughtful, easy-to-understand resources for every stage of your health journey — with clear pathways to professional support.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#explore" className="inline-flex items-center gap-2 rounded-full bg-[#2e5a4d] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(46,90,77,.16)] transition hover:bg-[#244b40]">Explore topics <ArrowRight size={16} /></a><a href="#resources" className="inline-flex items-center gap-2 rounded-full border border-[#d7d8d1] bg-white/75 px-5 py-3 text-sm font-semibold text-[#496157] transition hover:bg-white">Browse resources</a></div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div className="rounded-[2rem] border border-white/80 bg-white/75 p-3 shadow-[0_24px_70px_rgba(91,74,59,.12)] backdrop-blur-sm">
              <div className="rounded-[1.5rem] bg-[#dcebe1] p-7 sm:p-9">
                <div className="flex items-center justify-between"><span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#557469]">Your wellbeing matters</span><HeartPulse className="text-[#d76e68]" size={22} /></div>
                <div className="mt-20 max-w-[230px]"><p className="text-2xl font-semibold leading-tight text-[#31584c]">Small steps can make care feel more possible.</p><p className="mt-3 text-sm leading-6 text-[#60796e]">Find information, prepare questions and choose your next step.</p></div>
                <div className="mt-10 flex items-center gap-2 text-xs font-medium text-[#557469]"><span className="h-2 w-2 rounded-full bg-[#d76e68]" /> Reviewed health education</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="explore" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#c36962]">Start here</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#283731]">Explore by topic</h2></div><p className="max-w-sm text-sm leading-6 text-[#728079]">Begin with what feels most relevant today. You can always come back to explore more.</p></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ label, count, icon: Icon, tone }) => <button key={label} onClick={() => { setActiveCategory(label); document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' }) }} className={`group rounded-2xl border border-[#e4e9e4] bg-white p-5 text-left transition hover:-translate-y-1 hover:border-[#bfd2c6] hover:shadow-[0_12px_30px_rgba(57,83,69,.08)]`}><div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone === 'rose' ? 'bg-[#f8e6e2] text-[#c66c63]' : tone === 'peach' ? 'bg-[#f7ecdc] text-[#ba8960]' : tone === 'sage' ? 'bg-[#e1efe5] text-[#56806c]' : 'bg-[#eee8f5] text-[#816a9b]'}`}><Icon size={20} /></div><h3 className="mt-5 text-[15px] font-semibold text-[#33463d]">{label}</h3><p className="mt-1 text-xs text-[#87938d]">{count}</p><ArrowRight className="mt-5 text-[#9aa8a0] transition group-hover:translate-x-1 group-hover:text-[#3f6757]" size={17} /></button>)}
        </div>
      </section>

      <section id="resources" className="border-y border-[#e6ebe6] bg-white/65">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#c36962]">Curated for you</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#283731]">Helpful, reviewed resources</h2></div><div className="flex flex-col gap-3 sm:flex-row"><label className="relative"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#829088]" size={17} /><span className="sr-only">Search resources</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search resources" className="h-11 w-full rounded-xl border border-[#dfe6e0] bg-white pl-10 pr-4 text-sm text-[#33463d] outline-none ring-[#b7d0c0] placeholder:text-[#9aa69f] focus:ring-2 sm:w-64" /></label><div className="relative"><select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-[#dfe6e0] bg-white pl-4 pr-10 text-sm font-medium text-[#52655b] outline-none focus:ring-2 focus:ring-[#b7d0c0] sm:w-48"><option>All topics</option>{categories.map((category) => <option key={category.label}>{category.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#829088]" size={16} /></div></div></div>
          {filteredResources.length > 0 ? <div className="mt-9 grid gap-5 lg:grid-cols-3">{filteredResources.map((resource) => <article key={resource.title} className="flex flex-col rounded-2xl border border-[#e2e8e3] bg-white p-6 shadow-[0_4px_14px_rgba(44,75,57,.03)]"><div className="flex items-center justify-between gap-3"><span className="rounded-full bg-[#eef6f1] px-2.5 py-1 text-[11px] font-semibold text-[#557466]">{resource.tag}</span><span className="text-[#a0aaa4]"><BookOpen size={17} /></span></div><p className="mt-6 text-xs font-semibold uppercase tracking-[0.1em] text-[#c4756e]">{resource.category}</p><h3 className="mt-2 text-xl font-semibold leading-snug tracking-[-0.02em] text-[#33463d]">{resource.title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-[#74817a]">{resource.summary}</p><div className="mt-6 flex items-center justify-between border-t border-[#edf0ed] pt-4 text-xs text-[#87938d]"><span className="flex items-center gap-1.5"><Clock3 size={14} /> {resource.readTime}</span><span>{resource.reviewed}</span></div><button className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#3f6958]">Read resource <ArrowRight size={15} /></button></article>)}</div> : <div className="mt-9 rounded-2xl border border-dashed border-[#cad8ce] bg-[#f7faf7] px-6 py-14 text-center"><Search className="mx-auto text-[#8aa194]" size={24} /><h3 className="mt-4 font-semibold text-[#33463d]">No resources found</h3><p className="mt-2 text-sm text-[#78867e]">Try another search or reset the topic filter.</p><button onClick={() => { setQuery(''); setActiveCategory('All topics') }} className="mt-5 text-sm font-semibold text-[#3f6958] underline underline-offset-4">Reset filters</button></div>}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20"><div className="grid gap-8 rounded-[2rem] bg-[#2e5a4d] p-8 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"><div className="max-w-2xl"><div className="flex items-center gap-2 text-sm font-semibold text-[#cfe4d6]"><ShieldCheck size={17} /> Built with care and transparency</div><h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">Information should help you feel more informed, not overwhelmed.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-[#d4e4da]">Our resources are designed to be a starting point for conversations with qualified professionals. Each published resource will show its source, review status and date.</p></div><a href="#resources" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#2e5a4d] transition hover:bg-[#eef6f1]">Learn about our approach <ArrowRight size={16} /></a></div></section>

      <footer className="border-t border-[#e4e9e4] px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-[#87938d] sm:flex-row sm:items-center sm:justify-between"><p>© 2026 ORU Social. General education, thoughtfully delivered.</p><p>Prototype content shown for product demonstration only.</p></div></footer>
    </main>
  )
}
