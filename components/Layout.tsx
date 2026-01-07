import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { cn } from '../utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Cursor Logic
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    
    const hoverLinks = document.querySelectorAll('a, button, input, select');
    const onHover = () => cursorRef.current?.classList.add('hovered');
    const onLeave = () => cursorRef.current?.classList.remove('hovered');

    window.addEventListener('mousemove', moveCursor);
    hoverLinks.forEach(link => {
      link.addEventListener('mouseenter', onHover);
      link.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverLinks.forEach(link => {
        link.removeEventListener('mouseenter', onHover);
        link.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [location, isMenuOpen]); // Re-run when route changes or menu toggles

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="noise-bg"></div>
      <div ref={cursorRef} className="custom-cursor hidden md:block"></div>

      {/* Top Bar Status */}
      <div className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/90 backdrop-blur-sm flex justify-between items-center px-4 md:px-8 h-14">
         <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
           Est. 2024 // Bekasi
         </div>
         <div className="flex items-center gap-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold">System Online</span>
         </div>
      </div>

      {/* Main Navigation - Floating/Brutalist */}
      <nav className="fixed top-14 left-0 w-full z-40 pointer-events-none mix-blend-difference">
        <div className="px-4 md:px-8 py-8 flex justify-between items-start">
           <Link to="/" className="pointer-events-auto block group">
             <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter leading-[0.8] text-white group-hover:text-gold transition-colors duration-300">
               YEOBO<br/>LAND.
             </h1>
           </Link>
           
           <button 
             onClick={() => setIsMenuOpen(true)}
             className="pointer-events-auto flex flex-col items-end gap-2 group"
           >
             <span className="text-sm font-bold uppercase tracking-widest text-white group-hover:text-gold transition-colors">Menu</span>
             <div className="space-y-1.5">
               <span className="block w-8 h-[2px] bg-white group-hover:w-12 transition-all duration-300"></span>
               <span className="block w-12 h-[2px] bg-white group-hover:w-8 transition-all duration-300"></span>
             </div>
           </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-gold z-[60] flex flex-col justify-center items-center transition-transform duration-700 ease-in-out",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
         <button 
           onClick={() => setIsMenuOpen(false)}
           className="absolute top-8 right-8 p-4 hover:rotate-90 transition-transform duration-300"
         >
           <X className="w-12 h-12 text-black" />
         </button>

         <div className="flex flex-col gap-2 text-center">
            {[
              { label: 'Katalog', path: '/' },
              { label: 'Tentang', path: '/about' },
              { label: 'WhatsApp', href: `https://wa.me/${COMPANY_INFO.whatsapp}` }
            ].map((item, idx) => (
              item.href ? (
                <a 
                  key={idx}
                  href={item.href}
                  target="_blank"
                  className="text-6xl md:text-8xl font-heading font-black text-black hover:text-white transition-colors uppercase tracking-tighter leading-none"
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={idx}
                  to={item.path!} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-6xl md:text-8xl font-heading font-black text-black hover:text-white transition-colors uppercase tracking-tighter leading-none"
                >
                  {item.label}
                </Link>
              )
            ))}
         </div>
         <div className="absolute bottom-8 text-black text-xs font-bold tracking-[0.5em] uppercase">
            Dominasi Pasar Properti
         </div>
      </div>

      {/* Content */}
      <main className="pt-32 min-h-screen relative z-10 bg-black">
        {children}
      </main>

      {/* Footer - Massive */}
      <footer className="bg-black border-t border-white/20 pt-20 pb-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
           <div>
             <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 uppercase max-w-xl">
               Siap Menguasai Aset Masa Depan?
             </h2>
             <a 
               href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
               className="inline-flex items-center gap-4 text-gold border border-gold px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
             >
               Mulai Konsultasi <ArrowUpRight />
             </a>
           </div>
           <div className="flex flex-col justify-end items-start md:items-end text-left md:text-right">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Lokasi</div>
              <p className="text-xl md:text-2xl font-heading text-white">{COMPANY_INFO.location}</p>
              <p className="text-gray-500 mt-2">{COMPANY_INFO.legalName}</p>
           </div>
        </div>
        
        {/* Giant Text Footer */}
        <div className="border-t border-white/10 pt-4">
           <h1 className="text-[12vw] leading-none font-heading font-black text-white/5 select-none text-center">
             YEOBOLAND
           </h1>
        </div>
      </footer>
    </div>
  );
};

export default Layout;