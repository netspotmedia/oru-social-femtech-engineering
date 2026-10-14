'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  BookOpen,
  Bot,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  FileCheck,
  Flag,
  Gavel,
  HeartPulse,
  MapPin,
  Menu,
  PhoneCall,
  Scale,
  Search,
  ShieldCheck,
  Siren,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'

type Domain = {
  id: number
  name: string
  guides: string
  phase: string
  description: string
  tags: string[]
}

const lifePhases = ['All', 'Adolescence', 'Reproductive years', 'Perinatal', 'Mature health'] as const

const domains: Domain[] = [
  { id: 1, name: 'Gynecology & Reproductive Health', guides: '54 Guides', phase: 'Reproductive years', description: 'Cervical screening (Pap/HPV), STI prevention, fibroids, pelvic ultrasound preparation and annual exam advocacy.', tags: ['Pap Smears', 'Infections', 'Fibroids'] },
  { id: 2, name: 'Fertility & IVF Education', guides: '42 Guides', phase: 'Reproductive years', description: 'Ovarian reserve (AMH), ovulation tracking, ICSI/IUI pathways, male-factor fertility and egg-freezing protocols.', tags: ['AMH Testing', 'IVF Timelines', 'Assisted Tech'] },
  { id: 3, name: 'Menstrual Health & PCOS', guides: '68 Guides', phase: 'Adolescence', description: 'Endometriosis staging, Rotterdam PCOS criteria, heavy bleeding (menorrhagia) and insulin-resistance management.', tags: ['Endometriosis', 'PCOS Care', 'Dysmenorrhea'] },
  { id: 4, name: 'Pregnancy & Maternal Wellbeing', guides: '61 Guides', phase: 'Perinatal', description: 'Trimester scan calendars, preeclampsia red flags, gestational diabetes testing and certified-midwife pathways.', tags: ['Prenatal Scans', 'Preeclampsia', 'Nutrition'] },
  { id: 5, name: 'Postpartum Recovery', guides: '39 Guides', phase: 'Perinatal', description: 'The fourth trimester, perineal healing, C-section wound care, lactation support and postpartum mental-health triage.', tags: ['4th Trimester', 'C-Section Care', 'Lactation'] },
  { id: 6, name: 'Pelvic Health & Physiotherapy', guides: '31 Guides', phase: 'Reproductive years', description: 'Prolapse grades, stress and urge incontinence, hypertonic pelvic-floor release and biofeedback therapy.', tags: ['Pelvic Floor', 'Prolapse', 'Incontinence'] },
  { id: 7, name: 'Menopause & Perimenopause', guides: '47 Guides', phase: 'Mature health', description: 'HRT risk–benefit frameworks, vasomotor symptoms, DEXA bone-density screening and cardiovascular changes.', tags: ['HRT Facts', 'Vasomotor', 'Bone Density'] },
  { id: 8, name: 'Psychological Wellbeing', guides: '35 Guides', phase: 'Reproductive years', description: 'EPDS self-reflection, PMDD management, birth-trauma support and community care pods.', tags: ['PMDD', 'PND Screen', 'Trauma Support'] },
  { id: 9, name: 'Preventive Care & Screening', guides: '50 Guides', phase: 'Mature health', description: 'Mammography schedules, BRCA counselling indications, colonoscopy benchmarks and self-advocacy.', tags: ['Mammograms', 'BRCA Testing', 'Self-Advocacy'] },
]

const guides = [
  { category: 'Endometriosis', time: '8 min read', title: 'Endometriosis: Differentiating Chronic Pelvic Pain from Primary Dysmenorrhea', summary: 'Diagnostic roadmap covering laparoscopy benchmarks, deep-infiltrating ultrasound markers and non-opioid pain modulation.', reviewer: 'Reviewed by Dr. Naledi Molefe, FCOG (SA)', ref: 'SASOG Guidelines · Level 1 Evidence · Cochrane' },
  { category: 'Fertility & IVF', time: '11 min read', title: 'Navigating In Vitro Fertilisation (IVF) in Africa: Timelines, Protocols & Costs', summary: 'Gonadotropin stimulation cycles, egg retrieval, embryo grading and public vs. private financing realities.', reviewer: 'Reviewed by Dr. Fatima Adams, Reprod. Med.', ref: 'ESHRE Consensus · SASREG' },
  { category: 'Pelvic Physiotherapy', time: '6 min read', title: 'Pelvic Floor Rehabilitation: Overcoming Postpartum Dysfunction & Prolapse', summary: 'Why Kegels are not a universal fix: hypotonic weakness vs. hypertonic spasm and structured recovery.', reviewer: 'Reviewed by Sarah van Zyl, BSc Physio (UCT)', ref: 'SA Pelvic Floor Group · NICE' },
]

