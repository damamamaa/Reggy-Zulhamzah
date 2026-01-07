import React from 'react';
import Layout from '../components/Layout';
import { COMPANY_INFO } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* Title Section */}
      <div className="pt-20 pb-20 px-4 md:px-8 border-b border-white/20">
         <h1 className="text-[15vw] leading-[0.8] font-heading font-black text-white text-center uppercase tracking-tighter mix-blend-difference">
           UNBEATABLE
         </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
         <div className="p-8 md:p-20 border-r border-white/20 bg-[#0a0a0a]">
            <span className="text-gold font-bold uppercase tracking-[0.5em] text-xs mb-8 block">Manifesto</span>
            <p className="text-xl md:text-3xl font-heading font-bold text-white uppercase leading-snug mb-12">
              Kami tidak bermain di liga rata-rata. Yeoboland diciptakan untuk mereka yang menolak kompromi dalam berinvestasi.
            </p>
            <p className="text-gray-400 leading-relaxed font-mono text-sm max-w-md">
              <strong className="text-white block mb-4 text-lg">PT. Yeoboland Alfazza Propertindo</strong>
              Didirikan dengan satu tujuan: Mendominasi pasar properti Bekasi dengan inventaris paling eksklusif dan layanan paling agresif. Kami adalah mitra strategis bagi para pemenang.
            </p>
         </div>
         
         <div className="p-8 md:p-20 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-30 group-hover:opacity-50 transition-opacity duration-1000"></div>
            <div className="relative z-10">
               <div className="border-l-4 border-gold pl-8">
                  <h3 className="text-4xl font-heading font-bold text-white uppercase mb-2">Visi Absolut</h3>
                  <p className="text-gray-300 font-mono text-sm uppercase">Menjadi satu-satunya pilihan bagi elit properti.</p>
               </div>
            </div>
         </div>
      </div>

      {/* Stats / Power */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-white/20 bg-white text-black">
         {[
           ['Total Aset', '150+'],
           ['Valuasi Terjual', '500M+'],
           ['Klien Elite', '1.2K'],
           ['Area Dominasi', '8+']
         ].map(([label, val], idx) => (
           <div key={idx} className="p-8 md:p-12 border-r border-black/10 text-center hover:bg-gold transition-colors">
              <span className="block text-4xl md:text-6xl font-heading font-black tracking-tighter">{val}</span>
              <span className="block text-xs font-bold uppercase tracking-widest mt-2">{label}</span>
           </div>
         ))}
      </div>
    </Layout>
  );
};

export default AboutPage;