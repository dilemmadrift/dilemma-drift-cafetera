import { shopifyFetch } from '../lib/shopify';
import { ArrowRight, Zap, Star, ShieldCheck, Check, X, CheckCircle2, Thermometer, Coffee, Lock, CreditCard, ChevronDown } from "lucide-react";

export const dynamic = 'force-dynamic';

const totalReviewsAnclaje = 681;

const StarRating48 = () => (
  <div className="flex text-yellow-500 mt-2 gap-0.5 select-none">
    <Star className="w-5 h-5 fill-current" />
    <Star className="w-5 h-5 fill-current" />
    <Star className="w-5 h-5 fill-current" />
    <Star className="w-5 h-5 fill-current" />
    <div className="relative w-5 h-5">
       <Star className="absolute top-0 left-0 w-5 h-5 text-gray-700" />
       <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: '80%' }}>
         <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
       </div>
    </div>
  </div>
);

const ReviewModal = ({ review }) => (
  <div className="review-modal-container contents">
    <input type="checkbox" id={`modal-${review.id}`} className="peer/modal hidden" />
    <div className="fixed inset-0 z-[200] hidden peer-checked/modal:flex items-center justify-center p-4">
       <label htmlFor={`modal-${review.id}`} className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"></label>
       <div className="relative bg-[#0a0a0a] text-white p-8 max-w-md w-full rounded-md shadow-[0_0_40px_rgba(255,255,255,0.05)] z-10 border border-white/10 animate-fade-in">
          <label htmlFor={`modal-${review.id}`} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/5 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
             <X className="w-4 h-4 text-gray-400" />
          </label>
          <div className="flex justify-between items-start mb-6">
             <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg tracking-wide">{review.name}</h3>
                  <div className="flex items-center gap-1 text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-sm text-xs font-bold uppercase tracking-widest">
                     <CheckCircle2 className="w-3 h-3" /> Verified
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => <Star key={`stm-${review.id}-${j}`} className={`w-4 h-4 ${j < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-700'}`} />)}
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
             <p className="text-[10px] text-gray-500 uppercase tracking-widest">Item deployed: The Obsidian Press</p>
          </div>
       </div>
    </div>
  </div>
);

const PaymentIcons = () => (
  <div className="flex flex-col items-center justify-center gap-2 opacity-50 mt-6 select-none">
    <div className="flex items-center gap-2 text-white">
      <Lock className="w-3 h-3" />
      <span className="text-[9px] font-bold uppercase tracking-widest">Guaranteed Safe Checkout</span>
    </div>
    <div className="flex gap-2 text-gray-400"><CreditCard className="w-5 h-5" /></div>
  </div>
);

