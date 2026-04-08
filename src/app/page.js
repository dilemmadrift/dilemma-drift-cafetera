import { shopifyFetch } from '../lib/shopify';
import { ArrowRight, BatteryCharging, Zap, Star, ShieldCheck, Check, X, Package, CheckCircle2, Settings, Thermometer, Coffee, Lock, MailCheck, GripHorizontal, CreditCard } from "lucide-react";

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
  const WHATSAPP_MSG = "Hello Dilemma Drift, I need assistance with The Obsidian Press.";

  const baseReviews = [
    { id: 1, name: "William P.", date: "18/03/2026", rating: 5, img: "/review-1.jpg", text: "Take this bad boy with me while I'm out on the boat. Couldn't be happier with it. The battery handles the heating perfectly." },
    { id: 2, name: "David B.", date: "11/03/2026", rating: 3, img: null, text: "Not enough water space. The reservoir only holds 70ml, so I have to bring a thermos with cold water to refill it if I want a long coffee. The heating element is surprisingly fast though." },
    { id: 3, name: "Mia T.", date: "02/03/2026", rating: 5, img: "/review-2.jpg", text: "Received as a gift - perfect for taking away camping and still getting my coffee fix. The self-heating is completely silent." },
    { id: 4, name: "Emma T.", date: "28/02/2026", rating: 5, img: "/review-3.jpg", text: "Saved me a fortune. I used to spend $8 a day at the local cafe. Paid for itself in less than a month." },
    { id: 5, name: "Jacob L.", date: "19/02/2026", rating: 5, img: "/review-4.jpg", text: "Fantastic on-the-go espresso maker. The 18-bar pressure isn't a marketing gimmick, crema is thick and golden." },
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
    { id: 32, name: "Leo F.", date: "25/07/2025", rating: 5, img: null, text: "The 18-bar pump sounds serious when it engages. You can tell it's pushing real pressure." },
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

  const totalReviewsAnclaje = 681;
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

  const StarRating48 = () => (
    <div className="flex text-yellow-500 mt-2 gap-0.5">
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
          <div className="w-full break-inside-avoid flex flex-col items-center mt-2 mb-4">
            <input type="checkbox" id={`load-more-${i}`} className="toggle-chk hidden" />
            <label htmlFor={`load-more-${i}`} className="toggle-lbl bg-[#0a0a0a] border border-white/10 text-white px-10 py-4 text-xs tracking-widest font-bold uppercase hover:border-white/30 transition-colors cursor-pointer text-center w-full md:w-auto rounded-sm">
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

  // Iconos de pago encriptados (Sin depender de Shopify)
  const PaymentIcons = () => (
    <div className="flex flex-col items-center justify-center gap-2 opacity-50 mt-6">
      <div className="flex items-center gap-2 text-white">
        <Lock className="w-3 h-3" />
        <span className="text-[9px] font-bold uppercase tracking-widest">Guaranteed Safe Checkout</span>
      </div>
      <div className="flex gap-2 text-gray-400">
         <CreditCard className="w-5 h-5" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black antialiased pb-20 lg:pb-0 relative scroll-smooth">
      
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

        .close-floating-chk:checked ~ .floating-video-container { display: none !important; }
        .close-sub-chk:checked ~ #sub-popup { display: none !important; }
        .submit-trigger:checked ~ .form-elements { display: none !important; }
        .submit-trigger:checked ~ .success-elements { display: flex !important; animation: fadeIn 0.5s ease-out forwards; }
      `}} />

      <script dangerouslySetInnerHTML={{__html: `
        if (typeof window !== 'undefined') {
          document.addEventListener('DOMContentLoaded', () => {
            let lastScroll = window.pageYOffset;
            const commandCenter = document.getElementById('command-center');
            const subPopup = document.getElementById('sub-popup');
            const subInput = document.getElementById('sub-input');
            const subSuccess = document.getElementById('success-trigger');
            
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
              if (subPopup && !subPopup.classList.contains('op-completed') && (window.innerHeight + currentScroll) >= document.body.offsetHeight - 1500) {
                subPopup.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
                subPopup.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
              }
              lastScroll = currentScroll;
            });

            if(document.getElementById('unlock-btn')){
                document.getElementById('unlock-btn').addEventListener('click', () => {
                if (subInput.value.includes('@')) {
                    subSuccess.checked = true;
                    subPopup.classList.add('op-completed');
                    setTimeout(() => {
                      document.getElementById('close-sub').checked = true;
                      subPopup.classList.add('pointer-events-none');
                    }, 2500);
                } else {
                    subInput.classList.add('border-red-500');
                    setTimeout(() => subInput.classList.remove('border-red-500'), 1000);
                }
                });
            }

            const floatWidget = document.getElementById('floating-widget');
            const dragOverlay = document.getElementById('drag-overlay');
            const closeBtn = document.getElementById('close-floating-btn');
            
            const openTrigger = document.getElementById('open-video-trigger');
            const closeBg = document.getElementById('close-video-bg');
            const closeX = document.getElementById('close-video-x');
            const expandedVideo = document.getElementById('expanded-video');
            
            let isDragging = false, isMoved = false, startX, startY, initialLeft, initialTop;

            if (expandedVideo) {
               if (openTrigger) {
                  openTrigger.addEventListener('click', () => {
                     expandedVideo.muted = false;
                     expandedVideo.currentTime = 0;
                     expandedVideo.play();
                  });
               }
               const muteAndPause = () => {
                  expandedVideo.muted = true;
               };
               if (closeBg) closeBg.addEventListener('click', muteAndPause);
               if (closeX) closeX.addEventListener('click', muteAndPause);
            }

            if (floatWidget && dragOverlay && closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    floatWidget.style.display = 'none';
                });

                const startDrag = (clientX, clientY) => {
                    isDragging = true;
                    isMoved = false;
                    startX = clientX;
                    startY = clientY;
                    const rect = floatWidget.getBoundingClientRect();
                    initialLeft = rect.left;
                    initialTop = rect.top;
                    floatWidget.style.bottom = 'auto';
                    floatWidget.style.right = 'auto';
                    floatWidget.style.left = initialLeft + 'px';
                    floatWidget.style.top = initialTop + 'px';
                };

                const doDrag = (clientX, clientY) => {
                    if (!isDragging) return;
                    if (Math.abs(clientX - startX) > 3 || Math.abs(clientY - startY) > 3) {
                        isMoved = true;
                    }
                    floatWidget.style.left = (initialLeft + (clientX - startX)) + 'px';
                    floatWidget.style.top = (initialTop + (clientY - startY)) + 'px';
                };

                const endDrag = () => {
                    isDragging = false;
                };

                dragOverlay.addEventListener('mousedown', (e) => { 
                    e.preventDefault(); 
                    startDrag(e.clientX, e.clientY); 
                });
                document.addEventListener('mousemove', (e) => { doDrag(e.clientX, e.clientY); });
                document.addEventListener('mouseup', endDrag);

                dragOverlay.addEventListener('touchstart', (e) => { 
                    startDrag(e.touches[0].clientX, e.touches[0].clientY); 
                }, {passive: true});
                document.addEventListener('touchmove', (e) => { 
                    if(isDragging){ 
                        e.preventDefault(); 
                        doDrag(e.touches[0].clientX, e.touches[0].clientY); 
                    } 
                }, {passive: false});
                document.addEventListener('touchend', endDrag);
            }
          });
        }
      `}} />

      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-[88px] lg:bottom-6 left-6 z-[95] bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform border border-white/10" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.013-.967-.253-.099-.439-.149-.624.149-.183.298-.715.967-.877 1.166-.165.198-.328.223-.625.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.624-1.505-.855-2.059-.227-.539-.456-.465-.624-.473-.165-.008-.353-.008-.539-.008-.184 0-.486.074-.739.372-.253.297-.967.944-.967 2.304s.991 2.675 1.13 2.873c.138.198 1.954 2.997 4.735 4.196.662.285 1.179.456 1.583.584.665.21 1.269.18 1.745.109.535-.08 1.758-.717 2.004-1.411.246-.694.246-1.289.173-1.411-.074-.124-.26-.198-.557-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      <div id="floating-widget" className="fixed bottom-[88px] lg:bottom-6 right-6 z-[90] w-28 md:w-36 aspect-[9/16] bg-black border border-white/20 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        <div id="close-floating-btn" className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer z-50 text-white hover:bg-red-500 transition-colors">
           <X className="w-3 h-3" />
        </div>
        <div id="drag-overlay" className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"></div>
        <input type="checkbox" id="expand-floating-video" className="peer/expand hidden" />
        <label id="open-video-trigger" htmlFor="expand-floating-video" className="absolute inset-y-0 mt-8 inset-x-0 z-30 cursor-pointer"></label>
        
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none">
           <source src="/floating-demo.mp4" type="video/mp4" />
        </video>

        <div className="fixed inset-0 hidden peer-checked/expand:flex items-center justify-center bg-black/95 backdrop-blur-md z-[200] animate-fade-in p-4" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
           <label id="close-video-bg" htmlFor="expand-floating-video" className="absolute inset-0 z-10 cursor-pointer"></label>
           <label id="close-video-x" htmlFor="expand-floating-video" className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer z-30 text-white hover:bg-white/20 transition-colors">
              <X className="w-5 h-5" />
           </label>
           <a href={checkoutUrl} className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] block group cursor-pointer z-40">
              <video id="expanded-video" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="/floating-demo.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center">
                 <span className="bg-white text-black px-8 py-4 text-xs font-black tracking-widest uppercase hover:scale-105 transition-transform flex items-center gap-3">
                   SECURE THE OBSIDIAN PRESS <ArrowRight className="w-4 h-4" />
                 </span>
              </div>
           </a>
        </div>
      </div>

      <input type="checkbox" id="close-sub" className="close-sub-chk hidden peer/close-s" />
      <input type="checkbox" id="success-trigger" className="submit-trigger hidden peer/success" />
      <div id="sub-popup" className="fixed bottom-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[400px] bg-[#050505] border border-white/20 p-8 z-[100] transform translate-y-full md:scale-95 opacity-0 pointer-events-none transition-all duration-700 ease-out rounded-t-2xl md:rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] peer-checked/close-s:hidden">
         <label htmlFor="close-sub" className="absolute top-4 right-4 cursor-pointer w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><X className="w-4 h-4"/></label>
         <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2 leading-tight">Unlock <br/><span className="text-yellow-500">TACTICAL DISPATCH</span></h3>
         
         <div className="form-elements flex flex-col gap-3">
            <p className="text-sm text-gray-400 mb-6 font-light leading-relaxed">Join the operative list for priority access, 10% tactical discounts, and restock alerts.</p>
            <input type="email" name="email" autoComplete="off" id="sub-input" placeholder="ENTER YOUR EMAIL" className="bg-[#111] border border-white/10 px-4 py-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" />
            <button type="button" id="unlock-btn" className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-4 text-xs hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] flex justify-center items-center text-center">Unlock Arsenal</button>
            <label htmlFor="close-sub" className="block text-center text-[10px] text-gray-600 mt-4 cursor-pointer hover:text-gray-400 uppercase tracking-widest">No thanks, I pay full price</label>
         </div>

         <div className="success-elements hidden flex-col items-center text-center py-6 gap-4">
            <MailCheck className="w-16 h-16 text-green-500 bg-green-500/10 p-4 rounded-full border border-green-500/20" />
            <p className="text-green-500 font-bold uppercase tracking-widest text-sm">Deployment Secured</p>
            <p className="text-xs text-gray-400 leading-relaxed font-light">Operative secured. Check your arsenal for dispatch data and the tactical code.</p>
         </div>
      </div>

      <header id="command-center" className="fixed top-0 w-full z-50 transition-transform duration-300">
        <div className="bg-[#000000] text-white py-2 overflow-hidden border-b border-white/10">
          <div className="animate-marquee whitespace-nowrap text-[10px] font-black tracking-[0.2em] uppercase flex items-center">
            {[...Array(15)].map((_, i) => <span key={i} className="mx-8">GLOBAL LAUNCH: 50% OFF + FREE WORLDWIDE EXPRESS SHIPPING</span>)}
          </div>
        </div>
        <nav className="p-4 flex justify-between items-center bg-[#050505]/95 backdrop-blur-md border-b border-white/5 relative">
          <div className="w-full flex justify-center absolute left-0">
             <h1 className="text-lg md:text-xl font-serif tracking-[0.4em] text-white/90 text-center">THE OBSIDIAN PRESS</h1>
          </div>
          <div className="w-full flex justify-end z-10 hidden md:flex">
             <a href={checkoutUrl} className="text-[10px] font-bold tracking-[0.2em] uppercase text-black bg-white px-5 py-2.5 hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                 SECURE UNIT
             </a>
          </div>
        </nav>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-36 md:pt-40 pb-24 flex flex-col lg:flex-row gap-8 lg:gap-16 relative z-10 items-start">
        
        <div className="w-full lg:w-[55%] flex flex-col gap-10 order-2 lg:order-1 items-start mt-0">
          
          <div className="aspect-[4/5] w-full bg-[#0a0a0a] border border-white/10 relative overflow-hidden group rounded-sm shadow-2xl">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000">
              <source src="/demo-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="w-full flex justify-center my-2 md:hidden">
             <a href={checkoutUrl} className="w-full bg-white text-black px-12 py-5 text-xs font-black tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-4 group cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                SECURE THE OBSIDIAN PRESS <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </a>
          </div>

          <div className="bg-transparent border-l-2 border-yellow-500 pl-6 text-left w-full my-2">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-4 text-white leading-tight">
              BLOWING YOUR BUDGET ON TAKEAWAY COFFEES?
            </h2>
            <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base">
              With The Obsidian Press, you can make rich, barista-style coffee anywhere in minutes - at home, work, camping or on the go. Stop paying $6 a cup.
            </p>
          </div>

          <div className="bg-[#080808] border border-white/10 p-8 md:p-12 text-center rounded-sm w-full mb-2">
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

          <div className="py-12 bg-[#0a0a0a] border border-white/5 px-8 relative z-20 w-full rounded-sm mb-2">
             <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-10 text-center text-white">Tactical Deployable Assets</h2>
             <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
               {[ 
                 { icon: Coffee, title: "Dolce Modularity", desc: "Supports Nespresso, large pods, and ground coffee." }, 
                 { icon: Thermometer, title: "Thermodynamic Core", desc: "Self-heats water in 200 seconds. Boiling ready." }, 
                 { icon: Zap, title: "Extraction Force", desc: "Industrial-grade mechanism. 18-bar crema." }, 
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

          {/* ELIMINADA LA IMAGEN FANTASMA */}

          <div className="w-full bg-[#050505] border border-white/10 rounded-sm overflow-hidden relative">
             <img src="/core-split.png" alt="Core Architecture Dual Compatibility" className="w-full h-auto object-contain" />
          </div>

          <div className="w-full bg-[#050505] border border-white/10 rounded-sm overflow-hidden relative">
             <img src="/field-deployment.png" alt="Field Deployment" className="w-full h-auto object-contain" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
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
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-8 text-center text-white">Tactical Superiority</h2>
            <div className="space-y-4 bg-[#0a0a0a] border border-white/10 p-8 rounded-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-gray-400 w-1/3">Feature</span>
                <span className="text-sm font-bold uppercase tracking-wider text-white text-center w-1/3">The Obsidian Press</span>
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

          <div className="bg-transparent text-white pt-8 w-full mt-4" id="reviews">
            <h2 className="text-3xl font-black tracking-widest uppercase text-white mb-8 text-center">Verified Mission Reports</h2>
            
            <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-sm mb-10 flex flex-col md:flex-row gap-8 justify-between items-center md:items-start">
               <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-4">
                     <StarRating48 />
                     <span className="text-5xl font-black text-white ml-2">4.8</span>
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400 mt-2">{totalReviewsAnclaje} Reports Deployed</span>
               </div>
               
               <div className="flex-1 w-full max-w-sm space-y-2">
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

               <div className="flex flex-col gap-3 w-full md:w-auto items-center md:items-end justify-center">
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

          <div className="w-full mt-0">
            <h2 className="text-xl font-bold tracking-[0.1em] uppercase mb-6 text-center border-b border-white/10 pb-4 text-white">Intelligence Data (FAQ)</h2>
            <div className="space-y-4">
              {[ 
                { q: "Do I need hot water or power to use it?", a: "Negative. The Obsidian Press features a 2500mAh self-heating core. Just add cold water, double click to activate, and it heats to 90°C in under 200 seconds." }, 
                { q: "Which capsules are compatible?", a: "Absolute modular versatility. Includes adapters for small capsules (Nespresso Original), large pods (Dolce Gusto), and your own freshly ground coffee beans." }, 
                { q: "Can this be used on a plane?", a: "Yes, cleared for carry-on luggage. However, airline regulations prohibit using the self-heating function *during* the flight. Perfect for the terminal." },
                { q: "How do I clean the modular chamber?", a: "Hassle-free operation. Fill the reservoir with fresh water and run a cycle without ammunition (capsules). The 18-bar pressure system purges itself automatically." } 
              ].map(faq => (
                <details key={faq.q} className="group border border-white/10 bg-[#0a0a0a] p-6 cursor-pointer hover:border-white/30 transition-colors rounded-sm">
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
        <div id="buy-box" className="w-full lg:w-[45%] order-1 lg:order-2 flex items-start lg:sticky lg:top-24 scroll-mt-24 mt-4 lg:mt-0">
          <div className="bg-[#080808] border border-white/10 p-8 shadow-2xl z-30 w-full rounded-sm">
            
            <a href="#reviews" className="flex items-center gap-2 mb-4 text-yellow-500 hover:opacity-80 transition-opacity cursor-pointer w-fit">
              <StarRating48 />
              <span className="text-gray-400 text-xs tracking-widest ml-2 uppercase font-bold border-b border-gray-400 border-dashed mt-1.5">{totalReviewsAnclaje} Reports Deployed</span>
            </a>

            <h1 className="text-4xl md:text-5xl font-serif tracking-widest mb-4 leading-[1.05] text-white uppercase">
              THE OBSIDIAN <br/> PRESS.
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
        <h2 className="text-2xl font-serif tracking-[0.4em] uppercase text-white/20 mb-4">THE OBSIDIAN PRESS</h2>
        <p className="text-xs text-gray-600 uppercase tracking-widest">© 2026. All rights reserved. Oroná Del Carlo Corp. Industrial Logistics Div.</p>
      </footer>
    </div>
  );
}