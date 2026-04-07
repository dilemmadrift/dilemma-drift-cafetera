import { shopifyFetch, createCart } from '../lib/shopify';
import { ArrowRight, BatteryCharging, Droplets, Zap, Star, Lock, Coffee, Thermometer, ShieldCheck, Check, X } from "lucide-react";
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const query = `
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            variants(first: 1) { edges { node { id } } }
            images(first: 3) { edges { node { url } } }
            priceRange { minVariantPrice { amount } }
          }
        }
      }
    }
  `;

  const { body } = await shopifyFetch({ query });
  const products = body?.data?.products?.edges || [];
  
  const productNode = products.find(p => 
    p.node.title.toUpperCase().includes('ESPRESSO') || 
    p.node.title.toUpperCase().includes('AUTONOMOUS')
  )?.node;

  if (!productNode) return <div className="p-20 text-white bg-black min-h-screen text-center tracking-widest uppercase font-mono">System Offline. Data Fractured.</div>;

  const price = parseFloat(productNode.priceRange.minVariantPrice.amount).toFixed(2);
  const variantId = productNode.variants.edges[0]?.node?.id;
  const compareAtPrice = (price * 1.5).toFixed(2); 

  async function buyNow(formData) {
    "use server";
    const vId = formData.get('variantId');
    const checkoutUrl = await createCart(vId);
    if (checkoutUrl) redirect(checkoutUrl);
  }

  const PaymentIcons = () => (
    <div className="flex justify-center gap-3 items-center opacity-40 mt-4">
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/apple-pay.svg?v=1614338903" alt="Apple Pay" className="h-4 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/paypal.svg?v=1614338903" alt="PayPal" className="h-4 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/visa.svg?v=1614338903" alt="Visa" className="h-4 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/mastercard.svg?v=1614338903" alt="Mastercard" className="h-4 filter invert" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black antialiased">
      
      {/* Cinta Infinita de Urgencia */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
      <div className="bg-white text-black py-2 overflow-hidden relative z-50 border-b border-gray-300">
        <div className="animate-marquee whitespace-nowrap text-[10px] font-black tracking-[0.2em] uppercase flex items-center">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="mx-8">⚡ GLOBAL LAUNCH: 50% OFF + FREE SHIPPING</span>
          ))}
        </div>
      </div>

      <nav className="p-6 border-b border-white/5 flex justify-between items-center bg-[#050505]/90 backdrop-blur-md sticky top-0 z-40">
        <h1 className="text-xs font-bold tracking-[0.4em] uppercase text-white/60">DILEMMA DRIFT</h1>
      </nav>

      {/* Main E-commerce Layout: Left Media / Right Sticky Buy Box */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Column: Media & Info */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6 order-2 lg:order-1">
          
          {/* Main Video Hero */}
          <div className="aspect-[4/5] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000">
              <source src="/testimonio1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Value Proposition Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-[#0a0a0a] border border-white/5 p-6 flex flex-col items-center text-center">
              <Coffee className="w-6 h-6 mb-3 text-gray-400" />
              <h3 className="text-xs font-bold tracking-[0.1em] uppercase mb-1">3-in-1 Modularity</h3>
              <p className="text-[11px] text-gray-500">Nespresso, Pods & Ground Coffee.</p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 flex flex-col items-center text-center">
              <Thermometer className="w-6 h-6 mb-3 text-gray-400" />
              <h3 className="text-xs font-bold tracking-[0.1em] uppercase mb-1">90°C Thermal Core</h3>
              <p className="text-[11px] text-gray-500">Self-heats water in 200 seconds.</p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-16 bg-[#0a0a0a] border border-white/10 p-8">
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center">Operational Superiority</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-gray-400 w-1/3">Feature</span>
                <span className="text-sm font-bold uppercase tracking-wider text-white text-center w-1/3">Dilemma Drift</span>
                <span className="text-sm font-bold uppercase tracking-wider text-gray-600 text-center w-1/3">Home Machine</span>
              </div>
              {[
                { feature: "Portable Off-Grid", us: true, them: false },
                { feature: "Self-Heating Engine", us: true, them: false },
                { feature: "18-Bar Pressure", us: true, them: true },
                { feature: "Capsule & Ground", us: true, them: false }
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-sm text-gray-400 w-1/3">{row.feature}</span>
                  <span className="w-1/3 flex justify-center">{row.us ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />}</span>
                  <span className="w-1/3 flex justify-center">{row.them ? <Check className="w-5 h-5 text-gray-600" /> : <X className="w-5 h-5 text-red-900" />}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Reviews */}
          <div className="mt-16">
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center">Field Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] border border-white/10 overflow-hidden">
                <div className="aspect-square bg-black relative">
                  <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80">
                    <source src="/testimonio2.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="p-5">
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                  <p className="text-sm text-gray-300 font-light italic">"Replaced my daily Starbucks run. The self-heating is unreal. Absolute tactical advantage for road trips."</p>
                  <p className="text-xs font-bold text-gray-500 mt-3 uppercase tracking-widest">— Marcus T. / Verified</p>
                </div>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 overflow-hidden">
                <div className="aspect-square bg-black relative">
                  <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80">
                    <source src="/testimonio3.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="p-5">
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                  <p className="text-sm text-gray-300 font-light italic">"18 bars of pressure in my backpack. Crema is exactly like my $800 home setup. Highly recommended."</p>
                  <p className="text-xs font-bold text-gray-500 mt-3 uppercase tracking-widest">— Julian R. / Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Buy Box */}
        <div className="w-full lg:w-[45%] order-1 lg:order-2">
          <div className="sticky top-28 bg-[#080808] border border-white/10 p-8 shadow-2xl">
            
            <div className="flex items-center gap-2 mb-4 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              <span className="text-gray-400 text-xs tracking-widest ml-2 uppercase font-bold">681 Reviews</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-[1.05]">
              AUTONOMOUS <br/> ESPRESSO ENGINE.
            </h1>
            
            <p className="text-sm text-gray-400 font-light mb-8">
              Blowing your budget on takeaway coffees? Experience 18 bars of raw industrial pressure. <strong className="text-white">Anywhere. Anytime.</strong>
            </p>

            <form action={buyNow} className="w-full">
              <input type="hidden" name="variantId" value={variantId} />
              
              <div className="flex items-end gap-4 mb-6 border-b border-white/10 pb-6">
                  <span className="text-5xl font-black tracking-tighter text-white">${price}</span>
                  <span className="text-xl text-gray-600 line-through decoration-red-500/50 decoration-2 mb-1">${compareAtPrice}</span>
                  <span className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-2 ml-auto">Save 50%</span>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                 <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Zap className="w-4 h-4 text-white" /> Free Worldwide Express Shipping
                 </div>
                 <div className="flex items-center gap-3 text-sm text-gray-300">
                    <ShieldCheck className="w-4 h-4 text-white" /> 2-Year Industrial Warranty
                 </div>
                 <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Lock className="w-4 h-4 text-white" /> 60-Day Unconditional Guarantee
                 </div>
              </div>

              <button type="submit" className="w-full bg-white text-black px-8 py-5 text-sm font-black tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-4 group cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                SECURE UNIT DIRECTLY
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="mt-6 text-center">
                <span className="text-red-500 text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Critical stock: Only 14 units left
                </span>
              </div>

              <PaymentIcons />
            </form>
          </div>
        </div>

      </div>
      
      {/* Footer Minimalista */}
      <footer className="border-t border-white/5 bg-black py-12 text-center">
        <h2 className="text-2xl font-black tracking-[0.3em] uppercase text-white/20 mb-4">Dilemma Drift</h2>
        <p className="text-xs text-gray-600 uppercase tracking-widest">© 2026. All rights reserved. Oroná Del Carlo Corp.</p>
      </footer>
    </div>
  );
}