export default async function Home() {
  let price = "119.99";
  let compareAtPrice = "179.98";
  let rawVariantId = "fallback-id-123";
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'dilemma-drift-3.myshopify.com';

  try {
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

    if (productNode) {
      price = parseFloat(productNode.priceRange.minVariantPrice.amount).toFixed(2);
      compareAtPrice = (price * 1.5).toFixed(2); 
      const fullVariantId = productNode.variants.edges[0]?.node?.id || '';
      rawVariantId = fullVariantId.split('/').pop() || rawVariantId;
    }
  } catch (error) {
    console.error("Shopify Link Fractured. Deploying fallback UI.", error);
  }

  const checkoutUrlBase = `https://${storeDomain}/cart/${rawVariantId}`;
  const numericalPrice = parseFloat(price || "119.99");

  const baseReviews = [
    { id: 1, name: "Alexander W.", date: "USA", rating: 5, img: "/review-1.jpg", text: "Takes up zero space in my Porsche. The build quality feels like a heavy, expensive lens. Pulls a thick crema every single time." },
    { id: 2, name: "Marcus T.", date: "UK", rating: 5, img: null, text: "I travel 200 days a year for consulting. This machine paid for itself in the first 3 weeks. The 20-bar pump is no joke." },
    { id: 3, name: "Sofia G.", date: "Italy", rating: 5, img: "/review-2.jpg", text: "Pure engineering. The fact that it boils cold water from battery power alone is mind-blowing. Replaced my entire home setup." },
    { id: 4, name: "David H.", date: "Canada", rating: 5, img: "/review-3.jpg", text: "Saved me a fortune. I used to drop $8 a day at the local cafe. Now I make a better espresso at my desk in 3 minutes." },
    { id: 5, name: "Jacob L.", date: "Australia", rating: 5, img: "/review-4.jpg", text: "Fantastic on-the-go asset. The matte onyx finish looks incredibly premium. Bought the duo pack for my partner." },
    { id: 6, name: "Christian M.", date: "Germany", rating: 4, img: null, text: "Still getting used to the double-click heating function, but very happy so far. The extraction is incredibly smooth." },
    { id: 7, name: "Daniel H.", date: "USA", rating: 5, img: "/review-5.jpg", text: "My go-to for weekend drives. Easy operation, deep flavor profile and truly cordless. Fits right into the cup holder." },
    { id: 8, name: "Scott K.", date: "USA", rating: 2, img: null, text: "It didn't puncture my large capsules correctly at first. Found out I wasn't pushing the adapter down hard enough. User error." },
    { id: 9, name: "Oliver S.", date: "Switzerland", rating: 5, img: "/review-6.jpg", text: "Impressive modularity. I've run both Nespresso pods and my own roasted grounds. Super hot. The perfect deployment tool." }
  ];

  const count5 = Math.floor(totalReviewsAnclaje * 0.86);
  const count4 = Math.floor(totalReviewsAnclaje * 0.10);
  const count3 = Math.floor(totalReviewsAnclaje * 0.03);
  const count2 = Math.floor(totalReviewsAnclaje * 0.01);
  const count1 = totalReviewsAnclaje - (count5 + count4 + count3 + count2); 

  const reviewStats = [
    { star: 5, pct: "86%", count: count5 },
    { star: 4, pct: "10%", count: count4 },
    { star: 3, pct: "3%", count: count3 },
    { star: 2, pct: "1%", count: count2 },
    { star: 1, pct: "0%", count: count1 }
  ];

  const chunkSize = 6;
  const reviewChunks = [];
  for (let i = 0; i < baseReviews.length; i += chunkSize) {
    reviewChunks.push(baseReviews.slice(i, i + chunkSize));
  }

  let reviewWallContent = null;
  for (let i = reviewChunks.length - 1; i >= 0; i--) {
    const chunk = reviewChunks[i];
    const isLast = i === reviewChunks.length - 1;
    reviewWallContent = (
      <div className="w-full contents">
        <div className="masonry-columns space-y-4 mb-2 w-full block">
          {chunk.map((review) => (
            <div key={`rev-${review.id}`} className="bg-[#0a0a0a] text-gray-200 rounded-sm border border-white/5 break-inside-avoid overflow-hidden flex flex-col hover:border-white/20 transition-all relative shadow-lg">
              <label htmlFor={`modal-${review.id}`} className="absolute inset-0 z-10 cursor-pointer"></label>
              {review.img && (
                <div className="w-full aspect-[4/3] bg-black relative border-b border-white/5">
                  <img src={review.img} alt="Deployment Asset" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                   <div>
                      <p className="text-sm font-bold text-white flex items-center gap-1">{review.name} <CheckCircle2 className="w-3 h-3 text-green-500" /></p>
                      <p className="text-[10px] text-gray-500 mt-1">{review.date}</p>
                   </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={`st-${review.id}-${j}`} className={`w-3 h-3 ${j < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-700'}`} />)}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-light italic">"{review.text}"</p>
              </div>
              <ReviewModal review={review} />
            </div>
          ))}
        </div>
        {!isLast && (
          <div className="w-full break-inside-avoid flex flex-col items-center mt-2 mb-4">
            <input type="checkbox" id={`load-more-${i}`} className="toggle-chk hidden" />
            <label htmlFor={`load-more-${i}`} className="toggle-lbl bg-[#0a0a0a] border border-white/10 text-white px-10 py-4 text-xs tracking-widest font-bold uppercase hover:border-white/30 transition-colors cursor-pointer text-center w-full md:w-auto rounded-sm">Load More Reports</label>
            <div className="toggle-content hidden w-full">{reviewContent}</div>
          </div>
        )}
      </div>
    );
    var reviewContent = reviewWallContent; 
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black antialiased pb-20 lg:pb-0 relative scroll-smooth selection:bg-yellow-500/20">
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-marquee { display: flex; width: max-content; animation: marquee 45s linear infinite; }
        .masonry-columns { column-count: 1; column-gap: 16px; width: 100%; display: block; }
        @media (min-width: 640px) { .masonry-columns { column-count: 2; } }
        .toggle-chk:checked ~ .toggle-content { display: block; }
        .toggle-chk:checked ~ .toggle-lbl { display: none; }
        .nav-hidden { transform: translateY(-100%); }
        .nav-visible { transform: translateY(0); }
        details > summary { list-style: none; outline: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}} />

      <script dangerouslySetInnerHTML={{__html: `
        if (typeof window !== 'undefined') {
          document.addEventListener('DOMContentLoaded', () => {
            let lastScroll = window.pageYOffset;
            const commandCenter = document.getElementById('command-center');
            
            window.addEventListener('scroll', () => {
              const currentScroll = window.pageYOffset;
              if (commandCenter) {
                if (currentScroll > lastScroll && currentScroll > 100) {
                  commandCenter.classList.add('nav-hidden');
                  commandCenter.classList.remove('nav-visible');
                } else {
                  commandCenter.classList.add('nav-visible');
                  commandCenter.classList.remove('nav-hidden');
                }
              }
              lastScroll = currentScroll;
            });

            const scrollBtn = document.getElementById('scroll-to-buy');
            const buyBox = document.getElementById('buy-section-anchor');
            if(scrollBtn && buyBox) { scrollBtn.addEventListener('click', () => buyBox.scrollIntoView({ behavior: 'smooth' })); }

            const baseCheckout = "${checkoutUrlBase}";
            const basePriceNum = ${numericalPrice};
            const desktopCheckoutBtn = document.getElementById('desktop-checkout-btn');
            const mobileCheckoutBtn = document.getElementById('mobile-checkout-btn');
            const mobilePriceDisplay = document.getElementById('mobile-price-display');
            const mainPriceDisplay = document.getElementById('main-price-display');
            
            document.querySelectorAll('input[name="tier"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const qty = parseInt(e.target.value);
                    let discount = 1;
                    if(qty === 2) discount = 0.85; 
                    if(qty === 3) discount = 0.80; 
                    const newTotal = (basePriceNum * qty * discount).toFixed(2);
                    const newCheckoutUrl = baseCheckout + ':' + qty;
                    
                    if(mainPriceDisplay) mainPriceDisplay.innerText = '$' + newTotal;
                    if(mobilePriceDisplay) mobilePriceDisplay.innerText = '$' + newTotal;
                    if(desktopCheckoutBtn) desktopCheckoutBtn.href = newCheckoutUrl;
                    if(mobileCheckoutBtn) mobileCheckoutBtn.href = newCheckoutUrl;
                });
            });
          });
        }
      `}} />

      <header id="command-center" className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 nav-visible transition-transform duration-300">
        <nav className="p-4 flex justify-between items-center relative">
          <div className="w-full flex justify-center absolute left-0 select-none">
             <h1 className="text-lg md:text-xl font-serif tracking-[0.4em] text-white/90 text-center">THE OBSIDIAN PRESS</h1>
          </div>
          <div className="w-full flex justify-end z-10 hidden md:flex">
             <a href={`${checkoutUrlBase}:1`} className="text-[10px] font-bold tracking-[0.2em] uppercase text-black bg-white px-5 py-2.5 hover:bg-gray-200 transition-colors flex items-center gap-2">
                 SECURE UNIT
             </a>
          </div>
        </nav>
      </header>

      <section className="relative w-full h-[85vh] min-h-[700px] flex items-center justify-center overflow-hidden pt-20 bg-black">
         <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105 pointer-events-none select-none">
            <source src="/hero_video.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] pointer-events-none"></div>
         
         <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-10">
            <div className="inline-flex select-none items-center gap-2 px-4 py-1.5 rounded-sm border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
               <Zap className="w-3.5 h-3.5" /> Autonomous Thermodynamic Core
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-white mb-6 leading-[0.95]">
               THE LUXURY OF <br className="hidden md:block"/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">ABSOLUTE AUTONOMY.</span>
            </h1>
            
            <p className="text-base md:text-xl text-gray-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
               Command 20 bars of raw industrial pressure. Add cold water. Extract a flawless, barista-grade espresso in minutes. <strong className="text-white">Zero cords. Zero compromises.</strong>
            </p>
            
            <button id="scroll-to-buy" className="bg-white text-black px-8 py-5 md:px-12 md:py-6 text-sm md:text-base font-black tracking-[0.2em] uppercase hover:bg-gray-200 transition-all flex items-center gap-4 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)] group">
               SECURE DEPLOYMENT KIT <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
         </div>

         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce cursor-pointer select-none">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white">Classified Intel</span>
            <ChevronDown className="w-4 h-4 text-white" />
         </div>
      </section>

      <section className="relative w-full py-32 md:py-48 flex items-center bg-[#050505] overflow-hidden border-t border-white/5 bg-[url('/seduction_result.jpg')] bg-cover bg-center bg-no-repeat group">
         <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent pointer-events-none"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 flex justify-start">
            <div className="w-full md:w-3/5 text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
                  <Coffee className="w-3.5 h-3.5" /> Commercial Grade. Deployed.
               </div>
               <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-white mb-6 leading-[0.95] drop-shadow-2xl">
                  UNCOMPROMISING<br/>EXTRACTION.<br/><span className="text-gray-400">IN ANY TERRAIN.</span>
               </h2>
               <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed max-w-lg drop-shadow-lg">
                  Stop settling for mediocre drive-thru coffee. The Obsidian Press is the world's first tactical espresso engine that heats its own water and extracts with commercial-grade force. From the boardroom to the backcountry, demand perfection.
               </p>
            </div>
         </div>
      </section>

      <section className="relative w-full px-6 md:px-12 py-24 bg-[#0a0a0a] border-y border-white/5 overflow-hidden">
         <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-20 scale-105 pointer-events-none">
            <source src="/engineering_proof.mp4" type="video/mp4" />
         </video>
         <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 order-2 md:order-1 text-left">
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-10 leading-tight">ENGINEERED FOR<br/>INDEPENDENCE.</h2>
               <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                 {[ 
                   { icon: Zap, title: "20-BAR KINETIC PUMP", desc: "Commercial-grade pressure for rich, dense, golden crema." }, 
                   { icon: Thermometer, title: "EBoiler™ DYNAMIC HEATING", desc: "Boils cold water to 195°F (90°C) in under 4 minutes." }, 
                   { icon: ShieldCheck, title: "2500mAh CELL", desc: "Power through multiple extractions on a single charge." }, 
                   { icon: Coffee, title: "OMNI-COMPATIBLE", desc: "Adapters for Nespresso® Original, large pods, and ground coffee." } 
                 ].map(i => (
                   <div key={i.title} className="flex flex-col group">
                     <i.icon className="w-8 h-8 mb-4 text-white opacity-60 group-hover:opacity-100 transition-opacity" />
                     <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-2 text-white">{i.title}</h3>
                     <p className="text-gray-500 font-light text-[11px] leading-relaxed">{i.desc}</p>
                   </div>
                 ))}
               </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 aspect-square rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-black flex items-center justify-center">
               <img src="/field-deployment.png" alt="Core Architecture Dual Compatibility" className="w-full h-auto object-contain p-4" />
            </div>
         </div>
      </section>

      <div className="w-full bg-[#050505] py-24 px-6 md:px-12 border-b border-white/5">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center text-white pb-4 border-b border-white/5">Tactical Superiority</h2>
            <div className="space-y-4 bg-[#0a0a0a] border border-white/10 p-8 rounded-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-4 select-none">
                <span className="text-sm font-bold uppercase tracking-wider text-gray-400 w-1/3">Feature</span>
                <span className="text-sm font-bold uppercase tracking-wider text-white text-center w-1/3">The Obsidian Press</span>
                <span className="text-sm font-bold uppercase tracking-wider text-gray-600 text-center w-1/3">Standard Makers</span>
              </div>
              {[ 
                { f: "Portable Off-Grid", u: true, t: false }, 
                { f: "Self-Heating Core", u: true, t: false }, 
                { f: "20-Bar Extraction", u: true, t: true }, 
                { f: "Multi-Capsule", u: true, t: false }, 
                { f: "Battery Powered", u: true, t: false } 
              ].map(row => (
                <div key={row.f} className="flex justify-between items-center border-b border-white/5 pb-4 transition-colors hover:bg-white/[0.02]">
                  <span className="text-xs text-gray-400 w-1/3 uppercase font-light">{row.f}</span>
                  <span className="w-1/3 flex justify-center">{row.u ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</span>
                  <span className="w-1/3 flex justify-center">{row.t ? <Check className="w-4 h-4 text-gray-600" /> : <X className="w-4 h-4 text-red-900" />}</span>
                </div>
              ))}
            </div>
         </div>
      </div>

      <section className="bg-black text-white py-24 px-6 md:px-12 border-b border-white/5 selection:bg-yellow-500/20" id="reviews">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black tracking-widest uppercase text-white mb-8 text-center">VERIFIED FIELD REPORTS</h2>
            <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-sm flex flex-col md:flex-row gap-8 justify-between items-center mb-16 shadow-xl">
               <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-4">
                     <StarRating48 />
                     <span className="text-6xl font-black text-white ml-2">4.8</span>
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400 mt-2">{totalReviewsAnclaje} Assets Deployed</span>
               </div>
               <div className="flex-1 w-full max-w-sm space-y-2">
                 {[86, 10, 3, 1, 0].map((pct, i) => (
                    <div key={5-i} className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                      <span className="w-2">{5-i}</span>
                      <Star className="w-3.5 h-3.5 fill-current text-gray-600" />
                      <div className="flex-1 h-1.5 bg-[#111] rounded-full overflow-hidden">
                         <div className="h-full bg-yellow-500" style={{ width: `${pct}%` }}></div>
                      </div>
                      <span className="w-10 text-right">({Math.floor(totalReviewsAnclaje * pct / 100)})</span>
                    </div>
                 ))}
               </div>
            </div>

            <div className="masonry-columns space-y-4 mb-2 w-full block">
              {reviewWallContent}
            </div>
         </div>
      </section>

      <section id="buy-section-anchor" className="max-w-4xl mx-auto px-6 md:px-12 py-24 relative z-10">
         <div className="flex flex-col items-center text-center mx-auto mb-16 pb-6 border-b border-white/5">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white mb-6 leading-[0.95]">INITIATE<br/>DEPLOYMENT.</h2>
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-xl mx-auto mb-4">
              Stop blowing your budget on $6 lattes. The Obsidian Press pays for itself in less than 30 days. Experience elite espresso anywhere.
            </p>
            <span className="bg-red-500 text-white text-[10px] font-black px-4 py-1.5 uppercase tracking-widest mb-2 animate-pulse rounded-sm flex items-center gap-2">
              <ShieldCheck className="w-3 h-3" /> Critical stock: Only 14 units left
            </span>
         </div>

         <div className="w-full bg-[#080808] border border-white/10 p-8 shadow-2xl rounded-sm">
           
           <div className="flex items-end gap-4 mb-6 pb-6 select-none border-b border-white/10">
               <span id="main-price-display" className="text-5xl font-black tracking-tighter text-white">${price || "119.99"}</span>
               <span className="text-xl text-gray-600 line-through decoration-red-500/50 decoration-2 mb-1">${compareAtPrice || "179.98"}</span>
               <span className="bg-white text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest mb-2 ml-auto animate-pulse">Save 50%</span>
           </div>

           <div className="flex flex-col gap-5 mt-6 select-none">
             <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1">Select Acquisition Tier</h3>

             <label className="relative flex items-center justify-between p-6 border border-white/20 rounded-sm cursor-pointer hover:border-white/50 transition-colors bg-[#111] group order-2 mt-3">
                <input type="radio" name="tier" value="1" className="peer absolute opacity-0" defaultChecked />
                <div className="absolute inset-0 border border-transparent peer-checked:border-white pointer-events-none rounded-sm transition-colors"></div>
                <div className="flex items-center gap-5">
                   <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center peer-checked:border-white">
                      <div className="w-3 h-3 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                   </div>
                   <img src="/Bundle_1x.png" alt="Entry Tier" className="w-20 md:w-24 h-auto object-contain p-2 drop-shadow-xl" />
                   <div className="flex flex-col">
                      <span className="text-base md:text-lg font-bold uppercase tracking-widest text-white">Entry Tier (1x)</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">Standard Deployment</span>
                   </div>
                </div>
                <div className="text-right">
                   <span className="block text-xl md:text-2xl font-black">${price || "119.99"}</span>
                </div>
             </label>

             <label className="relative flex items-center justify-between p-6 border-2 border-yellow-500 rounded-sm cursor-pointer hover:border-yellow-500 transition-colors bg-gradient-to-r from-yellow-500/10 to-transparent group order-1 shadow-[0_0_20px_rgba(234,179,8,0.15)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[9px] font-black tracking-[0.2em] uppercase px-4 py-1 rounded-sm">Best Value / Shared Deployment</div>
                <input type="radio" name="tier" value="2" className="peer absolute opacity-0" />
                <div className="absolute inset-0 border border-transparent peer-checked:border-yellow-500 pointer-events-none rounded-sm transition-colors"></div>
                <div className="flex items-center gap-5">
                   <div className="w-5 h-5 rounded-full border border-yellow-500/50 flex items-center justify-center peer-checked:border-yellow-500">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                   </div>
                   <img src="/Bundle_2x.png" alt="Duo Pack" className="w-20 md:w-24 h-auto object-contain p-2 drop-shadow-xl" />
                   <div className="flex flex-col">
                      <span className="text-base md:text-lg font-bold uppercase tracking-widest text-white">Duo Pack (2x)</span>
                      <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">Save 15% Extra + Priority Dispatch</span>
                   </div>
                </div>
                <div className="text-right flex flex-col items-end">
                   <span className="block text-xl md:text-2xl font-black text-yellow-500">${((numericalPrice) * 2 * 0.85).toFixed(2)}</span>
                   <span className="text-xs text-gray-500 line-through decoration-red-500/50 decoration-2 tracking-wider">${((numericalPrice) * 2).toFixed(2)}</span>
                   <span className="text-[10px] text-gray-400">(${(numericalPrice * 0.85).toFixed(2)} ea.)</span>
                </div>
             </label>

             <label className="relative flex items-center justify-between p-6 border border-white/20 rounded-sm cursor-pointer hover:border-white/50 transition-colors bg-[#111] group order-3 mt-3">
                <input type="radio" name="tier" value="3" className="peer absolute opacity-0" />
                <div className="absolute inset-0 border border-transparent peer-checked:border-white pointer-events-none rounded-sm transition-colors"></div>
                <div className="flex items-center gap-5">
                   <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center peer-checked:border-white">
                      <div className="w-3 h-3 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                   </div>
                   <img src="/Bundle_3x.png" alt="Pro Pack" className="w-20 md:w-24 h-auto object-contain p-2 drop-shadow-xl" />
                   <div className="flex flex-col">
                      <span className="text-base md:text-lg font-bold uppercase tracking-widest text-white">Pro Pack (3x)</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">Save 20% Extra + VIP Support</span>
                   </div>
                </div>
                <div className="text-right flex flex-col items-end">
                   <span className="block text-xl md:text-2xl font-black text-white">${((numericalPrice) * 3 * 0.80).toFixed(2)}</span>
                   <span className="text-xs text-gray-500 line-through decoration-red-500/50 decoration-2 tracking-wider">${((numericalPrice) * 3).toFixed(2)}</span>
                </div>
             </label>

           </div>

           <div className="flex flex-col md:flex-row gap-6 mt-10 mb-8 border-t border-white/10 pt-8">
              <div className="w-full md:w-1/2 flex items-center gap-4 text-xs tracking-widest uppercase text-gray-300">
                 <Zap className="w-5 h-5 text-green-500" /> Free Worldwide Express Shipping
              </div>
              <div className="w-full md:w-1/2 flex items-center gap-4 text-xs tracking-widest uppercase text-gray-300">
                 <ShieldCheck className="w-5 h-5 text-white opacity-60" /> 2-Year Industrial Warranty (Global Support)
              </div>
           </div>

           <a id="desktop-checkout-btn" href={`${checkoutUrlBase}:1`} className="w-full bg-white text-black px-10 py-6 md:py-8 text-sm md:text-lg font-black tracking-[0.2em] uppercase hover:bg-gray-200 transition-all flex items-center justify-center gap-4 hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.15)] group">
             SECURE DEPLOYMENT KIT
             <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
           </a>
           
           <PaymentIcons />

         </div>
      </section>

      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#050505] border-t border-white/10 p-4 z-50 transition-transform duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]" id="mobile-buy-box">
         <a id="mobile-checkout-btn" href={`${checkoutUrlBase}:1`} className="w-full bg-white text-black px-4 py-5 text-xs font-black tracking-[0.2em] uppercase hover:bg-gray-200 flex items-center justify-center gap-3">
            SECURE UNIT - <span id="mobile-price-display">${price || "119.99"}</span> <ArrowRight className="w-4 h-4" />
         </a>
      </div>
      
      <footer className="border-t border-white/5 bg-black py-16 text-center pb-28 lg:pb-16 relative z-20 mt-12 select-none selection:bg-yellow-500/20">
        <h2 className="text-2xl font-serif tracking-[0.4em] uppercase text-white/20 mb-4">THE OBSIDIAN PRESS</h2>
        <p className="text-xs text-gray-600 uppercase tracking-widest">© 2026. All rights reserved. Oroná Del Carlo Corp. Industrial Logistics Div.</p>
      </footer>
    </div>
  );
}