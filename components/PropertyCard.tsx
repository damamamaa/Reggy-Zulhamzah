import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Property } from '../types';
import { formatCurrency } from '../utils';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link 
      to={`/property/${property.id}`} 
      className="group block relative border-r border-b border-white/10 overflow-hidden bg-black hover:bg-[#0a0a0a] transition-colors"
    >
      <div className="relative aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
         <img
           src={property.images[0]}
           alt={property.title}
           className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
         />
         {/* Overlay */}
         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
         
         {/* Corner Badge */}
         <div className="absolute top-0 left-0 bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-widest z-10">
           {property.type}
         </div>
      </div>

      <div className="p-8 relative">
         <div className="flex justify-between items-start mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 border ${property.transactionType === 'Di Jual' ? 'border-white text-white' : 'border-gold text-gold'}`}>
              {property.transactionType}
            </span>
            <span className="text-[10px] text-gray-500 font-mono tracking-widest">ID: {property.id.padStart(3, '0')}</span>
         </div>

         <h3 className="text-2xl font-heading font-bold text-white uppercase leading-[0.9] mb-4 group-hover:text-gold transition-colors">
           {property.title}
         </h3>

         <div className="space-y-4">
            <div className="flex items-center text-gray-400 text-xs uppercase tracking-widest border-b border-white/10 pb-4">
              <MapPin className="w-3 h-3 mr-2" />
              {property.location}
            </div>
            
            <div className="flex justify-between items-center pt-2">
               <div className="text-xl font-bold text-white">
                 {formatCurrency(property.price)}
               </div>
               <div className="w-10 h-10 bg-white text-black flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="w-6 h-6" />
               </div>
            </div>
         </div>
      </div>
    </Link>
  );
};

export default PropertyCard;