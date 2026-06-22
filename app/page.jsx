'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Heart, Brain, Shield, Zap } from 'lucide-react';

export default function LivoAppsWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0B1D33] text-white font-sans">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0B1D33] shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white" fontFamily="serif">L</text>
                <path d="M 20 18 Q 25 22 22 28" stroke="#7AC143" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-wider">LIVO APPS</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#product" className="hover:text-[#7AC143] transition">Product</a>
            <a href="#solutions" className="hover:text-[#7AC143] transition">Solutions</a>
            <a href="#pricing" className="hover:text-[#7AC143] transition">Pricing</a>
            <a href="#about" className="hover:text-[#7AC143] transition">About</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm hover:text-[#7AC143] transition">Log in</button>
            <button className="bg-[#7AC143] text-[#0B1D33] px-6 py-2 rounded hover:bg-[#6AB030] transition font-semibold text-sm">Book a Demo</button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-[#0B1D33] border-t border-[#1A2F47] p-6">
            <div className="flex flex-col gap-4">
              <a href="#product" className="hover:text-[#7AC143]">Product</a>
              <a href="#solutions" className="hover:text-[#7AC143]">Solutions</a>
              <a href="#pricing" className="hover:text-[#7AC143]">Pricing</a>
              <a href="#about" className="hover:text-[#7AC143]">About</a>
              <button className="bg-[#7AC143] text-[#0B1D33] px-6 py-2 rounded font-semibold mt-4">Book a Demo</button>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-[#7AC143] text-sm font-semibold mb-4 tracking-wide">SOFTWARE THAT LIGHTENS</div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">Software that <span className="text-[#7AC143]">lightens</span> the workflow.</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">Not just by automating tasks. But by reducing friction. Making complexity understandable. And creating calm in busy organizations.</p>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-[#7AC143] text-[#0B1D33] px-8 py-3 rounded hover:bg-[#6AB030] transition font-semibold flex items-center gap-2">Book a Demo <ArrowRight size={18} /></button>
            <button className="border border-gray-500 px-8 py-3 rounded hover:border-[#7AC143] transition font-semibold">Explore the Product</button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="bg-[#1A2F47] rounded-lg p-8 aspect-square flex items-center justify-center border border-[#2A3F57]">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7AC143] to-[#5A9030] rounded-lg mb-4 mx-auto flex items-center justify-center"><Zap size={32} /></div>
              <p className="text-sm text-gray-400">PPWR Dashboard Preview</p>
              <p className="text-xs text-gray-500 mt-2">Compliance. Simplified.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white text-[#0B1D33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold text-[#7AC143] mb-4 tracking-wide">01 OUR BRAND</div>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">Who we are</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Livo Apps develops elegant software that removes complexity from everyday business processes.</p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">We believe software should not overwhelm people. Software should create clarity. Software should feel light.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Our promise</h3>
              <p className="text-lg font-semibold text-[#0B1D33] mb-3">Software that lightens the workflow.</p>
              <p className="text-lg text-gray-700 leading-relaxed">Not just by automating tasks. But by reducing friction. Making complexity understandable. And creating calm in busy organizations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#0B1D33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold text-[#7AC143] mb-4 tracking-wide">02 BRAND PERSONALITY</div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center"><div className="w-16 h-16 mx-auto mb-4 border-2 border-[#7AC143] rounded-full flex items-center justify-center"><Heart size={28} className="text-[#7AC143]" /></div><h4 className="font-bold text-lg mb-2">Elegant</h4><p className="text-gray-400 text-sm">Never noisy.</p></div>
            <div className="text-center"><div className="w-16 h-16 mx-auto mb-4 border-2 border-[#7AC143] rounded-full flex items-center justify-center"><Brain size={28} className="text-[#7AC143]" /></div><h4 className="font-bold text-lg mb-2">Intelligent</h4><p className="text-gray-400 text-sm">Never arrogant.</p></div>
            <div className="text-center"><div className="w-16 h-16 mx-auto mb-4 border-2 border-[#7AC143] rounded-full flex items-center justify-center"><Heart size={28} className="text-[#7AC143]" /></div><h4 className="font-bold text-lg mb-2">Human</h4><p className="text-gray-400 text-sm">Never bureaucratic.</p></div>
            <div className="text-center"><div className="w-16 h-16 mx-auto mb-4 border-2 border-[#7AC143] rounded-full flex items-center justify-center"><Shield size={28} className="text-[#7AC143]" /></div><h4 className="font-bold text-lg mb-2">Confident</h4><p className="text-gray-400 text-sm">Never aggressive.</p></div>
          </div>
        </div>
      </section>

      <section id="product" className="py-20 px-6 bg-white text-[#0B1D33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-semibold text-[#7AC143] mb-4 tracking-wide">03 OUR FIRST PRODUCT</div>
          <h2 className="text-4xl font-bold mb-4">PPWR Dashboard</h2>
          <p className="text-lg text-gray-700 mb-12">Transform packaging regulations into clear actions.</p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-[#0B1D33] rounded-lg p-8 aspect-video flex items-center justify-center border border-[#2A3F57]">
              <div className="text-center"><div className="text-4xl font-bold text-[#7AC143] mb-2">92%</div><p className="text-gray-400 text-sm">Compliance Score</p></div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4"><div className="w-6 h-6 rounded-full bg-[#7AC143] flex-shrink-0 flex items-center justify-center mt-1"><span className="text-[#0B1D33] text-xs font-bold">&#10003;</span></div><div><h4 className="font-bold text-lg mb-2">Monitor compliance in real time</h4><p className="text-gray-600">All your packaging data in one place. Always audit-ready.</p></div></div>
              <div className="flex gap-4"><div className="w-6 h-6 rounded-full bg-[#7AC143] flex-shrink-0 flex items-center justify-center mt-1"><span className="text-[#0B1D33] text-xs font-bold">&#10003;</span></div><div><h4 className="font-bold text-lg mb-2">Automated reporting</h4><p className="text-gray-600">Generate PPWR-compliant reports in minutes, not days.</p></div></div>
              <div className="flex gap-4"><div className="w-6 h-6 rounded-full bg-[#7AC143] flex-shrink-0 flex items-center justify-center mt-1"><span className="text-[#0B1D33] text-xs font-bold">&#10003;</span></div><div><h4 className="font-bold text-lg mb-2">Collaborate with suppliers</h4><p className="text-gray-600">Share data securely. Work together. No friction.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#0B1D33] border-t border-[#1A2F47]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400 text-sm tracking-wide">Trusted by forward-thinking teams in packaging and compliance.</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white text-[#0B1D33]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to <span className="text-[#7AC143]">lighten</span> the workflow?</h2>
          <p className="text-lg text-gray-700 mb-8">Book a personalized demo and see how Livo can transform your compliance process.</p>
          <button className="bg-[#7AC143] text-[#0B1D33] px-8 py-4 rounded hover:bg-[#6AB030] transition font-semibold flex items-center gap-2 mx-auto text-lg">Book a Demo <ArrowRight size={20} /></button>
        </div>
      </section>

      <footer className="bg-[#0B1D33] border-t border-[#1A2F47] px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 relative">
                  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white" fontFamily="serif">L</text>
                    <path d="M 20 18 Q 25 22 22 28" stroke="#7AC143" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-lg font-bold tracking-wider">LIVO APPS</span>
              </div>
              <p className="text-gray-400 text-sm">Software that lightens the workflow.</p>
            </div>
            <div><h4 className="font-bold mb-4 text-sm tracking-wide">PRODUCT</h4><ul className="space-y-3 text-sm text-gray-400"><li><a href="#" className="hover:text-[#7AC143]">PPWR Dashboard</a></li><li><a href="#" className="hover:text-[#7AC143]">Features</a></li><li><a href="#" className="hover:text-[#7AC143]">Pricing</a></li></ul></div>
            <div><h4 className="font-bold mb-4 text-sm tracking-wide">COMPANY</h4><ul className="space-y-3 text-sm text-gray-400"><li><a href="#" className="hover:text-[#7AC143]">About Us</a></li><li><a href="#" className="hover:text-[#7AC143]">Careers</a></li><li><a href="#" className="hover:text-[#7AC143]">Contact</a></li></ul></div>
            <div><h4 className="font-bold mb-4 text-sm tracking-wide">LEGAL</h4><ul className="space-y-3 text-sm text-gray-400"><li><a href="#" className="hover:text-[#7AC143]">Privacy Policy</a></li><li><a href="#" className="hover:text-[#7AC143]">Terms</a></li></ul></div>
          </div>
          <div className="border-t border-[#1A2F47] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2026 Livo Apps. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0"><a href="#" className="hover:text-[#7AC143]">LinkedIn</a><a href="#" className="hover:text-[#7AC143]">Twitter</a><a href="#" className="hover:text-[#7AC143]">Email</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
