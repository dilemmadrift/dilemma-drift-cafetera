import { shopifyFetch, createCart } from '../lib/shopify';
import { ArrowRight, BatteryCharging, Droplets, Zap, Star, Lock, Coffee, Thermometer, Plane } from "lucide-react";
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

  if (!productNode) return <div className="p-20 text-white bg-black min-h-screen text-center tracking-widest uppercase font-mono">System Offline. Product Data Link Fractured.</div>;

  const price = parseFloat(productNode.priceRange.minVariantPrice.amount).toFixed(2);
  const variantId = productNode.variants.edges[0]?.node?.id;
  const compareAtPrice = (price * 1.5).toFixed(2); // Anclaje de precio más agresivo (50% OFF percibido)

  async function buyNow(formData) {
    "use server";
    const vId = formData.get('variantId');
    const checkoutUrl = await createCart(vId);
    if (checkoutUrl) redirect(checkoutUrl);
  }

  const PaymentIcons = () => (
    <div className="flex gap-4 items-center mt-6 opacity-60">
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/apple-pay.svg?v=1614338903" alt="Apple Pay" className="h-6 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/paypal.svg?v=1614338903" alt="PayPal" className="h-6 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/visa.svg?v=1614338903" alt="Visa" className="h-6 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/mastercard.svg?v=1614338903" alt="Mastercard" className="h-6 filter invert" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black antialiased overflow-x-hidden">
      
      {/* Inyección CSS para la cinta sin tocar configuraciones */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: 200%; animation: marquee 15s linear infinite; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}} />

      {/* Cinta de Urgencia Global */}
      <div className="bg-white text-black py-2 overflow-hidden relative z-50 border-b border-gray-300">
        <div className="animate-marquee whitespace-nowrap text-xs font-black tracking-[0.2em] uppercase flex items-center">
          <span className="mx-8">⚡ GLOBAL LAUNCH: 50% OFF + FREE SHIPPING</span>
          <span className="mx-8">⚡ GLOBAL LAUNCH: 50% OFF + FREE SHIPPING</span>
          <span className="mx-8">⚡ GLOBAL LAUNCH: 50% OFF + FREE SHIPPING</span>
          <span className="mx-8">⚡ GLOBAL LAUNCH: 50% OFF + FREE SHIPPING</span>
        </div>
      </div>

      <nav className="p-6 border-b border-white/5 flex justify-between items-center relative z-40">
        <h1 className="text-sm font-bold tracking-[0.4em] uppercase text-white/40">DILEMMA DRIFT / GLOBAL</h1>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[85vh]">
        <div className="relative z-20 order-2 md:order-1">
          <div className="flex items-center gap-2 mb-6 text-yellow-500">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            <span className="text-gray-400 text-xs tracking-widest ml-2 uppercase font-bold">50K+ Units Deployed</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.05]">
            RAW ESPRESSO.<br/><span className="text-gray-500">OFF-GRID.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 tracking-wide leading-relaxed max-w-xl">
            18 bars of raw industrial pressure. Compatible with <strong className="text-white">Nespresso, Dolce Gusto & Ground Coffee.</strong> Zero cords. Zero excuses.
          </p>
          
          <form action={buyNow} className="w-full relative z-30 max-w-lg">
            <input type="hidden" name="variantId" value={variantId} />
            
            <div className="mb-6 flex items-baseline gap-4 border-b border-white/5 pb-4">
                <span className="text-6xl font-extrabold tracking-tighter text-white">
                  ${price}
                </span>
                <span className="text-2xl text-gray-600 line-through">
                  ${compareAtPrice}
                </span>
            </div>

            <button type="submit" className="w-full bg-white text-black px-8 py-6 text-base font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-4 group cursor-pointer border border-white">
              SECURE YOUR UNIT
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="mt-8 flex flex-col gap-4 border border-white/5 p-5 bg-[#0a0a0a]">
                <div className="flex justify-between items-center text-red-500">
                    <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Critical stock: ONLY 14 UNITS LEFT
                    </span>
                    <Lock className="w-4 h-4 opacity-50 text-white" />
                </div>
                <div className="text-gray-500 text-xs tracking-wide uppercase flex flex-col gap-1">
                    <span>⚡ FREE WORLDWIDE EXPRESS SHIPPING</span>
                    <span>🛠️ 1-Year Industrial Warranty</span>
                </div>
                <PaymentIcons />
            </div>
          </form>
        </div>

        <div className="relative z-20 order-1 md:order-2">
          <div className="relative aspect-[4/5] bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            <div className="bg-gradient-to-b from-black/90 via-transparent to-transparent h-40 w-full absolute top-0 z-10 pointer-events-none" />
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
              <source src="/testimonio1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Grid de Datos Duros (Mejorado con info de Brewbit) */}
      <div className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="border-l-2 border-white/10 pl-6 hover:border-white/30 transition-colors">
            <Coffee className="w-8 h-8 mb-5 text-white" />
            <h3 className="text-lg font-bold tracking-widest uppercase mb-2 text-white">3-in-1 Modularity</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">Absolute versatility. Supports Nespresso capsules, large pods, and your favorite ground coffee.</p>
          </div>
          <div className="border-l-2 border-white/10 pl-6 hover:border-white/30 transition-colors">
            <Thermometer className="w-8 h-8 mb-5 text-white" />
            <h3 className="text-lg font-bold tracking-widest uppercase mb-2 text-white">90°C Thermal Core</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">Heats up in just 200 seconds. Achieves 90°C internal boiling without external power.</p>
          </div>
          <div className="border-l-2 border-white/10 pl-6 hover:border-white/30 transition-colors">
            <Zap className="w-8 h-8 mb-5 text-white" />
            <h3 className="text-lg font-bold tracking-widest uppercase mb-2 text-white">18-Bar Force</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">Industrial-grade extraction mechanism. Delivers a rich, thick crema anywhere.</p>
          </div>
          <div className="border-l-2 border-white/10 pl-6 hover:border-white/30 transition-colors">
            <BatteryCharging className="w-8 h-8 mb-5 text-white" />
            <h3 className="text-lg font-bold tracking-widest uppercase mb-2 text-white">2500mAh Engine</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">High-capacity rechargeable cell. Ultra-lightweight 700g chassis built for the road.</p>
          </div>
        </div>
      </div>

      {/* Evidencia Operativa (Testimonios) */}
      <div className="py-24 px-6 md:px-12 bg-[#050505] relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-widest uppercase mb-4 text-white">FIELD EVIDENCE</h2>
            <p className="text-gray-500 font-light">Real extractions from our active operative network.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[9/16] bg-[#0a0a0a] overflow-hidden border border-white/10 rounded-sm">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 z-0">
                <source src="/testimonio2.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="relative aspect-[9/16] bg-[#0a0a0a] overflow-hidden border border-white/10 rounded-sm">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 z-0">
                <source src="/testimonio3.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Destrucción de Objeciones (FAQ Acordeón) */}
      <div className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5 relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-widest uppercase mb-4 text-white">OPERATIONAL BRIEFING</h2>
            <p className="text-gray-500 font-light">Clear your doubts. Execute the mission.</p>
          </div>
          
          <div className="space-y-4">
            <details className="group border border-white/10 bg-[#050505] p-6 cursor-pointer hover:border-white/30 transition-colors">
              <summary className="font-bold tracking-widest uppercase text-sm flex justify-between items-center text-white">
                Do I need electricity or hot water to use it?
                <span className="text-gray-500 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
              </summary>
              <p className="mt-4 text-gray-400 font-light text-sm leading-relaxed border-t border-white/5 pt-4">
                Negative. The Dilemma Drift engine features a self-heating core and a 2500mAh battery. Just add cold water, and it heats it to 90°C in under 200 seconds. It operates completely off-grid.
              </p>
            </details>
            
            <details className="group border border-white/10 bg-[#050505] p-6 cursor-pointer hover:border-white/30 transition-colors">
              <summary className="font-bold tracking-widest uppercase text-sm flex justify-between items-center text-white">
                Can I use this during a flight?
                <span className="text-gray-500 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
              </summary>
              <p className="mt-4 text-gray-400 font-light text-sm leading-relaxed border-t border-white/5 pt-4">
                Yes, it is TSA-compliant to carry on, but due to its internal heating element, global airline regulations prohibit using the heating function *during* the flight. You can use it in the terminal or wait until you land.
              </p>
            </details>

            <details className="group border border-white/10 bg-[#050505] p-6 cursor-pointer hover:border-white/30 transition-colors">
              <summary className="font-bold tracking-widest uppercase text-sm flex justify-between items-center text-white">
                How do I clean the internal mechanisms?
                <span className="text-gray-500 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
              </summary>
              <p className="mt-4 text-gray-400 font-light text-sm leading-relaxed border-t border-white/5 pt-4">
                Ballistic cleaning protocol: Simply fill the reservoir with fresh water and run a cycle without inserting a capsule. The 18-bar pressure system will purge and clean itself automatically.
              </p>
            </details>
          </div>
        </div>
      </div>

    </div>
  );
}