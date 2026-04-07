import { shopifyFetch, createCart } from '../lib/shopify';
import { ArrowRight, BatteryCharging, Droplets, Zap, Star, Lock } from "lucide-react";
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

  if (!productNode) return <div className="p-20 text-white bg-black min-h-screen text-center tracking-widest uppercase font-mono">System Offline. Product Data Link Fractured.</div>;

  const price = parseFloat(productNode.priceRange.minVariantPrice.amount).toFixed(2);
  const variantId = productNode.variants.edges[0]?.node?.id;
  const compareAtPrice = (price * 1.25).toFixed(2); // Simulated high price for anchor effect

  async function buyNow(formData) {
    "use server";
    const vId = formData.get('variantId');
    const checkoutUrl = await createCart(vId);
    if (checkoutUrl) redirect(checkoutUrl);
  }

  // Minimal Payment Icons (SVG)
  const PaymentIcons = () => (
    <div className="flex gap-4 items-center mt-6 opacity-60">
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/apple-pay.svg?v=1614338903" alt="Apple Pay" className="h-6 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/paypal.svg?v=1614338903" alt="PayPal" className="h-6 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/visa.svg?v=1614338903" alt="Visa" className="h-6 filter invert" />
      <img src="https://cdn.shopify.com/s/files/1/0104/1052/files/mastercard.svg?v=1614338903" alt="Mastercard" className="h-6 filter invert" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black antialiased">
      <nav className="p-6 border-b border-white/5 flex justify-between items-center absolute w-full z-50">
        <h1 className="text-sm font-bold tracking-[0.4em] uppercase text-white/40">DILEMMA DRIFT / GLOBAL</h1>
      </nav>

      <div className="relative pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[95vh]">
        <div className="relative z-20 order-2 md:order-1">
          <div className="flex items-center gap-2 mb-6 text-yellow-500">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            <span className="text-gray-400 text-xs tracking-widest ml-2 uppercase font-bold">50K+ Units Deployed</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.05]">
            RAW ESPRESSO.<br/><span className="text-gray-500">OFF-GRID.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 tracking-wide leading-relaxed max-w-xl">
            18 bars of raw industrial extraction. On the asphalt, in the mountains, or at the office. <strong className="text-white">Zero cords. Zero excuses.</strong>
          </p>
          
          <form action={buyNow} className="w-full relative z-30 max-w-lg">
            <input type="hidden" name="variantId" value={variantId} />
            
            <div className="mb-6 flex items-baseline gap-4 border-b border-white/5 pb-4">
                <span className="text-6xl font-extrabold tracking-tighter text-white">
                  ${price}
                </span>
                <span className="text-2xl text-gray-600 line-through">
                  ${compareAtPrice}
                </span>
                <span className="text-sm font-bold tracking-widest uppercase text-yellow-500 bg-yellow-950 px-3 py-1 ml-auto">
                    Global Launch Offer
                </span>
            </div>

            <button type="submit" className="w-full bg-white text-black px-8 py-6 text-base font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-4 group cursor-pointer border border-white">
              SECURE YOUR UNIT
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="mt-8 flex flex-col gap-4 border border-white/5 p-5 bg-[#0a0a0a]">
                <div className="flex justify-between items-center text-red-500">
                    <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Critical stock: ONLY 14 UNITS LEFT
                    </span>
                    <Lock className="w-4 h-4 opacity-50 text-white" />
                </div>
                <div className="text-gray-500 text-xs tracking-wide uppercase flex flex-col gap-1">
                    <span>⚡ FREE WORLDWIDE EXPRESS SHIPPING</span>
                    <span>🛠️ 2-Year Industrial Warranty</span>
                    <span>🤝 60-Day Unconditional Guarantee</span>
                </div>
                <PaymentIcons />
            </div>
          </form>
        </div>

        <div className="relative z-20 order-1 md:order-2">
          <div className="relative aspect-[4/5] bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            <div className="bg-gradient-to-b from-black/90 via-transparent to-transparent h-40 w-full absolute top-0 z-10 pointer-events-none" />
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
              <source src="/testimonio1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="border-l-2 border-white/10 pl-8 py-2 hover:border-white/30 transition-colors group">
            <Zap className="w-9 h-9 mb-7 text-white group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold tracking-widest uppercase mb-4 text-white">18-Bar Force</h3>
            <p className="text-gray-500 font-light text-base leading-relaxed">Industrial-grade extraction mechanism. Delivers the perfect crema regardless of your location.</p>
          </div>
          <div className="border-l-2 border-white/10 pl-8 py-2 hover:border-white/30 transition-colors group">
            <BatteryCharging className="w-9 h-9 mb-7 text-white group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold tracking-widest uppercase mb-4 text-white">Autonomous Core</h3>
            <p className="text-gray-500 font-light text-base leading-relaxed">Internal boiling system. No external cables, no plugs, absolute thermodynamic independence.</p>
          </div>
          <div className="border-l-2 border-white/10 pl-8 py-2 hover:border-white/30 transition-colors group">
            <Droplets className="w-9 h-9 mb-7 text-white group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold tracking-widest uppercase mb-4 text-white"> modular Cleaning</h3>
            <p className="text-gray-500 font-light text-base leading-relaxed">Ballistic architecture. Purge, rinse, and re-deploy the entire system in under 30 seconds.</p>
          </div>
        </div>
      </div>

      <div className="py-32 px-6 md:px-12 bg-[#050505] relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-widest uppercase mb-4 text-white">FIELD EVIDENCE</h2>
            <p className="text-xl text-gray-500 font-light">Real extractions from our active operative network.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative aspect-[9/16] bg-[#0a0a0a] overflow-hidden border border-white/10 rounded-sm">
              <div className="bg-gradient-to-b from-black/90 via-transparent to-transparent h-32 w-full absolute top-0 z-10 pointer-events-none" />
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 z-0">
                <source src="/testimonio2.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="relative aspect-[9/16] bg-[#0a0a0a] overflow-hidden border border-white/10 rounded-sm">
              <div className="bg-gradient-to-b from-black/90 via-transparent to-transparent h-32 w-full absolute top-0 z-10 pointer-events-none" />
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 z-0">
                <source src="/testimonio3.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}