import { shopifyFetch, createCart } from '../lib/shopify';
import { ArrowRight, BatteryCharging, Droplets, Zap, Star, Lock, Coffee, Thermometer, ShieldCheck, CheckCircle2 } from "lucide-react";
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
  const mainImage = productNode.images.edges[0]?.node?.url || '';

  async function buyNow(formData) {
    "use server";
    const vId = formData.get('variantId');
    const checkoutUrl = await createCart(vId);
    if (checkoutUrl) redirect(checkoutUrl);
  }

  const PaymentIcons = () => (
    <div className="flex gap-3 items-center opacity-50 mt-4">
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/apple-pay.svg?v=1614338903" alt="Apple Pay" className="h-5 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/paypal.svg?v=1614338903" alt="PayPal" className="h-5 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/visa.svg?v=1614338903" alt="Visa" className="h-5 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/mastercard.svg?v=1614338903" alt="Mastercard" className="h-5 filter invert" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black antialiased overflow-x-hidden">
      
      {/* CSS Mejorado para Cinta Perfecta y Carrito */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        .cart-overlay { visibility: hidden; opacity: 0; transition: all 0.3s ease; }
        .cart-drawer { transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        #cart-toggle:checked ~ .cart-overlay { visibility: visible; opacity: 1; }
        #cart-toggle:checked ~ .cart-overlay .cart-drawer { transform: translateX(0); }
        html:has(#cart-toggle:checked) { overflow: hidden; }
      `}} />

      {/* Carrito Lateral (Drawer) Oculto */}
      <input type="checkbox" id="cart-toggle" className="hidden" />
      <div className="cart-overlay fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm">
        <label htmlFor="cart-toggle" className="absolute inset-0 cursor-pointer"></label>
        <div className="cart-drawer absolute top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-white/10 flex flex-col shadow-2xl">
          
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050505]">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white">Secure Checkout</h2>
            <label htmlFor="cart-toggle" className="cursor-pointer text-gray-500 hover:text-white text-2xl transition-colors">&times;</label>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="flex gap-4 items-center bg-[#111] p-4 border border-white/5">
              <div className="w-20 h-20 bg-black border border-white/10 flex-shrink-0 relative">
                 <img src={mainImage} alt="Product" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold tracking-widest uppercase text-white leading-tight">18-Bar Autonomous Engine</h3>
                <p className="text-xs text-gray-500 tracking-wider mt-1 uppercase">Matte Onyx Black</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-white">${price}</span>
                  <span className="text-xs font-bold text-gray-500 line-through">${compareAtPrice}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
               <div className="flex items-center gap-3 text-sm text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-light">Free Worldwide Express Shipping</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-light">1-Year Industrial Warranty</span>
               </div>
            </div>
          </div>
          
          <div className="p-6 bg-[#050505] border-t border-white/10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Subtotal (USD)</span>
              <span className="text-xl font-bold text-white">${price}</span>
            </div>
            <form action={buyNow}>
              <input type="hidden" name="variantId" value={variantId} />
              <button type="submit" className="w-full bg-white text-black py-5 text-sm font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex justify-center items-center gap-3 group">
                Proceed to Payment <Lock className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-4 flex justify-center">
              <PaymentIcons />
            </div>
          </div>
        </div>
      </div>
      {/* Fin Carrito Lateral */}

      {/* Cinta de Urgencia Infinita (Matemática arreglada) */}
      <div className="bg-white text-black py-[6px] overflow-hidden relative z-50">
        <div className="animate-marquee whitespace-nowrap text-[10px] font-black tracking-[0.2em] uppercase flex items-center">
          {/* Inyectamos la frase repetida para garantizar ciclo infinito sin cortes */}
          {[...Array(12)].map((_, i) => (
            <span key={i} className="mx-8">⚡ GLOBAL LAUNCH: 50% OFF + FREE SHIPPING</span>
          ))}
        </div>
      </div>

      <nav className="p-6 border-b border-white/5 flex justify-between items-center relative z-40 bg-[#050505]/80 backdrop-blur-md">
        <h1 className="text-xs font-bold tracking-[0.4em] uppercase text-white/50">DILEMMA DRIFT</h1>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 pb-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
        <div className="relative z-20 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 border border-white/10 bg-white/5 backdrop-blur-sm">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />)}
            <span className="text-gray-300 text-[10px] tracking-[0.2em] ml-2 uppercase font-bold">50K+ Units Deployed</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]">
            RAW ESPRESSO.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">OFF-GRID.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light mb-12 tracking-wide leading-relaxed max-w-lg border-l border-white/20 pl-6">
            18 bars of raw industrial pressure. Compatible with <strong className="text-white">Nespresso, Dolce Gusto & Ground Coffee.</strong> Zero cords. Zero excuses.
          </p>
          
          <div className="w-full relative z-30 max-w-md">
            <div className="mb-8 flex items-baseline gap-4">
                <span className="text-5xl font-black tracking-tighter text-white">${price}</span>
                <span className="text-xl text-gray-600 line-through decoration-red-500/50 decoration-2">${compareAtPrice}</span>
            </div>

            {/* Este botón ahora abre el carrito en lugar de ir a Shopify directo */}
            <label htmlFor="cart-toggle" className="w-full bg-white text-black px-8 py-5 text-sm font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-4 group cursor-pointer border border-white text-center">
              SECURE YOUR UNIT
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </label>
            
            <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center text-red-500 gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Critical stock: Only 14 units left</span>
                </div>
                <PaymentIcons />
            </div>
          </div>
        </div>

        <div className="relative z-20 order-1 lg:order-2">
          <div className="relative aspect-[4/5] bg-[#0a0a0a] overflow-hidden border border-white/10 shadow-2xl group">
            <div className="bg-gradient-to-b from-[#050505] via-transparent to-[#050505] h-full w-full absolute top-0 z-10 pointer-events-none opacity-60" />
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-1000">
              <source src="/testimonio1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Grid Técnico de Confianza */}
      <div className="py-24 px-6 md:px-12 bg-[#080808] border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          <div className="flex flex-col group">
            <Coffee className="w-7 h-7 mb-4 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-2 text-white">3-in-1 Modularity</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">Supports Nespresso capsules, large pods, and ground coffee directly.</p>
          </div>
          <div className="flex flex-col group">
            <Thermometer className="w-7 h-7 mb-4 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-2 text-white">90°C Thermal Core</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">Heats up in 200 seconds. Achieves internal boiling without external power.</p>
          </div>
          <div className="flex flex-col group">
            <Zap className="w-7 h-7 mb-4 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-2 text-white">18-Bar Force</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">Industrial-grade extraction mechanism. Delivers thick crema anywhere.</p>
          </div>
          <div className="flex flex-col group">
            <ShieldCheck className="w-7 h-7 mb-4 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-2 text-white">Military Grade</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">Ultra-lightweight 700g chassis with a 2500mAh engine. Built for the road.</p>
          </div>
        </div>
      </div>

      <div className="py-24 px-6 md:px-12 bg-[#050505] relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-3xl font-black tracking-[0.1em] uppercase text-white mb-2">FIELD EVIDENCE</h2>
              <p className="text-gray-500 font-light tracking-wide">Operative extractions.</p>
            </div>
            <label htmlFor="cart-toggle" className="mt-6 md:mt-0 text-xs font-bold tracking-[0.2em] uppercase text-white border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-colors cursor-pointer">
              Get Yours Now
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] bg-[#0a0a0a] overflow-hidden group">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0">
                <source src="/testimonio2.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="relative aspect-[4/5] bg-[#0a0a0a] overflow-hidden group">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0">
                <source src="/testimonio3.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}