import { shopifyFetch, createCart } from '../lib/shopify';
import { ArrowRight, BatteryCharging, Droplets, Zap, Star } from "lucide-react";
import { redirect } from 'next/navigation';

export default async function CafeteraLanding() {
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

  if (!productNode) return <div className="p-20 text-white bg-black min-h-screen text-center tracking-widest">SYSTEM OFFLINE. PRODUCT NOT FOUND.</div>;

  const price = productNode.priceRange.minVariantPrice.amount;
  const variantId = productNode.variants.edges[0]?.node?.id;
  const mainImage = productNode.images.edges[0]?.node?.url || '';

  async function buyNow(formData) {
    "use server";
    const vId = formData.get('variantId');
    const checkoutUrl = await createCart(vId);
    if (checkoutUrl) redirect(checkoutUrl);
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      {/* Navbar Minimalista */}
      <nav className="p-6 border-b border-white/5 flex justify-between items-center absolute w-full z-50">
        <h1 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50">Dilemma Drift</h1>
      </nav>

      {/* Hero Section Split (Texto + Video Inmediato) */}
      <div className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[90vh]">
        
        {/* Izquierda: Persuasión y Checkout */}
        <div className="relative z-20 order-2 md:order-1">
          <div className="flex items-center gap-2 mb-6 text-yellow-500">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            <span className="text-gray-400 text-xs tracking-widest ml-2 uppercase font-bold">10K+ Units Deployed</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
            HOT ESPRESSO.<br/><span className="text-gray-500">ANYWHERE.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light mb-10 tracking-wide leading-relaxed">
            18 bars of raw industrial pressure. On the asphalt, in the mountains, or at the office. <strong className="text-white">Zero cords. Zero excuses.</strong>
          </p>
          
          <form action={buyNow} className="w-full relative z-30">
            <input type="hidden" name="variantId" value={variantId} />
            <button type="submit" className="w-full bg-white text-black px-8 py-6 text-sm font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-4 group cursor-pointer border border-white">
              SECURE YOURS - ${price}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="mt-6 flex flex-col gap-2">
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                CRITICAL STOCK: ONLY 14 UNITS LEFT
              </span>
              <span className="text-gray-500 text-xs tracking-wide uppercase">⚡ Free Worldwide Shipping & 1-Year Warranty</span>
            </div>
          </form>
        </div>

        {/* Derecha: Video Principal (El Gancho) */}
        <div className="relative z-20 order-1 md:order-2">
          <div className="relative aspect-[4/5] bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            {/* Máscara de Sombras para el texto competidor */}
            <div className="bg-gradient-to-b from-black/90 via-transparent to-transparent h-32 w-full absolute top-0 z-10 pointer-events-none" />
            
            {/* Reproductor de tu archivo .mov */}
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
              <source src="/testimonio1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Especificaciones Técnicas */}
      <div className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="border-l border-white/10 pl-6">
            <Zap className="w-8 h-8 mb-6 text-white" />
            <h3 className="text-lg font-bold tracking-widest uppercase mb-3 text-white">18-Bar Extraction</h3>
            <p className="text-gray-500 font-light text-sm">Industrial-grade pressure mechanism. Delivers the perfect crema regardless of your location.</p>
          </div>
          <div className="border-l border-white/10 pl-6">
            <BatteryCharging className="w-8 h-8 mb-6 text-white" />
            <h3 className="text-lg font-bold tracking-widest uppercase mb-3 text-white">Self-Heating Engine</h3>
            <p className="text-gray-500 font-light text-sm">Internal boiling core. No external cables, no plugs, absolute independence.</p>
          </div>
          <div className="border-l border-white/10 pl-6">
            <Droplets className="w-8 h-8 mb-6 text-white" />
            <h3 className="text-lg font-bold tracking-widest uppercase mb-3 text-white">Ballistic Cleaning</h3>
            <p className="text-gray-500 font-light text-sm">Modular architecture. Purge and rinse the entire system in under 30 seconds.</p>
          </div>
        </div>
      </div>

      {/* Grilla UGC (Los otros 2 videos) */}
      <div className="py-24 px-6 md:px-12 bg-[#050505] relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-widest uppercase mb-4 text-white">FIELD EVIDENCE</h2>
            <p className="text-gray-500 font-light">Real extractions from our operative network.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[9/16] bg-[#0a0a0a] overflow-hidden border border-white/10">
              <div className="bg-gradient-to-b from-black/90 via-transparent to-transparent h-24 w-full absolute top-0 z-10 pointer-events-none" />
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 z-0">
                <source src="/testimonio2.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="relative aspect-[9/16] bg-[#0a0a0a] overflow-hidden border border-white/10">
              <div className="bg-gradient-to-b from-black/90 via-transparent to-transparent h-24 w-full absolute top-0 z-10 pointer-events-none" />
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