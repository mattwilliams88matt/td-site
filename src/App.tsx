import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Cpu,
  Eye,
  Globe,
  Mail,
  Menu,
  Network,
  ShieldAlert,
  Sparkles,
  TimerReset,
  X,
  Zap,
} from 'lucide-react';
import {
  CORE_VALUES,
  FAQS,
  HERO_METRICS,
  NAV_ITEMS,
  PLATFORM_PANELS,
  ROADMAP,
  SOLUTIONS,
  TAGLINES,
  USE_CASES,
} from './constants';

type FormState = {
  name: string;
  company: string;
  email: string;
  challenge: string;
};

const contactEmail = 'matt@techdiff.ai';
const defaultSubject = encodeURIComponent('NEW LEAD GENERATED');
const baseLeadMailto = `mailto:${contactEmail}?subject=${defaultSubject}`;

const iconMap = {
  Eye,
  Zap,
  ShieldAlert,
} as const;

const pillClass =
  'inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur';

function createMailto(formState: FormState, plannerSummary: string) {
  const body = encodeURIComponent(
    `Name: ${formState.name}\nCompany: ${formState.company}\nEmail: ${formState.email}\n\nPrimary challenge:\n${formState.challenge}\n\nPlanner summary:\n${plannerSummary}`,
  );

  return `${baseLeadMailto}&body=${body}`;
}

