export async function shopifyFetch({ query, variables = {} }) {
  const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
  const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
      },
      body: JSON.stringify({ query, variables }),
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error('Error fetching Shopify:', error);
    return { status: 500, error: 'Error de conexión' };
  }
}

// NUEVO PROTOCOLO: Creación de sesión de pago express
export async function createCart(variantId) {
  const query = `
    mutation cartCreate($lines: [CartLineInput!]) {
      cartCreate(input: {lines: $lines}) {
        cart {
          checkoutUrl
        }
      }
    }
  `;
  const variables = {
    lines: [{ merchandiseId: variantId, quantity: 1 }]
  };
  
  const { body } = await shopifyFetch({ query, variables });
  return body?.data?.cartCreate?.cart?.checkoutUrl;
}
