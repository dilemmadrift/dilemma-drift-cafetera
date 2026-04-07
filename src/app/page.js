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

  // Generación masiva de reseñas tácticas
  const reviews = [
    { name: "Mia T.", date: "02/03/2026", img: "/review-1.jpg", text: "Received as a gift - perfect for taking away camping and still getting my coffee fix. The self-heating is completely silent." },
    { name: "Emma T.", date: "28/02/2026", img: "/review-2.jpg", text: "Dilemma Drift has saved me a fortune. I used to spend $8 a day at Starbucks. This paid for itself in less than a month." },
    { name: "Jacob L.", date: "19/02/2026", img: "/review-3.jpg", text: "Fantastic on-the-go espresso maker. The 18-bar pressure isn't a marketing gimmick, the crema is incredibly thick." },
    { name: "Daniel H.", date: "14/01/2026", img: "/review-4.jpg", text: "My go-to for weekends away. Easy operation, great flavor and truly portable. Fits right into my car's cup holder." },
    { name: "Kristy S.", date: "13/12/2025", img: "/review-5.jpg", text: "Impressive how this works. I've only tried it with the large capsule and it comes out super hot, perfect for taking anywhere." },
    { name: "Andrew C.", date: "13/12/2025", img: "/review-6.jpg", text: "Instructions easy to follow and was able to brew my first coffee within minutes. Will definitely be taking this camping." },
    { name: "Ava M.", date: "29/01/2026", text: "Finally, real espresso on the road. Simple to use and super lightweight - highly recommend." },
    { name: "Ethan B.", date: "04/02/2026", text: "Changed my morning commute. Quick setup, solid pressure and delicious shots every time." },
    { name: "Isabella W.", date: "09/02/2026", text: "Ideal for travel, easy cleaning and the coffee quality rivals my $1200 home machine." },
    { name: "Noah K.", date: "14/01/2026", text: "Love how portable this is. Fits in my backpack, heats up fast and the espresso tastes way better than instant coffee." },
    { name: "Lauren F.", date: "13/12/2025", text: "Good quality. Does its job exactly as described. The battery lasts for about 4-5 hot extractions on a single charge." },
    { name: "Olivia G.", date: "02/01/2026", text: "Perfect for my camping trips! Pulls a surprisingly rich shot in minutes - compact and no hassle." },
    { name: "Isla M.", date: "09/12/2025", text: "Produces a solid crema layer every time. I use Nespresso pods and it hasn't failed me once." },
    { name: "Arjun C.", date: "08/12/2025", text: "The flavor depth is spot on. I use my own freshly ground beans and the extraction is flawless." },
    { name: "Livia C.", date: "08/12/2025", text: "I take it to uni - perfect between classes. The carrying case is also a nice touch." },
    { name: "Trevor M.", date: "09/12/2025", text: "Never letting this out of my sight. Best piece of tech I bought this year." },
    { name: "Darren M.", date: "08/12/2025", text: "Coffee quality is incredible. Fast shipping to Sydney too." },
    { name: "Rosa B.", date: "07/12/2025", text: "Perfect for remote work locations. I work in construction and this is a lifesaver at 5 AM." },
    { name: "Alina N.", date: "04/12/2025", text: "Fresh, hot espresso on command. What more could you want?" },
    { name: "Yelena V.", date: "01/12/2025", text: "Makes my mornings way easier. Load it up the night before, press a button in the car." },
    { name: "Callan W.", date: "28/11/2025", text: "My partner and I fight over who gets to use it first. Gonna have to buy a second unit." },
    { name: "Viktor D.", date: "29/11/2025", text: "Absolute essential for camping season. Threw out my old french press immediately." },
    { name: "Priya R.", date: "25/11/2025", text: "The triple-compatibility is a game changer. Capsules or grounds - both taste great." },
    { name: "Elias C.", date: "16/11/2025", text: "The most convenient coffee solution ever. Zero cables to worry about." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black antialiased pb-20 lg:pb-0">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}} />

      <div className="bg-white text-black py-2 overflow-hidden relative z-50 border-b border-gray-300">
        <div className="animate-marquee whitespace-nowrap text-[10px] font-black tracking-[0.2em] uppercase flex items-center">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="mx-8">⚡ GLOBAL LAUNCH: 50% OFF + FREE SHIPPING</span>
          ))}
        </div>
      </div>

      <nav className="p-6 border-b border-white/5 flex justify-between items-center bg-[#050505]/90 backdrop-blur-md sticky top-0 z-40">
        <h1 className="text-xs font-bold tracking-[0.4em] uppercase text-white/60">DILEMMA DRIFT / GLOBAL</h1>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Column */}
        <div className="w-full lg:w-[55%] flex flex-col gap-16 order-2 lg:order-1">
          
          {/* Hero Video (Nombre actualizado) */}
          <div className="aspect-[4/5] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000">
              <source src="/demo-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Operational Briefing */}
          <div>
            <h2 className="text-2xl font-black tracking-[0.1em] uppercase mb-8 text-center border-b border-white/10 pb-4">Operational Briefing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0a0a0a] p-6 border border-white/5 text-center hover:border-white/20 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto mb-4">1</div>
                <h3 className="text-sm font-bold uppercase mb-2">Load Ammo</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Insert Nespresso capsule, large pod, or your favorite ground coffee into the chamber.</p>
              </div>
              <div className="bg-[#0a0a0a] p-6 border border-white/5 text-center hover:border-white/20 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto mb-4">2</div>
                <h3 className="text-sm font-bold uppercase mb-2">Add Water</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Pour cold or hot water into the reservoir. Double click to activate the self-heating core.</p>
              </div>
              <div className="bg-[#0a0a0a] p-6 border border-white/5 text-center hover:border-white/20 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto mb-4">3</div>
                <h3 className="text-sm font-bold uppercase mb-2">Extract</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Experience 18-bar pressure delivering a rich, thick, barista-level crema anywhere.</p>
              </div>
            </div>
          </div>

          {/* Videos de Acción (Nombres actualizados) */}
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

          {/* LA MURALLA DE CONFIANZA (Masonry Grid) */}
          <div className="mt-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
               <h2 className="text-2xl font-black tracking-[0.1em] uppercase">Field Evidence</h2>
               <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">4.9/5</span>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
               </div>
            </div>
            
            {/* Masonry Columns Layout */}
            <div className="columns-1 md:columns-2 gap-4 space-y-4">
              {reviews.map((review, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/10 break-inside-avoid overflow-hidden flex flex-col hover:border-white/20 transition-colors">
                  {review.img && (
                    <div className="w-full aspect-[4/3] bg-[#111] relative border-b border-white/5">
                      <img src={review.img} alt={`Review ${i}`} className="absolute inset-0 w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                       <div className="flex text-yellow-500">
                         {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                       </div>
                       <span className="text-[10px] text-gray-600 font-mono">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-300 font-light leading-relaxed mb-4 flex-1">"{review.text}"</p>
                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5">
                       <CheckCircle2 className="w-4 h-4 text-green-500" />
                       <div className="flex flex-col">
                          <p className="text-xs font-bold text-gray-200">{review.name}</p>
                          <p className="text-[9px] text-gray-500 uppercase tracking-widest">Verified Buyer</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Botón Fake de Carga para anclaje psicológico */}
            <button className="w-full mt-8 py-4 border border-white/20 text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-white hover:border-white transition-colors">
               Load 426 More Reports
            </button>
          </div>

          {/* Intelligence Data (FAQ) */}
          <div className="mb-12">
            <h2 className="text-2xl font-black tracking-[0.1em] uppercase mb-8 text-center border-b border-white/10 pb-4">Intelligence Data</h2>
            <div className="space-y-4">
              <details className="group border border-white/10 bg-[#0a0a0a] p-6 cursor-pointer hover:border-white/30 transition-colors">
                <summary className="font-bold tracking-widest uppercase text-xs flex justify-between items-center text-white">
                  Do I need hot water to use it?
                  <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl font-light">+</span>
                </summary>
                <p className="mt-4 text-gray-400 font-light text-sm leading-relaxed border-t border-white/5 pt-4">
                  Negative. The engine features a 2500mAh self-heating core. Just add cold water, and it heats it to 90°C in under 200 seconds. 
                </p>
              </details>
              <details className="group border border-white/10 bg-[#0a0a0a] p-6 cursor-pointer hover:border-white/30 transition-colors">
                <summary className="font-bold tracking-widest uppercase text-xs flex justify-between items-center text-white">
                  What capsules are compatible?
                  <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl font-light">+</span>
                </summary>
                <p className="mt-4 text-gray-400 font-light text-sm leading-relaxed border-t border-white/5 pt-4">
                  Absolute modularity. It includes adapters for standard small capsules (Nespresso Original), large pods (Dolce Gusto size), and a dedicated chamber for your own freshly ground coffee.
                </p>
              </details>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Buy Box */}
        <div className="w-full lg:w-[45%] order-1 lg:order-2">
          <div className="sticky top-28 bg-[#080808] border border-white/10 p-8 shadow-2xl z-30">
            
            <div className="flex items-center gap-2 mb-4 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              <span className="text-gray-400 text-xs tracking-widest ml-2 uppercase font-bold">450+ Reports</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-[1.05]">
              AUTONOMOUS <br/> ESPRESSO ENGINE.
            </h1>
            
            <p className="text-sm text-gray-400 font-light mb-8">
              Stop blowing your budget on takeaway coffees. Experience 18 bars of raw industrial pressure. <strong className="text-white">Anywhere. Anytime.</strong>
            </p>

            <form action={buyNow} className="w-full">
              <input type="hidden" name="variantId" value={variantId} />
              
              <div className="flex items-end gap-4 mb-6 border-b border-white/10 pb-6">
                  <span className="text-5xl font-black tracking-tighter text-white">${price}</span>
                  <span className="text-xl text-gray-600 line-through decoration-red-500/50 decoration-2 mb-1">${compareAtPrice}</span>
                  <span className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-2 ml-auto animate-pulse">Save 50%</span>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                 <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gray-300">
                    <Zap className="w-4 h-4 text-green-500" /> Free Worldwide Express Shipping
                 </div>
                 <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gray-300">
                    <ShieldCheck className="w-4 h-4 text-white" /> 2-Year Industrial Warranty
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

      {/* Floating Action Button (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#050505] border-t border-white/10 p-4 z-50">
          <form action={buyNow}>
             <input type="hidden" name="variantId" value={variantId} />
             <button type="submit" className="w-full bg-white text-black px-4 py-4 text-xs font-black tracking-[0.2em] uppercase hover:bg-gray-200 flex items-center justify-center gap-3">
                SECURE UNIT - ${price} <ArrowRight className="w-4 h-4" />
             </button>
          </form>
      </div>
      
      <footer className="border-t border-white/5 bg-black py-12 text-center pb-24 lg:pb-12">
        <h2 className="text-2xl font-black tracking-[0.3em] uppercase text-white/20 mb-4">Dilemma Drift</h2>
        <p className="text-xs text-gray-600 uppercase tracking-widest">© 2026. All rights reserved. Oroná Del Carlo Corp.</p>
      </footer>
    </div>
  );
}