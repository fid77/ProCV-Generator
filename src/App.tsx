import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { CVForm } from './components/CVForm';
import { CVPreview } from './components/CVPreview';
import { CVData, initialCVData } from './types';
import { Download, FileText, Eye, Edit3, Github, Linkedin, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV`,
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary-500 selection:text-white relative overflow-x-hidden">
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200/20 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-200 group-hover:scale-110 transition-transform">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">ProCV</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 leading-none">Generator</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('edit')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  activeTab === 'edit' ? "bg-white text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Edit3 size={16} /> Edit
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  activeTab === 'preview' ? "bg-white text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Eye size={16} /> Preview
              </button>
            </div>

            <button
              onClick={() => handlePrint()}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 active:scale-95"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Section */}
          <div className={cn(
            "lg:col-span-5 space-y-8",
            activeTab === 'preview' ? "hidden lg:block" : "block"
          )}>
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tighter">Build your <span className="text-primary-600">CV</span></h2>
              <p className="text-slate-500 font-medium">Fill in your details and watch the magic happen.</p>
            </div>
            <CVForm data={cvData} onChange={setCvData} />
          </div>

          {/* Preview Section */}
          <div className={cn(
            "lg:col-span-7",
            activeTab === 'edit' ? "hidden lg:block" : "block"
          )}>
            <div className="sticky top-28 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    Live Preview
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-[10px] rounded-full uppercase tracking-widest font-black">A4 Format</span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time sync active</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-200 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-3 h-3 rounded-full bg-primary-300 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-3 h-3 rounded-full bg-primary-400 animate-bounce" />
                </div>
              </div>

              <div className="relative group">
                {/* Decorative background elements for more color */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary-500/10 via-transparent to-emerald-500/10 blur-2xl -z-10 rounded-[3rem]" />
                
                <div className="bg-white/40 p-4 sm:p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-primary-900/5 backdrop-blur-xl overflow-hidden flex justify-center items-start min-h-[500px] max-h-[calc(100vh-220px)] overflow-y-auto custom-scrollbar">
                  <div className="py-8 origin-top scale-[0.4] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.65] xl:scale-[0.75] 2xl:scale-[0.9] transition-all duration-500 ease-out">
                    <div className="shadow-[0_0_50px_-12px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden">
                      <CVPreview ref={componentRef} data={cvData} />
                    </div>
                  </div>
                </div>

                {/* Floating zoom indicator */}
                <div className="absolute bottom-6 right-6 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg text-[10px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
                  Auto-scaled to fit
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-20 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              <FileText size={18} />
            </div>
            <span className="font-black tracking-tighter text-lg bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">ProCV</span>
          </div>
          
          <p className="text-slate-400 text-sm font-medium">
            © 2026 ProCV Generator. Professional tools for professional people.
          </p>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#" className="hover:text-primary-600 transition-colors"><Github size={20} /></a>
            <a href="#" className="hover:text-primary-600 transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-primary-600 transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
      </footer>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white shadow-2xl border border-slate-200 p-1.5 rounded-2xl flex gap-1">
        <button
          onClick={() => setActiveTab('edit')}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
            activeTab === 'edit' ? "bg-primary-600 text-white shadow-lg shadow-primary-200" : "text-slate-500"
          )}
        >
          <Edit3 size={18} /> Edit
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
            activeTab === 'preview' ? "bg-primary-600 text-white shadow-lg shadow-primary-200" : "text-slate-500"
          )}
        >
          <Eye size={18} /> Preview
        </button>
      </div>
    </div>
  );
}
