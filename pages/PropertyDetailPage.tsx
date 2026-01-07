import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Maximize, Bath, Bed, Zap, CheckCircle2, ArrowUpRight
} from 'lucide-react';
import Layout from '../components/Layout';
import { MOCK_PROPERTIES } from '../constants';
import { formatCurrency, generateWhatsAppLink } from '../utils';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = MOCK_PROPERTIES.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) return null;

  return (
    <Layout>
      <div className="min-h-screen">
        
        {/* HEADER: MASSIVE TITLE */}
        <div className="px-4 md:px-8 pt-12 pb-12 border-b border-white/20">
           <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white mb-8 transition-colors uppercase text-xs font-bold tracking-[0.3em]">
             <ArrowLeft className="w-4 h-4 mr-2" /> Index
           </Link>
           
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white uppercase leading-[0.8]">
                {property.title}
              </h1>
              <div className="text-right">
                <span className="block text-gold text-sm font-bold uppercase tracking-widest mb-2">Valuasi Aset</span>
                <span className="text-3xl md:text-5xl font-bold text-white font-mono">
                  {formatCurrency(property.price)}
                </span>
              </div>
           </div>
        </div>

        {/* HERO IMAGE */}
        <div className="w-full h-[60vh] md:h-[80vh] overflow-hidden relative border-b border-white/20">
           <img 
             src={property.images[0]} 
             alt="Hero" 
             className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
           />
           <div className="absolute bottom-0 left-0 bg-white text-black px-6 py-4 font-bold uppercase tracking-widest">
             {property.location}
           </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
            
            {/* LEFT: SPECS & DESC */}
            <div className="lg:col-span-8 border-r border-white/10">
               <div className="p-8 md:p-16">
                  <span className="text-gold text-xs font-bold uppercase tracking-[0.5em] mb-8 block">Intelijen Properti</span>
                  <p className="text-xl md:text-3xl font-heading font-bold text-white leading-tight uppercase mb-12">
                    {property.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-white/10">
                     <SpecItem label="Luas Tanah" value={`${property.specs.landSize} m²`} />
                     <SpecItem label="Luas Bangunan" value={`${property.specs.buildingSize} m²`} />
                     <SpecItem label="Kamar Tidur" value={property.specs.bedrooms} />
                     <SpecItem label="Kamar Mandi" value={property.specs.bathrooms} />
                     <SpecItem label="Sertifikat" value={property.specs.certificate} />
                     <SpecItem label="Listrik" value={`${property.specs.electricity} W`} />
                  </div>
               </div>

               {/* Gallery Strip */}
               <div className="border-t border-white/10">
                  {property.images.slice(1).map((img, idx) => (
                    <div key={idx} className="w-full aspect-[16/9] border-b border-white/10 relative group overflow-hidden">
                       <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                       <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase">View 0{idx+2}</div>
                    </div>
                  ))}
               </div>
            </div>

            {/* RIGHT: ACTION PANEL */}
            <div className="lg:col-span-4 bg-[#050505] p-8 md:p-12 sticky top-14 h-fit">
               <div className="mb-12">
                  <h3 className="text-2xl font-heading font-bold text-white uppercase mb-4">Status: Tersedia</h3>
                  <div className="w-full h-1 bg-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gold w-1/2 animate-pulse"></div>
                  </div>
               </div>

               <div className="space-y-6">
                  <p className="text-gray-400 text-sm font-mono leading-relaxed uppercase">
                    Aset ini tersedia untuk akuisisi segera. Hubungi tim elit kami untuk proses negosiasi tertutup.
                  </p>

                  <a
                    href={generateWhatsAppLink(`Saya tertarik mengakuisisi: ${property.title} [ID: ${property.id}]`)}
                    target="_blank"
                    className="group block w-full bg-white text-black border-2 border-white py-6 px-4 text-center font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                       Negosiasi Sekarang <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </a>
                  
                  <button className="block w-full bg-transparent text-white border-2 border-white/20 py-4 px-4 text-center font-bold uppercase tracking-widest hover:border-white transition-all">
                    Unduh Brosur
                  </button>
               </div>

               <div className="mt-20 pt-12 border-t border-white/10 text-center">
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">YEOBOLAND PROPERTY</p>
               </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

const SpecItem = ({ label, value }: { label: string, value: string | number }) => (
  <div>
    <span className="block text-gray-500 text-[10px] uppercase tracking-widest mb-2">{label}</span>
    <span className="block text-2xl font-heading font-bold text-white">{value}</span>
  </div>
);

export default PropertyDetailPage;