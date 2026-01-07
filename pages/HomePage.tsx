import React, { useState, useMemo } from 'react';
import { Search, ArrowDown, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import Layout from '../components/Layout';
import PropertyCard from '../components/PropertyCard';
import { MOCK_PROPERTIES, PROPERTY_TYPES } from '../constants';
import { FilterState, Property } from '../types';

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'Semua',
    minPrice: '',
    maxPrice: '',
    transactionType: 'Semua',
    sort: 'terbaru',
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((p: Property) => {
      const searchMatch =
        p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.location.toLowerCase().includes(filters.search.toLowerCase());
      if (!searchMatch) return false;
      if (filters.type !== 'Semua' && p.type !== filters.type) return false;
      if (filters.transactionType !== 'Semua' && p.transactionType !== filters.transactionType) return false;
      const price = p.price;
      const min = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const max = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
      if (price < min || price > max) return false;
      return true;
    }).sort((a, b) => {
      if (filters.sort === 'harga_rendah') return a.price - b.price;
      if (filters.sort === 'harga_tinggi') return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Layout>
      {/* SECTION 1: THE STATEMENT HERO */}
      <section className="min-h-[80vh] flex flex-col justify-end px-4 md:px-8 pb-12 relative overflow-hidden">
        {/* Giant Background Number/Text */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 pointer-events-none">
           <span className="text-[40rem] font-heading font-black text-white leading-none">01</span>
        </div>

        <div className="relative z-10 max-w-4xl mt-20 md:mt-0">
           <div className="flex items-center gap-4 mb-6">
              <span className="h-[2px] w-20 bg-gold"></span>
              <span className="text-gold font-bold tracking-[0.3em] uppercase text-sm">Real Estate Elite</span>
           </div>
           <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white uppercase leading-[0.85] tracking-tight mb-8">
             Tak Ada <br/> <span className="text-stroke text-transparent stroke-white">Kompetisi.</span>
           </h1>
           <p className="text-gray-400 text-lg md:text-xl max-w-lg font-light leading-relaxed border-l border-white/20 pl-6">
             Kami hanya menjual properti bagi mereka yang mengerti arti dominasi. 
             Hunian dan aset komersial yang tak tersentuh oleh pasar biasa.
           </p>
        </div>
      </section>

      {/* SECTION 2: MARQUEE SEPARATOR */}
      <div className="border-y border-white/20 bg-gold overflow-hidden py-3">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
           {[...Array(10)].map((_, i) => (
             <span key={i} className="text-black font-heading font-black text-2xl md:text-4xl uppercase tracking-tighter">
               YEOBOLAND EXCLUSIVE /// INVESTASI TANPA BATAS /// DOMINASI PASAR ///
             </span>
           ))}
        </div>
      </div>

      {/* SECTION 3: THE VAULT (FILTER & LIST) */}
      <section id="katalog" className="pt-20 px-4 md:px-8 min-h-screen">
         
         {/* Brutalist Filter Bar */}
         <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end justify-between mb-20 border-b-4 border-white pb-8">
            <div>
               <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase mb-2">The Vault.</h2>
               <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                 Index: {filteredProperties.length} Aset Terdeteksi
               </p>
            </div>
            
            <div className="w-full lg:w-auto flex flex-col md:flex-row gap-4">
               {/* Search Input - Brutal */}
               <div className="relative group w-full md:w-80">
                  <input 
                    type="text" 
                    placeholder="CARI LOKASI..." 
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full bg-transparent border-2 border-white/20 p-4 text-white font-bold uppercase placeholder-gray-700 focus:border-gold focus:outline-none transition-colors"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-gold" />
               </div>

               <button 
                 onClick={() => setShowFilters(!showFilters)}
                 className={`px-8 py-4 border-2 font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${showFilters ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-gold hover:text-gold'}`}
               >
                 <SlidersHorizontal className="w-4 h-4" /> Filter
               </button>
            </div>
         </div>

         {/* Filter Options Panel */}
         {showFilters && (
           <div className="mb-20 grid grid-cols-1 md:grid-cols-4 gap-8 bg-[#0a0a0a] p-8 border border-white/10 animate-fade-up">
              <div className="space-y-2">
                 <label className="text-xs text-gold uppercase tracking-widest font-bold">Transaksi</label>
                 <div className="flex flex-col gap-2">
                    {['Semua', 'Di Jual', 'Di Sewakan'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => handleFilterChange('transactionType', opt)}
                        className={`text-left text-sm font-bold uppercase py-2 px-4 border ${filters.transactionType === opt ? 'bg-gold text-black border-gold' : 'border-white/20 text-gray-500 hover:text-white'}`}
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs text-gold uppercase tracking-widest font-bold">Tipe Aset</label>
                 <select 
                   value={filters.type}
                   onChange={(e) => handleFilterChange('type', e.target.value)}
                   className="w-full bg-black border border-white/20 text-white p-3 uppercase text-sm font-bold focus:border-gold outline-none"
                 >
                   {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-xs text-gold uppercase tracking-widest font-bold">Urutkan</label>
                 <select 
                   value={filters.sort}
                   onChange={(e) => handleFilterChange('sort', e.target.value)}
                   className="w-full bg-black border border-white/20 text-white p-3 uppercase text-sm font-bold focus:border-gold outline-none"
                 >
                   <option value="terbaru">TERBARU</option>
                   <option value="harga_tinggi">HARGA TERTINGGI</option>
                   <option value="harga_rendah">HARGA TERENDAH</option>
                 </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => setFilters({ search: '', type: 'Semua', minPrice: '', maxPrice: '', transactionType: 'Semua', sort: 'terbaru' })}
                  className="w-full bg-white text-black font-bold uppercase py-3 tracking-widest hover:bg-gold transition-colors"
                >
                  Reset
                </button>
              </div>
           </div>
         )}

         {/* THE GRID - Brutal Lines */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-white/10">
            {filteredProperties.length > 0 ? filteredProperties.map((property, idx) => (
              <PropertyCard key={property.id} property={property} />
            )) : (
              <div className="col-span-full py-40 text-center border-r border-b border-white/10">
                 <h3 className="text-4xl font-heading font-bold text-white/20 uppercase">Data Kosong</h3>
              </div>
            )}
         </div>

      </section>
    </Layout>
  );
};

export default HomePage;