function launchLeadEmail(mailtoHref = baseLeadMailto) {
  window.location.assign(mailtoHref);
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-slate-200/80 bg-white/88 py-3 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-cyan-950/20">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <div className="font-display text-lg font-bold tracking-tight text-slate-950">TechDiff.ai</div>
            <div className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">Operational intelligence</div>
          </div>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-cyan-700"
            >
              {item.label}
            </a>
          ))}
          <a
            href={baseLeadMailto}
            onClick={(event) => {
              event.preventDefault();
              launchLeadEmail();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Book intro call
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="mx-4 mt-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={baseLeadMailto}
                onClick={(event) => {
                  event.preventDefault();
                  setMobileMenuOpen(false);
                  launchLeadEmail();
                }}
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-base font-semibold text-white"
              >
                Book intro call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTaglineIndex((index) => (index + 1) % TAGLINES.length);
    }, 3600);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="relative z-10">
          <div className={pillClass}>
            <Sparkles className="h-3.5 w-3.5" />
            Mobile-first agentic compliance platform
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={taglineIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="block"
              >
                {TAGLINES[taglineIndex]}
              </motion.span>
            </AnimatePresence>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            TechDiff.ai helps regulated and high-trust teams run AI with clarity. We connect governance,
            routing, audit evidence, and edge resilience into one app that feels crisp on iPhone, Android,
            and desktop Chrome.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={baseLeadMailto}
              onClick={(event) => {
                event.preventDefault();
                launchLeadEmail();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-4 text-base font-bold text-slate-950 transition-transform hover:-translate-y-0.5"
            >
              Launch readiness planner
              <ChevronRight className="h-5 w-5" />
            </a>
            <a
              href={baseLeadMailto}
              onClick={(event) => {
                event.preventDefault();
                launchLeadEmail();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-7 py-4 text-base font-bold text-white backdrop-blur transition-colors hover:bg-white/14"
            >
              Explore platform
            </a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="glass-panel rounded-3xl p-5">
                <div className="text-3xl font-bold text-white">{metric.value}</div>
                <div className="mt-2 text-sm font-semibold text-cyan-100">{metric.label}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{metric.note}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="dashboard-shell">
            <div className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Live readiness</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-950">Operational signal board</h2>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  Healthy
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950 p-5 text-white">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-cyan-300" />
                    <span className="text-sm font-semibold text-slate-200">Risk exceptions</span>
                  </div>
                  <div className="mt-6 text-4xl font-bold">12</div>
                  <p className="mt-2 text-sm text-slate-400">9 routed automatically, 3 need review.</p>
                </div>
                <div className="rounded-3xl bg-cyan-50 p-5">
                  <div className="flex items-center gap-3 text-cyan-800">
                    <Network className="h-5 w-5" />
                    <span className="text-sm font-semibold">Edge availability</span>
                  </div>
                  <div className="mt-6 text-4xl font-bold text-slate-950">99.98%</div>
                  <p className="mt-2 text-sm text-slate-600">Disconnected sites continue collecting evidence locally.</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3">
                {[
                  ['Policy drift detected', 'Legal ops', 'Needs approval'],
                  ['Model routing savings', 'Platform team', '42% lower spend'],
                  ['Offline sync complete', 'Field operations', '8 minutes ago'],
                ].map(([title, owner, status]) => (
                  <div
                    key={title}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{title}</div>
                      <div className="text-sm text-slate-500">{owner}</div>
                    </div>
                    <div className="text-right text-sm font-semibold text-slate-700">{status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CoreValueGrid() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {CORE_VALUES.map((value, index) => {
          const Icon = iconMap[value.icon as keyof typeof iconMap];
          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.45)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-slate-950">{value.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{value.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section id="platform" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="section-label">Platform experience</div>
          <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-5xl">
            Built like a product your operators will actually want to use
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            The experience is tuned for on-the-go reviews, executive summaries, and desktop deep dives. We
            prioritize clarity, speed, and large touch-friendly actions over cluttered enterprise screens.
          </p>
        </div>
        <div className="grid gap-5">
          {PLATFORM_PANELS.map((panel) => (
            <div
              key={panel.title}
              className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(8,47,73,0.4)] sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700">{panel.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-950">{panel.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{panel.body}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {panel.bullets.map((bullet) => (
                  <span
                    key={bullet}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    {bullet}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionVisual({ visual }: { visual: string }) {
  if (visual === 'cost') {
    return (
      <div className="visual-card bg-[linear-gradient(135deg,#ecfeff_0%,#f8fafc_100%)]">
        <CircleDollarSign className="h-14 w-14 text-cyan-700" />
        <div className="mt-6 grid w-full gap-3">
          {[
            ['Foundation model spend', '61%'],
            ['Cache hit rate', '48%'],
            ['Edge-routed tasks', '73%'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
              <div className="text-sm text-slate-500">{label}</div>
              <div className="text-2xl font-bold text-slate-950">{value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual === 'edge') {
    return (
      <div className="visual-card bg-[linear-gradient(140deg,#0f172a_0%,#164e63_100%)] text-white">
        <Globe className="h-14 w-14 text-cyan-300" />
        <div className="mt-6 space-y-3 text-left">
          {['Local decision support', 'Deferred sync queue', 'Fail-safe evidence retention'].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
              <div className="font-semibold">{item}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="visual-card bg-[linear-gradient(140deg,#f8fafc_0%,#cffafe_100%)]">
      <ClipboardCheck className="h-14 w-14 text-cyan-700" />
      <div className="mt-6 w-full space-y-3">
        {['Evidence attached', 'Owner assigned', 'Policy linked'].map((item, index) => (
          <div key={item} className="flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
            <div className="font-semibold text-slate-800">{item}</div>
            <div className="text-sm font-semibold text-cyan-700">{index + 1}/3</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionsSection() {
  return (
    <section id="solutions" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="section-label">Solutions</div>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl text-3xl font-bold text-slate-950 sm:text-5xl">
            A responsive app shell wrapped around real operational outcomes
          </h2>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            Each module is presented as a touch-friendly workflow so teams can review, act, and explain
            decisions from any device.
          </p>
        </div>
        <div className="mt-10 grid gap-6">
          {SOLUTIONS.map((solution, index) => (
            <motion.article
              key={solution.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ delay: index * 0.08 }}
              className={`grid gap-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_35px_90px_-60px_rgba(2,132,199,0.5)] sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center ${
                index % 2 === 1 ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
              }`}
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">{solution.subtitle}</p>
                <h3 className="mt-3 text-3xl font-bold text-slate-950">{solution.title}</h3>
                <p className="mt-4 text-lg leading-8 text-slate-600">{solution.content}</p>
                <div className="mt-6 grid gap-3">
                  {solution.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                      <span className="text-slate-700">{bullet}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={baseLeadMailto}
                  onClick={(event) => {
                    event.preventDefault();
                    launchLeadEmail();
                  }}
                  className="mt-7 inline-flex items-center gap-2 text-base font-bold text-cyan-800 transition-all hover:gap-3"
                >
                  Talk through this workflow
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
              <SolutionVisual visual={solution.visual} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlannerSection() {
  const [teamSize, setTeamSize] = useState(24);
  const [monthlyReviews, setMonthlyReviews] = useState(18);
  const [aiSpend, setAiSpend] = useState(12000);
  const [edgeNeed, setEdgeNeed] = useState(true);

  const score = useMemo(() => {
    const teamFactor = Math.min(30, Math.round(teamSize / 2));
    const reviewFactor = Math.min(35, monthlyReviews * 2);
    const spendFactor = Math.min(20, Math.round(aiSpend / 1500));
    const edgeFactor = edgeNeed ? 15 : 5;
    return Math.min(100, teamFactor + reviewFactor + spendFactor + edgeFactor);
  }, [teamSize, monthlyReviews, aiSpend, edgeNeed]);

  const annualSavings = useMemo(() => Math.round(aiSpend * 0.38 * 12), [aiSpend]);
  const hoursRecovered = useMemo(() => monthlyReviews * 6, [monthlyReviews]);

  return (
    <section id="planner" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="section-label">Readiness planner</div>
          <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-5xl">Model the opportunity before you commit</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            This planner gives stakeholders a quick estimate of where TechDiff.ai can tighten operations,
            reduce AI waste, and improve audit responsiveness.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] bg-slate-950 p-6 text-white">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Potential annual savings</div>
              <div className="mt-4 text-4xl font-bold">${annualSavings.toLocaleString()}</div>
              <p className="mt-3 text-sm leading-6 text-slate-300">Estimate based on routing, caching, and lower repeat-query waste.</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Hours recovered monthly</div>
              <div className="mt-4 text-4xl font-bold text-slate-950">{hoursRecovered}</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">Approximate human time saved from evidence prep and repetitive reporting.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-[0_38px_100px_-70px_rgba(2,132,199,0.45)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Deployment fit score</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-950">{score}/100</h3>
            </div>
            <div className="w-full max-w-xs rounded-full bg-slate-100 p-1">
              <div className="h-3 rounded-full bg-[linear-gradient(90deg,#0f172a_0%,#0891b2_55%,#67e8f9_100%)]" style={{ width: `${score}%` }} />
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <label className="block">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                Team members involved in compliance or AI operations
                <span>{teamSize}</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                value={teamSize}
                onChange={(event) => setTeamSize(Number(event.target.value))}
                className="slider mt-3"
              />
            </label>

            <label className="block">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                Review cycles or audit prep events each month
                <span>{monthlyReviews}</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={monthlyReviews}
                onChange={(event) => setMonthlyReviews(Number(event.target.value))}
                className="slider mt-3"
              />
            </label>

            <label className="block">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                Monthly AI spend
                <span>${aiSpend.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={aiSpend}
                onChange={(event) => setAiSpend(Number(event.target.value))}
                className="slider mt-3"
              />
            </label>
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-[28px] bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">Need offline or edge resilience?</div>
              <p className="mt-1 text-sm text-slate-600">Toggle this if teams operate in low-connectivity or sensitive environments.</p>
            </div>
            <button
              type="button"
              onClick={() => setEdgeNeed((value) => !value)}
              className={`inline-flex min-w-32 items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                edgeNeed ? 'bg-slate-950 text-white' : 'bg-white text-slate-700'
              }`}
            >
              {edgeNeed ? 'Edge required' : 'Cloud only'}
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ['Governance fit', score > 70 ? 'Strong' : 'Moderate'],
              ['Cost priority', aiSpend > 10000 ? 'High' : 'Growing'],
              ['Rollout path', edgeNeed ? 'Hybrid edge' : 'Centralized'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 px-4 py-4">
                <div className="text-sm text-slate-500">{label}</div>
                <div className="mt-2 text-lg font-bold text-slate-950">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl rounded-[36px] bg-slate-950 px-6 py-10 text-white sm:px-10 sm:py-14">
        <div className="section-label section-label-dark">Where it fits</div>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl text-3xl font-bold sm:text-5xl">Designed for environments where failure is expensive</h2>
          <p className="max-w-xl text-lg leading-8 text-slate-300">
            We focus on operational contexts where governance, uptime, and explainability need to coexist.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {USE_CASES.map((useCase) => (
            <div key={useCase.title} className="rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
                <TimerReset className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-bold">{useCase.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section id="roadmap" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="section-label">Roadmap</div>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold text-slate-950 sm:text-5xl">A four-week launch path that stays readable on every screen</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {ROADMAP.map((step, index) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.06 }}
              className="rounded-[28px] border border-slate-200 bg-white p-6"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">{step.phase}</div>
              <h3 className="mt-3 text-2xl font-bold text-slate-950">{step.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="section-label">FAQs</div>
          <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-5xl">Questions teams ask before rollout</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            The common concerns are usually device fit, governance boundaries, and how much of the workflow can be automated responsibly.
          </p>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={faq.question} className="rounded-[28px] border border-slate-200 bg-white p-3 sm:p-4">
              <button
                type="button"
                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 rounded-[22px] px-3 py-3 text-left sm:px-4"
              >
                <span className="text-lg font-bold text-slate-950">{faq.question}</span>
                <span className="text-sm font-semibold text-cyan-700">{index === openIndex ? 'Hide' : 'Open'}</span>
              </button>
              <AnimatePresence initial={false}>
                {index === openIndex && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-3 pb-4 sm:px-4"
                  >
                    <p className="text-base leading-7 text-slate-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    challenge: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const plannerSummary = 'Looking for a mobile-ready compliance and AI operations rollout conversation.';
  const mailtoHref = createMailto(formState, plannerSummary);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    launchLeadEmail(mailtoHref);
  }

  return (
    <section id="contact" className="px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-16 sm:px-6 sm:pb-24 sm:pt-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[36px] bg-[linear-gradient(145deg,#0f172a_0%,#155e75_100%)] p-8 text-white sm:p-10">
          <div className={pillClass}>Direct intake</div>
          <h2 className="mt-5 text-3xl font-bold sm:text-5xl">Turn this prototype into your launch conversation</h2>
          <p className="mt-5 text-lg leading-8 text-slate-200">
            Share your biggest governance, compliance, or AI efficiency challenge and this app will hand off the details through your default mail client.
          </p>
          <div className="mt-8 space-y-4">
            {[
              'Responsive across phones, tablets, and desktop',
              'Clear operator-focused information architecture',
              'Interactive readiness and ROI planning',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                <span className="text-slate-100">{item}</span>
              </div>
            ))}
          </div>
          {submitted && (
            <div className="mt-6 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              Your mail app should open with the drafted inquiry. If it does not, use the direct email link on the right.
            </div>
          )}
        </div>

        <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-[0_38px_100px_-70px_rgba(15,23,42,0.4)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
                <input
                  required
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Jordan Lee"
                  className="input-field"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Company</span>
                <input
                  required
                  type="text"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  placeholder="Northstar Logistics"
                  className="input-field"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Work email</span>
              <input
                required
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="jordan@company.com"
                className="input-field"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Primary challenge</span>
              <textarea
                required
                name="challenge"
                rows={5}
                value={formState.challenge}
                onChange={handleChange}
                placeholder="Describe the compliance, governance, routing, or edge reliability problem you want to solve."
                className="input-field resize-none"
              />
            </label>

            <div className="rounded-[28px] bg-slate-50 p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Draft handoff summary</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                The form packages your contact details and challenge into a pre-filled email so you can keep the site static while still making the app feel complete.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Draft intro email
                <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href={baseLeadMailto}
                onClick={(event) => {
                  event.preventDefault();
                  launchLeadEmail();
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-4 text-base font-bold text-slate-700"
              >
                Email directly
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-slate-900">TechDiff.ai</div>
            <div>Responsive product concept for AI operations and compliance.</div>
          </div>
        </div>
        <div>© {new Date().getFullYear()} TechDiff.ai. Built for mobile, tablet, and desktop review.</div>
      </div>
    </footer>
  );
}

function MobileDock() {
  return (
    <div className="mobile-dock md:hidden">
      <a
        href={baseLeadMailto}
        onClick={(event) => {
          event.preventDefault();
          launchLeadEmail();
        }}
        className="mobile-dock-link mobile-dock-link-primary"
      >
        Planner
      </a>
      <a
        href={baseLeadMailto}
        onClick={(event) => {
          event.preventDefault();
          launchLeadEmail();
        }}
        className="mobile-dock-link"
      >
        Contact
      </a>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6fbff] text-slate-950">
      <Navbar />
      <main>
        <Hero />
        <CoreValueGrid />
        <PlatformSection />
        <SolutionsSection />
        <PlannerSection />
        <UseCasesSection />
        <RoadmapSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileDock />
    </div>
  );
}
