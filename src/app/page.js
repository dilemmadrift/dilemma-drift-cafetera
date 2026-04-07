import { shopifyFetch, createCart } from '../lib/shopify';
import { ShoppingBag, ArrowRight } from "lucide-react";
import { redirect } from 'next/navigation';

export default async function Home() {
  // Ahora también extraemos el "Variant ID", el ADN necesario para facturar.
  const query = `
    query {
      products(first: 4) {
        edges {
          node {
            id
            title
            description
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const { body } = await shopifyFetch({ query });
  const products = body?.data?.products?.edges || [];

  // EL TÚNEL DIRECTO: Esta función se ejecuta invisible en el servidor
  async function buyNow(formData) {
    "use server";
    const variantId = formData.get('variantId');
    const checkoutUrl = await createCart(variantId);
    
    if (checkoutUrl) {
      redirect(checkoutUrl); // Teletransportación a la caja
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <nav className="p-6 border-b border-white/10 flex justify-between items-center relative z-50">
        <h1 className="text-xl font-bold tracking-[0.3em] uppercase">Dilemma Drift</h1>
        <ShoppingBag className="w-5 h-5 text-gray-500 hover:text-white transition-colors cursor-pointer" />
      </nav>

      <main className="p-6 max-w-7xl mx-auto mt-12">
        <div className="mb-16">
          <h2 className="text-xs tracking-[0.2em] text-gray-500 mb-3 uppercase">Catálogo En Vivo</h2>
          <p className="text-4xl md:text-5xl font-light tracking-tight">Sincronización Directa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map(({ node }) => {
            const imageUrl = node.images.edges[0]?.node?.url || '';
            const price = node.priceRange.minVariantPrice.amount;
            const variantId = node.variants.edges[0]?.node?.id;

            return (
              <form action={buyNow} key={node.id} className="group relative border border-white/10 bg-[#0a0a0a] hover:border-white/40 transition-all duration-700 flex flex-col justify-between min-h-[450px] overflow-hidden">
                <input type="hidden" name="variantId" value={variantId} />
                
                {/* Botón invisible de fricción cero que cubre toda la tarjeta */}
                <button type="submit" className="absolute inset-0 z-20 w-full h-full cursor-pointer focus:outline-none" aria-label={`Adquirir ${node.title}`}></button>

                {imageUrl && (
                  <div 
                    className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  />
                )}
                
                <div className="relative z-10 p-10 flex flex-col h-full justify-between bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-wide uppercase mb-2 drop-shadow-lg">{node.title}</h3>
                    <p className="text-gray-300 font-light tracking-wide line-clamp-2 drop-shadow-md">{node.description}</p>
                  </div>
                  <div className="flex justify-between items-end mt-auto pt-8">
                    <span className="text-3xl font-light tracking-wider drop-shadow-lg">${price}</span>
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-md">Adquirir</span>
                      <ArrowRight className="w-6 h-6 text-white group-hover:text-white transition-all -translate-x-6 group-hover:translate-x-0 duration-500 drop-shadow-md" />
                    </div>
                  </div>
                </div>
              </form>
            );
          })}
        </div>
      </main>
    </div>
  );
}