import { shopifyFetch } from '../lib/shopify';
import { ArrowRight, BatteryCharging, Zap, Star, ShieldCheck, Check, X, Package, CheckCircle2, Settings, Thermometer, Coffee, ChevronDown, PenSquare } from "lucide-react";

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
  const WHATSAPP_MSG = "Hello Dilemma Drift, I need assistance with the Nomad Engine.";

  const allReviews = [
    { id: 1, name: "Mia T.", date: "02/03/2026", rating: 5, img: "/review-1.jpg", text: "Received as a Christmas Gift - perfect for taking away camping and still getting my coffee fix. The self-heating is completely silent." },
    { id: 2, name: "David B.", date: "28/02/2026", rating: 4, img: null, text: "I'll give it 4 stars only because the water reservoir is 70ml and I like long coffees, so I have to bring a water bottle to refill it. Other than that, the extraction pressure is insane." },
    { id: 3, name: "Jacob L.", date: "19/02/2026", rating: 5, img: "/review-3.jpg", text: "Fantastic on-the-go espresso maker. The 18-bar pressure isn't a marketing gimmick, the crema is incredibly thick." },
    { id: 4, name: "Daniel H.", date: "14/01/2026", rating: 5, img: "/review-4.jpg", text: "My go-to for weekends away. Easy operation, great flavor and truly portable. Fits right into my car's cup holder." },
    { id: 5, name: "Kristy S.", date: "13/12/2025", rating: 5, img: "/review-5.jpg", text: "Impressive modularity. I've only tried the large capsule and ground coffee, super hot. Perfect deployment asset." },
    { id: 6, name: "Andrew C.", date: "13/12/2025", rating: 5, img: "/review-6.jpg", text: "Easy deployment briefing. Brewed my first espresso in minutes. Absolute tactical advantage for long drives." },
    { id: 7, name: "Sarah M.", date: "10/12/2025", rating: 4, img: null, text: "The box arrived a little dented from the courier, but the machine is built like a tank so it wasn't damaged. Brews perfectly." },
    { id: 8, name: "Ava M.", date: "29/11/2025", rating: 5, img: null, text: "Finally, real espresso on the road. Simple to use and super lightweight - highly recommend." },
    { id: 9, name: "Ethan B.", date: "24/11/2025", rating: 5, img: null, text: "Changed my morning commute. Quick setup, solid pressure and delicious shots every time." },
    { id: 10, name: "Isabella W.", date: "19/11/2025", rating: 5, img: null, text: "Ideal for travel, easy cleaning and the coffee quality rivals my home machine." },
    { id: 11, name: "Olivia G.", date: "15/11/2025", rating: 5, img: null, text: "Perfect for my camping trips! Pulls a surprisingly rich shot in minutes - compact and no hassle." },
    { id: 12, name: "Noah K.", date: "10/11/2025", rating: 5, img: null, text: "Love how portable this is. Fits in my backpack, heats up fast and the espresso tastes way better than instant coffee." },
    { id: 13, name: "Lauren F.", date: "05/11/2025", rating: 5, img: null, text: "Good quality. Does its job as described. Battery lasts for 4-5 extractions on heating mode." },
    { id: 14, name: "Livia C.", date: "01/11/2025", rating: 5, img: null, text: "I take it to uni - perfect between classes. Saves me $6 a day." },
    { id: 15, name: "Trevor M.", date: "28/10/2025", rating: 5, img: null, text: "Never letting this out of my sight. Absolute tactical advantage." },
    { id: 16, name: "Darren M.", date: "25/10/2025", rating: 5, img: null, text: "Coffee quality is incredible. Pulls a thick crema every single time." },
    { id: 17, name: "Rosa B.", date: "20/10/2025", rating: 5, img: null, text: "Perfect for remote work locations. Cold mornings are brutal, but hot espresso at 5 AM changes everything." },
    { id: 18, name: "Alina N.", date: "15/10/2025", rating: 5, img: null, text: "Fresh, hot espresso on command. What more could you want?" },
    { id: 19, name: "Daniela R.", date: "10/10/2025", rating: 5, img: null, text: "Great machine for vans, camping, worksite - basically anywhere." },
    { id: 20, name: "Yelena V.", date: "05/10/2025", rating: 5, img: null, text: "Makes my mornings way easier. Load it up the night before, press the button in the car." },
    { id: 21, name: "Tessa Q.", date: "01/10/2025", rating: 5, img: null, text: "Battery lasts longer than expected. Very happy with the purchase." },
    { id: 22, name: "Viktor D.", date: "28/09/2025", rating: 5, img: null, text: "Absolute essential for camping season. Threw out my old french press immediately." },
    { id: 23, name: "Lila W.", date: "25/09/2025", rating: 5, img: null, text: "The machine is compact but extracts like a full-size unit. Industrial mechanism works." },
    { id: 24, name: "Luca B.", date: "20/09/2025", rating: 5, img: null, text: "Exactly what I needed for the car. Fits perfectly in the cup holder." },
    { id: 25, name: "Callan W.", date: "15/09/2025", rating: 5, img: null, text: "My partner and I fight over who gets to use it first. Buying a second unit." },
    { id: 26, name: "Viktor S.", date: "10/09/2025", rating: 5, img: null, text: "Makes smooth, rich espresso with minimal effort. Cleaning is super easy too." },
    { id: 27, name: "Tahlia B.", date: "05/09/2025", rating: 5, img: null, text: "One of the best portable gadgets I own. The thermodynamic core is no joke." },
    { id: 28, name: "Nia T.", date: "01/09/2025", rating: 5, img: null, text: "No more dodgy instant coffee at work! I bring my own specialty grounds now." },
    { id: 29, name: "Sienna H.", date: "28/08/2025", rating: 5, img: null, text: "Well worth the investment. Paid for itself by skipping cafes for 3 weeks." },
    { id: 30, name: "Callum F.", date: "20/08/2025", rating: 5, img: null, text: "Fantastic crema and good body. I was skeptical but it proved me wrong." },
    { id: 31, name: "Priya R.", date: "15/08/2025", rating: 5, img: null, text: "The triple-compatibility is a game changer. Capsules or grounds - both taste great." },
    { id: 32, name: "Hugo L.", date: "10/08/2025", rating: 5, img: null, text: "Works great for iced coffee too. Just use cold water and don't double click." },
    { id: 33, name: "Mirella C.", date: "05/08/2025", rating: 5, img: null, text: "Such a handy machine for early weekend trips." },
    { id: 34, name: "Jonas S.", date: "01/08/2025", rating: 5, img: null, text: "Quiet, compact, and efficient. The self-heating is completely silent." },
    { id: 35, name: "Amir K.", date: "25/07/2025", rating: 5, img: null, text: "Perfect for brewing on the job site. Industrial grade build feels solid." },
    { id: 36, name: "Stefan I.", date: "20/07/2025", rating: 5, img: null, text: "The perfect blend of portability and power. 18 bars is real." }
  ];

  const chunkSize = 6;
  const reviewChunks = [];
  for (let i = 0; i < allReviews.length; i += chunkSize) {
    reviewChunks.push(allReviews.slice(i, i + chunkSize));
  }

  const WriteReviewModal = () => (
    <div className="contents">
      <input type="checkbox" id="write-review-modal" className="peer/write hidden" />
      <div className="fixed inset-0 z-[200] hidden peer-checked/write:flex items-center justify-center p-4">
         <label htmlFor="write-review-modal" className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"></label>
         <div className="relative bg-[#0a0a0a] text-white p-8 max-w-md w-full rounded-md shadow-[0_0_40px_rgba(255,255,255,0.05)] z-10 border border-white/10 animate-fade-in">
            <label htmlFor="write-review-modal" className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/5 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
               <X className="w-4 h-4 text-gray-400" />
            </label>
            <h3 className="text-xl font-black uppercase tracking-widest mb-2">Deploy your report</h3>
            <p className="text-xs text-gray-500 mb-6">Your feedback upgrades our intelligence data.</p>
            
            <div className="space-y-4">
               <div>
                 <label className="text-xs uppercase tracking-widest text-gray-400">Rating</label>
                 <div className="flex text-gray-600 gap-1 mt-2 cursor-pointer">
                    {[...Array(5)].map((_, j) => <Star key={`w-${j}`} className="w-6 h-6 hover:text-yellow-500 transition-colors" />)}
                 </div>
               </div>
               <div>
                 <label className="text-xs uppercase tracking-widest text-gray-400">Name</label>
                 <input type="text" className="w-full bg-[#111] border border-white/10 mt-1 p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="Operative Name" />
               </div>
               <div>
                 <label className="text-xs uppercase tracking-widest text-gray-400">Report</label>
                 <textarea className="w-full bg-[#111] border border-white/10 mt-1 p-3 text-sm text-white h-24 focus:outline-none focus:border-white/30 transition-colors" placeholder="Detail your experience..."></textarea>
               </div>
               <label htmlFor="write-review-modal" className="w-full bg-white text-black px-6 py-4 text-xs font-black tracking-widest uppercase flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors mt-4">
                 Submit Data
               </label>
            </div>
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
               <p className="text-[10px] text-gray-500 uppercase tracking-widest">Item deployed: Nomad Engine</p>
            </div>
         </div>
      </div>
    </div>
  );

  let reviewWallContent = null;
  for (let i = reviewChunks.length - 1; i >= 0; i--) {
    const chunk = reviewChunks[i];
    const isLast = i === reviewChunks.length - 1;

    reviewWallContent = (
      <div className="w-full contents">
        <div className="masonry-columns space-y-4 mb-4 w-full block">
          {chunk.map((review) => (
            <div key={`rev-${review.id}`} className="bg-[#0a0a0a] text-gray-200 rounded-sm border border-white/5 break-inside-avoid overflow-hidden flex flex-col hover:border-white/20 transition-all relative mb-4 shadow-lg">
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
          <div className="w-full break-inside-avoid flex flex-col items-center mt-6 mb-10">
            <input type="checkbox" id={`load-more-${i}`} className="toggle-chk hidden" />
            <label htmlFor={`load-more-${i}`} className="toggle-lbl bg-[#0a0a0a] border border-white/10 text-white px-8 py-4 text-xs tracking-widest font-bold uppercase hover:border-white/30 transition-colors cursor-pointer text-center w-full md:w-auto rounded-sm">
              Show more reports
            </label>
            <div className="toggle-content hidden w-full">
              {reviewContent}
            </div>
          </div>
        )}
      </div>
    );
    var reviewContent = reviewWallContent; 
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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black antialiased pb-20 lg:pb-0 relative">
      
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        
        .masonry-columns { column-count: 1; column-gap: 16px; width: 100%; display: block; }
        @media (min-width: 640px) { .masonry-columns { column-count: 2; } }
        
        .toggle-chk:checked ~ .toggle-content { display: block; }
        .toggle-chk:checked ~ .toggle-lbl { display: none; }

        .nav-hidden { transform: translateY(-100%); }
        .nav-visible { transform: translateY(0); }
        
        details > summary { list-style: none; outline: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}} />

      {/* SCRIPT NATIVO: Smart Nav & Slide-in Pop-up */}
      <script dangerouslySetInnerHTML={{__html: `
        if (typeof window !== 'undefined') {
          document.addEventListener('DOMContentLoaded', () => {
            let lastScroll = window.pageYOffset;
            const commandCenter = document.getElementById('command-center');
            const subPopup = document.getElementById('sub-popup');
            
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
              
              if (subPopup && (window.innerHeight + currentScroll) >= document.body.offsetHeight - 1200) {
                subPopup.classList.remove('translate-y-full', 'opacity-0');
                subPopup.classList.add('translate-y-0', 'opacity-100');
              }

              lastScroll = currentScroll;
            });
          });
        }
      `}} />

      {/* WhatsApp FAB */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-[88px] lg:bottom-6 left-6 z-[100] bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform border border-white/10" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.013-.967-.253-.099-.439-.149-.624.149-.183.298-.715.967-.877 1.166-.165.198-.328.223-.625.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.624-1.505-.855-2.059-.227-.539-.456-.465-.624-.473-.165-.008-.353-.008-.539-.008-.184 0-.486.074-.739.372-.253.297-.967.944-.967 2.304s.991 2.675 1.13 2.873c.138.198 1.954 2.997 4.735 4.196.662.285 1.179.456 1.583.584.665.21 1.269.18 1.745.109.535-.08 1.758-.717 2.004-1.411.246-.694.246-1.289.173-1.411-.074-.124-.26-.198-.557-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Video Flotante Constante (Right) */}
      <input type="checkbox" id="close-floating-video" className="peer/floating hidden" />
      <div className="fixed bottom-[88px] lg:bottom-6 right-6 w-28 md:w-36 aspect-[9/16] bg-black border border-white/20 rounded-lg shadow-2xl z-[90] overflow-hidden peer-checked/floating:hidden hover:scale-105 transition-transform duration-500">
         <label htmlFor="close-floating-video" className="absolute top-2 right-2 w-6 h-6 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer z-10 text-white hover:bg-black transition-colors">
            <X className="w-3 h-3" />
         </label>
         <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/floating-demo.mp4" type="video/mp4" />
         </video>
      </div>

      {/* Pop-up de Suscripción */}
      <input type="checkbox" id="close-sub" className="peer/sub hidden" />
      <div id="sub-popup" className="fixed bottom-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[400px] bg-[#050505] border border-white/20 p-8 z-[100] transform translate-y-full md:scale-95 opacity-0 transition-all duration-700 ease-out peer-checked/sub:hidden rounded-t-2xl md:rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.8)]">
         <label htmlFor="close-sub" className="absolute top-4 right-4 cursor-pointer w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><X className="w-4 h-4"/></label>
         <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2 leading-tight">Unlock <br/><span className="text-yellow-500">10% Off</span></h3>
         <p className="text-sm text-gray-400 mb-6 font-light leading-relaxed">Join the Dilemma Drift operative list for priority access, tactical discounts, and restock alerts.</p>
         <form className="flex flex-col gap-3">
            <input type="email" placeholder="ENTER YOUR EMAIL" className="bg-[#111] border border-white/10 px-4 py-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" required />
            <button type="submit" className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-4 text-xs hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">Unlock Arsenal</button>
         </form>
         <label htmlFor="close-sub" className="block text-center text-[10px] text-gray-600 mt-4 cursor-pointer hover:text-gray-400 uppercase tracking-widest">No thanks, I pay full price</label>
      </div>

      {/* EL CENTRO DE COMANDO */}
      <header id="command-center" className="fixed top-0 w-full z-50 transition-transform duration-300">
        <div className="bg-[#000000] text-white py-2 overflow-hidden border-b border-white/10">
          <div className="animate-marquee whitespace-nowrap text-[10px] font-black tracking-[0.2em] uppercase flex items-center">
            {[...Array(15)].map((_, i) => <span key={i} className="mx-8">GLOBAL LAUNCH: 50% OFF + FREE WORLDWIDE EXPRESS SHIPPING</span>)}
          </div>
        </div>
        <nav className="p-4 flex justify-between items-center bg-[#050505]/95 backdrop-blur-md border-b border-white/5">
          <h1 className="text-xs font-bold tracking-[0.3em] uppercase text-white/90">DILEMMA DRIFT</h1>
          <a href={checkoutUrl} className="text-[10px] font-bold tracking-[0.2em] uppercase text-black bg-white px-5 py-2.5 hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              SECURE UNIT
          </a>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-36 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">
        
        {/* Left Column */}
        <div className="w-full lg:w-[55%] flex flex-col gap-16 order-2 lg:order-1">
          
          <div className="aspect-[4/5] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group rounded-sm shadow-2xl">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000">
              <source src="/demo-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* BOTÓN DE COMPRA ESTRATÉGICO 1 */}
          <div className="w-full flex justify-center">
             <a href={checkoutUrl} className="w-full md:w-auto bg-white text-black px-12 py-5 text-xs font-black tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-4 group cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                SECURE NOMAD ENGINE <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </a>
          </div>

          <div className="bg-transparent border-l-2 border-yellow-500 pl-6 text-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-4 text-white leading-tight">
              BLOWING YOUR BUDGET ON TAKEAWAY COFFEES?
            </h2>
            <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base">
              With the Nomad Engine, you can make rich, barista-style coffee anywhere in minutes - at home, work, camping or on the go. Stop paying $6 a cup.
            </p>
          </div>

          <div className="bg-[#080808] border border-white/10 p-8 md:p-12 text-center rounded-sm">
            <h2 className="text-2xl md:text-3xl font-black tracking-[0.1em] uppercase mb-6 text-white">COLD WATER CAN MAKE ESPRESSO.</h2>
            <p className="text-gray-400 leading-relaxed font-light text-sm">
              Remarkably small but with a powerful 2500mAh lithium battery. This industrial-grade portable espresso engine upgrades your daily coffee needs. Simply add cold water with your favorite capsules or freshly ground coffee. <strong className="text-white">Never be limited by location.</strong> It's just one tap to extract exquisite espresso anywhere.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center border-b border-white/5 pb-4 text-white">How does it work?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[ 
                { step: 1, title: "Load Ammo", desc: "Insert Nespresso capsule, large pod, or ground coffee." }, 
                { step: 2, title: "Add Water", desc: "Pour water into the reservoir. Double-click to self-heat." }, 
                { step: 3, title: "Extract", desc: "Experience 18-bar pressure delivering rich, thick crema anywhere." } 
              ].map(s => (
                <div key={s.step} className="bg-[#0a0a0a] p-6 border border-white/5 text-center hover:border-white/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto mb-4">{s.step}</div>
                  <h3 className="text-sm font-bold uppercase mb-2 text-white">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="py-12 bg-[#0a0a0a] border border-white/5 px-8 relative z-20">
             <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-10 text-center text-white">Industrial Specifications</h2>
             <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
               {[ 
                 { icon: Coffee, title: "3-in-1 Modularity", desc: "Supports Nespresso, large pods, and ground coffee." }, 
                 { icon: Thermometer, title: "90°C Thermal Core", desc: "Self-heats water in 200 seconds. Internal boiling." }, 
                 { icon: Zap, title: "18-Bar Force", desc: "Industrial-grade mechanism. Thick crema anywhere." }, 
                 { icon: ShieldCheck, title: "Military Grade", desc: "Ultra-lightweight 700g chassis. 2500mAh cell." } 
               ].map(i => (
                 <div key={i.title} className="flex flex-col group">
                   <i.icon className="w-7 h-7 mb-4 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
                   <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-2 text-white">{i.title}</h3>
                   <p className="text-gray-500 font-light text-[11px] leading-relaxed">{i.desc}</p>
                 </div>
               ))}
             </div>
          </div>

          {/* BOTÓN DE COMPRA ESTRATÉGICO 2 */}
          <div className="w-full flex justify-center">
             <a href={checkoutUrl} className="w-full md:w-auto bg-white text-black px-12 py-5 text-xs font-black tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-4 group cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                SECURE NOMAD ENGINE <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </a>
          </div>

          {/* IMAGEN DE ARQUITECTURA */}
          <div className="w-full bg-transparent flex items-center justify-center">
             <img src="/8974B528-6848-48C4-9086-9777818C234B_1_201_a.jpeg" alt="Core Architecture Dual Compatibility" className="w-full h-auto rounded-sm shadow-xl border border-white/5" />
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
                <span className="text-sm font-bold uppercase tracking-wider text-white text-center w-1/3">Nomad Engine</span>
                <span className="text-sm font-bold uppercase tracking-wider text-gray-600 text-center w-1/3">Home Machine</span>
              </div>
              {[ 
                { f: "Portable Off-Grid", u: true, t: false }, 
                { f: "Self-Heating Core", u: true, t: false }, 
                { f: "18-Bar Extraction", u: true, t: true }, 
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

          {/* LA MURALLA DE CONFIANZA */}
          <div className="bg-transparent text-white pt-8" id="reviews">
            <h2 className="text-3xl font-black tracking-widest uppercase text-white mb-8 text-center">Verified Mission Reports</h2>
            
            <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-sm mb-10 flex flex-col md:flex-row gap-8 justify-between items-center md:items-start">
               <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-4">
                     <Star className="w-10 h-10 fill-yellow-500 text-yellow-500" />
                     <span className="text-5xl font-black text-white">4.8</span>
                  </div>
                  <div className="flex text-yellow-500 mt-2">
                    {[...Array(5)].map((_, j) => <Star key={`sts-${j}`} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400 mt-2">{allReviews.length} Reviews</span>
               </div>
               
               <div className="flex-1 w-full max-w-sm space-y-2">
                 {[ 
                   { star: 5, pct: "86%", count: Math.floor(allReviews.length * 0.86) },
                   { star: 4, pct: "10%", count: Math.floor(allReviews.length * 0.10) },
                   { star: 3, pct: "3%", count: Math.floor(allReviews.length * 0.03) },
                   { star: 2, pct: "1%", count: Math.floor(allReviews.length * 0.01) },
                   { star: 1, pct: "0%", count: 0 }
                 ].map(bar => (
                    <div key={bar.star} className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                      <span className="w-2">{bar.star}</span>
                      <Star className="w-3 h-3 fill-current text-gray-600" />
                      <div className="flex-1 h-1.5 bg-[#111] rounded-full overflow-hidden">
                         <div className="h-full bg-yellow-500" style={{ width: bar.pct }}></div>
                      </div>
                      <span className="w-8 text-right">({bar.count})</span>
                    </div>
                 ))}
               </div>

               <div className="flex flex-col gap-3 w-full md:w-auto">
                 <label htmlFor="write-review-modal" className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <PenSquare className="w-4 h-4" /> Write a review
                 </label>
                 
                 <details className="relative group cursor-pointer">
                    <summary className="bg-[#111] border border-white/10 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-between gap-4 hover:border-white/30 transition-colors">
                       Sort by <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#111] border border-white/10 shadow-2xl z-50 flex flex-col">
                       <span className="px-4 py-3 text-xs text-white border-b border-white/5 hover:bg-white/5 flex justify-between">Featured <Check className="w-3 h-3 text-green-500" /></span>
                       <span className="px-4 py-3 text-xs text-gray-400 hover:text-white hover:bg-white/5 border-b border-white/5">Newest</span>
                       <span className="px-4 py-3 text-xs text-gray-400 hover:text-white hover:bg-white/5 border-b border-white/5">Highest Ratings</span>
                       <span className="px-4 py-3 text-xs text-gray-400 hover:text-white hover:bg-white/5">Lowest Ratings</span>
                    </div>
                 </details>
               </div>
            </div>

            <WriteReviewModal />
            {reviewWallContent}
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center border-b border-white/10 pb-4 text-white">Intelligence Data (FAQ)</h2>
            <div className="space-y-4">
              {[ 
                { q: "Do I need hot water or power to use it?", a: "Negative. The engine features a 2500mAh self-heating core. Just add cold water, double click to activate, and it heats to 90°C in under 200 seconds." }, 
                { q: "Which capsules are compatible?", a: "Absolute modular versatility. Includes adapters for standard small capsules (Nespresso Original), large pods (Dolce Gusto), and your own freshly ground coffee beans." }, 
                { q: "Can this be used on a plane?", a: "Yes, it is cleared for carry-on luggage. However, airline regulations prohibit using the self-heating function *during* the flight. Perfect for the terminal." },
                { q: "How do I clean the modular chamber?", a: "Hassle-free operation. Fill the reservoir with fresh water and run a cycle without ammunition (capsules). The 18-bar pressure system purges itself automatically." } 
              ].map(faq => (
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
        <div id="buy-box" className="w-full lg:w-[45%] order-1 lg:order-2">
          <div className="sticky top-32 bg-[#080808] border border-white/10 p-8 shadow-2xl z-30 scroll-mt-32">
            
            <a href="#reviews" className="flex items-center gap-2 mb-4 text-yellow-500 hover:opacity-80 transition-opacity cursor-pointer w-fit">
              {[...Array(5)].map((_, i) => <Star key={`str-${i}`} className="w-4 h-4 fill-current" />)}
              <span className="text-gray-400 text-xs tracking-widest ml-2 uppercase font-bold border-b border-gray-400 border-dashed">{allReviews.length} Reports Deployed</span>
            </a>

            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-[1.05] text-white">
              NOMAD <br/> ENGINE.
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

              <PaymentIcons />
            </div>
          </div>
        </div>

      </div>

      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#050505] border-t border-white/10 p-4 z-50 transition-transform duration-300" id="mobile-buy-box">
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