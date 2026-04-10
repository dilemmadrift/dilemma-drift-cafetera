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

  // Try/Catch "try tactile paracaídas"
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

  const baseReviews = [
    { id: 1, name: "William P.", date: "18/03/2026", rating: 5, img: "/review-1.jpg", text: "Take this bad boy with me while I'm out on the boat. Couldn't be happier with it. The battery handles the heating perfectly." },
    { id: 2, name: "David B.", date: "11/03/2026", rating: 3, img: null, text: "Not enough water space. The reservoir only holds 70ml, so I have to bring a thermos with cold water to refill it if I want a long coffee. The heating element is surprisingly fast though." },
    { id: 3, name: "Mia T.", date: "02/03/2026", rating: 5, img: "/review-2.jpg", text: "Received as a gift - perfect for taking away camping and still getting my coffee fix. The self-heating is completely silent." },
    { id: 4, name: "Emma T.", date: "28/02/2026", rating: 5, img: "/review-3.jpg", text: "Saved me a fortune. I used to spend $8 a day at the local cafe. Paid for itself in less than a month." },
    { id: 5, name: "Jacob L.", date: "19/02/2026", rating: 5, img: "/review-4.jpg", text: "Fantastic on-the-go espresso maker. The 20-bar pressure isn't a marketing gimmick, crema is thick and golden." },
    { id: 6, name: "Bron E.", date: "12/02/2026", rating: 4, img: null, text: "Still getting used to the double click function to heat, but happy so far. Pulls a great shot." },
    { id: 7, name: "Daniel H.", date: "14/01/2026", rating: 5, img: "/review-5.jpg", text: "My go-to for weekends away. Easy operation, great flavor and truly portable. Fits right into my car's cup holder." },
    { id: 8, name: "Scott K.", date: "02/01/2026", rating: 2, img: null, text: "It didn't puncture my large capsules correctly at first. Found out I wasn't pushing the adapter down hard enough. User error, but annoying." },
    { id: 9, name: "Kristy S.", date: "13/12/2025", rating: 5, img: "/review-6.jpg", text: "Impressive modularity. I've only tried the large capsule and ground coffee, super hot. Perfect deployment asset." },
    { id: 10, name: "Andrew T.", date: "15/05/2025", rating: 5, img: null, text: "It's the perfect size for my camper setup. Highly recommended." },
    { id: 11, name: "Barbara N.", date: "15/05/2025", rating: 5, img: null, text: "Finally a way to enjoy café coffee without the cost. The crema is exactly what I wanted." },
    { id: 12, name: "Maria L.", date: "15/05/2025", rating: 5, img: null, text: "Lightweight but brews strong - love it." },
    { id: 13, name: "Barbara S.", date: "15/05/2025", rating: 5, img: null, text: "Super easy to assemble and disassemble. Washing the modular parts takes 10 seconds." },
    { id: 14, name: "Donna W.", date: "09/05/2025", rating: 5, img: null, text: "Doesn't spill or leak during travel. Fits perfectly in the side pocket of my backpack." },
    { id: 15, name: "Zoe M.", date: "09/05/2025", rating: 5, img: null, text: "I even use it in my camper van - space saver and delicious results." },
    { id: 16, name: "Mark W.", date: "09/05/2025", rating: 5, img: null, text: "I bought it for the office, but now my colleagues borrow it constantly. Should have bought two." },
    { id: 17, name: "Pita T.", date: "24/11/2025", rating: 5, img: null, text: "Have it as a Chrissy prezzies for my mate..he loves it!!" },
    { id: 18, name: "Lucas M.", date: "15/10/2025", rating: 4, img: null, text: "Takes about 3 minutes to heat the water. Not instant, but for a battery-powered device, it's impressive." },
    { id: 19, name: "Sofia G.", date: "10/10/2025", rating: 5, img: null, text: "POV: You actually bought something useful. Best purchase of the year." },
    { id: 20, name: "Liam O.", date: "18/09/2025", rating: 5, img: null, text: "Industrial warranty is the clincher. Build quality is exceptional, lightweight but very solid." },
    { id: 21, name: "Priya R.", date: "15/09/2025", rating: 5, img: null, text: "TSA compliant for travel. Heats fast. Crema is superb. Replaced my hotel coffee completely." },
    { id: 22, name: "Viktor D.", date: "10/09/2025", rating: 5, img: null, text: "My partner and I fight over who gets to use it first. Absolute essential." },
    { id: 23, name: "Chloe A.", date: "05/09/2025", rating: 5, img: null, text: "The taste comparison is spot on. Flavor depth with my own grounds is exactly like my expensive home setup." },
    { id: 24, name: "Trevor M.", date: "01/09/2025", rating: 5, img: null, text: "Never letting this tactical asset out of my sight. Fresh espresso in traffic is unreal." },
    { id: 25, name: "Javier L.", date: "28/08/2025", rating: 4, img: null, text: "Fast shipping. Packaged securely. Modular cleaning protocol works just as described." },
    { id: 26, name: "Swampy W.", date: "25/08/2025", rating: 5, img: null, text: "Ideal for short stops. Beats waiting in line and paying $6 each. Makes a great espresso." },
    { id: 27, name: "Callan W.", date: "20/08/2025", rating: 5, img: null, text: "Fastest heat time I've experienced on a portable. Solid build." },
    { id: 28, name: "Elias C.", date: "15/08/2025", rating: 5, img: null, text: "Absolute modular versatility. Capsules or grounds - both taste great." },
    { id: 29, name: "Marcus T.", date: "10/08/2025", rating: 4, img: null, text: "A bit heavy for ultra-light backpacking, but considering it heats water internally, it's worth the weight." },
    { id: 30, name: "Sophie L.", date: "05/08/2025", rating: 5, img: null, text: "The matte onyx finish is gorgeous. Looks like a very expensive piece of tech on my desk." },
    { id: 31, name: "Aria N.", date: "01/08/2025", rating: 5, img: null, text: "I bought it for van life. Being completely off-grid and having a hot espresso is a game changer." },
    { id: 32, name: "Leo F.", date: "25/07/2025", rating: 5, img: null, text: "The 20-bar pump sounds serious when it engages. You can tell it's pushing real pressure." },
    { id: 33, name: "Ben D.", date: "20/07/2025", rating: 5, img: null, text: "I'm wired! Makes espresso strong enough to wake me up instantly." },
    { id: 34, name: "Opie T.", date: "15/07/2025", rating: 5, img: null, text: "Purchased my first one and really like how you can do grinds or pods. Loved it so much purchased one for my husband." },
    { id: 35, name: "Phillip B.", date: "10/07/2025", rating: 5, img: null, text: "Use it on the building site everyday! very happy with my purchase." },
    { id: 36, name: "Benjamin W.", date: "05/07/2025", rating: 5, img: null, text: "The machine feels premium, but the price is super reasonable." },
    { id: 37, name: "Madison P.", date: "01/07/2025", rating: 5, img: null, text: "No more lining up for coffee at work. Lifesaver." },
    { id: 38, name: "Ronald S.", date: "25/06/2025", rating: 5, img: null, text: "Incredible. The crema holds up even when I froth oat milk over it." },
    { id: 39, name: "Margaret B.", date: "20/06/2025", rating: 5, img: null, text: "Works with almond and soy milk without issues." },
    { id: 40, name: "James M.", date: "15/06/2025", rating: 5, img: null, text: "Perfect for early mornings at the office before meetings." },
    { id: 41, name: "Mary W.", date: "10/06/2025", rating: 5, img: null, text: "I use it during long photography shoots outdoors. Keeps me fueled." },
    { id: 42, name: "John R.", date: "05/06/2025", rating: 5, img: null, text: "Sleek and modern design — looks very expensive." },
    { id: 43, name: "Ivy C.", date: "01/06/2025", rating: 5, img: null, text: "Makes camping trips feel way more luxurious." },
    { id: 44, name: "Harper F.", date: "25/05/2025", rating: 5, img: null, text: "Brilliant little device for travelers." },
    { id: 45, name: "Scarlett D.", date: "20/05/2025", rating: 5, img: null, text: "Customer service was helpful when I had a question—great support." },
    { id: 46, name: "Betty F.", date: "15/05/2025", rating: 5, img: null, text: "My teenage kids love making iced coffee with it." },
    { id: 47, name: "Dorothy N.", date: "10/05/2025", rating: 5, img: null, text: "It heats quickly and the coffee is ready in minutes." },
    { id: 48, name: "Christopher E.", date: "05/05/2025", rating: 5, img: null, text: "The instructions were simple, and I had my first espresso within minutes." }
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
            <label htmlFor={`load-more-${i}`} className="toggle-lbl bg-[#0a0a0a] border border-white/10 text-white px-10 py-4 text-xs tracking-widest font-bold uppercase hover:border-white/30 transition-colors cursor-pointer text-center w-full md:w-auto rounded-sm">Show more reports</label>
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
            const basePriceNum = ${price || 119.99};
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

      {/* --- EL NUEVO GANCHO CINEMATOGRÁFICO (HERO SECTION) --- */}
      {/* REQUIERE: hero_video.mp4 */}
      {/* CORRECCIÓN: Nítido y Oscuro (Opacidad 90%, Filtro de Desenfoque y Oscurecimiento Profundo) */}
      <section className="relative w-full h-[85vh] min-h-[700px] flex items-center justify-center overflow-hidden pt-20 bg-black">
         <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105 pointer-events-none filter-dark select-none">
            <source src="/hero_video.mp4" type="video/mp4" />
         </video>
         {/* Fondo oscuro profundo con desenfoque táctico */}
         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none"></div>
         
         <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-10">
            <div className="inline-flex select-none items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
               <Zap className="w-3.5 h-3.5" /> Autonomous Self-Heating Core
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-white mb-6 leading-[0.95]">
               The Luxury of <br className="hidden md:block"/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Immediacy.</span>
            </h1>
            
            <p className="text-base md:text-xl text-gray-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
               Experience 20 bars of raw industrial pressure. Add cold water, extract anywhere. Stop blowing your budget on takeaway coffee.
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
      {/* --- FIN DEL GANCHO --- */}

      <div id="buy-section-anchor" className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-24 flex flex-col lg:flex-row gap-8 lg:gap-16 relative z-10 items-start">
        
        {/* Left Column: Logic & Proof */}
        <div className="w-full lg:w-[55%] flex flex-col gap-10 order-2 lg:order-1 items-start mt-0">
          
          <div className="bg-[#080808] border border-white/10 p-8 md:p-12 text-center rounded-sm w-full mb-2 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-black tracking-[0.1em] uppercase mb-6 text-white">COLD WATER CAN MAKE ESPRESSO.</h2>
            <p className="text-gray-400 leading-relaxed font-light text-sm">
              Remarkably small but with a powerful 2500mAh lithium battery. This industrial-grade portable espresso engine upgrades your daily coffee needs. Simply add cold water with your favorite capsules or freshly ground coffee. <strong className="text-white">Never be limited by location.</strong> It's just one tap to extract exquisite espresso anywhere.
            </p>
          </div>

          <div className="w-full mb-2">
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center border-b border-white/5 pb-4 text-white">How does it work?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[ 
                { step: 1, title: "Load Ammo", desc: "Insert Nespresso capsule, large pod, or ground coffee." }, 
                { step: 2, title: "Add Water", desc: "Pour water into the reservoir. Double-click to self-heat." }, 
                { step: 3, title: "Extract", desc: "Experience 20-bar pressure delivering rich, thick crema anywhere." } 
              ].map(s => (
                <div key={s.step} className="bg-[#0a0a0a] p-6 border border-white/5 text-center hover:border-white/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto mb-4">{s.step}</div>
                  <h3 className="text-sm font-bold uppercase mb-2 text-white">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="py-12 bg-[#0a0a0a] border border-white/5 px-8 relative z-20 w-full rounded-sm mb-2">
             <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-10 text-center text-white">Tactical Deployable Assets</h2>
             <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
               {[ 
                 { icon: Coffee, title: "Dolce Modularity", desc: "Supports Nespresso, large pods, and ground coffee." }, 
                 { icon: Thermometer, title: "Thermodynamic Core", desc: "Self-heats water in 200 seconds. Boiling ready." }, 
                 { icon: Zap, title: "Extraction Force", desc: "Industrial-grade mechanism. 20-bar crema." }, 
                 { icon: ShieldCheck, title: "Autonomous Cell", desc: "Ultra-lightweight 700g chassis. 2500mAh engine." } 
               ].map(i => (
                 <div key={i.title} className="flex flex-col group">
                   <i.icon className="w-7 h-7 mb-4 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
                   <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-2 text-white">{i.title}</h3>
                   <p className="text-gray-500 font-light text-[11px] leading-relaxed">{i.desc}</p>
                 </div>
               ))}
             </div>
          </div>

          <div className="w-full bg-[#050505] border border-white/10 rounded-sm overflow-hidden relative">
             <img src="/core-split.png" alt="Core Architecture Dual Compatibility" className="w-full h-auto object-contain p-4 select-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4 select-none">
            <div className="aspect-[4/5] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity bg-[#111]">
                <source src="/demo-action1.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="aspect-[4/5] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity bg-[#111]">
                <source src="/demo-action2.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center text-white pb-4 border-b border-white/5 pb-4">Tactical Superiority</h2>
            <div className="space-y-4 bg-[#0a0a0a] border border-white/10 p-8 rounded-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-4 select-none">
                <span className="text-sm font-bold uppercase tracking-wider text-gray-400 w-1/3">Feature</span>
                <span className="text-sm font-bold uppercase tracking-wider text-white text-center w-1/3">The Obsidian Press</span>
                <span className="text-sm font-bold uppercase tracking-wider text-gray-600 text-center w-1/3">Home Machine</span>
              </div>
              {[ 
                { f: "Portable Off-Grid", u: true, t: false }, 
                { f: "Self-Heating Core", u: true, t: false }, 
                { f: "20-Bar Extraction", u: true, t: true }, 
                { f: "Multi-Capsule", u: true, t: false }, 
                { f: "Cost Efficient", u: true, t: false } 
              ].map(row => (
                <div key={row.f} className="flex justify-between items-center border-b border-white/5 pb-4 transition-colors hover:bg-white/[0.02]">
                  <span className="text-xs text-gray-400 w-1/3 uppercase font-light">{row.f}</span>
                  <span className="w-1/3 flex justify-center">{row.u ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</span>
                  <span className="w-1/3 flex justify-center">{row.t ? <Check className="w-4 h-4 text-gray-600" /> : <X className="w-4 h-4 text-red-900" />}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-transparent text-white pt-8 w-full mt-4" id="reviews">
            <h2 className="text-3xl font-black tracking-widest uppercase text-white mb-8 text-center">Verified Mission Reports</h2>
            
            <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-sm mb-10 flex flex-col md:flex-row gap-8 justify-between items-center md:items-start">
               <div className="flex flex-col items-center md:items-start select-none">
                  <div className="flex items-center gap-4">
                     <StarRating48 />
                     <span className="text-5xl font-black text-white ml-2">4.8</span>
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400 mt-2">{totalReviewsAnclaje} Reports Deployed</span>
               </div>
               
               <div className="flex-1 w-full max-w-sm space-y-2 select-none">
                 {reviewStats.map(bar => (
                    <div key={bar.star} className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                      <span className="w-2">{bar.star}</span>
                      <Star className="w-3 h-3 fill-current text-gray-600" />
                      <div className="flex-1 h-1.5 bg-[#111] rounded-full overflow-hidden">
                         <div className="h-full bg-yellow-500" style={{ width: bar.pct }}></div>
                      </div>
                      <span className="w-10 text-right">({bar.count})</span>
                    </div>
                 ))}
               </div>

               <div className="flex flex-col gap-3 w-full md:w-auto items-center md:items-end justify-center select-none">
                 <div className="bg-[#111] border border-white/10 px-6 py-4 text-center rounded-sm w-full max-w-[200px]">
                    <Lock className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed">
                      Only verified owners receive a secure link to submit reports.
                    </p>
                 </div>
               </div>
            </div>

            {reviewWallContent}
          </div>

        </div>

        {/* Right Column: Sticky Buy Box */}
        <div id="buy-box" className="w-full lg:w-[45%] order-1 lg:order-2 flex items-start lg:sticky lg:top-24 scroll-mt-24 mt-4 lg:mt-0">
          <div className="bg-[#080808] border border-white/10 p-8 shadow-2xl z-30 w-full rounded-sm">
            
            <a href="#reviews" className="flex items-center gap-2 mb-4 text-yellow-500 hover:opacity-80 transition-opacity cursor-pointer w-fit select-none">
              <StarRating48 />
              <span className="text-gray-400 text-xs tracking-widest ml-2 uppercase font-bold border-b border-gray-400 border-dashed mt-1.5">{totalReviewsAnclaje} Reports Deployed</span>
            </a>

            <h1 className="text-4xl md:text-5xl font-serif tracking-widest mb-4 leading-[1.05] text-white uppercase select-none">
              THE OBSIDIAN <br/> PRESS.
            </h1>
            
            <p className="text-sm text-gray-400 font-light mb-8 max-w-sm leading-relaxed">
              Stop blowing your budget on takeaway coffees. Experience 20 bars of raw industrial pressure. <strong className="text-white">Anywhere. Anytime.</strong> Zero cords. Zero excuses.
            </p>

            <div className="w-full">
              
              <div className="flex items-end gap-4 mb-6 pb-6 select-none border-b border-white/10">
                  <span id="main-price-display" className="text-5xl font-black tracking-tighter text-white">${price || "119.99"}</span>
                  <span className="text-xl text-gray-600 line-through decoration-red-500/50 decoration-2 mb-1">${compareAtPrice || "179.98"}</span>
                  <span className="bg-white text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest mb-2 ml-auto animate-pulse">Save 50%</span>
              </div>

              {/* UPSELL TIER SELECTOR */}
              <div className="flex flex-col gap-3 mb-6 select-none">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1 border-t border-white/10 pt-6">Select Deployment Tier</h3>

                {/* Option 1: Base */}
                <label className="relative flex items-center justify-between p-4 border border-white/20 rounded-sm cursor-pointer hover:border-white/50 transition-colors bg-[#111] group">
                   <input type="radio" name="tier" value="1" className="peer absolute opacity-0" defaultChecked />
                   <div className="absolute inset-0 border border-transparent peer-checked:border-white pointer-events-none rounded-sm transition-colors"></div>
                   <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center peer-checked:border-white">
                         <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-sm font-bold uppercase tracking-widest text-white">Entry Tier (1x)</span>
                         <span className="text-[10px] text-gray-400">Standard Deployment</span>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="block text-sm font-black">${price || "119.99"}</span>
                   </div>
                </label>

                {/* Option 2: Best Value (Highlighted) */}
                <label className="relative flex items-center justify-between p-4 border border-yellow-500/50 rounded-sm cursor-pointer hover:border-yellow-500 transition-colors bg-gradient-to-r from-yellow-500/10 to-transparent group mt-3 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                   <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[9px] font-black tracking-[0.2em] uppercase px-3 py-0.5 rounded-sm">Best Value / Shared</div>
                   <input type="radio" name="tier" value="2" className="peer absolute opacity-0" />
                   <div className="absolute inset-0 border border-transparent peer-checked:border-yellow-500 pointer-events-none rounded-sm transition-colors"></div>
                   <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border border-yellow-500/50 flex items-center justify-center peer-checked:border-yellow-500">
                         <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-sm font-bold uppercase tracking-widest text-white">Duo Pack (2x)</span>
                         <span className="text-[10px] text-yellow-500">Save 15% Extra + Priority Dispatch</span>
                      </div>
                   </div>
                   <div className="text-right flex flex-col items-end">
                      <span className="block text-sm font-black text-yellow-500">${((price || 119.99) * 2 * 0.85).toFixed(2)}</span>
                      <span className="text-xs text-gray-500 line-through decoration-red-500/50 decoration-2 tracking-wider">${((price || 119.99) * 2).toFixed(2)}</span>
                      <span className="text-xs text-gray-300">(${(basePriceNum * 0.85).toFixed(2)} ea.)</span>
                   </div>
                </label>

                {/* Option 3: Pro */}
                <label className="relative flex items-center justify-between p-4 border border-white/20 rounded-sm cursor-pointer hover:border-white/50 transition-colors bg-[#111] group">
                   <input type="radio" name="tier" value="3" className="peer absolute opacity-0" />
                   <div className="absolute inset-0 border border-transparent peer-checked:border-white pointer-events-none rounded-sm transition-colors"></div>
                   <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center peer-checked:border-white">
                         <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-sm font-bold uppercase tracking-widest text-white">Pro Pack (3x)</span>
                         <span className="text-[10px] text-gray-400">Save 20% Extra + VIP Support</span>
                      </div>
                   </div>
                   <div className="text-right flex flex-col items-end">
                      <span className="block text-sm font-black text-white">${((price || 119.99) * 3 * 0.80).toFixed(2)}</span>
                      <span className="text-xs text-gray-500 line-through decoration-red-500/50 decoration-2 tracking-wider">${((price || 119.99) * 3).toFixed(2)}</span>
                   </div>
                </label>
              </div>

              <div className="flex flex-col gap-3 mb-8 select-none border-t border-white/10 pt-6">
                 <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gray-300">
                    <Zap className="w-4 h-4 text-green-500" /> Free Worldwide Express Shipping
                 </div>
                 <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gray-300">
                    <ShieldCheck className="w-4 h-4 text-white" /> 2-Year Industrial Warranty (Global Support)
                 </div>
              </div>

              <a id="desktop-checkout-btn" href={`${checkoutUrlBase}:1`} className="w-full bg-white text-black px-8 py-5 text-sm font-black tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-4 group cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                SECURE YOUR DEPLOYMENT KIT
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              
              <div className="mt-6 text-center select-none">
                <span className="text-red-500 text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Critical stock: Only 14 units left
                </span>
              </div>

              <PaymentIcons />
            </div>
          </div>
        </div>

      </div>

      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#050505] border-t border-white/10 p-4 z-50 transition-transform duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]" id="mobile-buy-box">
         <a id="mobile-checkout-btn" href={`${checkoutUrlBase}:1`} className="w-full bg-white text-black px-4 py-4 text-xs font-black tracking-[0.2em] uppercase hover:bg-gray-200 flex items-center justify-center gap-3">
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