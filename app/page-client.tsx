'use client'

import { useMemo, useState } from 'react'
import type { GuideCard } from '@/lib/supabase/server'
import {
  Accessibility,
  ArrowRight,
  Baby,
  BadgeCheck,
  Brain,
  Bot,
  CalendarDays,
  ClipboardCheck,
  Egg,
  Flag,
  Flower2,
  HeartHandshake,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Stethoscope,
  X,
} from 'lucide-react'

type Domain = {
  name: string
  guides: string
  phase: 'Reproductive' | 'Perinatal' | 'Mature'
  description: string
  icon: React.ReactNode
}

const phases = ['All', 'Reproductive', 'Perinatal', 'Mature'] as const

const domains: Domain[] = [
  { name: 'Gynecology & Cervical Health', guides: '54 Guides', phase: 'Reproductive', description: 'Pap smears, HPV vaccination protocols, fibroid monitoring, and infection prevention.', icon: <Stethoscope size={20} /> },
  { name: 'Fertility & IVF Education', guides: '42 Guides', phase: 'Reproductive', description: 'Ovarian reserve (AMH), ovulation mapping, ICSI/IUI timelines, and financing guidance.', icon: <Egg size={20} /> },
  { name: 'Menstrual Health & PCOS', guides: '68 Guides', phase: 'Reproductive', description: 'Endometriosis laparoscopy staging, Rotterdam criteria, and non-opioid pain modulation.', icon: <CalendarDays size={20} /> },
  { name: 'Pregnancy & Maternal Care', guides: '61 Guides', phase: 'Perinatal', description: 'Trimester anomaly scans, preeclampsia early indicators, and certified midwife collaboration.', icon: <Baby size={20} /> },
  { name: 'Postpartum Recovery', guides: '39 Guides', phase: 'Perinatal', description: 'The fourth trimester, C-section healing milestones, lactation, and postnatal mental checks.', icon: <HeartHandshake size={20} /> },
  { name: 'Pelvic Health & Physiotherapy', guides: '31 Guides', phase: 'Reproductive', description: 'Prolapse staging, incontinence management, and targeted biofeedback therapy protocols.', icon: <Accessibility size={20} /> },
  { name: 'Menopause & Perimenopause', guides: '47 Guides', phase: 'Mature', description: 'HRT evidence frameworks, vasomotor symptom relief, and DEXA bone density screening.', icon: <Flower2 size={20} /> },
  { name: 'Psychological Wellbeing', guides: '35 Guides', phase: 'Reproductive', description: 'EPDS postpartum depression scoring, PMDD management, and birth trauma de-escalation.', icon: <Brain size={20} /> },
  { name: 'Preventive Care & Screening', guides: '50 Guides', phase: 'Mature', description: 'Mammography cadence tables, BRCA genetic counseling indications, and patient advocacy.', icon: <ClipboardCheck size={20} /> },
]

const providers = [
  { name: 'Dr. Lerato Khumalo', role: 'Consultant Obstetrician & Gynaecologist', cred: 'MBChB, FCOG(SA)', license: 'HPCSA #MP0642198', location: 'Johannesburg · Telehealth Available', focus: 'High-Risk Pregnancy & Endometriosis' },
  { name: 'Dr. Johan Steenkamp', role: 'Reproductive Endocrinologist (Fertility)', cred: 'MBChB, MMed, Cert. Reprod. Med', license: 'HPCSA #MP0511874', location: 'Cape Town · In-Clinic Consultation', focus: 'IVF / ICSI, Recurrent Loss & AMH' },
  { name: 'Sr. Nomvula Dlamini', role: 'Advanced Midwife & Lactation Consultant', cred: 'BCur, Adv Midwifery (SANC), IBCLC', license: 'SANC #14890211', location: 'Durban · Home Visits & Virtual', focus: 'Postpartum Care, Gentle Birth & Feeding' },
]

const popularSearches: { label: string; query: string }[] = [
  { label: 'Pelvic Floor Rehab', query: 'Pelvic' },
  { label: 'PCOS Diagnostic Criteria', query: 'PCOS' },
  { label: 'Perimenopause & HRT', query: 'HRT' },
]