const providers = [
  { name: 'Dr. Lerato Khumalo', role: 'Consultant Obstetrician & Gynecologist', cred: 'MBChB, FCOG (SA), MMed (O&G)', license: 'HPCSA License #MP0642198', location: 'Johannesburg, Gauteng · Telehealth available', specialties: 'High-Risk Pregnancy, Endometriosis', slot: 'Next slot: Tomorrow at 09:30' },
  { name: 'Dr. Johan Steenkamp', role: 'Reproductive Endocrinologist (Fertility)', cred: 'MBChB, MMed, Cert. Reproductive Med', license: 'HPCSA License #MP0511874', location: 'Cape Town, Western Cape · In-clinic only', specialties: 'IVF / ICSI, Recurrent Loss, AMH', slot: 'Next slot: Thursday at 14:00' },
  { name: 'Sr. Nomvula Dlamini', role: 'Advanced Midwife & Lactation Consultant', cred: 'BCur, Adv Midwifery (SANC), IBCLC', license: 'SANC License #14890211', location: 'Durban, KZN · Home visits & virtual', specialties: 'Postpartum Care, Gentle Birth, Feeding', slot: 'Next slot: Friday at 11:15' },
]

const priorityTopics = ['Fertility & IVF', 'PCOS & Hormones', 'Maternal Health', 'Gynecology', 'Pelvic Floor', 'Menopause']

