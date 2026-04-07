import { shopifyFetch } from '../lib/shopify';
import { ArrowRight, BatteryCharging, Zap, Star, ShieldCheck, Check, X, Package, CheckCircle2, Settings, Thermometer, Coffee } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
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
  
  const fullVariantId = productNode.variants.edges[0]?.node?.id || '';
  const rawVariantId = fullVariantId.split('/').pop();
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'dilemma-drift-3.myshopify.com';
  const checkoutUrl = `https://${storeDomain}/cart/${rawVariantId}:1`;

  const WHATSAPP_NUMBER = "5491100000000"; 
  const WHATSAPP_MSG = "Hello Dilemma Drift, I need assistance with the Autonomous Espresso Engine.";

  // Batallón de 72 Reseñas Únicas
  const baseReviews = [
    { id: 1, name: "Mia T.", date: "02/03/2026", img: "/review-1.jpg", text: "Received as a Christmas Gift - perfect for taking away camping and still getting my coffee fix." },
    { id: 2, name: "Emma T.", date: "28/02/2026", img: "/review-2.jpg", text: "Saved me a fortune. I used to spend $8 a day at Starbucks. This paid for itself in less than a month." },
    { id: 3, name: "Jacob L.", date: "19/02/2026", img: "/review-3.jpg", text: "Fantastic on-the-go espresso maker. The 18-bar pressure isn't a marketing gimmick, the crema is thick." },
    { id: 4, name: "Daniel H.", date: "14/01/2026", img: "/review-4.jpg", text: "My go-to for weekends away. Easy operation, great flavor and truly portable. Fits right into my car's cup holder." },
    { id: 5, name: "Kristy S.", date: "13/12/2025", img: "/review-5.jpg", text: "Impressive modularity. I've only tried the large capsule and ground coffee, super hot. Perfect deployment asset." },
    { id: 6, name: "Andrew C.", date: "13/12/2025", img: "/review-6.jpg", text: "Easy deployment briefing. Brewed my first espresso in minutes. Absolute tactical advantage for long drives." },
    { id: 7, name: "Kylie C.", date: "13/12/2025", text: "I should have bought it a long time ago - great for travelling." },
    { id: 8, name: "Ava M.", date: "29/01/2026", text: "Finally, real espresso on the road. Simple to use and super lightweight - highly recommend." },
    { id: 9, name: "Ethan B.", date: "04/02/2026", text: "Changed my morning commute. Quick setup, solid pressure and delicious shots every time." },
    { id: 10, name: "Isabella W.", date: "09/02/2026", text: "Ideal for travel, easy cleaning and the coffee quality rivals my home machine." },
    { id: 11, name: "Olivia G.", date: "02/01/2026", text: "Perfect for my camping trips! Pulls a surprisingly rich shot in minutes - compact and no hassle." },
    { id: 12, name: "Noah K.", date: "14/01/2026", text: "Love how portable this is. Fits in my backpack, heats up fast and the espresso tastes way better than instant coffee." },
    { id: 13, name: "Lauren F.", date: "13/12/2025", text: "Good quality. Does its job as described. Battery lasts for 4-5 extractions on heating mode." },
    { id: 14, name: "Livia C.", date: "08/12/2025", text: "I take it to uni - perfect between classes." },
    { id: 15, name: "Trevor M.", date: "09/12/2025", text: "Never letting this out of my sight. Absolute tactical advantage." },
    { id: 16, name: "Darren M.", date: "08/12/2025", text: "Coffee quality is incredible. Pulls a thick crema every single time." },
    { id: 17, name: "Rosa B.", date: "07/12/2025", text: "Perfect for remote work locations. Cold mornings are brutal, but hot espresso at 5 AM changes everything." },
    { id: 18, name: "Alina N.", date: "04/12/2025", text: "Fresh, hot espresso on command. What more could you want?" },
    { id: 19, name: "Daniela R.", date: "01/12/2025", text: "Great machine for vans, camping, worksite - basically anywhere." },
    { id: 20, name: "Yelena V.", date: "01/12/2025", text: "Makes my mornings way easier. Load it up the night before, press the button in the car." },
    { id: 21, name: "Tessa Q.", date: "30/11/2025", text: "Battery lasts longer than expected. Very happy with the purchase." },
    { id: 22, name: "Viktor D.", date: "29/11/2025", text: "Absolute essential for camping season. Threw out my old french press immediately." },
    { id: 23, name: "Lila W.", date: "28/11/2025", text: "The machine is compact but extracts like a full-size unit. Industrial mechanism works." },
    { id: 24, name: "Luca B.", date: "28/11/2025", text: "Exactly what I needed for the car. Fits perfectly in the cup holder." },
    { id: 25, name: "Callan W.", date: "28/11/2025", text: "My partner and I fight over who gets to use it first. Buying a second unit." },
    { id: 26, name: "Viktor S.", date: "27/11/2025", text: "Makes smooth, rich espresso with minimal effort. Cleaning is super easy too." },
    { id: 27, name: "Tahlia B.", date: "27/11/2025", text: "One of the best portable gadgets I own. The thermodynamic core is no joke." },
    { id: 28, name: "Nia T.", date: "26/11/2025", text: "No more dodgy instant coffee at work! I bring my own specialty grounds now." },
    { id: 29, name: "Sienna H.", date: "25/11/2025", text: "Well worth the investment. Paid for itself by skipping cafes for 3 weeks." },
    { id: 30, name: "Callum F.", date: "25/11/2025", text: "Fantastic crema and good body. I was skeptical but it proved me wrong." },
    { id: 31, name: "Priya R.", date: "25/11/2025", text: "The triple-compatibility is a game changer. Capsules or grounds - both taste great." },
    { id: 32, name: "Hugo L.", date: "25/11/2025", text: "Works great for iced coffee too. Just use cold water and don't double click." },
    { id: 33, name: "Mirella C.", date: "25/11/2025", text: "Such a handy machine for early weekend trips." },
    { id: 34, name: "Jonas S.", date: "24/11/2025", text: "Quiet, compact, and efficient. The self-heating is completely silent." },
    { id: 35, name: "Amir K.", date: "25/11/2025", text: "Perfect for brewing on the job site. Industrial grade build feels solid." },
    { id: 36, name: "Stefan I.", date: "24/11/2025", text: "The perfect blend of portability and power. 18 bars is real." },
    { id: 37, name: "Zahid R.", date: "24/11/2025", text: "Takes up no space in my bag. I travel internationally and it's TSA compliant." },
    { id: 38, name: "Ravi S.", date: "23/11/2025", text: "So easy to operate, even my dad loves it." },
    { id: 39, name: "Quentin L.", date: "23/11/2025", text: "Took it caravanning and used it every day without fail." },
    { id: 40, name: "Talia W.", date: "22/11/2025", text: "Love the convenience and taste. Exceeded all expectations." },
    { id: 41, name: "Malika C.", date: "21/11/2025", text: "Fits neatly in my desk drawer. Colleagues are always asking about it." },
    { id: 42, name: "Pietro A.", date: "21/11/2025", text: "Excellent tool for any adventurer. Rugged and reliable." },
    { id: 43, name: "Felix D.", date: "21/11/2025", text: "Saves me from terrible servo coffee." },
    { id: 44, name: "Aya M.", date: "19/11/2025", text: "Ideal for a quick coffee before work. Just grab and go." },
    { id: 45, name: "Braden P.", date: "19/11/2025", text: "I keep it in the ute toolbox - so handy. Tough enough to survive." },
    { id: 46, name: "Emilia F.", date: "19/11/2025", text: "Smooth, bold espresso every time. I use Dolce Gusto capsules." },
    { id: 47, name: "Idris S.", date: "19/11/2025", text: "Really handy for busy parents. Instant caffeine hit." },
    { id: 48, name: "Henrik L.", date: "18/11/2025", text: "Great for FIFO. Helps me start the day with something decent." },
    { id: 49, name: "Freya W.", date: "18/11/2025", text: "I brew with capsules mostly, works brilliantly." },
    { id: 50, name: "Matteo D.", date: "16/11/2025", text: "A staple in my work bag now. Never leaving home without it." },
    { id: 51, name: "Victor R.", date: "18/11/2025", text: "Mini but mighty - genuinely impressed." },
    { id: 52, name: "Elias C.", date: "16/11/2025", text: "The most convenient coffee solution ever. Zero cables to worry about." },
    { id: 53, name: "Sarah J.", date: "10/11/2025", text: "Customer service is amazing. Had a question about shipping and they replied in 10 minutes." },
    { id: 54, name: "Mike T.", date: "09/11/2025", text: "Fastest heat up time I've seen on a portable machine. Just 3 minutes." },
    { id: 55, name: "Jess K.", date: "05/11/2025", text: "Was a bit heavy, but given it has a heating engine inside, it's totally understandable. Love it." },
    { id: 56, name: "Rob V.", date: "01/11/2025", text: "Military grade build quality. Dropped it once, didn't even scratch." },
    { id: 57, name: "Nina L.", date: "28/10/2025", text: "The crema is actually better than my $1500 Breville at home. Crazy." },
    { id: 58, name: "Liam P.", date: "24/10/2025", text: "Took this snowboarding. Having hot espresso on a mountain peak is a flex." },
    { id: 59, name: "Zoe D.", date: "20/10/2025", text: "Onyx black looks incredible. Very sleek corporate design." },
    { id: 60, name: "Harry W.", date: "15/10/2025", text: "Don't bother with cheaper clones. This is the real deal." },
    { id: 61, name: "Tomás G.", date: "10/10/2025", text: "Got it for my dad who drives trucks. He hasn't stopped talking about how good the hot extraction is." },
    { id: 62, name: "Elena V.", date: "05/10/2025", text: "Doesn't leak, doesn't jam, just works. The Type-C charging is super convenient." },
    { id: 63, name: "Ryan W.", date: "01/10/2025", text: "I work in photography and early morning shoots are freezing. This engine brings me back to life." },
    { id: 64, name: "Sophie L.", date: "28/09/2025", text: "Better than hotel room coffee by a mile. It travels with me everywhere now." },
    { id: 65, name: "Gareth N.", date: "20/09/2025", text: "It's heavy enough to feel premium, but light enough to hike with. Perfect balance." },
    { id: 66, name: "Maya C.", date: "15/09/2025", text: "Customer service was excellent when I had a question about the pod adapters." },
    { id: 67, name: "Ian B.", date: "10/09/2025", text: "The double-click heating feature is intuitive. No complex menus, just raw performance." },
    { id: 68, name: "Zoe F.", date: "05/09/2025", text: "I use large pods and the adapter fits perfectly. No water bypassing the seal." },
    { id: 69, name: "Connor D.", date: "01/09/2025", text: "It literally pays for itself. Do the math on takeaway coffees. This is an investment." },
    { id: 70, name: "Talia S.", date: "28/08/2025", text: "Gave up my home pod machine for this. Takes up zero counter space and performs identically." },
    { id: 71, name: "Omar H.", date: "20/08/2025", text: "As a pilot, I need reliable coffee on layovers. This is my permanent wingman." },
    { id: 72, name: "Julian M.", date: "15/08/2025", text: "If you're hesitating, just buy it. Best piece of tech in my everyday carry." }
  ];

  // Fraccionamiento: 6 reseñas por bloque para crear la cascada (12 bloques en total)
  const chunkSize = 6;
  const reviewChunks = [];
  for (let i = 0; i < baseReviews.length; i += chunkSize) {
    reviewChunks.push(baseReviews.slice(i, i + chunkSize));
  }

  // GENERADOR ESTRUCTURAL BOTTOM-UP (Fricción Cero - Sin Funciones React Anidadas)
  let reviewWallContent = null;
  for (let i = reviewChunks.length - 1; i >= 0; i--) {
    const chunk = reviewChunks[i];
    const isLast = i === reviewChunks.length - 1;

    reviewWallContent = (
      <div className="w-full contents">
        <div className="masonry-columns space-y-4 mb-4 w-full block">
          {chunk.map((review) => (
            <div key={`rev-${review.id}`} className="bg-[#111111] text-gray-200 rounded-sm border border-white/5 break-inside-avoid overflow-hidden flex flex-col hover:border-white/20 transition-all relative mb-4">
              
              {/* Modal Checkbox Trigger */}
              <label htmlFor={`modal-${review.id}`} className="absolute inset-0 z-10 cursor-pointer"></label>
              
              {review.img && (
                <div className="w-full aspect-[4/3] bg-black relative border-b border-white/5">
                  <img src={review.img} alt="Deployment Asset" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                   <div>
                      <p className="text-sm font-bold text-white flex items-center gap-1">
                         {review.name} <CheckCircle2 className="w-3 h-3 text-green-500" />
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">{review.date}</p>
                   </div>
                </div>
                <div className="flex text-yellow-500 gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={`st-${review.id}-${j}`} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-light italic">"{review.text}"</p>
              </div>

              {/* MODAL NATIVO (Estética Ónix) inyectado inline para seguridad del servidor */}
              <div className="review-modal-container contents">
                 <input type="checkbox" id={`modal-${review.id}`} className="peer/modal hidden" />
                 <div className="fixed inset-0 z-[200] hidden peer-checked/modal:flex items-center justify-center p-4">
                    <label htmlFor={`modal-${review.id}`} className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"></label>
                    <div className="relative bg-[#0a0a0a] text-white p-8 max-w-md w-full rounded-md shadow-2xl z-10 border border-white/10 animate-fade-in">
                       <label htmlFor={`modal-${review.id}`} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/5 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
                          <X className="w-4 h-4 text-gray-400" />
                       </label>
                       <div className="flex justify-between items-start mb-6">
                          <div>
                             <div className="flex items-center gap-2 mb-2">
                               <h3 className="font-bold text-lg">{review.name}</h3>
                               <div className="flex items-center gap-1 text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-sm text-xs font-bold uppercase tracking-widest">
                                  <CheckCircle2 className="w-3 h-3" /> Verified
                               </div>
                             </div>
                             <div className="flex text-yellow-500">
                               {[...Array(5)].map((_, j) => <Star key={`st-mod-${review.id}-${j}`} className="w-4 h-4 fill-current" />)}
                             </div>
                          </div>
                          <span className="text-xs text-gray-500 font-mono mt-1">{review.date}</span>
                       </div>
                       <p className="text-gray-300 text-base leading-relaxed mb-6 font-light italic">"{review.text}"</p>
                       {review.img && (
                         <div className="w-full aspect-square bg-black border border-white/5 rounded-sm overflow-hidden mb-4">
                            <img src={review.img} alt="Customer product" className="w-full h-full object-cover" />
                         </div>
                       )}
                       <div className="border-t border-white/10 pt-4 mt-2">
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Item deployed: Matte Onyx Black</p>
                       </div>
                    </div>
                 </div>
              </div>

            </div>
          ))}
        </div>
        
        {!isLast && (
          <div className="w-full break-inside-avoid flex flex-col items-center mt-6 mb-10">
            <input type="checkbox" id={`load-more-${i}`} className="toggle-chk hidden" />
            <label htmlFor={`load-more-${i}`} className="toggle-lbl bg-transparent border border-white/20 text-white px-8 py-4 text-xs tracking-widest font-bold uppercase hover:bg-white hover:text-black transition-colors cursor-pointer text-center w-full md:w-auto">
              Show more reports
            </label>
            <div className="toggle-content hidden w-full">
              {reviewContent}
            </div>
          </div>
        )}
      </div>
    );
    // Preservamos el scope para la próxima iteración
    var reviewContent = reviewWallContent; 
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black antialiased pb-20 lg:pb-0 relative">
      
      {/* Motor CSS Seguro */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        
        .masonry-columns { column-count: 1; column-gap: 16px; width: 100%; display: block; }
        @media (min-width: 640px) { .masonry-columns { column-count: 2; } }
        
        .toggle-chk:checked ~ .toggle-content { display: block; }
        .toggle-chk:checked ~ .toggle-lbl { display: none; }
      `}} />

      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-[88px] lg:bottom-6 right-6 z-[100] bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform border border-white/10" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.013-.967-.253-.099-.439-.149-.624.149-.183.298-.715.967-.877 1.166-.165.198-.328.223-.625.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.624-1.505-.855-2.059-.227-.539-.456-.465-.624-.473-.165-.008-.353-.008-.539-.008-.184 0-.486.074-.739.372-.253.297-.967.944-.967 2.304s.991 2.675 1.13 2.873c.138.198 1.954 2.997 4.735 4.196.662.285 1.179.456 1.583.584.665.21 1.269.18 1.745.109.535-.08 1.758-.717 2.004-1.411.246-.694.246-1.289.173-1.411-.074-.124-.26-.198-.557-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      <div className="bg-white text-black py-2 overflow-hidden relative z-50 border-b border-gray-300">
        <div className="animate-marquee whitespace-nowrap text-[10px] font-black tracking-[0.2em] uppercase flex items-center">
          {[...Array(15)].map((_, i) => <span key={i} className="mx-8">GLOBAL LAUNCH: 50% OFF + FREE WORLDWIDE EXPRESS SHIPPING</span>)}
        </div>
      </div>

      <nav className="p-5 border-b border-white/5 flex justify-between items-center bg-[#050505]/95 backdrop-blur-md sticky top-0 z-40">
        <h1 className="text-xs font-bold tracking-[0.3em] uppercase text-white/70">DILEMMA DRIFT <span className="text-white/30 hidden md:inline">/ GLOBAL OPERATIVE</span></h1>
        <a href={checkoutUrl} className="text-[10px] font-bold tracking-[0.2em] uppercase text-black bg-white px-6 py-3 hover:bg-gray-300 transition-colors flex items-center gap-2">
            SECURE UNIT <ArrowRight className="w-3 h-3" />
        </a>
      </nav>

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
              {[ { step: 1, title: "Load Ammo", desc: "Insert Nespresso capsule, large pod, or ground coffee." }, { step: 2, title: "Add Water", desc: "Pour water into the reservoir. Double-click to self-heat." }, { step: 3, title: "Extract", desc: "Experience 18-bar pressure delivering rich, thick crema anywhere." } ].map(s => (
                <div key={s.step} className="bg-[#0a0a0a] p-6 border border-white/5 text-center hover:border-white/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto mb-4">{s.step}</div>
                  <h3 className="text-sm font-bold uppercase mb-2 text-white">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

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

          {/* IMAGEN DE VEHÍCULO / ARQUITECTURA */}
          <div className="w-full bg-[#050505] flex items-center justify-center p-4 border border-white/5 rounded-md">
             <img src="/field-deployment.png" alt="Core Architecture Diagram" className="w-full h-auto object-contain max-h-[500px]" />
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
                <div key={row.f} className="flex justify-between items-center border-b border-white/5 pb-4 transition-colors hover:bg-white/[0.02]">
                  <span className="text-xs text-gray-400 w-1/3 uppercase font-light">{row.f}</span>
                  <span className="w-1/3 flex justify-center">{row.u ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</span>
                  <span className="w-1/3 flex justify-center">{row.t ? <Check className="w-4 h-4 text-gray-600" /> : <X className="w-4 h-4 text-red-900" />}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LA MURALLA DE CONFIANZA TOTALMENTE INTEGRADA */}
          <div className="bg-transparent text-white pt-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-6">
               <h2 className="text-2xl font-black tracking-widest uppercase text-white">Verified Mission Reports</h2>
               <div className="flex items-center gap-4">
                  <div className="flex text-yellow-500 gap-1">
                    {[...Array(5)].map((_, j) => <Star key={`stt-${j}`} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">681 Reports</span>
               </div>
            </div>
            
            {/* Se inyecta la Variable del Motor Directo */}
            {reviewWallContent}
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center border-b border-white/10 pb-4 text-white">Intelligence Data</h2>
            <div className="space-y-4">
              {[ { q: "Do I need hot water or power to use it?", a: "Negative. The engine features a 2500mAh self-heating core. Just add cold water, double click to activate, and it heats to 90°C in under 200 seconds." }, { q: "Which capsules are compatible?", a: "Absolute modular versatility. Includes adapters for standard small capsules (Nespresso Original), large pods (Dolce Gusto), and your own freshly ground coffee beans." }, { q: "How do I clean the modular chamber?", a: "Hassle-free operation. Fill the reservoir with fresh water and run a cycle without ammunition (capsules). The 18-bar pressure system purges itself automatically in under 30 seconds." } ].map(faq => (
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

        {/* Right Column: Checkout Directo */}
        <div id="buy-box" className="w-full lg:w-[45%] order-1 lg:order-2">
          <div className="sticky top-28 bg-[#080808] border border-white/10 p-8 shadow-2xl z-30 scroll-mt-28">
            
            <div className="flex items-center gap-2 mb-4 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={`str-${i}`} className="w-4 h-4 fill-current" />)}
              <span className="text-gray-400 text-xs tracking-widest ml-2 uppercase font-bold">681 Reports Deployed</span>
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