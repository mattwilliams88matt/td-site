import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Eye, 
  ShieldAlert, 
  Cpu, 
  Network, 
  Database, 
  ArrowRight, 
  CheckCircle2,
  Menu,
  X,
  Mail,
  BarChart3,
  Globe
} from 'lucide-react';
import { TAGLINES, CORE_VALUES, SOLUTIONS, VERTICALS } from './constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactEmail = "matt@techdiff.ai";
  const contactSubject = encodeURIComponent("New lead from website");
  const mailtoLink = `mailto:${contactEmail}?subject=${contactSubject}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-slate-900">TechDiff<span className="text-brand-600">.ai</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#solutions" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Solutions</a>
          <a href="#efficiency" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Efficiency</a>
          <a href="#resilience" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Resilience</a>
          <a 
            href={mailtoLink}
            className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
          >
            Contact Us
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-900">Solutions</a>
            <a href="#efficiency" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-900">Efficiency</a>
            <a href="#resilience" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-900">Resilience</a>
            <a href={mailtoLink} className="bg-brand-600 text-white px-6 py-3 rounded-xl text-center font-bold">Contact Us</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-100 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-50 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-6">
              Agentic AI for Enterprise
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-6 sm:mb-8">
              <AnimatePresence mode="wait">
                <motion.span
                  key={taglineIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="block"
                >
                  {TAGLINES[taglineIndex]}
                </motion.span>
              </AnimatePresence>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              TechDiff.ai provides your organization with a <span className="text-slate-900 font-semibold">Digital Prefrontal Cortex</span>. 
              We transform compliance from a reactive headache into a continuous, automated process that identifies risks before they become liabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`mailto:matt@techdiff.ai?subject=${encodeURIComponent("New lead from website")}`}
                className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-500/25"
              >
                Get a Strategic Audit
                <ChevronRight className="w-5 h-5" />
              </a>
              <a 
                href="#solutions"
                className="bg-white border border-slate-200 hover:border-brand-300 text-slate-700 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center"
              >
                Explore Solutions
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CORE_VALUES.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mb-6">
                {value.icon === 'Eye' && <Eye className="text-brand-600 w-6 h-6" />}
                {value.icon === 'Zap' && <Zap className="text-brand-600 w-6 h-6" />}
                {value.icon === 'ShieldAlert' && <ShieldAlert className="text-brand-600 w-6 h-6" />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
              <p className="text-slate-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionSection = ({ solution, index, id }: any) => {
  const isEven = index % 2 === 0;
  
  return (
    <section id={id} className={`py-16 sm:py-24 ${isEven ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{solution.title}</h2>
              <p className="text-brand-600 font-semibold text-lg mb-6">{solution.subtitle}</p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {solution.content}
              </p>
              <ul className="space-y-4 mb-10">
                {index === 1 ? ( // Token Burn specific points
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-600 w-5 h-5 mt-1 shrink-0" />
                      <span className="text-slate-700 font-medium">Semantic Caching: Reduce repeat query costs by up to 50%</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-600 w-5 h-5 mt-1 shrink-0" />
                      <span className="text-slate-700 font-medium">Intelligent Routing: Divert simple tasks to efficient edge models</span>
                    </li>
                  </>
                ) : index === 2 ? ( // Sovereign Edge specific points
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-600 w-5 h-5 mt-1 shrink-0" />
                      <span className="text-slate-700 font-medium">Store-and-Forward: Maintain data integrity during outages</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-600 w-5 h-5 mt-1 shrink-0" />
                      <span className="text-slate-700 font-medium">Air-Gapped Intelligence: Local compute for high-security environments</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-600 w-5 h-5 mt-1 shrink-0" />
                      <span className="text-slate-700 font-medium">24/7 Automated Audit Trails</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-600 w-5 h-5 mt-1 shrink-0" />
                      <span className="text-slate-700 font-medium">Connects fragmented data silos to compliance manuals</span>
                    </li>
                  </>
                )}
              </ul>
              <a 
                href={`mailto:matt@techdiff.ai?subject=${encodeURIComponent(`Inquiry regarding ${solution.title}`)}`}
                className="inline-flex items-center gap-2 text-brand-600 font-bold hover:gap-3 transition-all"
              >
                Learn more about this solution
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-8 flex items-center justify-center"
            >
              {index === 0 && <Eye className="w-32 h-32 text-brand-100" />}
              {index === 1 && <BarChart3 className="w-32 h-32 text-brand-100" />}
              {index === 2 && <Globe className="w-32 h-32 text-brand-100" />}
              
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Verticals = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Real-World Execution</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Our architecture bridges the gap between complex institutional systems and on-the-ground human operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VERTICALS.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              <h3 className="text-xl font-bold mb-4 text-brand-400">{v.title}</h3>
              <p className="text-slate-300 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("New lead from website");
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Company: ${formData.company}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:matt@techdiff.ai?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-16 sm:py-24 bg-brand-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8">
            Ready to turn compliance into a competitive advantage?
          </h2>
          <p className="text-brand-100 text-lg sm:text-xl leading-relaxed">
            Join the organizations transforming their operational resilience with TechDiff.ai. 
            Stop the token burn and start the automated audit.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700 block text-left">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-slate-900"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-bold text-slate-700 block text-left">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-slate-900"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-slate-700 block text-left">Work Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-slate-900"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-slate-700 block text-left">How can we help?</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your compliance or AI efficiency goals..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-slate-900 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
            >
              Contact Live Experts Today
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Cpu className="text-brand-600 w-6 h-6" />
          <span className="text-lg font-display font-bold text-slate-900">TechDiff.ai</span>
        </div>
        
        <div className="text-slate-500 text-sm">
          © {new Date().getFullYear()} TechDiff.ai. All rights reserved.
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-slate-400 hover:text-brand-600 transition-colors">LinkedIn</a>
          <a href="#" className="text-slate-400 hover:text-brand-600 transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <div id="solutions">
        {SOLUTIONS.map((solution, idx) => (
          <SolutionSection 
            key={solution.id} 
            solution={solution} 
            index={idx} 
            id={idx === 1 ? 'efficiency' : idx === 2 ? 'resilience' : solution.id}
          />
        ))}
      </div>

      <Verticals />
      <CTA />
      <Footer />
    </div>
  );
}
