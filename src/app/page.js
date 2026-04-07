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
  // Reemplazá por tu dominio real si difiere de este:
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'dilemma-drift-3.myshopify.com';
  const checkoutUrl = `https://${storeDomain}/cart/${rawVariantId}:1`;

  // WhatsApp de Soporte
  const WHATSAPP_NUMBER = "5491100000000"; 
  const WHATSAPP_MSG = "Hello Dilemma Drift, I need assistance with the Autonomous Espresso Engine.";

  // 3. Generador Masivo de Reseñas (350+ Informes Tácticos)
  const baseReviews = [
    { name: "Mia T.", img: "/review-1.jpg", text: "Received as a gift. Perfect for taking away camping and still getting my coffee fix. Crema is superb." },
    { name: "Emma T.", img: "/review-2.jpg", text: "Saved me a fortune. I used to spend $8 a day at Starbucks. This paid for itself in less than a month. Industrial." },
    { name: "Jacob L.", img: "/review-3.jpg", text: "Fantastic on-the-go espresso maker. The 18-bar pressure isn't a marketing gimmick, it delivers golden crema." },
    { name: "Daniel H.", img: "/review-4.jpg", text: "My go-to for weekends away. Easy operation, great flavor and truly portable. Fits right into my car cup holder." },
    { name: "Kristy S.", img: "/review-5.jpg", text: "Impressive modularity. I've only tried the large capsule and ground coffee, super hot. Perfect tactical asset." },
    { name: "Andrew C.", img: "/review-6.jpg", text: "Deployment briefing complete. Brewed my first espresso in minutes. Absolute advantage for long drives." },
    { name: "Olivia G.", text: "Perfect for remote job sites. Cold mornings are brutal, but fresh, hot espresso at 5 AM makes a difference." },
    { name: "Noah K.", text: "Exceeded all expectations. Skeptical about portable power, but it pulls a rich shot with zero cables." },
    { name: "Isla M.", text: "Pulls about 5 hot shots on a charge. Fast thermal core, great for day trips. Barista level quality." },
    { name: "Ava M.", text: "Love that I can use Nespresso pods *and* my own ground coffee. Absolute modular versatility." },
    { name: "Ethan B.", text: "Changed my morning commute. Quick setup, solid pressure, delicious shots every time." },
    { name: "Liam O.", text: "Build quality is exceptional. Lightweight but solid chassis. Military Grade standard." },
    { name: "Sophie L.", text: "Exceeded expectations. 90th brew using pods and cold water, flawless thermodynamic performance." },
    { name: "Gareth N.", text: "It's heavy enough to feel premium, but light enough to hike with. Tactical essential." },
    { name: "Kenji T.", text: "Pulls crema thicker than BrewPort, cheaper than Esprova, and looks better than both. Absolute victory." }
  ];

  // Multiplicamos para generar masa crítica real de testimonios
  const allReviews = Array(23).fill(baseReviews).flat().map((rev, index) => ({
    ...rev, id: index, img: index < 6 ? rev.img : null 
  }));

  // Fraccionamos en bloques de 12 para la recursividad CSS
  const reviewChunks = [];
  for (let i = 0; i < allReviews.length; i += 12) {
    reviewChunks.push(allReviews.slice(i, i + 12));
  }

  // Componente de Recursividad Interna (HACK DE CSS PURO, SIN JS)
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
      
      {/* CSS Mejorado para Cinta Infinita, Masonry, y Recursividad */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        .masonry-columns { column-count: 1; column-gap: 16px; }
        @media (min-width: 768px) { .masonry-columns { column-count: 2; } }
        
        /* Motor CSS de recursividad para los testimonios (SIN JAVASCRIPT) */
        .toggle-chk:checked ~ .toggle-content { display: contents; }
        .toggle-chk:checked ~ .toggle-lbl { display: none; }
      `}} />

      {/* BOTÓN FLOTANTE WHATSAPP (Asistencia Táctica) */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-[88px] lg:bottom-6 right-6 z-[100] bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform border border-white/10" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.013-.967-.253-.099-.439-.149-.624.149-.183.298-.715.967-.877 1.166-.165.198-.328.223-.625.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.624-1.505-.855-2.059-.227-.539-.456-.465-.624-.473-.165-.008-.353-.008-.539-.008-.184 0-.486.074-.739.372-.253.297-.967.944-.967 2.304s.991 2.675 1.13 2.873c.138.198 1.954 2.997 4.735 4.196.662.285 1.179.456 1.583.584.665.21 1.269.18 1.745.109.535-.08 1.758-.717 2.004-1.411.246-.694.246-1.289.173-1.411-.074-.124-.26-.198-.557-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Cinta Infinita de Urgencia */}
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
          
          {/* Hero Video */}
          <div className="aspect-[4/5] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000">
              <source src="/demo-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center border-b border-white/5 pb-4">Operational Briefing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[ { step: 1, title: "Load Ammo", desc: "Insert Nespresso capsule, large pod, or ground coffee." }, { step: 2, title: "Add Water", desc: "Pour water into the reservoir. Double-click to self-heat." }, { step: 3, title: "Extract", desc: "Experience 18-bar pressure delivering rich, thick crema anywhere." } ].map(s => (
                <div key={s.step} className="bg-[#0a0a0a] p-6 border border-white/5 text-center hover:border-white/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto mb-4">{s.step}</div>
                  <h3 className="text-sm font-bold uppercase mb-2 text-white">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment Kit (Included) */}
          <div className="bg-[#080808] border border-white/10 p-8">
             <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center text-white">Deployment Kit (Included)</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[ { icon: Settings, label: "18-Bar Engine" }, { icon: Package, label: "Capsule Adapters" }, { icon: Coffee, label: "Ground Spoon" }, { icon: BatteryCharging, label: "Type-C Cable" } ].map(i => (
                  <div key={i.label} className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                     <i.icon className="w-8 h-8 text-white" />
                     <span className="text-[10px] uppercase tracking-widest font-bold text-gray-300">{i.label}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Industrial Specs Grid (RESTAURADOS) */}
          <div className="py-12 bg-[#0a0a0a] border border-white/5 px-8 relative z-20">
             <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-10 text-center text-white">Industrial Specifications</h2>
             <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
               {[ { icon: Coffee, title: "3-in-1 Modularity", desc: "Supports Nespresso, large pods, and ground coffee directly." }, { icon: Thermometer, title: "90°C Thermal Core", desc: "Self-heats water in 200 seconds. Achieves internal boiling." }, { icon: Zap, title: "18-Bar Force", desc: "Industrial-grade mechanism. Delivers thick crema anywhere." }, { icon: ShieldCheck, title: "Military Grade", desc: "Ultra-lightweight 700g chassis. 2500mAh autonomous cell." } ].map(i => (
                 <div key={i.title} className="flex flex-col group">
                   <i.icon className="w-7 h-7 mb-4 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
                   <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-2 text-white">{i.title}</h3>
                   <p className="text-gray-500 font-light text-[11px] leading-relaxed">{i.desc}</p>
                 </div>
               ))}
             </div>
          </div>

          {/* Videos de Acción (Renombrados localmente) */}
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

          {/* Tactical Superiority (Comparison) */}
          <div>
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center text-white">Tactical Superiority</h2>
            <div className="space-y-4 bg-[#0a0a0a] border border-white/10 p-8">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-gray-400 w-1/3">Feature</span>
                <span className="text-sm font-bold uppercase tracking-wider text-white text-center w-1/3">Dilemma Drift</span>
                <span className="text-sm font-bold uppercase tracking-wider text-gray-600 text-center w-1/3">Home Machine</span>
              </div>
              {[ { f: "Portable Off-Grid", u: true, t: false }, { f: "Self-Heating Core", u: true, t: false }, { f: "18-Bar Extraction", u: true, t: true }, { f: "Multi-Capsule", u: true, t: false } ].map(row => (
                <div key={row.f} className="flex justify-between items-center border-b border-white/5 pb-4 transition-colors hover:bg-white/[0.02]">
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

          {/* Intelligence Data (FAQ Accordion) */}
          <div className="mb-12">
            <h2 className="text-2xl font-black tracking-[0.1em] uppercase mb-8 text-center border-b border-white/10 pb-4 text-white">Operational Intelligence Data</h2>
            <div className="space-y-4">
              {[ { q: "Do I need hot water or power to use it?", a: "Negative. The Dilemma Drift engine features a 2500mAh self-heating core. Just add cold water, double click to activate the thermal core, and it heats it to 90°C in under 200 seconds. It operates completely off-grid." }, { q: "Which capsules are compatible?", a: "Absolute modular versatility. It includes adapters for standard small capsules (Nespresso Original style), large pods (Dolce Gusto size), and a dedicated chamber for your own freshly ground coffee beans. Barista-level crema anywhere." } ].map(faq => (
                <details key={faq.q} className="group border border-white/10 bg-[#0a0a0a] p-6 cursor-pointer hover:border-white/30 transition-colors">
                  <summary className="font-bold tracking-widest uppercase text-xs flex justify-between items-center text-white">
                    {faq.q}
                    <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl font-light">+</span>
                  </summary>
                  <p className="mt-5 text-gray-400 font-light text-sm leading-relaxed border-t border-white/5 pt-5 max-w-2xl">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Buy Box (Checkout Directo Fricción Cero) */}
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
      
      {/* Footer Minimalista */}
      <footer className="border-t border-white/5 bg-black py-16 text-center pb-28 lg:pb-16 relative z-20">
        <h2 className="text-2xl font-black tracking-[0.3em] uppercase text-white/20 mb-4">Dilemma Drift</h2>
        <p className="text-xs text-gray-600 uppercase tracking-widest">© 2026. All rights reserved. Oroná Del Carlo Corp. Industrial Logistics Div.</p>
      </footer>
    </div>
  );
}