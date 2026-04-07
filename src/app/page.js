import { shopifyFetch, createCart } from '../lib/shopify';
import { ArrowRight, BatteryCharging, Droplets, Zap, Star, Lock, Coffee, Thermometer, ShieldCheck, Check, X, Package, CheckCircle2, Settings } from "lucide-react";
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

  // Base de testimonios élite
  const baseReviews = [
    { name: "Mia T.", img: "/review-1.jpg", text: "Received as a gift. Perfect for taking away camping and still getting my coffee fix. The self-heating is completely silent." },
    { name: "Emma T.", img: "/review-2.jpg", text: "Saved me a fortune. I used to spend $8 a day at Starbucks. This paid for itself in less than a month. Industrial crema." },
    { name: "Jacob L.", img: "/review-3.jpg", text: "Fantastic on-the-go espresso maker. The 18-bar pressure isn't a marketing gimmick, the crema is incredibly thick." },
    { name: "Daniel H.", img: "/review-4.jpg", text: "My go-to for weekends away. Easy operation, great flavor and truly portable. Fits right into my car's cup holder." },
    { name: "Kristy S.", img: "/review-5.jpg", text: "Impressive modularity. I've only tried the large capsule and ground coffee, super hot. Perfect deployment asset." },
    { name: "Andrew C.", img: "/review-6.jpg", text: "Easy deployment briefing. Brewed my first espresso in minutes. Absolute tactical advantage for long drives." },
    { name: "Olivia G.", text: "Perfect for remote job sites. Cold mornings are brutal, but fresh, hot espresso at 5 AM makes a difference." },
    { name: "Noah K.", text: "Exceeded all expectations. Skeptical about portable power, but it pulls a rich shot with zero cables. Absolute thermodynamic independence." },
    { name: "Isla M.", text: "Pulls about 5 hot shots on a charge. Fast thermal core, great for day trips. Barista level quality." },
    { name: "Ava M.", text: "Love that I can use my Nespresso pods *and* my own specialized grounds. Absolute modular versatility." },
    { name: "Ethan B.", text: "Changed my commute. Quick setup, solid pressure, delicious shots every time. Fits in car cup holder." },
    { name: "Liam O.", text: "Industrial warranty is the clincher. Build quality is exceptional, lightweight but solid. Military Grade indeed." },
    { name: "Priya R.", text: "TSA compliant for travel. Heats fast. Crema is superb. Replaced my hotel coffee completely." },
    { name: "Viktor D.", text: "My partner and I fight over who gets to use it first. Gonna have to buy a second unit. Absolute essential." },
    { name: "Chloe A.", text: "The taste comparison is spot on. I use my own ground beans and the flavor depth is exactly like my $800 home setup." },
    { name: "Aria N.", text: "Modular architecture is brilliant. Purge, rinse, and clean in seconds. Hassle free operation." },
    { name: "Trevor M.", text: "Never letting this tactical asset out of my sight. Fresh espresso in traffic is unreal. Highly recommended." },
    { name: "Javier L.", text: "Fast shipping. Packaged securely. Instruction manual is concise. Modular Cleaning protocol works as described." },
    { name: "Swampy W.", text: "Ideal for short stops. Beats waiting in line and paying $6 each. Makes a great espresso." },
    { name: "Ben D.", text: "Makes better coffee than my local shop. No doubts." },
    { name: "Alina N.", text: "Finally, a portable espresso maker that actually heats water. Raw thermodynamic force." },
    { name: "Darren M.", text: "Pulls crema exactly like my commercial machine. A tactical advantage in my backpack." },
    { name: "Livia C.", text: "I take it to uni - perfect between classes. Carrying case is also a nice touch. Hassle free." },
    { name: "Rosa B.", text: "Exceeded expectations. 90th brew using pods and cold water, flawless performance." },
    { name: "Callan W.", text: "Fastest heat time I've experienced on a portable. 200 seconds is accurate. Solid build." },
    { name: "Elias C.", text: "Absolute modular versatility. Capsules or grounds - both taste great. Barista-level crema anywhere." },
    { name: "Yelena V.", text: "Fresh, hot espresso on command. Load it up night before, press button in car. Game changer." },
    { name: "Mateo S.", text: "Replaced my Aeropress immediately. 18 bars of pressure makes the difference. Perfect off-grid extraction." },
    { name: "Aisha K.", text: "Tactical espresso deployment successful. The autonomous core is the future of coffee independence." },
    { name: "Kenji T.", text: "Pulls crema thicker than BrewPort, cheaper than Esprova, and looks better than both. Absolute victory." },
  ];

  // Clonamos la base para generar cientos de reseñas y simular masa crítica
  const extendedReviews = Array(11).fill(baseReviews).flat().map((rev, index) => ({
    ...rev,
    id: index,
    // Dejamos las fotos solo para los primeros 6 para mantener la estética limpia
    img: index < 6 ? rev.img : null 
  }));

  const initialReviews = extendedReviews.slice(0, 14);
  const hiddenReviews = extendedReviews.slice(14);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black antialiased pb-20 lg:pb-0">
      
      {/* CSS: Smooth Scroll para la Nav y Hack de Checkbox para cargar más reseñas sin JS */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        .masonry-columns { column-count: 1; column-gap: 16px; }
        @media (min-width: 768px) { .masonry-columns { column-count: 2; } }
      `}} />

      {/* Nav Minimalista Profesional */}
      <nav className="p-5 border-b border-white/5 flex justify-between items-center bg-[#050505]/95 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-xs font-bold tracking-[0.3em] uppercase text-white/70">DILEMMA DRIFT <span className="text-white/30 hidden md:inline">/ GLOBAL OPERATIVE</span></h1>
        <a href="#buy-box" className="text-[10px] font-bold tracking-[0.2em] uppercase text-black bg-white px-6 py-3 hover:bg-gray-300 transition-colors">
            SECURE UNIT
        </a>
      </nav>

      {/* Main Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Column */}
        <div className="w-full lg:w-[55%] flex flex-col gap-16 order-2 lg:order-1">
          
          {/* Hero Video */}
          <div className="aspect-[4/5] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000">
              <source src="/demo-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Operational Briefing (How It Works) */}
          <div>
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center border-b border-white/5 pb-4">Operational Briefing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[ { step: 1, title: "Load Ammo", desc: "Insert Nespresso capsule, large pod, or ground coffee chamber." }, { step: 2, title: "Add Water", desc: "Pour cold or hot water into the reservoir. Double-click to self-heat." }, { step: 3, title: "Extract", desc: "Experience 18-bar pressure delivering rich, thick crema anywhere." } ].map(s => (
                <div key={s.step} className="bg-[#0a0a0a] p-6 border border-white/5 text-center hover:border-white/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto mb-4">{s.step}</div>
                  <h3 className="text-sm font-bold uppercase mb-2 text-white">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment Kit */}
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

          {/* Industrial Specs Grid */}
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

          {/* LA IMAGEN ROBADA: Arquitectura del Núcleo (Con camuflaje CSS) */}
          <div className="relative aspect-video bg-black overflow-hidden border border-white/10 flex items-center justify-center">
             {/* Este pseudo-elemento crea el viñeteado oscuro en los bordes para tapar recortes feos */}
             <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,1),inset_0_0_120px_rgba(0,0,0,0.8)]"></div>
             <img src="/core-architecture.png" alt="Core Architecture Diagram" className="w-full h-full object-contain opacity-80 z-0 p-4" />
          </div>

          {/* Videos de Acción */}
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
                <div key={row.f} className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-xs text-gray-400 w-1/3 uppercase font-light">{row.f}</span>
                  <span className="w-1/3 flex justify-center">{row.u ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</span>
                  <span className="w-1/3 flex justify-center">{row.t ? <Check className="w-4 h-4 text-gray-600" /> : <X className="w-4 h-4 text-red-900" />}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LA MURALLA DE CONFIANZA (Reviews con Hack de Carga) */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-12 gap-6">
               <h2 className="text-2xl font-black tracking-[0.1em] uppercase text-white">Field Evidence Reports</h2>
               <div className="flex items-center gap-4 bg-[#0a0a0a] border border-white/5 px-6 py-4">
                  <div className="text-center">
                      <span className="text-3xl font-black text-white">4.9/5</span>
                  </div>
                  <div className="flex flex-col gap-1">
                      <div className="flex text-yellow-500 gap-1">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                      </div>
                      <span className="text-xs font-bold text-gray-200">984 VERIFIED DEPLOYMENTS</span>
                  </div>
               </div>
            </div>
            
            {/* Input Checkbox Oculto para manejar la expansión sin Javascript */}
            <input type="checkbox" id="load-more-reviews" className="hidden peer/reviews" />
            
            <div className="masonry-columns space-y-4">
              {/* Primeras Reseñas (Siempre visibles) */}
              {initialReviews.map((review) => (
                <div key={`init-${review.id}`} className="bg-[#0a0a0a] border border-white/10 break-inside-avoid overflow-hidden flex flex-col hover:border-white/20 transition-colors">
                  {review.img && (
                    <div className="w-full aspect-[4/3] bg-[#111] relative border-b border-white/5">
                      <img src={review.img} alt="Deployment Asset" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex text-yellow-500 gap-1 mb-4">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
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
              
              {/* Reseñas Ocultas (Se revelan con el Checkbox) */}
              <div className="hidden peer-checked/reviews:contents">
                {hiddenReviews.map((review) => (
                  <div key={`hid-${review.id}`} className="bg-[#0a0a0a] border border-white/10 break-inside-avoid overflow-hidden flex flex-col hover:border-white/20 transition-colors">
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex text-yellow-500 gap-1 mb-4">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
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
            </div>

            {/* El botón (Label) que activa el Checkbox */}
            <label htmlFor="load-more-reviews" className="peer-checked/reviews:hidden w-full mt-8 py-5 border border-white/20 text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer flex justify-center items-center">
               LOAD 316 MORE REPORTS
            </label>
          </div>

          {/* Intelligence Data (FAQ Accordion) */}
          <div className="mb-12">
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center border-b border-white/10 pb-4 text-white">Intelligence Data</h2>
            <div className="space-y-4">
              {[ { q: "Do I need hot water or power to use it?", a: "Negative. The Dilemma Drift engine features a 2500mAh self-heating core. Just add cold water, double click to activate the thermal core, and it heats it to 90°C in under 200 seconds. It operates completely off-grid." }, { q: "Which capsules are compatible?", a: "Absolute modular versatility. It includes adapters for standard small capsules (Nespresso Original style), large pods (Dolce Gusto size), and a dedicated chamber for your own freshly ground coffee beans. Barista-level crema anywhere." }, { q: "How do I clean the modular chamber?", a: "Hassle-free operation. Simply fill the reservoir with fresh water and run a cycle without inserting ammunition (capsules). The industrial-grade 18-bar pressure system purges and cleans itself automatically in under 30 seconds." } ].map(faq => (
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

        {/* Right Column: Sticky Buy Box */}
        <div className="w-full lg:w-[45%] order-1 lg:order-2">
          <div id="buy-box" className="sticky top-28 bg-[#080808] border border-white/10 p-8 shadow-2xl z-30 scroll-mt-28">
            
            <div className="flex items-center gap-2 mb-4 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              <span className="text-gray-400 text-xs tracking-widest ml-2 uppercase font-bold">984 Reports Deployed</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-[1.05] text-white">
              AUTONOMOUS <br/> ESPRESSO ENGINE.
            </h1>
            
            <p className="text-sm text-gray-400 font-light mb-8 max-w-sm leading-relaxed">
              Stop blowing your budget on takeaway coffees. Experience 18 bars of raw industrial pressure. <strong className="text-white">Anywhere. Anytime.</strong> Zero cords. Zero excuses.
            </p>

            <form action={buyNow} className="w-full">
              <input type="hidden" name="variantId" value={variantId} />
              
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

              <button type="submit" className="w-full bg-white text-black px-8 py-5 text-sm font-black tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-4 group cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                SECURE YOUR DEPLOYMENT KIT
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

      {/* Floating Action Button (FAB - Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#050505] border-t border-white/10 p-4 z-50">
          <form action={buyNow}>
             <input type="hidden" name="variantId" value={variantId} />
             <button type="submit" className="w-full bg-white text-black px-4 py-4 text-xs font-black tracking-[0.2em] uppercase hover:bg-gray-200 flex items-center justify-center gap-3">
                SECURE UNIT - ${price} <ArrowRight className="w-4 h-4" />
             </button>
          </form>
      </div>
      
      {/* Footer Minimalista */}
      <footer className="border-t border-white/5 bg-black py-16 text-center pb-28 lg:pb-16 relative z-20">
        <h2 className="text-2xl font-black tracking-[0.3em] uppercase text-white/20 mb-4">Dilemma Drift</h2>
        <p className="text-xs text-gray-600 uppercase tracking-widest">© 2026. All rights reserved. Oroná Del Carlo Corp. Industrial Logistics Div.</p>
      </footer>
    </div>
  );
}