export default function Page() {
  const [query, setQuery] = useState('')
  const [phase, setPhase] = useState<(typeof lifePhases)[number]>('All')
  const [menuOpen, setMenuOpen] = useState(false)

  const filteredDomains = useMemo(() => {
    const q = query.toLowerCase()
    return domains.filter((d) => {
      const inPhase = phase === 'All' || d.phase === phase
      const inQuery = !q || `${d.name} ${d.description} ${d.tags.join(' ')}`.toLowerCase().includes(q)
      return inPhase && inQuery
    })
  }, [query, phase])

  return (
    <main className="min-h-screen bg-[#eefcff] font-sans text-[#0f1e21]">
      {/* Emergency banner */}
      <div className="border-l-4 border-[#ba1a1a] bg-[#ffdad6] px-4 py-2 text-[#410003]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <p className="flex min-w-0 items-center gap-2 text-xs font-medium">
            <Siren size={16} className="shrink-0 text-[#ba1a1a]" />
            <span className="truncate sm:whitespace-normal">
              <strong>Emergency Notice:</strong> Severe abdominal pain, heavy bleeding or obstetric emergency — call emergency services now (SA 112 / 10177). Educational navigation only.
            </span>
          </p>
          <a href="tel:112" className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#ba1a1a] px-3 py-1 text-xs font-bold text-white hover:bg-[#9f3f39]">
            <PhoneCall size={13} /> Call 112
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#d5e5e9] bg-[#eefcff]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <a href="#top" className="flex items-center gap-2 text-[#004340]" aria-label="ORU FemTech home">
            <HeartPulse size={26} />
            <span className="text-lg font-bold tracking-tight">ORU <small className="text-sm font-normal text-[#3f4947]">FemTech</small></span>
          </a>
          <nav className="hidden items-center gap-1 text-[13px] font-medium lg:flex" aria-label="Primary">
            <a href="#top" aria-current="page" className="rounded-lg bg-[#0d5c58] px-3 py-2 font-semibold text-white">Health Hub</a>
            <a href="#providers" className="rounded-lg px-3 py-2 text-[#3f4947] hover:bg-[#e0f1f5]">Provider Directory</a>
            <a href="#ai-navigator" className="rounded-lg px-3 py-2 text-[#3f4947] hover:bg-[#e0f1f5]">AI Care Navigator</a>
            <a href="#guides" className="rounded-lg px-3 py-2 text-[#3f4947] hover:bg-[#e0f1f5]">EdTech Library</a>
            <a href="#governance" className="rounded-lg px-3 py-2 text-[#3f4947] hover:bg-[#e0f1f5]">Clinical Governance</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#guides" className="hidden rounded-lg bg-[#e0f1f5] px-4 py-2 text-[13px] font-semibold text-[#0f1e21] hover:bg-[#daebef] md:inline-flex">Member Profile</a>
            <a href="#top" className="hidden rounded-lg bg-[#004340] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#0d5c58] sm:inline-flex">Sign In</a>
            <button className="rounded-lg p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#d5e5e9] px-4 py-4 lg:hidden" aria-label="Mobile">
            <div className="flex flex-col gap-1 text-sm font-semibold">
              {[
                ['Health Hub', '#top'],
                ['Provider Directory', '#providers'],
                ['AI Care Navigator', '#ai-navigator'],
                ['EdTech Library', '#guides'],
                ['Clinical Governance', '#governance'],
              ].map(([label, href]) => (
                <a key={href + label} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-[#e0f1f5]">{label}</a>
              ))}
              <a href="#top" className="mt-2 rounded-lg bg-[#004340] px-3 py-2.5 text-center text-white">Sign In</a>
            </div>
          </nav>
        )}
      </header>

      {/* Governance ticker */}
      <div className="border-b border-[#d5e5e9] bg-[#e0f1f5] px-4 py-2 text-[13px] text-[#3f4947]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#004340]"><BadgeCheck size={15} className="text-[#128a58]" /> Clinical Governance Active</span>
          <span className="hidden md:block">Content aligned with SASOG, RCOG &amp; WHO guidelines · HPCSA-licensed peer review</span>
          <a href="#governance" className="inline-flex items-center gap-1 font-semibold text-[#004340]">Editorial Charter <ArrowRight size={14} /></a>
        </div>
      </div>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full bg-[#abefe9]/30 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#ff897f]/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#e0f1f5] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#004340]">
                <ShieldCheck size={15} /> South African FemTech Care Infrastructure
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">Accessible, Clinically-Reviewed Women&apos;s Health &amp; Care Navigation</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#3f4947]">Empowering women and girls across Africa with verified reproductive health education, licensed provider discovery and responsible, grounded AI guidance.</p>

              {/* Search */}
              <form className="mt-6 rounded-xl bg-white p-3 shadow-[0_8px_24px_-4px_rgba(13,92,88,.08)]" role="search" onSubmit={(e) => { e.preventDefault(); document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' }) }}>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7978]" />
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search health topics, clinical guides…" aria-label="Search health topics and clinical guides" className="h-12 w-full rounded-lg border border-[#d5e5e9] bg-[#eefcff] pl-10 pr-3 text-sm outline-none focus:border-[#0d5c58] focus:ring-2 focus:ring-[#0d5c58]" />
                  </label>
                  <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0d5c58] px-6 text-sm font-bold text-white hover:bg-[#09423f]">Find Verified Care <ArrowRight size={16} /></button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[#3f4947]">Priority Topics:</span>
                  {priorityTopics.map((t) => (
                    <button key={t} type="button" onClick={() => setQuery(t.split(' ')[0])} className="rounded-full border border-[#d5e5e9] bg-[#e6f7fa] px-2.5 py-1 font-semibold text-[#004340] hover:bg-[#daebef]">{t}</button>
                  ))}
                </div>
              </form>
            </div>

            {/* Registry metrics */}
            <aside className="rounded-xl bg-white p-6 shadow-[0_8px_24px_-4px_rgba(13,92,88,.08)] lg:col-span-4" aria-label="Clinical registry metrics">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#3f4947]">
                <span>Clinical Registry · Live Metrics</span><HeartPulse size={18} className="text-[#005f3a]" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div><strong className="block text-3xl font-bold text-[#004340]">1,420+</strong><span className="text-xs text-[#3f4947]">HPCSA-Verified Specialists</span></div>
                <div><strong className="block text-3xl font-bold text-[#005f3a]">380+</strong><span className="text-xs text-[#3f4947]">Peer-Reviewed Guides</span></div>
              </div>
              <p className="mt-4 flex items-center gap-2 border-t border-[#d5e5e9] pt-4 text-xs font-semibold text-[#3f4947]"><CheckCircle2 size={15} className="text-[#128a58]" /> 100% Non-Commercial Triage Standard</p>
              <p className="mt-2 text-[11px] leading-5 text-[#6f7978]">Design preview figures — illustrative directory data, not live availability.</p>
            </aside>
          </div>

          {/* Quick cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Stethoscope size={20} />, title: 'Verified Providers', text: '1,420+ HPCSA & board-certified specialists across provinces.', cta: 'Search Registry', href: '#providers' },
              { icon: <BookOpen size={20} />, title: 'Peer-Reviewed Guides', text: '380+ guides reviewed by accredited OB-GYNs & midwives.', cta: 'Browse EdTech', href: '#guides' },
              { icon: <Bot size={20} />, title: 'AI Care Assistant', text: 'Safe RAG-bounded navigation with strict non-diagnostic protocol.', cta: 'Start Triage', href: '#ai-navigator' },
              { icon: <Siren size={20} />, title: 'Emergency Hotlines', text: 'Maternal crises, poison control and SA ambulance dispatch.', cta: 'Call SA 112 / 10177', href: 'tel:112' },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-[#d5e5e9] bg-white p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#daebef] text-[#004340]">{c.icon}</span>
                <h3 className="mt-3 font-bold">{c.title}</h3>
                <p className="mt-1 text-[13px] leading-6 text-[#3f4947]">{c.text}</p>
                <a href={c.href} className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-[#004340]">{c.cta} <ArrowRight size={14} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section id="domains" className="bg-[#e6f7fa] px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[13px] font-bold uppercase tracking-wider text-[#004340]">Comprehensive Reproductive Curriculum</p>
          <div className="mt-1 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-bold tracking-tight">9 Core Clinical Domains</h2>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by life phase">
              {lifePhases.map((p) => (
                <button key={p} onClick={() => setPhase(p)} aria-pressed={phase === p} className={`rounded-full px-3 py-1.5 text-xs font-bold ${phase === p ? 'bg-[#0d5c58] text-white' : 'bg-white text-[#004340] hover:bg-[#daebef]'}`}>{p === 'All' ? 'All life stages' : p}</button>
              ))}
            </div>
          </div>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-[#3f4947]">From menarche to postmenopause — structured taxonomies covering symptoms, evidence guidelines and appropriate levels of care.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDomains.map((d) => (
              <article key={d.id} className="flex flex-col rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#daebef] text-[#004340]"><Stethoscope size={20} /></span>
                  <span className="rounded-full bg-[#e0f1f5] px-2.5 py-1 text-xs font-semibold text-[#3f4947]">{d.guides}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{d.id}. {d.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#3f4947]">{d.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{d.tags.map((t) => <span key={t} className="rounded-full bg-[#e6f7fa] px-2 py-0.5 text-[11px] font-semibold text-[#004340]">{t}</span>)}</div>
                <a href="#guides" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#004340]">Explore {d.name.split(' &')[0]} <ArrowRight size={15} /></a>
              </article>
            ))}
          </div>
          {filteredDomains.length === 0 && (
            <div className="mt-6 rounded-xl border border-dashed border-[#bec9c7] bg-white p-10 text-center">
              <Search className="mx-auto text-[#6f7978]" />
              <p className="mt-2 font-semibold">No domains match “{query}”</p>
              <button onClick={() => { setQuery(''); setPhase('All') }} className="mt-2 text-sm font-bold text-[#004340] underline">Reset search and filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Featured guides */}
      <section id="guides" className="px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-[#004340]"><BookOpen size={15} /> EdTech Verified Library</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight">Clinically Reviewed Featured Guides</h2>
              <p className="mt-2 max-w-3xl text-[15px] text-[#3f4947]">Authored by women&apos;s-health educators, cross-examined by board-registered sub-specialists and verified against international consensus.</p>
            </div>
            <a href="#guides" className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[#004340]">Open Complete Library (380+) <ArrowRight size={15} /></a>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {guides.map((g) => (
              <article key={g.title} className="flex flex-col rounded-xl border border-[#d5e5e9] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-[#e6f7fa] px-2.5 py-1 font-bold text-[#004340]">{g.category}</span>
                  <span className="inline-flex items-center gap-1 text-[#6f7978]"><Clock3 size={13} /> {g.time}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug">{g.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#3f4947]">{g.summary}</p>
                <p className="mt-4 flex items-start gap-1.5 border-t border-[#e6f7fa] pt-3 text-xs leading-5 text-[#3f4947]"><BadgeCheck size={14} className="mt-0.5 shrink-0 text-[#128a58]" /> {g.reviewer}<br />{g.ref}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#004340]">Read Guide <ArrowRight size={15} /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AI navigator */}
      <section id="ai-navigator" className="border-y border-[#d5e5e9] bg-[#f0f6f5] px-4 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-[#004340]"><Bot size={15} /> Bounded Clinical Retrieval Engine</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Ground-Truth Clinical AI, Built for Women&apos;s Bodily Safety</h2>
            <p className="mt-3 leading-7 text-[#3f4947]">Unlike generic chatbots, the AI Care Navigator cannot invent remedies or offer diagnoses. It queries approved guidelines to provide triaged steps, questions for your doctor and routes to registered clinics.</p>
            <ul className="mt-4 space-y-2 text-sm font-medium text-[#3f4947]">
              {['Non-diagnostic, algorithmic triage bounds', 'Grounded strictly in peer-reviewed publications', 'Zero commercial pharmaceutical promotion'].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#128a58]" /> {t}</li>
              ))}
            </ul>
            <a href="#ai-navigator" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0d5c58] px-5 py-3 text-sm font-bold text-white hover:bg-[#09423f]"><Bot size={16} /> Launch AI Care Navigator</a>
            <p className="mt-2 text-xs text-[#6f7978]">Available 24/7 · Free · Encrypted · Preview only — not connected to a live model.</p>
          </div>
          <div className="rounded-xl border border-[#d5e5e9] bg-white p-5 shadow-[0_8px_24px_-4px_rgba(13,92,88,.08)]" aria-label="Triage preview">
            <p className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#3f4947]"><span>ORU Triage Navigator v2.4</span><span className="rounded-full bg-[#e6f7fa] px-2 py-0.5 text-[#004340]">Non-diagnostic sandbox</span></p>
            <div className="mt-3 rounded-lg bg-[#eefcff] p-3 text-[13px] leading-6">I get severe pelvic cramps 3 days before bleeding and pain during bowel movements. Is this typical or should I seek a specialist?</div>
            <div className="mt-3 rounded-lg border-l-4 border-[#0d5c58] bg-[#f0f6f5] p-4 text-[13px] leading-6">
              <p className="font-bold text-[#004340]">Clinical Triage Assessment · Specialized consult recommended</p>
              <p className="mt-1 text-[#3f4947]">Severe pre-menses cramping with pain on bowel movements (dyschezia) is a recognized red flag distinguishing possible deep-infiltrating endometriosis from primary dysmenorrhea. Recommended action: request a specialized transvaginal pelvic ultrasound by an HPCSA-registered gynecologist.</p>
              <p className="mt-2 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#d5e5e9] bg-white px-2 py-0.5 text-[11px] font-semibold"><CheckCircle2 size={12} className="text-[#128a58]" /> SASOG Endometriosis Guidelines (2024)</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#d5e5e9] bg-white px-2 py-0.5 text-[11px] font-semibold"><CheckCircle2 size={12} className="text-[#128a58]" /> Cochrane Review CD009590</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Providers */}
      <section id="providers" className="px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-[#004340]"><Users size={15} /> Accredited Healthcare Directory</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight">Verified Provider Network</h2>
              <p className="mt-2 max-w-3xl text-[15px] text-[#3f4947]">Illustrative design preview — directory entries below are placeholders from the Stitch mockup, not live credential data. Real listings must come from an authorized registry with verified HPCSA/SANC checks.</p>
            </div>
            <a href="#providers" className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[#004340]">View All 1,420+ Providers <ArrowRight size={15} /></a>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {providers.map((p) => (
              <article key={p.name} className="flex flex-col rounded-xl border border-[#d5e5e9] bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0d5c58] font-bold text-white">{p.name.replace('Sr. ', '').replace('Dr. ', '').charAt(0)}</span>
                  <div>
                    <h3 className="font-bold leading-tight">{p.name}</h3>
                    <p className="text-xs text-[#3f4947]">{p.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-[#3f4947]">{p.cred}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#128a58]"><BadgeCheck size={14} /> {p.license}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-[#3f4947]"><MapPin size={13} /> {p.location}</p>
                <p className="mt-1 text-xs text-[#3f4947]"><strong>Specialties:</strong> {p.specialties}</p>
                <div className="mt-4 border-t border-[#e6f7fa] pt-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-[#004340]"><CalendarCheck size={14} /> {p.slot} (illustrative)</p>
                  <span className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#004340] px-4 py-2.5 text-[13px] font-bold text-white">View Profile &amp; Availability <ArrowRight size={14} /></span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section id="governance" className="border-t border-[#d5e5e9] bg-[#004340] px-4 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-2 text-sm font-bold text-[#8ed2cc]"><Gavel size={16} /> Regulatory Integrity &amp; Patient Trust</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight">Clinical Governance, Ethics &amp; Transparency Charter</h2>
          <p className="mt-2 max-w-3xl leading-7 text-[#d5e5e9]">Reproductive-health navigation with clinical seriousness: review boards, privacy guarantees and open channels to report discrepancies.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { icon: <FileCheck size={18} />, title: '1. Quadruple-Check Editorial Process', text: 'Certified writers → HPCSA board-registered reviewer → direct citation to Cochrane, SASOG, RCOG or WHO. Annual review or on guideline change.' },
              { icon: <ShieldCheck size={18} />, title: '2. POPIA & Sovereign Data Shield', text: 'Zero-sale policy for personal and reproductive data under POPIA. Triage inputs encrypted, never monetized or shared with advertisers.' },
              { icon: <Scale size={18} />, title: '3. Independent Medical Advisory Board', text: 'Academic OB-GYNs, midwives, pelvic physios and bioethicists across Southern Africa retain veto over algorithms, guides and directory standards.' },
              { icon: <Flag size={18} />, title: '4. Fast-Track Incident Reporting', text: 'Outdated info, non-compliant conduct or AI errors reviewed by the Clinical Safety Officer within 24 hours.' },
            ].map((c) => (
              <div key={c.title} className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
                <p className="flex items-center gap-2 font-bold text-[#8ed2cc]">{c.icon} {c.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#d5e5e9]">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
            {['Strictly Non-Diagnostic', 'Zero Pharmaceutical Sponsorship', 'End-to-End Encrypted Triage', 'HPCSA Register Corroborated'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15"><CheckCircle2 size={13} className="text-[#8ff8bc]" /> {t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d5e5e9] bg-[#eefcff] px-4 py-8 text-[13px] text-[#3f4947] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <p className="flex items-center gap-2 font-bold text-[#004340]"><HeartPulse size={18} /> ORU FemTech</p>
              <p className="mt-2 text-xs leading-5">South Africa&apos;s trusted women&apos;s reproductive-health navigation and clinical education network.</p>
              <a href="#governance" className="mt-3 inline-flex items-center gap-1 rounded-lg bg-[#ffdad6] px-3 py-1.5 text-xs font-bold text-[#93000a]"><BellRing size={13} /> Report Inaccurate / Unsafe Info</a>
            </div>
            <nav aria-label="Care navigation"><p className="font-bold text-[#0f1e21]">Care Navigation</p><ul className="mt-2 space-y-1.5"><li><a href="#providers" className="hover:text-[#004340]">Verified Providers</a></li><li><a href="#ai-navigator" className="hover:text-[#004340]">AI Care Navigator</a></li><li><a href="#domains" className="hover:text-[#004340]">Triage Directory</a></li></ul></nav>
            <nav aria-label="Education"><p className="font-bold text-[#0f1e21]">Education &amp; Trust</p><ul className="mt-2 space-y-1.5"><li><a href="#guides" className="hover:text-[#004340]">Peer-Reviewed Articles</a></li><li><a href="#governance" className="hover:text-[#004340]">Clinical Board &amp; Ethics</a></li><li><a href="#governance" className="hover:text-[#004340]">HPCSA Alignment</a></li></ul></nav>
            <div><p className="font-bold text-[#0f1e21]">South African Regulatory</p><p className="mt-2 text-xs leading-5">POPIA compliant. Encrypted, sovereign health-record guidelines observed.<br />Emergency: SA 112 (Mobile) | 10177 (Ambulance)</p></div>
          </div>
          <div className="mt-6 flex flex-col gap-2 border-t border-[#d5e5e9] pt-4 text-xs sm:flex-row sm:justify-between">
            <span>© 2025 ORU Social FemTech South Africa. All rights reserved.</span>
            <span>Educational navigation only — not diagnostic or emergency advice. Consult HPCSA-registered professionals.</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