export default function Page({ guides }: { guides: GuideCard[] }) {
  const [query, setQuery] = useState('')
  const [phase, setPhase] = useState<(typeof phases)[number]>('All')
  const [menuOpen, setMenuOpen] = useState(false)

  const filteredDomains = useMemo(() => {
    const q = query.toLowerCase()
    return domains.filter((d) => {
      const inPhase = phase === 'All' || d.phase === phase
      const inQuery = !q || `${d.name} ${d.description}`.toLowerCase().includes(q)
      return inPhase && inQuery
    })
  }, [query, phase])

  const scrollToDomains = () => document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <main className="min-h-screen bg-[#f8fafb] font-sans text-[#0f1e21]">
      <div className="bg-[#004340] px-4 py-2 text-center text-[12px] font-semibold tracking-wide text-white">
        Clinically-reviewed women&apos;s health education for South Africa ·{' '}
        <a href="#governance" className="underline underline-offset-2 hover:no-underline">Our clinical safety standard</a>
      </div>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#d5e5e9] bg-[#f8fafb]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <a href="#top" className="flex items-center gap-2 text-[#004340]" aria-label="ORU FemTech South Africa home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/oru-social-logo.png" alt="ORU Social emblem" width={32} height={32} className="h-8 w-8 rounded-full object-cover ring-1 ring-[#d5e5e9]" />
            <span className="leading-tight">
              <span className="block text-[15px] font-bold tracking-tight">ORU FemTech</span>
              <small className="block text-[10px] font-normal uppercase tracking-[.18em] text-[#6f7978]">South Africa</small>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-[13px] font-medium lg:flex" aria-label="Primary">
            <a href="#top" aria-current="page" className="rounded-lg bg-[#0d5c58] px-3 py-2 font-semibold text-white">Health Hub</a>
            <a href="#guides" className="rounded-lg px-3 py-2 text-[#3f4947] hover:bg-[#e0f1f5]">Guides</a>
            <a href="#providers" className="rounded-lg px-3 py-2 text-[#3f4947] hover:bg-[#e0f1f5]">Specialists</a>
            <a href="#ai-navigator" className="rounded-lg px-3 py-2 text-[#3f4947] hover:bg-[#e0f1f5]">AI Navigator</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#domains" className="hidden rounded-lg bg-[#0d5c58] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#09423f] sm:inline-flex">Find Care</a>
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
                ['Guides', '#guides'],
                ['Specialists', '#providers'],
                ['AI Navigator', '#ai-navigator'],
              ].map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-[#e0f1f5]">{label}</a>
              ))}
              <a href="#domains" onClick={() => setMenuOpen(false)} className="mt-2 rounded-lg bg-[#0d5c58] px-3 py-2.5 text-center text-white hover:bg-[#09423f]">Find Care</a>
            </div>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden px-4 pb-16 pt-16 lg:px-8 lg:pb-24 lg:pt-24">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(#0d5c58_1px,transparent_1px)] opacity-[0.08] [background-size:22px_22px]" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#004340] ring-1 ring-[#d5e5e9]">
            <ShieldCheck size={14} /> SASOG &amp; HPCSA-Aligned Reproductive Care Infrastructure
          </p>
          <h1 className="mt-6 text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">Evidence-based women&apos;s health, designed for clarity, trust &amp; dignity.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#3f4947] sm:text-lg">Access clinically peer-reviewed reproductive education, discover verified South African medical specialists, and navigate symptoms with safely bounded clinical AI.</p>

          <form className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 sm:flex-row" role="search" onSubmit={(e) => { e.preventDefault(); scrollToDomains() }}>
            <label className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7978]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search symptoms, conditions, or specialists (e.g. Endometriosis, Pelvic Pain, IVF)" aria-label="Search symptoms, conditions or specialists" className="h-12 w-full rounded-lg border border-[#d5e5e9] bg-white pl-10 pr-3 text-sm outline-none placeholder:text-[#6f7978] focus:border-[#0d5c58] focus:ring-2 focus:ring-[#0d5c58]" />
            </label>
            <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0d5c58] px-6 text-sm font-bold text-white hover:bg-[#09423f]">Find Care <ArrowRight size={16} /></button>
          </form>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-[#3f4947]">
            <span className="font-bold">Popular:</span>
            {popularSearches.map((s) => (
              <button key={s.label} type="button" onClick={() => { setQuery(s.query); scrollToDomains() }} className="font-semibold text-[#004340] hover:underline">{s.label}</button>
            ))}
            <span aria-hidden>•</span>
            <button type="button" onClick={() => document.getElementById('providers')?.scrollIntoView({ behavior: 'smooth' })} className="font-semibold text-[#004340] hover:underline">Find Gynaecologist</button>
          </div>

          <div aria-label="Guidance sources" className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6f7978]">
            <span>Informed by SASOG guidance</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[#6f7978]/40" />
            <span>RCOG &amp; WHO references</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[#6f7978]/40" />
            <span>POPIA-aware · Non-commercial</span>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section id="domains" className="px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#6f7978]">Clinical Architecture</p>
          <div className="mt-1 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">9 Core Health Domains</h2>
              <p className="mt-2 max-w-2xl text-[15px] text-[#3f4947]">Structured clinical curriculums spanning adolescence, reproductive years, perinatal care, and mature health.</p>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by life stage">
              {phases.map((p) => (
                <button key={p} onClick={() => setPhase(p)} aria-pressed={phase === p} className={`rounded-full px-3 py-1.5 text-xs font-bold ${phase === p ? 'bg-[#0d5c58] text-white' : 'bg-white text-[#004340] ring-1 ring-[#d5e5e9] hover:bg-[#e0f1f5]'}`}>
                  {p === 'All' ? 'All Domains (9)' : p}
                </button>
              ))}
            </div>
          </div>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-[#e3ecec] py-4">
            {[
              ['1,420+', 'HPCSA-Verified Specialists'],
              ['380+', 'Peer-Reviewed Guides'],
              ['100%', 'Non-Commercial Standard'],
            ].map(([stat, label]) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="sr-only">{label}</dt>
                <dd className="text-2xl font-bold tracking-tight text-[#004340]">{stat}</dd>
                <dd className="text-xs text-[#3f4947]">{label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-[11px] text-[#6f7978]">Illustrative prototype figures from the design mockup, not live registry data.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDomains.map((d) => (
              <article key={d.name} className="flex flex-col rounded-xl border border-[#e3ecec] bg-white p-6 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e0f1f5] text-[#0d5c58]">{d.icon}</span>
                  <span className="text-xs font-semibold text-[#6f7978]">{d.guides}</span>
                </div>
                <h3 className="mt-4 font-bold">{d.name}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-6 text-[#3f4947]">{d.description}</p>
                <a href="#guides" className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-[#004340]">Browse domain <ArrowRight size={14} /></a>
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

      {/* Guides */}
      <section id="guides" className="border-y border-[#e3ecec] bg-white px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#6f7978]">EdTech Library</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight">Peer-Reviewed Clinical Guides</h2>
              <p className="mt-2 max-w-3xl text-[15px] text-[#3f4947]">Written with health communicators and vetted by licensed medical specialists.</p>
            </div>
            <a href="#guides" className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[#004340]">Explore all 380+ Guides <ArrowRight size={15} /></a>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {guides.map((g) => (
              <article key={g.title} className="flex flex-col overflow-hidden rounded-xl border border-[#e3ecec] bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image} alt={g.imageAlt} loading="lazy" className="h-44 w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    <span className="rounded-full bg-[#e6f7fa] px-2.5 py-1 text-[#004340]">{g.category}</span>
                    <span className="text-[#6f7978]">{g.time}</span>
                  </div>
                  <h3 className="mt-3 font-bold leading-snug">{g.title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-6 text-[#3f4947]">{g.summary}</p>
                  <div className="mt-4 border-t border-[#e6f7fa] pt-3 text-xs leading-5 text-[#3f4947]">
                    <p className="flex items-start gap-1.5"><BadgeCheck size={14} className="mt-0.5 shrink-0 text-[#128a58]" /> {g.reviewer}</p>
                    <p className="mt-0.5 pl-5 text-[#6f7978]">{g.ref}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-5 text-[#6f7978]">
            Guide images via Wikimedia Commons (freely licensed):{' '}
            {guides.map((g, i) => (
              <span key={g.creditUrl}>
                {i > 0 && ' · '}
                <a href={g.creditUrl} target="_blank" rel="noreferrer" className="underline hover:text-[#004340]">{g.category.toLowerCase()} photo</a>
              </span>
            ))}
            . Full author and licence details on each file page.
          </p>
        </div>
      </section>

      {/* AI navigator */}
      <section id="ai-navigator" className="px-4 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-[#6f7978]"><Bot size={14} /> Clinical Triage Engine</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Ground-truth clinical AI, bounded for patient safety.</h2>
            <p className="mt-3 text-[15px] leading-7 text-[#3f4947]">Unlike open-ended chatbots, our navigator cannot fabricate diagnoses or prescribe drugs. It maps your concerns against SASOG &amp; WHO guidelines to recommend appropriate clinical urgency and provider types.</p>
            <ul className="mt-4 space-y-2 text-sm font-medium text-[#3f4947]">
              {['Non-diagnostic, algorithmically bounded triage', 'Direct citations to peer-reviewed guidelines', 'Encrypted client-side under POPIA compliance'].map((t) => (
                <li key={t} className="flex items-center gap-2"><ShieldCheck size={16} className="shrink-0 text-[#128a58]" /> {t}</li>
              ))}
            </ul>
            <a href="#ai-navigator" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0d5c58] px-5 py-3 text-sm font-bold text-white hover:bg-[#09423f]"><Bot size={16} /> Open Safe Triage Session</a>
          </div>
          <div className="rounded-xl border border-[#e3ecec] bg-white p-5 shadow-[0_8px_24px_-4px_rgba(13,92,88,.08)]" aria-label="Triage preview">
            <p className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#3f4947]">
              <span className="inline-flex items-center gap-1.5"><Bot size={14} /> Triage Navigator · Safe Mode</span>
              <span className="rounded-full bg-[#e6f7fa] px-2 py-0.5 text-[#004340]">Non-diagnostic guidance</span>
            </p>
            <div className="ml-auto mt-3 max-w-[90%] rounded-xl rounded-br-sm bg-[#004340] p-3 text-[13px] leading-6 text-white">Severe pelvic cramping 3 days before bleeding and pain during bowel movements. Is this typical dysmenorrhea?</div>
            <div className="mt-3 rounded-xl rounded-bl-sm border border-[#e3ecec] bg-[#f0f6f5] p-4 text-[13px] leading-6">
              <p className="flex items-center gap-1.5 font-bold text-[#004340]"><Stethoscope size={14} /> Triage Assessment: Consult Recommended</p>
              <p className="mt-1 text-[#3f4947]">Premenstrual pain accompanied by dyschezia (painful bowel movements) is a clinical flag for potential deep endometriosis, rather than ordinary dysmenorrhea. Suggested next step: schedule a transvaginal ultrasound with an HPCSA-registered gynecologist experienced in endometriosis staging.</p>
              <p className="mt-2 text-xs font-bold text-[#3f4947]">Citations: <span className="font-semibold text-[#004340]">SASOG Endometriosis (2024)</span> · <span className="font-semibold text-[#004340]">Cochrane CD009590</span></p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="font-bold text-[#6f7978]">Try asking:</span>
              {['"Questions to ask my OB-GYN about PCOS"', '"First trimester scan timeline"'].map((q) => (
                <span key={q} className="rounded-full border border-[#d5e5e9] bg-[#f8fafb] px-2.5 py-1 font-medium text-[#3f4947]">{q}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Providers */}
      <section id="providers" className="border-t border-[#e3ecec] bg-white px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#6f7978]">Accredited Network</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight">Verified Medical Specialists</h2>
              <p className="mt-2 max-w-3xl text-[15px] text-[#3f4947]">Every clinician&apos;s HPCSA/SANC license is confirmed active and in good standing.</p>
              <p className="mt-1 text-xs text-[#6f7978]">Design preview — directory entries below are placeholders from the Stitch mockup, not live credential data.</p>
            </div>
            <a href="#providers" className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[#004340]">View all 1,420+ practitioners <ArrowRight size={15} /></a>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {providers.map((p) => (
              <article key={p.name} className="flex flex-col rounded-xl border border-[#e3ecec] bg-white p-6 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/placeholder-user.jpg" alt="" className="h-11 w-11 rounded-full bg-[#e0f1f5] object-cover ring-1 ring-[#d5e5e9]" />
                  <div>
                    <h3 className="font-bold leading-tight">{p.name}</h3>
                    <p className="text-xs text-[#3f4947]">{p.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-[#3f4947]">{p.cred}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#128a58]"><BadgeCheck size={14} /> {p.license} · Verified</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-[#3f4947]"><MapPin size={13} /> {p.location}</p>
                <p className="mt-1 text-xs text-[#3f4947]"><strong>Focus:</strong> {p.focus}</p>
                <span className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-[#004340] px-4 py-2.5 text-[13px] font-bold text-white">View Availability</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section id="governance" className="border-t border-[#e3ecec] bg-[#f8fafb] px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#6f7978]">Ethics &amp; Transparency</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight">Clinical Governance Charter</h2>
          <p className="mt-2 max-w-3xl text-[15px] text-[#3f4947]">Strict non-commercial boundaries, independent advisory oversight, and statutory compliance.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { n: '1.', title: 'Quadruple-Check Editorial Framework', text: 'Every guide is drafted by certified health communicators, reviewed by an HPCSA-registered gynecologist or midwife, and cross-referenced with SASOG, RCOG, or Cochrane data.' },
              { n: '2.', title: 'POPIA & Sovereign Data Shield', text: 'Under South Africa\u2019s Protection of Personal Information Act, personal health questions and triage inputs are client-side encrypted and never sold to third-party ad networks.' },
              { n: '3.', title: 'Independent Medical Advisory Board', text: 'Academic obstetricians, nurse-midwives, and pelvic physiotherapists retain unilateral veto power over directory listings and AI algorithmic safety bounds.' },
              { n: '4.', title: 'Fast-Track Clinical Discrepancy Reporting', text: 'Found an outdated clinical guideline or inaccurate listing? Our Clinical Safety Officer reviews flagged items within 24 hours.', cta: 'Flag discrepancy' },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-[#e3ecec] bg-white p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                <p className="font-bold"><span className="mr-1.5 text-[#0d5c58]">{c.n}</span> {c.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#3f4947]">{c.text}</p>
                {c.cta && <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-[#004340]">{c.cta} <ArrowRight size={14} /></span>}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#3f4947]">
            {['Non-Diagnostic Educational Standard', 'Zero Pharmaceutical Sponsorship', 'End-to-End Encrypted Triage Queries', 'HPCSA Registration Corroborated'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5"><BadgeCheck size={14} className="text-[#128a58]" /> {t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e3ecec] bg-white px-4 py-10 text-[13px] text-[#3f4947] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="flex items-center gap-2 font-bold text-[#004340]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/oru-social-logo.png" alt="" width={22} height={22} className="h-[22px] w-[22px] rounded-full object-cover ring-1 ring-[#d5e5e9]" /> ORU FemTech South Africa</p>
              <p className="mt-2 max-w-sm text-xs leading-5">Dedicated to improving reproductive autonomy, clinical transparency, and access to verified maternal and women&apos;s health clinicians across Southern Africa.</p>
              <a href="#governance" className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#ffdad6] px-3 py-1.5 text-xs font-bold text-[#93000a]"><Flag size={13} /> Report clinical inaccuracy</a>
            </div>
            <nav className="md:col-span-2" aria-label="Navigation">
              <p className="font-bold text-[#0f1e21]">Navigation</p>
              <ul className="mt-2 space-y-1.5 text-xs">
                <li><a href="#domains" className="hover:text-[#004340]">Clinical Domains</a></li>
                <li><a href="#guides" className="hover:text-[#004340]">EdTech Library</a></li>
                <li><a href="#providers" className="hover:text-[#004340]">HPCSA Directory</a></li>
                <li><a href="#ai-navigator" className="hover:text-[#004340]">AI Care Navigator</a></li>
              </ul>
            </nav>
            <nav className="md:col-span-2" aria-label="Clinical trust">
              <p className="font-bold text-[#0f1e21]">Clinical Trust</p>
              <ul className="mt-2 space-y-1.5 text-xs">
                <li><a href="#governance" className="hover:text-[#004340]">Editorial Charter</a></li>
                <li><a href="#governance" className="hover:text-[#004340]">Medical Board</a></li>
                <li><a href="#governance" className="hover:text-[#004340]">POPIA Privacy Shield</a></li>
                <li><a href="#guides" className="hover:text-[#004340]">Evidence Standards</a></li>
              </ul>
            </nav>
            <div className="md:col-span-3">
              <p className="font-bold text-[#0f1e21]">Emergency Hotlines</p>
              <p className="mt-2 text-xs leading-5">South African Medical Rescue:<br />112 (Cellular Dial)<br />10177 (Public Ambulance)</p>
            </div>
          </div>
          <div className="mt-8 border-t border-[#e3ecec] pt-4 text-[11px] leading-5 text-[#6f7978]">
            <p>Clinical Disclaimer: ORU FemTech is an educational navigation platform and does not offer individualized medical diagnosis or triage prescriptions. Always consult a qualified medical professional registered with the HPCSA or appropriate statutory council.</p>
            <p className="mt-1">© 2025 ORU FemTech SA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
