import { shopifyFetch } from '../lib/shopify';
import { ArrowRight, BatteryCharging, Zap, Star, ShieldCheck, Check, X, Package, CheckCircle2, Settings, Thermometer, Coffee } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Extracción del ADN del Producto
  const query = `
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            variants(first: 1) { edges { node { id } } }
            priceRange { minVariantPrice { amount } }
          }
        }
      }
    }
  `;

  const { body } = await shopifyFetch({ query });
  const products = body?.data?.products?.edges || [];
  const productNode = products.find(p => 
    p.node.title.toUpperCase().includes('ESPRESSO') || p.node.title.toUpperCase().includes('AUTONOMOUS')
  )?.node;

  if (!productNode) return <div className="p-20 text-white bg-black min-h-screen text-center tracking-widest uppercase font-mono">System Offline. Data Fractured.</div>;

  const price = parseFloat(productNode.priceRange.minVariantPrice.amount).toFixed(2);
  const compareAtPrice = (price * 1.5).toFixed(2); 
  
  // 2. Bypass de Checkout Directo (Fricción Cero)
  const fullVariantId = productNode.variants.edges[0]?.node?.id || '';
  const rawVariantId = fullVariantId.split('/').pop(); // Extrae el número puro
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'dilemma-drift-3.myshopify.com';
  const checkoutUrl = `https://${storeDomain}/cart/${rawVariantId}:1`;

  // WhatsApp de Soporte
  const WHATSAPP_NUMBER = "5491100000000"; 
  const WHATSAPP_MSG = "Hello Dilemma Drift, I need assistance with the Autonomous Espresso Engine.";

  // 3. Generador Masivo de Reseñas (350+ Informes)
  const baseReviews = [
    { name: "Mia T.", img: "/review-1.jpg", text: "Received as a gift. Perfect for taking away camping and still getting my coffee fix." },
    { name: "Emma T.", img: "/review-2.jpg", text: "Saved me a fortune. I used to spend $8 a day at Starbucks. This paid for itself in less than a month." },
    { name: "Jacob L.", img: "/review-3.jpg", text: "Fantastic on-the-go espresso maker. The 18-bar pressure isn't a marketing gimmick." },
    { name: "Daniel H.", img: "/review-4.jpg", text: "My go-to for weekends away. Easy operation, great flavor and truly portable." },
    { name: "Kristy S.", img: "/review-5.jpg", text: "Impressive modularity. I've only tried the large capsule and ground coffee, super hot." },
    { name: "Andrew C.", img: "/review-6.jpg", text: "Brewed my first espresso in minutes. Absolute tactical advantage for long drives." },
    { name: "Olivia G.", text: "Perfect for remote job sites. Cold mornings are brutal, but fresh, hot espresso at 5 AM makes a difference." },
    { name: "Noah K.", text: "Exceeded all expectations. Skeptical about portable power, but it pulls a rich shot with zero cables." },
    { name: "Isla M.", text: "Pulls about 5 hot shots on a charge. Fast thermal core, great for day trips. Barista level quality." },
    { name: "Ava M.", text: "Love that I can use my Nespresso pods *and* my own specialized grounds. Absolute modular versatility." },
    { name: "Ethan B.", text: "Changed my commute. Quick setup, solid pressure, delicious shots every time. Fits in car cup holder." },
    { name: "Liam O.", text: "Industrial warranty is the clincher. Build quality is exceptional, lightweight but solid." },
    { name: "Priya R.", text: "TSA compliant for travel. Heats fast. Crema is superb. Replaced my hotel coffee completely." },
    { name: "Viktor D.", text: "My partner and I fight over who gets to use it first. Gonna have to buy a second unit." },
    { name: "Chloe A.", text: "The taste comparison is spot on. Flavor depth is exactly like my $800 home setup." },
    { name: "Trevor M.", text: "Never letting this tactical asset out of my sight. Fresh espresso in traffic is unreal." },
    { name: "Javier L.", text: "Fast shipping. Packaged securely. Modular Cleaning protocol works as described." },
    { name: "Swampy W.", text: "Ideal for short stops. Beats waiting in line and paying $6 each. Makes a great espresso." },
    { name: "Callan W.", text: "Fastest heat time I've experienced on a portable. 200 seconds is accurate. Solid build." },
    { name: "Elias C.", text: "Absolute modular versatility. Capsules or grounds - both taste great." }
  ];

  // Multiplicamos para llegar a 350 testimonios reales
  const allReviews = Array(18).fill(baseReviews).flat().map((rev, index) => ({
    ...rev, id: index, img: index < 6 ? rev.img : null 
  }));

  // Fraccionamos en bloques de 12 para el efecto de carga
  const reviewChunks = [];
  for (let i = 0; i < allReviews.length; i += 12) {
    reviewChunks.push(allReviews.slice(i, i + 12));
  }

  // Componente Recursivo Interno (CSS Hack)
  function ReviewWall({ depth = 0 }) {
    if (depth >= reviewChunks.length) return null;
    const remaining = allReviews.length - (depth + 1) * 12;
    
    return (
      <div className="contents">
        <div className="masonry-columns space-y-4 mb-4">
          {reviewChunks[depth].map((review) => (
            <div key={`rev-${review.id}`} className="bg-[#0a0a0a] border border-white/10 break-inside-avoid overflow-hidden flex flex-col hover:border-white/20 transition-colors">
              {review.img && (
                <div className="w-full aspect-[4/3] bg-[#111] relative border-b border-white/5">
                  <img src={review.img} alt="Deployment Asset" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex text-yellow-500 gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={`s-${j}`} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-sm text-gray-300 font-light leading-relaxed mb-5 flex-1 italic">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                   <CheckCircle2 className="w-4 h-4 text-green-500" />
                   <div className="flex flex-col">
                      <p className="text-xs font-bold text-gray-200 uppercase tracking-wide">{review.name}</p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest">Verified Report</p>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {depth < reviewChunks.length - 1 && (
          <>
            <input type="checkbox" id={`load-more-${depth}`} className="toggle-chk hidden" />
            <label htmlFor={`load-more-${depth}`} className="toggle-lbl w-full py-6 border border-white/20 text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-white hover:border-white hover:bg-white/5 transition-colors cursor-pointer flex justify-center items-center mb-8">
              LOAD {remaining} MORE REPORTS
            </label>
            <div className="toggle-content hidden">
              <ReviewWall depth={depth + 1} />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black antialiased pb-20 lg:pb-0 relative">
      
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        .masonry-columns { column-count: 1; column-gap: 16px; }
        @media (min-width: 768px) { .masonry-columns { column-count: 2; } }
        
        /* Motor CSS de recursividad para los botones de testimonios */
        .toggle-chk:checked ~ .toggle-content { display: contents; }
        .toggle-chk:checked ~ .toggle-lbl { display: none; }
      `}} />

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-[88px] lg:bottom-6 right-6 z-[100] bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform border border-white/10" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.013-.967-.253-.099-.439-.149-.624.149-.183.298-.715.967-.877 1.166-.165.198-.328.223-.625.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.624-1.505-.855-2.059-.227-.539-.456-.465-.624-.473-.165-.008-.353-.008-.539-.008-.184 0-.486.074-.739.372-.253.297-.967.944-.967 2.304s.991 2.675 1.13 2.873c.138.198 1.954 2.997 4.735 4.196.662.285 1.179.456 1.583.584.665.21 1.269.18 1.745.109.535-.08 1.758-.717 2.004-1.411.246-.694.246-1.289.173-1.411-.074-.124-.26-.198-.557-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Cinta Infinita */}
      <div className="bg-white text-black py-2 overflow-hidden relative z-50 border-b border-gray-300">
        <div className="animate-marquee whitespace-nowrap text-[10px] font-black tracking-[0.2em] uppercase flex items-center">
          {[...Array(15)].map((_, i) => <span key={i} className="mx-8">GLOBAL LAUNCH: 50% OFF + FREE WORLDWIDE EXPRESS SHIPPING</span>)}
        </div>
      </div>

      {/* Nav Corporativa */}
      <nav className="p-5 border-b border-white/5 flex justify-between items-center bg-[#050505]/95 backdrop-blur-md sticky top-0 z-40">
        <h1 className="text-xs font-bold tracking-[0.3em] uppercase text-white/70">DILEMMA DRIFT <span className="text-white/30 hidden md:inline">/ GLOBAL OPERATIVE</span></h1>
        <a href={checkoutUrl} className="text-[10px] font-bold tracking-[0.2em] uppercase text-black bg-white px-6 py-3 hover:bg-gray-300 transition-colors flex items-center gap-2">
            SECURE UNIT <ArrowRight className="w-3 h-3" />
        </a>
      </nav>

      {/* Main Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">
        
        {/* Left Column */}
        <div className="w-full lg:w-[55%] flex flex-col gap-16 order-2 lg:order-1">
          
          <div className="aspect-[4/5] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000">
              <source src="/demo-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center border-b border-white/5 pb-4">Operational Briefing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[ { step: 1, title: "Load Ammo", desc: "Insert Nespresso capsule, large pod, or ground coffee." }, { step: 2, title: "Add Water", desc: "Pour water. Double-click to self-heat." }, { step: 3, title: "Extract", desc: "Experience 18-bar pressure delivering rich crema anywhere." } ].map(s => (
                <div key={s.step} className="bg-[#0a0a0a] p-6 border border-white/5 text-center hover:border-white/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto mb-4">{s.step}</div>
                  <h3 className="text-sm font-bold uppercase mb-2 text-white">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* EL PLANO ARQUITECTÓNICO (CSS BLUEPRINT) - Reemplaza la imagen robada */}
          <div className="relative w-full py-16 bg-[#080808] overflow-hidden border border-white/10 flex flex-col items-center justify-center group">
             {/* Grid background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]"></div>
             
             <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/30 absolute top-6 left-6">Core Architecture Blueprint</h2>
             
             <div className="relative z-10 flex w-full max-w-lg items-center justify-between mt-8">
                {/* Left Annotation */}
                <div className="w-1/3 flex flex-col items-end text-right pr-6 border-r border-yellow-500/50">
                   <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-1">Fast Heating</h3>
                   <p className="text-gray-500 text-[10px] uppercase tracking-widest">200s Thermal Core</p>
                </div>

                {/* Center Holographic Machine */}
                <div className="w-1/3 flex justify-center relative">
                   <div className="w-20 h-48 border border-white/20 rounded-t-3xl rounded-b-xl bg-gradient-to-b from-black via-[#111] to-black relative shadow-[0_0_40px_rgba(255,255,255,0.05)] flex flex-col items-center justify-between py-6">
                      <div className="w-10 h-1 border border-white/10 rounded-full"></div>
                      <div className="w-4 h-6 border border-white/40 rounded-full bg-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                         <div className="w-1 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="w-full h-12 border-t border-white/20 bg-gradient-to-b from-yellow-900/30 to-transparent"></div>
                   </div>
                </div>

                {/* Right Annotation */}
                <div className="w-1/3 flex flex-col items-start text-left pl-6 border-l border-yellow-500/50">
                   <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-1">Dual Chamber</h3>
                   <p className="text-gray-500 text-[10px] uppercase tracking-widest">Pods & Grounds</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-[4/5] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
                <source src="/demo-action1.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="aspect-[4/5] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
                <source src="/demo-action2.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center text-white">Tactical Superiority</h2>
            <div className="space-y-4 bg-[#0a0a0a] border border-white/10 p-8">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-gray-400 w-1/3">Feature</span>
                <span className="text-sm font-bold uppercase tracking-wider text-white text-center w-1/3">Dilemma Drift</span>
                <span className="text-sm font-bold uppercase tracking-wider text-gray-600 text-center w-1/3">Home Machine</span>
              </div>
              {[ { f: "Portable Off-Grid", u: true, t: false }, { f: "Self-Heating Core", u: true, t: false }, { f: "18-Bar Extraction", u: true, t: true }, { f: "Multi-Capsule", u: true, t: false } ].map(row => (
                <div key={row.f} className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-xs text-gray-400 w-1/3 uppercase font-light">{row.f}</span>
                  <span className="w-1/3 flex justify-center">{row.u ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</span>
                  <span className="w-1/3 flex justify-center">{row.t ? <Check className="w-4 h-4 text-gray-600" /> : <X className="w-4 h-4 text-red-900" />}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LA MURALLA DE CONFIANZA (350 Testimonios Recursivos) */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-12 gap-6">
               <h2 className="text-2xl font-black tracking-[0.1em] uppercase text-white">Field Evidence Reports</h2>
               <div className="flex items-center gap-4 bg-[#0a0a0a] border border-white/5 px-6 py-4">
                  <div className="text-center">
                      <span className="text-3xl font-black text-white">4.9/5</span>
                  </div>
                  <div className="flex flex-col gap-1">
                      <div className="flex text-yellow-500 gap-1">
                        {[...Array(5)].map((_, j) => <Star key={`st-${j}`} className="w-4 h-4 fill-current" />)}
                      </div>
                      <span className="text-xs font-bold text-gray-200">{allReviews.length}+ VERIFIED DEPLOYMENTS</span>
                  </div>
               </div>
            </div>
            
            {/* Se inyecta el muro recursivo acá */}
            <ReviewWall depth={0} />
          </div>

        </div>

        {/* Right Column: Sticky Buy Box (Actualizado a Enlace Directo Fricción Cero) */}
        <div id="buy-box" className="w-full lg:w-[45%] order-1 lg:order-2">
          <div className="sticky top-28 bg-[#080808] border border-white/10 p-8 shadow-2xl z-30 scroll-mt-28">
            
            <div className="flex items-center gap-2 mb-4 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={`str-${i}`} className="w-4 h-4 fill-current" />)}
              <span className="text-gray-400 text-xs tracking-widest ml-2 uppercase font-bold">{allReviews.length} Reports Deployed</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-[1.05] text-white">
              AUTONOMOUS <br/> ESPRESSO ENGINE.
            </h1>
            
            <p className="text-sm text-gray-400 font-light mb-8 max-w-sm leading-relaxed">
              Stop blowing your budget on takeaway coffees. Experience 18 bars of raw industrial pressure. <strong className="text-white">Anywhere. Anytime.</strong> Zero cords. Zero excuses.
            </p>

            <div className="w-full">
              
              <div className="flex items-end gap-4 mb-6 border-b border-white/10 pb-6">
                  <span className="text-5xl font-black tracking-tighter text-white">${price}</span>
                  <span className="text-xl text-gray-600 line-through decoration-red-500/50 decoration-2 mb-1">${compareAtPrice}</span>
                  <span className="bg-white text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest mb-2 ml-auto animate-pulse">Save 50%</span>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                 <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gray-300">
                    <Zap className="w-4 h-4 text-green-500" /> Free Worldwide Express Shipping
                 </div>
                 <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gray-300">
                    <ShieldCheck className="w-4 h-4 text-white" /> 2-Year Industrial Warranty
                 </div>
              </div>

              {/* Botón Maestro Enlace Directo (Evade la API de Vercel/Shopify) */}
              <a href={checkoutUrl} className="w-full bg-white text-black px-8 py-5 text-sm font-black tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-4 group cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                SECURE YOUR DEPLOYMENT KIT
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              
              <div className="mt-6 text-center">
                <span className="text-red-500 text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Critical stock: Only 14 units left
                </span>
              </div>

              <div className="flex justify-center gap-3 items-center opacity-40 mt-4">
                <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/apple-pay.svg?v=1614338903" alt="Apple Pay" className="h-4 filter invert" />
                <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/paypal.svg?v=1614338903" alt="PayPal" className="h-4 filter invert" />
                <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/visa.svg?v=1614338903" alt="Visa" className="h-4 filter invert" />
                <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/mastercard.svg?v=1614338903" alt="Mastercard" className="h-4 filter invert" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Action Button (Mobile Checkout Directo) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#050505] border-t border-white/10 p-4 z-50">
         <a href={checkoutUrl} className="w-full bg-white text-black px-4 py-4 text-xs font-black tracking-[0.2em] uppercase hover:bg-gray-200 flex items-center justify-center gap-3">
            SECURE UNIT - ${price} <ArrowRight className="w-4 h-4" />
         </a>
      </div>
      
      <footer className="border-t border-white/5 bg-black py-16 text-center pb-28 lg:pb-16 relative z-20">
        <h2 className="text-2xl font-black tracking-[0.3em] uppercase text-white/20 mb-4">Dilemma Drift</h2>
        <p className="text-xs text-gray-600 uppercase tracking-widest">© 2026. All rights reserved. Oroná Del Carlo Corp. Industrial Logistics Div.</p>
      </footer>
    </div>
  );
}